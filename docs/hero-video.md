# Homepage hero video

The homepage opens with a silent 16-second loop of the BC + AI talk playing behind the headline.
This doc covers how it's built and how to swap in new footage.

## Quick rebuild

```zsh
./scripts/make-hero-video.sh                  # uses the default source folder
./scripts/make-hero-video.sh ~/Movies/robots  # or point it at another folder
```

It writes three files, overwriting the old ones:

| File | What it is |
|---|---|
| `public/video/hero.webm` | VP9, loaded first by browsers that support it (smaller) |
| `public/video/hero.mp4` | H.264 fallback for Safari and older browsers |
| `public/img/hero-poster.webp` | Still frame shown while the video loads, and to reduced-motion visitors |

Needs `ffmpeg`, `cwebp` and `gum` (`brew install ffmpeg webp gum`).

## How the clip is made

The source is three macOS screen recordings of the BC + AI YouTube video (2894×1778, 120 fps).
The script does four things:

1. **Cut the best shots.** The `SHOTS` list at the top of the script picks each shot as
   `file glob | start | end` in seconds. The current loop is: you at "The Stack" slide, the wide
   audience shot, a volunteer trying the robot, then back to the stage so the loop wraps cleanly.
   Start times skip the first seconds of each recording, where YouTube's pause icon and progress
   bar are showing.
2. **Crop off the captions and player UI.** `crop=2894:1530:0:0` keeps the top 1530 px of each
   frame, which removes the burned-in YouTube captions, the progress bar and the mouse cursor.
3. **Crossfade and normalise.** Every shot is scaled to 1920 px wide at 30 fps, then joined with
   0.6 s `xfade` dissolves into a high-quality master (`$TMPDIR/hero-video/master.mp4`).
4. **Compress for the web.** The master is re-encoded without audio: H.264 at CRF 27 with
   `+faststart` (so it starts playing before it finishes downloading), and VP9 at CRF 38. Each ends
   up around 2 MB. The poster is the frame at 2 s, resized to 1600 px.

## How the page uses it

- `src/HeroVideo.jsx` renders the `<video>` with `autoPlay muted loop playsInline`. All four are
  required: browsers, iPhones in particular, block autoplay for video with sound or that would open
  fullscreen. If the visitor has "reduce motion" turned on, it pauses and shows the poster.
- `src/styles.css` (search for "Video hero") makes the video fill the section with
  `object-fit: cover` and layers a dark gradient (`.hero__shade`) over it so the headline stays
  readable. On desktop the gradient runs left to right behind the copy; on phones it runs bottom
  to top.

## Swapping in new footage

1. Put the new recordings in one folder.
2. Edit `SHOTS` in `scripts/make-hero-video.sh`: file names and start and end times. Aim for 3–5
   shots of 3–5 seconds each, 15–20 seconds in total.
3. If the new footage has no captions or player UI, change `CROP` to match its size, or remove the
   crop.
4. Run the script, then `npm run dev` to preview.

What makes good hero footage: filmed horizontally, steady (tripod or gimbal), 1080p or better, with
slow, continuous motion. Robots moving through a corridor, hardware close-ups and wide event shots
all work well. Avoid fast cuts and shaky handheld clips.

## Credit

The current footage comes from BC + AI's recording of Vancouver AI Meetup #27. It's credited in the
hero caption. Get their OK before publishing.
