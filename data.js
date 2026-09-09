/* ==========================================================================
   data.js  —  THE ONLY FILE YOU NEED TO EDIT
   ==========================================================================

   TO ADD A VIDEO OR SCREENSHOTS TO A PROJECT:

   1. Drop the file into the  media/  folder next to this file.
   2. Find the project below and fill in its "media" block:

        media: {
          video:  "media/gravity-drift.mp4",          // or  null  for none
          poster: "media/gravity-drift-poster.jpg",   // still shown before play
          images: [                                   // or  []  for none
            "media/gravity-drift-1.png",
            "media/gravity-drift-2.png"
          ]
        }

   3. Save, refresh the page. That is it — empty slots show a tidy
      "media coming soon" placeholder, so nothing ever looks broken.

   KEEP VIDEOS UNDER ~40 MB for GitHub Pages (hard limit is 100 MB per file).
   If a clip is bigger, either compress it or upload it to YouTube and put the
   video ID in  youtube:  instead of using  video:  — for example
   youtube: "dQw4w9WgXcQ"
   ========================================================================== */

const SITE = {
  name:     "Soorya Prakash S",
  role:     "XR & Game Developer",
  tagline:  "I build experiences you step inside — not just look at.",

  // The hook. Keep this to two short sentences: it is the first thing anyone
  // reads, and its only job is to make them scroll. Detail belongs in `about`.
  intro:    "XR and games in Unity, shipped across headsets, desktop, mobile " +
            "and the browser. Almost everything here is built from the ground " +
            "up rather than assembled from packages — that is how I learn what " +
            "a tool is really doing.",

  email:    "sooryaprakash71@gmail.com",
  phone:    "+91 88830 86500",
  linkedin: "https://www.linkedin.com/in/soorya-prakash-s-486733128/",
  location: "Trichy, Tamil Nadu, India",

  resume:   "Soorya-Prakash-S-Resume.pdf",

  // Footer copyright year. Change this string to whatever you want shown.
  copyrightYear: "2023",

  // Drop a headshot into media/ and put its path here, e.g. "media/profile.jpg"
  photo:    "media/profile.jpg",

  about: [
    "I am an XR and game developer working in Unity and C#. My work runs from " +
    "VR and AR applications and spatial experiences on Apple Vision Pro through " +
    "to 2D and 3D games — interaction systems, hand and gaze input, and the " +
    "flows that hold an experience together. I build for whatever the project " +
    "needs: headsets, desktop, mobile or the browser.",

    "Most of the projects here share a rule. The systems underneath — " +
    "rendering, audio, gameplay logic, the lot — are written by hand rather " +
    "than imported. It is slower than reaching for a package, and it is the " +
    "reason I can debug the parts other people treat as a black box.",

    "What I enjoy most is the stretch between a problem I have not solved " +
    "before and the moment it finally behaves. New platform, unfamiliar SDK, " +
    "a mechanic nobody has quite done that way — that is the work I go " +
    "looking for, and it is why the list below keeps growing."
  ],

  skills: [
    { group: "XR & Spatial", items: ["XR Interaction Toolkit", "OpenXR", "AR Foundation", "Oculus SDK", "Autohands", "ARCore", "ARKit", "PolySpatial", "Hand & Gaze Tracking"] },
    { group: "Unity",        items: ["Unity 2D & 3D", "Scene Management", "Animation", "Physics", "uGUI", "Build & Deployment"] },
    { group: "Languages",    items: ["C#", "Object-Oriented Programming", "Debugging", "Code Optimization", "Unit Testing"] },
    { group: "Networking",   items: ["Netcode for GameObjects", "TCP", "WebSocket", "UDP Discovery", "Lag Compensation"] },
    { group: "Platforms",    items: ["Windows", "macOS", "Meta Quest", "Android", "iOS", "WebGL", "Apple Vision Pro"] }
  ]
};


