#!/usr/bin/env zsh
# Builds the homepage hero loop from screen recordings: cut shots, crop off captions/player UI,
# crossfade them together, then compress to web MP4 + WebM and a poster still.
# Safe to re-run: every stage overwrites its own output. See docs/hero-video.md.
set -euo pipefail

# ── Settings ─────────────────────────────────────────────────────────────
SOURCE_DIR=${1:-"$HOME/projects /vasi-web/smth/smth"}
OUT_DIR=${0:A:h:h}/public
WORK_DIR=${TMPDIR:-/tmp}/hero-video

# Each shot: "<filename glob>|<start seconds>|<end seconds>"
SHOTS=(
  "*10.53.03*.mov|5|9.6"     # On stage at "The Stack" slide
  "*10.54.36*.mov|8|12.6"    # Wide shot, talking to the audience
  "*10.54.36*.mov|19|23.6"   # Volunteer tries the robot
  "*10.53.03*.mov|12|16.6"   # Back to the stage, so the loop flows
)
CROP="crop=2894:1530:0:0"     # keep the top of the frame, drop burned-in captions + YouTube bar
WIDTH=1920
FADE=0.6                      # crossfade length in seconds
POSTER_AT=2                   # seconds into the loop for the still image

# ── Helpers ──────────────────────────────────────────────────────────────
step() { gum style --foreground 212 --bold "▸ $1" }
done_msg() { gum style --foreground 42 "  ✓ $1" }
need() { command -v $1 >/dev/null || { gum style --foreground 196 "Missing $1 (brew install $2)"; exit 1 } }

resolve() {
  local matches=("$SOURCE_DIR"/${~1}(N))
  (( ${#matches} )) || { gum style --foreground 196 "No file matches $1 in $SOURCE_DIR"; exit 1 }
  print -r -- "${matches[1]}"
}

# Builds "-i file" args (one per shot) and the trim + crossfade filter graph.
build_graph() {
  local filter="${CROP},scale=${WIDTH}:-2:flags=lanczos,fps=30,format=yuv420p,setsar=1"
  local graph="" prev="" offset=0 i=0
  INPUTS=()
  for shot in $SHOTS; do
    local parts=("${(@s:|:)shot}")
    INPUTS+=(-i "$(resolve ${parts[1]})")
    graph+="[${i}:v]trim=${parts[2]}:${parts[3]},setpts=PTS-STARTPTS,${filter}[s${i}];"
    local length=$(( parts[3] - parts[2] ))
    if (( i == 0 )); then
      prev="s0"; offset=$(printf "%.2f" $(( length - FADE )))
    else
      graph+="[${prev}][s${i}]xfade=transition=fade:duration=${FADE}:offset=${offset}[x${i}];"
      prev="x${i}"; offset=$(printf "%.2f" $(( offset + length - FADE )))
    fi
    (( i += 1 ))
  done
  GRAPH="${graph%;}"
  LAST="$prev"
}

# ── Stages ───────────────────────────────────────────────────────────────
check_tools() {
  step "Checking tools"
  need ffmpeg ffmpeg; need cwebp webp
  done_msg "ffmpeg and cwebp found"
}

make_master() {
  step "Cutting, cropping and crossfading ${#SHOTS} shots"
  mkdir -p "$WORK_DIR"
  build_graph
  gum spin --title "Rendering master" -- \
    ffmpeg -v error -y $INPUTS -filter_complex "$GRAPH" -map "[$LAST]" -an \
      -c:v libx264 -preset slow -crf 16 "$WORK_DIR/master.mp4"
  done_msg "master.mp4 ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$WORK_DIR/master.mp4" | cut -c1-5)s)"
}

encode_web() {
  step "Compressing for the web"
  mkdir -p "$OUT_DIR/video"
  gum spin --title "MP4 (H.264)" -- \
    ffmpeg -v error -y -i "$WORK_DIR/master.mp4" -an -c:v libx264 -preset slow -crf 27 \
      -pix_fmt yuv420p -movflags +faststart "$OUT_DIR/video/hero.mp4"
  gum spin --title "WebM (VP9)" -- \
    ffmpeg -v error -y -i "$WORK_DIR/master.mp4" -an -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 \
      "$OUT_DIR/video/hero.webm"
  done_msg "hero.mp4 $(du -h "$OUT_DIR/video/hero.mp4" | cut -f1) · hero.webm $(du -h "$OUT_DIR/video/hero.webm" | cut -f1)"
}

make_poster() {
  step "Exporting poster still"
  ffmpeg -v error -y -ss $POSTER_AT -i "$WORK_DIR/master.mp4" -frames:v 1 "$WORK_DIR/poster.png"
  cwebp -quiet -q 70 -resize 1600 0 "$WORK_DIR/poster.png" -o "$OUT_DIR/img/hero-poster.webp"
  done_msg "hero-poster.webp $(du -h "$OUT_DIR/img/hero-poster.webp" | cut -f1)"
}

# ── Run ──────────────────────────────────────────────────────────────────
gum style --border rounded --padding "0 2" --border-foreground 212 "Hero video build" "Source: $SOURCE_DIR"
check_tools
make_master
encode_web
make_poster
gum style --foreground 42 --bold "All done. Run npm run dev to preview."
