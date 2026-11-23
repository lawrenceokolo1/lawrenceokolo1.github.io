import { LINKS } from "./content.js";

/** Long-form field notes. Each one gets its own page at /notes/<slug>/ (see prerender.js). */

const NVIDIA_GUIDE = "https://huggingface.co/blog/nvidia/cosmos-on-jetson";

const Ext = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

const Photo = ({ src, alt, caption, tall }) => (
  <figure className={`prose__figure ${tall ? "prose__figure--tall" : ""}`}>
    <img src={src} alt={alt} loading="lazy" decoding="async" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

function MeetupBody() {
  return (
    <>
      <p className="prose__lead">
        In March 2026 I opened Vancouver AI Meetup #27, hosted by BC + AI at the H.R. MacMillan Space Centre, with a
        question I&apos;d been trying to answer in the lab: can an AI agent, the kind people now chat with every day,
        actually drive a physical robot?
      </p>
      <p>
        The answer I showed on stage was yes, with the right layer in between. That layer is{" "}
        <Ext href="https://agenticros.com">AgenticROS</Ext>, an open-source project I built to connect ROS 2 robots to
        AI agent platforms so you can control and query them in plain language.
      </p>

      <Photo
        src="/img/agenticros-slide.webp"
        alt="Lawrence on stage under the slide 'Can OpenClaw Agents Actually Navigate a Physical Robot?'"
        caption="Opening the talk: “Can OpenClaw Agents Actually Navigate a Physical Robot?”"
        tall
      />

      <h2>The problem</h2>
      <p>
        Large language model agents are good at understanding what people want. Robots are good at moving through the
        world. The gap between them is plumbing: topics, message types, coordinate frames, velocity commands, camera
        streams, and the safety logic that decides what a robot is allowed to do. Most agent-robot demos hard-wire one
        model to one robot. Change the agent or the robot and you start again.
      </p>
      <p>
        I wanted the opposite: one interface layer that any agent can sit on top of, and any ROS 2 robot can sit
        under.
      </p>

      <h2>How AgenticROS works</h2>
      <p>
        AgenticROS started from ROSClaw&apos;s hackathon prototype and was rewritten from the ground up to be
        agent-agnostic. It has three parts:
      </p>
      <ul>
        <li>
          <strong>A platform-agnostic core</strong> that talks to ROS 2 over rosbridge, Zenoh, a local transport, or
          WebRTC, with a shared, validated config schema. The core knows nothing about any AI platform.
        </li>
        <li>
          <strong>Adapters</strong> for each agent platform: a plugin for OpenClaw, an MCP server for Claude Code and
          Claude desktop, and function calling for Gemini CLI. Each adapter registers the robot&apos;s tools with its
          agent and hands every ROS 2 call to the core.
        </li>
        <li>
          <strong>A ROS 2 workspace</strong> with discovery, agent, and follow-me packages, so the robot can describe
          what it has and run behaviours on its own side.
        </li>
      </ul>

      <Photo
        src="/img/agenticros-stack.webp"
        alt="Lawrence pointing at 'The Stack' slide: chat app, OpenClaw, Claude, Agentic ROS, rosbridge, ROS, robot"
        caption="The stack: chat message → OpenClaw agent → Claude → AgenticROS → rosbridge → ROS 2 → robot on an NVIDIA Jetson Orin Nano. Photo: Michelle Diamond."
      />

      <h2>The live demo</h2>
      <p>
        On stage, a message sent from a phone went to an OpenClaw agent. The agent reasoned about the request with
        Claude, called AgenticROS tools, and those tools published real ROS 2 commands through rosbridge to a robot
        running on an NVIDIA Jetson Orin Nano. The same setup answers questions like “what do you see?” by reading the
        robot&apos;s camera, not just moving it.
      </p>
      <p>
        Live robot demos are unforgiving: a dropped connection or a wrong frame and the robot simply doesn&apos;t
        move. Getting it to run cleanly in front of a full room was the real test of the design.
      </p>

      <h2>Why it matters for VASI</h2>
      <p>
        At <Ext href="https://vasi.ca">VASI</Ext> we&apos;re building robots that work inside hospitals, where the
        people giving instructions are nurses and porters, not roboticists. Plain-language control is the interface
        that makes a hospital robot usable. AgenticROS is how we keep that interface open, so it works with the agent a
        hospital already trusts and the robots it already owns.
      </p>
      <p>
        The code is on <Ext href="https://github.com/lawrenceokolo1/agenticros">GitHub</Ext>. If you run a meetup or
        conference and want a live robot demo, <a href={`mailto:${LINKS.email}?subject=Speaking%20invitation`}>invite me</a>.
      </p>
    </>
  );
}

function CosmosBody() {
  return (
    <>
      <p className="prose__lead">
        NVIDIA Cosmos Reason is a vision-language model built for physical AI: it looks at camera frames and reasons
        about what&apos;s happening in the scene. I wanted the 2B-parameter version running directly on a robot, on an
        NVIDIA Jetson Orin Nano Super with just 8 GB of memory shared between the CPU and GPU.
      </p>
      <p>
        NVIDIA published a guide to the setup:{" "}
        <Ext href={NVIDIA_GUIDE}>Deploying Open Source Vision Language Models (VLM) on Jetson</Ext>, which serves the
        FP8 Cosmos Reason 2B checkpoint with vLLM. I followed it on the 8 GB Orin Nano, hit its limits, and{" "}
        <Ext href={NVIDIA_GUIDE}>shared what I found in the comments</Ext> for other developers running it on the
        smallest board.
      </p>

      <h2>Why on the robot, not in the cloud</h2>
      <p>
        A hospital robot can&apos;t wait on a round trip to a data centre every time it needs to understand a
        corridor, and many hospital networks won&apos;t let camera frames leave the building anyway. On-device
        reasoning keeps latency low and patient spaces private. The catch is memory.
      </p>

      <h2>The problem: 8 GB goes fast</h2>
      <p>
        On a Jetson, the GPU has no memory of its own. The model weights, the vLLM runtime, the desktop environment,
        and every background service all compete for the same 8 GB. The guide&apos;s Orin Nano settings are already
        cut down, and it still takes careful memory management before launch.
      </p>

      <h2>What got it launching cleanly</h2>
      <ol>
        <li>
          <strong>Stop the desktop.</strong> The graphical session holds a surprising amount of shared memory. Dropping
          to a text console frees it for the model.
          <pre><code>sudo systemctl isolate multi-user.target</code></pre>
        </li>
        <li>
          <strong>Disable swap.</strong> With unified memory, swapping doesn&apos;t rescue a model that doesn&apos;t
          fit. It just makes everything stall.
          <pre><code>sudo swapoff -a</code></pre>
        </li>
        <li>
          <strong>Flush the OS cache.</strong> Linux holds file cache in RAM, which on a Jetson is also GPU memory.
          Dropping it right before launch hands that space to the model.
          <pre><code>sudo sysctl -w vm.drop_caches=3</code></pre>
        </li>
      </ol>

      <h2>Text works at 256 tokens. Images don&apos;t.</h2>
      <p>
        The guide&apos;s Orin Nano command caps the context at 256 tokens. That&apos;s fine for text-only prompts, but
        too small once you send an image, because the image tokens alone overflow it. For vision tasks I needed at
        least:
      </p>
      <pre><code>--max-model-len 1024 --gpu-memory-utilization 0.55</code></pre>

      <h2>The honest limit</h2>
      <p>
        Even running cleanly, the 8 GB board leaves no headroom for anything else, including the ROS 2 stack a real
        robot needs alongside the model. The Orin Nano is a good place to prototype vision reasoning. A production
        robot that perceives, plans, and navigates at the same time needs a bigger Jetson, or the model running on a
        separate board.
      </p>

      <h2>What I took from it</h2>
      <p>
        Edge AI is mostly a systems problem. Downloading the model is the easy part. Making it fit means knowing how
        the hardware shares memory, what the operating system is quietly holding onto, and what else the robot has
        to run. That same discipline goes into every robot we deploy at VASI.
      </p>
    </>
  );
}

function RlBody() {
  return (
    <>
      <p className="prose__lead">
        In May 2026 I made one of the bigger technical calls at VASI: stepping back from the classical navigation
        stack that got our robots moving, and investing in reinforcement learning for autonomy.
      </p>

      <h2>What the classical stack gave us</h2>
      <p>
        Classical navigation (mapping and localisation, a planner, and a controller tuned by hand) is the reliable,
        well-understood way to get a robot from A to B. It got VASI&apos;s robots running, and it&apos;s still the
        foundation that safety rules and route constraints sit on.
      </p>

      <h2>Why it wasn&apos;t enough</h2>
      <p>
        Hospitals are not tidy test tracks. Corridors fill with beds, carts, and people who move unpredictably. Every
        new building, robot, or edge case meant more hand-tuning. And we work across several bodies: Unitree and
        AgiBot quadrupeds as well as our own custom robots. A legged robot and a wheeled one need very different
        control, and hand-tuning each one doesn&apos;t scale.
      </p>

      <h2>What we&apos;re building instead</h2>
      <p>The shift is from writing behaviour by hand to training it, then proving it before it ships:</p>
      <ul>
        <li>
          <strong>Training in simulation.</strong> Policies learn in simulated buildings (NVIDIA Isaac Sim is part of
          our toolchain), where a robot can safely fail thousands of times.
        </li>
        <li>
          <strong>Policy evaluation.</strong> A trained policy has to beat the classical baseline on the scenarios
          that matter before it gets near a real corridor.
        </li>
        <li>
          <strong>Production integration.</strong> Learned policies plug into the rest of the stack: VASI&apos;s
          spatial platform for building knowledge, and safety zones and route rules that stay in force whatever the
          policy wants to do.
        </li>
      </ul>

      <h2>Why it matters</h2>
      <p>
        The goal is robots that improve with data instead of with engineering hours, and that can move to a new
        hospital or a new body without being rebuilt. It&apos;s a longer road than tuning the old stack, and the right
        one for a company that wants robots in every hospital, not just one.
      </p>
    </>
  );
}

function MicrobotBody() {
  return (
    <>
      <p className="prose__lead">
        In October 2026 I brought the VASI Microbot to the Vancouver Physical AI Workshop, hosted by Voxel51. It&apos;s
        a small robot standing in for a much bigger system, and it&apos;s one we built entirely ourselves.
      </p>

      <Photo
        src="/img/microbot-workshop.webp"
        alt="The VASI Microbot with a depth camera on a table, next to a laptop showing live object detection"
        caption="The Microbot at the workshop, with live object detection from its camera on the laptop."
        tall
      />

      <h2>What the Microbot is</h2>
      <p>
        The Microbot was designed, wired, and programmed in our Vancouver lab: hardware, wiring, and software, end to
        end. It carries a depth camera and runs the same kind of perception we use on our larger robots, detecting and
        labelling objects around it in real time.
      </p>

      <h2>Why build a small robot</h2>
      <p>
        Full-size hospital robots are expensive to run and slow to iterate on. The Microbot is our testbed for the
        autonomy behind VASI&apos;s hospital logistics robots. We can try a new perception model, navigation idea, or
        agent integration on it in an afternoon, then carry what works up to the bigger platforms.
      </p>

      <h2>At the workshop</h2>
      <p>
        Physical AI workshops are where software people and hardware people meet, and a robot on the table starts
        better conversations than any slide. People could see the camera feed, the detections, and the robot itself
        side by side, which made the jump from “AI model” to “machine in a building” concrete.
      </p>
      <p>
        If you&apos;re organising a physical AI event and want a live demo,{" "}
        <a href={`mailto:${LINKS.email}?subject=Demo%20invitation`}>get in touch</a>.
      </p>
    </>
  );
}

export const POSTS = [
  {
    slug: "physical-ai-workshop-microbot",
    date: "Oct 2026",
    title: "Took the VASI Microbot to the Vancouver Physical AI Workshop",
    description: "Demoing VASI's in-house robot at the Voxel51 Physical AI Workshop: why we build a small robot to develop a big system.",
    Body: MicrobotBody,
  },
  {
    slug: "classical-navigation-to-reinforcement-learning",
    date: "May 2026",
    title: "Moved VASI's autonomy from classical navigation to reinforcement learning",
    description: "Why VASI stepped back from its classical navigation stack and invested in RL training, policy evaluation, and production integration.",
    Body: RlBody,
  },
  {
    slug: "cosmos-reason-jetson-orin-nano",
    date: "Apr 2026",
    title: "Ran NVIDIA Cosmos Reason 2B on an 8 GB Jetson Orin Nano Super",
    description: "Following NVIDIA's Cosmos-on-Jetson guide on the 8 GB Orin Nano: freeing memory, sizing the context for images, and where the board runs out.",
    Body: CosmosBody,
  },
  {
    slug: "vancouver-ai-meetup-agenticros",
    date: "Mar 2026",
    title: "Opened Vancouver AI Meetup #27 with a live robot demo",
    description: "On stage at BC + AI: AI agents driving a real ROS 2 robot through AgenticROS, and how the stack works.",
    Body: MeetupBody,
  },
];