/* ==========================================================================
   PROJECTS  —  the order here is the order on the page

   Two fields control how a project is labelled and filtered:

     kind: "personal" | "client"      shown as a badge on the top-left of the
                                      cover — "Personal work" or "Client
                                      work". Not filtered on.

     type: "2D" | "3D" | "VR"         the filter chips, and a badge on the
           | "AR" | "AVP" | ...       top-right of the cover. Only the FIRST
                                      WORD is used for filtering, so "2D with
                                      multiplayer" and "2D tool" both sit
                                      under the 2D chip.

   Type chips are generated from whatever types exist here, so adding a
   project with a new type adds its chip automatically. Preferred chip order
   is set by TYPE_ORDER in app.js.
   ========================================================================== */

const PROJECTS = [

  /* ---------------------------------------------------------------- 1 --- */
  {
    id: "gravity-drift",
    title: "Gravity Drift",
    kind: "personal",
    type: "2D",
    blurb: "A 2D physics platformer where you roll, bounce and flip gravity " +
           "through six levels of real momentum — every visual generated in code.",
    role: "Solo developer — design, code, levels, audio",
    tech: ["Unity 6", "C#", "2D Physics", "Procedural Graphics", "Windows"],
    highlights: [
      "Six hand-designed levels plus a tutorial, each introducing one mechanic before the finale combines all of them.",
      "Gravity-flip zones that invert the world and change how you read the level, not just how you move.",
      "Wind zones that push you mid-air so you fight momentum rather than simply steering it.",
      "Crumbling platforms that hold briefly before genuinely falling away, and a physics-simulated swinging pendulum hazard.",
      "Moving and rotating platforms that carry the player, plus bounce pads and checkpoint flags.",
      "A three-lives system with a dedicated out-of-lives panel offering a fresh restart or a return to menu, instead of endless respawning."
    ],
    detail: "Gravity Drift is built on real momentum rather than scripted " +
            "animation — the player is a rolling ball whose feel comes out of " +
            "the physics rather than being animated on top of it. Every visual " +
            "in the game is generated through code rather than imported as art, " +
            "and the audio was produced and added by hand. The level progression " +
            "is deliberately pedagogical: Level 2 (Flip Side) teaches gravity " +
            "flipping alongside moving platforms, Level 3 (Chaos Drift) is the " +
            "first real test of combining mechanics, Level 4 (Wind Drift) adds " +
            "wind and rotating platforms, Level 5 (Crumble Descent) adds " +
            "collapsing ground and a pendulum, and Level 6 (Convergence) stacks " +
            "every mechanic in the game into a single run.",
    media: { video: null, youtube: null, poster: null, images: ["media/gravity-drift.jpg"] }
  },

  /* ---------------------------------------------------------------- 2 --- */
  {
    id: "remnant",
    title: "Remnant",
    kind: "personal",
    type: "2D",
    blurb: "A 2D puzzle-platformer where you cannot reach the exit — but the " +
           "bodies you leave behind can.",
    role: "Solo developer — design, engine, levels, solver",
    tech: ["Unity 6", "C#", "Custom Deterministic Physics", "NUnit", "Windows"],
    highlights: [
      "You run and jump once — never enough. The third verb is freeze: it ends your current body, turns it into permanent solid geometry, and hands you a fresh one at spawn.",
      "What you leave behind depends on your speed. Freeze slowly and you leave an anchor, a plain solid block. Freeze fast, only reachable by falling roughly 4.4 tiles, and you leave a spring that throws you around 11 tiles.",
      "You never choose the type from a menu. A ghost preview behind the player shifts colour in real time to show which one you are about to create — that preview is the entire tutorial, and the game never explains the mechanic in words.",
      "No prefabs, no image files, no audio files and no hand-edited scenes. Sprites are rasterised at runtime from signed-distance functions; every sound is synthesised at startup, including a twelve-second looping ambient pad built from detuned sine partials.",
      "Levels are ASCII art stored as string arrays in a single C# file. The scene is generated by an editor command and contains a camera and one object.",
      "Levels are verified by an automated planner rather than trusted to the designer, closing the failure mode where an unsolvable level looks fine because its author already knows the solution."
    ],
    detail: "Remnant is roughly 8,300 lines of C# split across two assemblies " +
            "with one direction of dependency. Remnant.Core (about 1,876 lines) " +
            "is compiled with noEngineReferences and contains zero Unity types — " +
            "physics, levels, rules and win/lose conditions live there, which " +
            "means the entire game can be stepped, replayed and asserted against " +
            "from NUnit without ever opening the editor. Remnant.Unity (about " +
            "3,874 lines) handles rendering, input, audio, UI and composition. " +
            "Movement is a fixed 1/120-second integrate plus an axis-at-a-time " +
            "AABB push-out with no Rigidbody2D anywhere — tighter than a physics " +
            "engine for a platformer (asymmetric gravity, coyote time, jump " +
            "buffering, variable jump height, zero bounce) and fully " +
            "deterministic. A fresh clone opens and runs with zero import steps.",
    media: { video: null, youtube: null, poster: null, images: ["media/remnant.jpg"] }
  },

  /* ---------------------------------------------------------------- 3 --- */
  {
    id: "glowworm",
    title: "Glow Worm",
    kind: "personal",
    type: "2D",
    blurb: "A quiet letters-and-numbers game for small children, where a worm " +
           "spells what it eats and its own body becomes the puzzle.",
    role: "Solo developer — design, code, procedural art, audio synthesis",
    tech: ["Unity", "C#", "Signed Distance Fields", "Runtime Audio Synthesis"],
    highlights: [
      "A worm crawls a walled garden and may only eat the pellet that comes next — C, then A, then T. Every other pellet is as solid as the hedge until its turn arrives.",
      "Nothing can go wrong. No clock, no lives, no losing. A pellet reached for too early shakes and refuses; a wrong turn is undone with a keypress. The only thing that can happen is learning which one comes next.",
      "Each token adds a segment, and the segment carries the letter that made it — so the worm visibly spells what it has swallowed, and its own growing body becomes the obstacle.",
      "One mechanic covers the whole curriculum: eat the next one in the sequence is the same question whether the sequence is 1 2 3, A B C, or the letters of MOON. Counting pellets carry pip dots, so the numeral 4 arrives with four dots beneath it.",
      "Spelling a longer word in a hedged garden becomes a genuine routing puzzle — eat in the wrong order around a corner and you box yourself in, which keeps an adult engaged while sitting beside the player.",
      "Painted artwork drops in without a code change: any PNG placed in the art folder under a name the game asks for replaces the generated shape."
    ],
    detail: "Every shape in Glow Worm is rasterised from a distance field in " +
            "code when the game starts — the alphabet on the pellets included — " +
            "and every note is synthesised at the same moment. There is not a " +
            "texture, sprite, prefab, material or sound file in the project. " +
            "The single import is the typeface, Sniglet under the SIL Open Font " +
            "License, on the grounds that Unity's built-in font is Arial and a " +
            "screen of Arial is how a project announces that nobody chose " +
            "anything.",
    media: { video: null, youtube: null, poster: null, images: ["media/glowworm.jpg"] }
  },

  /* ---------------------------------------------------------------- 4 --- */
  {
    id: "gridpush",
    title: "Grid Push",
    kind: "personal",
    type: "2D",
    blurb: "A grid-based Sokoban puzzler with fifteen hand-authored levels, " +
           "drawn entirely from primitives generated at runtime.",
    role: "Solo developer — design, code, level authoring",
    tech: ["Unity 6000.0.65f1", "C#", "Signed Distance Fields", "Procedural UI"],
    highlights: [
      "Fifteen hand-authored levels ordered by the length of their optimal solution, from a one-move tutorial to a sixty-seven-move haul.",
      "Not a single imported texture, sprite, font, prefab or material — every shape is rasterised from a signed-distance field in code at startup.",
      "The scene contains exactly two objects: a camera and one bootstrap. The board, the pieces, the HUD and the input router are all constructed at runtime.",
      "Full undo of any depth, instant restart, direct level navigation, and a cycling colour-scheme switcher.",
      "Hold-to-repeat movement on both WASD and the arrow keys, so long hauls do not become a tapping exercise."
    ],
    detail: "Grid Push treats the classic box-pushing puzzle as an exercise in " +
            "building everything below the game as well as the game itself. " +
            "Because levels are ordered by verified optimal solution length, " +
            "the difficulty curve is a measured property of the level set " +
            "rather than a guess. It runs on Unity 6 with no other tooling " +
            "required — open the folder, open the one scene, press Play.",
    media: { video: null, youtube: null, poster: null, images: ["media/gridpush.jpg"] }
  },

  /* ---------------------------------------------------------------- 5 --- */
  {
    id: "chess",
    title: "Chess",
    kind: "personal",
    type: "2D with multiplayer",
    blurb: "A complete chess game with three ways to play — pass-and-play, " +
           "online, and same-WiFi — where the rules engine, the network " +
           "protocol and the relay server are all written from scratch.",
    role: "Solo developer — rules engine, netcode, relay server, UI",
    tech: ["Unity", "C#", "Custom TCP Transport", "WebSocket Relay Server", "UDP LAN Discovery"],
    highlights: [
      "Three ways to play: pass-and-play on one device, online against anyone anywhere via room codes or a random-opponent queue, and same-WiFi directly between two devices with no internet and no server at all.",
      "No chess library, no multiplayer framework, no UI kit. The rules engine, move generator, network protocol, relay server and entire interface are hand-written; sprites are generated procedurally at runtime.",
      "The move generator is verified against the standard perft test suite — correctness is measured, not assumed.",
      "Complete rules including castling with its through-check restrictions, en passant, promotion with a piece picker, check, checkmate, stalemate, and all three automatic draws: threefold repetition, the fifty-move rule and insufficient material.",
      "Move list in full algebraic notation, including the disambiguation rules that only apply when two identical pieces can reach the same square.",
      "Undo and redo review that never disturbs the live game, plus post-game analysis: dismiss the result panel, walk back through the finished game to find the mistake, then bring the result back.",
      "Pass-and-play rotates the board 180 degrees after each move so the player to move always sees it from their own side, with piece artwork counter-rotating to stay upright and the captured-piece trays swapping with it.",
      "A 10-minute clock per player that runs only for the side to move, plus captured pieces and live material advantage.",
      "Never crops or distorts on any aspect ratio, from a portrait phone to an ultrawide monitor, and keeps clear of notches and home-indicator bars."
    ],
    detail: "The interesting part of this project is not that it plays chess — " +
            "it is that none of it is borrowed. A typical Unity multiplayer " +
            "project imports Photon or Mirror, drops in an Asset Store chess " +
            "package and wires them together. This one imports none of that, so " +
            "every hard part is actually solved rather than delegated: legal " +
            "move generation, matchmaking, transport, and LAN discovery by UDP " +
            "broadcast with a manual IP field as fallback. It also does " +
            "something most online chess apps cannot — two of its three modes " +
            "work with no internet connection and no server whatsoever.",
    media: { video: null, youtube: null, poster: null, images: ["media/chess.jpg"] }
  },

  /* ---------------------------------------------------------------- 6 --- */
  {
    id: "hotspot-founder",
    title: "Hotspot Founder",
    kind: "personal",
    type: "2D tool",
    blurb: "An image-hotspot quiz tool: author a question by clicking regions " +
           "on any image and labelling them, then play it back.",
    role: "Solo developer — tooling, UI, gameplay",
    tech: ["Unity 6000.0.65f1", "C#", "uGUI", "Procedural UI", "Editor Tooling"],
    highlights: [
      "An in-game authoring form: load any image, click it to drop numbered hotspot markers, and give each one a label.",
      "Hotspot positions are stored normalised, so a question keeps working when the image is displayed at a different size or aspect ratio.",
      "Play mode shows the image with faint circles at each hotspot; hovering highlights it, shows a cursor-following tooltip and logs the label.",
      "Round-trips cleanly — Back to Form returns to the authoring view with the question intact for further editing.",
      "All UI is built procedurally at runtime, with no prefabs and no hand-authored scenes; an editor command generates both scenes and registers them in Build Settings, and is safe to re-run at any time."
    ],
    detail: "Hotspot Founder is a small content-authoring pipeline as much as a " +
            "game: the person creating the question and the person answering it " +
            "use the same build, with a static session object carrying the " +
            "authored question between the form scene and the game scene. The " +
            "useful artefact is not one quiz — it is the thing that lets " +
            "someone else make a hundred of them.",
    media: { video: null, youtube: null, poster: null, images: ["media/hotspot-founder.jpg"] }
  },

  /* ---------------------------------------------------------------- 7 --- */
  {
    id: "vr-bowling",
    title: "VR Bowling",
    kind: "personal",
    type: "VR",
    blurb: "A realistic VR bowling game for Meta Quest 3 — physically grab the " +
           "ball, aim, swing, and release it down the lane.",
    role: "Solo developer — VR interaction and physics",
    tech: ["Unity", "C#", "XR Interaction Toolkit", "OpenXR", "Meta Quest 3", "Android VR"],
    highlights: [
      "Throwing is driven by real hand motion. You grab the ball with the controller, swing your arm, and release — the ball leaves your hand with the momentum you actually gave it, rather than on a button press or a scripted throw animation.",
      "Built on Unity's XR Interaction Toolkit with OpenXR, running as a standalone Android VR build on Meta Quest 3.",
      "Single-player free play, built for practice — step up to the lane and keep throwing, rather than working through a fixed match structure.",
      "The bulk of the work went into feel: making the grab, the swing and the release read as natural in the hand while keeping the experience smooth and responsive in the headset."
    ],
    detail: "The interesting problem in a VR bowling game is not the lane, it is " +
            "the ball. A throw has to come out of the player's own arm movement, " +
            "which means the grab has to hold convincingly, the swing has to " +
            "follow the hand closely, and the release has to hand the ball its " +
            "momentum at the right moment — too early or too late and the throw " +
            "feels wrong even when the physics underneath are correct. Tuning " +
            "that until it felt natural, without giving up smoothness or " +
            "responsiveness on a standalone headset, was the real work here.",
    media: { video: null, youtube: null, poster: null, images: ["media/vr-bowling.jpg"] }
  },

  /* ---------------------------------------------------------------- 8 --- */
  {
    id: "shooting-multiplayer",
    title: "Shooting Multiplayer",
    kind: "personal",
    type: "3D with multiplayer",
    blurb: "A round-based competitive FPS built from scratch on Netcode for " +
           "GameObjects: two teams, buy phase, persistent economy, bomb " +
           "plant and defuse, and lag-compensated server-authoritative shooting.",
    role: "Solo developer — netcode, gameplay systems, AI, UI",
    tech: ["Unity 6", "C#", "Netcode for GameObjects", "Lag Compensation", "Server Authority"],
    highlights: [
      "A systems reimplementation, not a content clone — no licensed maps, weapons, models or audio. What it reproduces is the round loop, the economy, the bomb, and the netcode that makes competitive shooting feel fair over a real network.",
      "Server-authoritative, lag-compensated hit registration, resolved against head, torso and leg spheres that scale when crouching.",
      "A round loop of warmup, a 10-second buy phase with a 3-second freeze, 115 seconds live, then a 5-second round-end banner. First to five round wins; sides swap at halftime and the score swaps with the players, so a team keeps the wins it earned.",
      "A persistent economy with kill, win, plant and defuse rewards plus a loss bonus that grows with each consecutive loss, so a team rolled early can still rebuild.",
      "Bomb gameplay: a designated carrier with a visible bomb, a 3-second plant, a 40-second fuse, and a 5-second defuse cut to roughly 2 with a kit — with the progress bar visible to both teams, because watching the enemy defuse tick up is what decides whether you push.",
      "Weapons drop where you fell when you die, can be dropped deliberately to arm a teammate, and picked up off a dead enemy — making the ground part of the economy. Team economy extends to weapon requests, donations and selling back at 50 percent.",
      "Armor halves body damage but does nothing against headshots, mirroring Kevlar-without-helmet. Real recoil that climbs under sustained fire and drives where the next shot goes, plus fall damage, weapon weight affecting movement speed, and crouch trading speed for halved recoil.",
      "AI bots with line-of-sight scanning, a bounded turn rate with reaction delay, strafing, and bombsite pathing via raycast obstacle avoidance.",
      "Grey-box art throughout, deliberately — the interesting work is underneath the visuals, and the art layer is the last thing to swap in."
    ],
    detail: "Everything renders as grey-box primitives on a single arena with " +
            "two bombsites. That is a stated design decision rather than an " +
            "unfinished state: the project exists to solve the networking and " +
            "systems problems that a middleware package would otherwise hide. " +
            "It also documents its own simplifications honestly — analytic " +
            "sphere hitboxes rather than per-bone skeletal ones, a flashbang " +
            "that does not check facing direction, a smoke sphere you can see " +
            "out of, and no matchmaking, anti-cheat, progression or voice chat.",
    media: { video: null, youtube: null, poster: null, images: ["media/shooting-multiplayer.jpg"] }
  },

  /* ---------------------------------------------------------------- 9 --- */
  {
    id: "skyrunner-3d",
    title: "Sky Runner 3D",
    kind: "personal",
    type: "3D",
    blurb: "A third-person 3D platformer across floating islands, with dash, " +
           "double jump and a speedrun timer — level, player, camera and UI all " +
           "constructed from code.",
    role: "Solo developer — movement, camera, levels, audio synthesis, build pipeline",
    tech: ["Unity 6", "C#", "3D Character Controller", "Procedural Audio", "Windows Build"],
    highlights: [
      "A movement kit with real depth: coyote time, jump buffering, variable jump height from tap to hold, a double jump, a dash that works mid-air for long gaps, sprint, air control, and moving-platform carry.",
      "Two levels of floating-island platforming. Level 1 teaches gaps, moving platforms, ten collectibles and checkpoint gates; Level 2 is the gauntlet — smaller platforms, gaps demanding dash plus double jump, spinning kill-bars and a vertical elevator, with twelve collectibles.",
      "A speedrun timer with the best time saved per level. Fall off or touch a hazard and you respawn at your last checkpoint with score intact while the timer keeps running.",
      "Every sound effect is synthesised procedurally at runtime — jumps, dash whoosh, coin chimes, checkpoint dings, a death slide and a win arpeggio. Zero audio or art assets in the project.",
      "Systems communicate through a static signal bus rather than inspector references, so collectibles, kill zones, goals and checkpoints stay decoupled from the game manager, HUD and audio.",
      "An orbit camera with smoothed follow and spherecast collision, so the view never clips through level geometry.",
      "A scripted build pipeline: editor menu commands construct the scene and build the Windows player, and the whole thing runs headless from the command line for CI."
    ],
    detail: "Sky Runner 3D is a study in 3D game feel — the difference between a " +
            "character controller that technically moves and one that feels " +
            "good is almost entirely in the forgiveness systems, so those got " +
            "the attention. As with the other projects, nothing is set up by " +
            "hand in the editor: the level, the player, the camera and the " +
            "procedural HUD canvas are all constructed from code, and a " +
            "prebuilt Windows executable ships alongside the source.",
    media: { video: null, youtube: null, poster: null, images: ["media/skyrunner-3d.jpg"] }
  },

  /* ------------------------------------------------ client work ---------- */
  {
    id: "vr-training-simulation",
    title: "VR Training Simulation",
    kind: "client",
    type: "VR",
    client: "Client work",
    blurb: "A VR training simulation focused on realistic hand interactions, " +
           "comfortable locomotion and in-headset UI.",
    role: "Unity / XR Developer",
    tech: ["Unity", "C#", "XR Interaction Toolkit", "OpenXR", "Oculus SDK", "Autohands"],
    highlights: [
      "Grab, hold and manipulate interactions built for physical plausibility rather than a simple attach-to-hand.",
      "Locomotion and teleportation tuned around user comfort, which is the difference between a demo people finish and one they take the headset off during.",
      "In-headset UI and object handling, plus full environment setup.",
      "Built on XR Interaction Toolkit and OpenXR with Oculus SDK and Autohands for immersive hand presence."
    ],
    detail: "Delivered as professional client work. " +
            "Gameplay footage and screenshots cannot be shared publicly under " +
            "client confidentiality — I am happy to talk through the " +
            "architecture, the interaction model and the comfort decisions in " +
            "an interview.",
    media: { video: null, youtube: null, poster: null, images: ["media/vr-training-simulation.jpg"] }
  },

  {
    id: "vision-pro-demo",
    title: "Apple Vision Pro Spatial Demo",
    kind: "client",
    type: "AVP",
    client: "Client work",
    blurb: "An interactive spatial demo for Apple Vision Pro built with Unity " +
           "and visionOS — hand and gaze tracking, spatial UI panels and object " +
           "interaction.",
    role: "Unity / visionOS Developer",
    tech: ["Unity", "C#", "visionOS", "PolySpatial", "Hand & Gaze Tracking"],
    highlights: [
      "Spatial interactions driven by hand and gaze tracking rather than controllers.",
      "Floating UI panels and direct object interaction designed for a headset with no handheld input.",
      "Spatial workflows built with PolySpatial and Unity, including scene setup and input handling.",
      "Adapted quickly to a platform with very little established practice, delivering functional prototypes on new technology."
    ],
    detail: "Delivered as professional client work. Media " +
            "cannot be shared publicly under client confidentiality.",
    media: { video: null, youtube: null, poster: null, images: ["media/vision-pro-demo.jpg"] }
  },

  {
    id: "ar-prototype",
    title: "AR Interactive Prototype",
    kind: "client",
    type: "AR",
    client: "Client work",
    blurb: "A cross-platform AR application focused on object placement and " +
           "interaction with the real world.",
    role: "Unity / AR Developer",
    tech: ["Unity", "C#", "AR Foundation", "ARCore", "ARKit", "uGUI"],
    highlights: [
      "Plane detection and environment mapping to anchor virtual objects in real space.",
      "Object tracking and gesture input for placing and manipulating content.",
      "Built on AR Foundation so a single codebase targets both ARCore and ARKit."
    ],
    detail: "Delivered as professional client work. Media " +
            "cannot be shared publicly under client confidentiality.",
    media: { video: null, youtube: null, poster: null, images: ["media/ar-prototype.jpg"] }
  },

  {
    id: "3d-interactive-app",
    title: "3D Interactive Application",
    kind: "client",
    type: "3D",
    client: "Client work",
    blurb: "A 3D interactive application built around navigation, physics and " +
           "user experience.",
    role: "Unity Developer",
    tech: ["Unity", "C#", "Physics", "Camera Systems", "uGUI"],
    highlights: [
      "Movement, physics and collision handling with camera control tuned for navigation.",
      "Scene setup, UI and input handling across the full application.",
      "Interactive elements added throughout to keep engagement up during longer sessions."
    ],
    detail: "Delivered as professional client work. Media " +
            "cannot be shared publicly under client confidentiality.",
    media: { video: null, youtube: null, poster: null, images: ["media/3d-interactive-app.jpg"] }
  }
];
