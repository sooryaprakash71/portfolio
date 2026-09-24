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
  role:     "Game & XR Developer",
  tagline:  "I build games from mechanics to finished experiences — made to " +
            "be played, not just watched.",

  // The hook. Keep this to two short sentences: it is the first thing anyone
  // reads, and its only job is to make them scroll. Detail belongs in `about`.
  intro:    "I build gameplay systems and interactive experiences from 2D " +
            "games to immersive XR using Unity and C#. Everything here is " +
            "built from the ground up, driven by curiosity, experimentation, " +
            "and iteration.",

  // The sign-off under the intro. Short enough to read as a stamp, not a
  // sentence — keep it that way.
  motto:    "Build. Play. Iterate. Repeat.",

  email:    "sooryaprakash71@gmail.com",
  linkedin: "https://www.linkedin.com/in/soorya-prakash-s-486733128/",
  location: "Trichy, Tamil Nadu, India",

  resume:   "Soorya-Prakash-S-Resume.pdf",

  // Footer copyright year. Change this string to whatever you want shown.
  copyrightYear: "2023",

  // Second footer line, under the copyright. Set to "" to hide it.
  footerNote: "Built from scratch · Hosted on GitHub Pages",

  // Drop a headshot into media/ and put its path here, e.g. "media/profile.jpg"
  photo:    "media/profile.jpg",

  about: [
    "I’m a Game Developer working with Unity and C#, building experiences " +
    "across 2D, 3D, AR, VR, and MR. Since 2023, I’ve been working on Unity " +
    "and XR applications at Tata Consultancy Services, building gameplay " +
    "systems, interaction systems, UI flows, and spatial experiences across " +
    "different platforms.",

    "Alongside client work, I build my own games to explore systems that " +
    "interest me — from grid-based puzzles and physics-driven platformers to " +
    "multiplayer chess and experimental gameplay mechanics. I use these " +
    "projects to understand how things work underneath rather than relying " +
    "entirely on ready-made solutions.",

    "I enjoy the part of development where a simple idea turns into a working " +
    "system: designing the mechanic, writing the underlying logic, debugging " +
    "unexpected behaviour, and iterating until it feels right.",

    "I build to understand. I iterate to improve."
  ],

  skills: [
    { group: "Game Development",       items: ["Unity 2D & 3D", "Gameplay Programming", "Game Mechanics", "Game Architecture", "Physics", "Animation", "UI / uGUI", "Game State Management", "Scene Management", "Procedural Generation", "Editor Tooling", "Build & Deployment"] },
    { group: "XR & Spatial",           items: ["XR Interaction Toolkit", "OpenXR", "AR Foundation", "ARKit", "ARCore", "Meta Quest SDK", "PolySpatial", "visionOS", "Hand Tracking", "Gaze Tracking", "Spatial UI", "Locomotion & Comfort"] },
    { group: "Programming",            items: ["C#", "Object-Oriented Programming", "SOLID Principles", "Design Patterns", "Data Structures & Algorithms", "State Machines", "Event-Driven Systems", "ScriptableObjects", "Deterministic Simulation", "Debugging", "Code Optimization"] },
    { group: "Multiplayer & Networking", items: ["Netcode for GameObjects", "TCP", "UDP", "WebSocket", "Client / Server Architecture", "Relay Systems", "Local Network Discovery", "Lag Compensation"] },
    { group: "Unity Workflow",         items: ["Git / GitHub", "Unity Profiler", "Unity Package Manager", "Addressables", "Assembly Definitions", "Prefabs & ScriptableObjects", "Unity Build Pipeline"] },

    /* NOTE: the hero's "Platforms shipped" stat counts this group by name —
       renaming it to anything but "Platforms" silently zeroes that number. */
    { group: "Platforms",              items: ["Windows", "Android", "iOS", "WebGL", "Meta Quest", "Apple Vision Pro", "macOS"] }
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
    type: "2D Physics Platformer",
    blurb: "A 2D physics platformer where you roll, bounce, and flip gravity " +
           "through six levels of momentum-driven challenges, with procedural " +
           "visuals generated at runtime.",
    role: "Solo developer — game design, programming, level design, audio",
    tech: ["Unity 6", "C#", "2D Physics", "Procedural Graphics", "Runtime Audio"],
    platform: "Windows",
    highlights: [
      "Six hand-designed levels plus a tutorial, with each level introducing a new mechanic before combining them into more complex challenges.",
      "Gravity-flip zones that reverse the player's gravity and change how each level is navigated.",
      "Physics-driven rolling and movement, with the player's momentum and rotation coming directly from the 2D physics simulation rather than scripted animation.",
      "Moving and rotating platforms that carry the player while preserving deterministic movement.",
      "Wind zones, bounce pads, crumbling platforms, checkpoints, hazards, and a physics-driven swinging pendulum that progressively expand the movement system.",
      "A three-life system with dedicated out-of-lives, restart, and level-completion flows."
    ],
    sections: [
      {
        heading: "Technical approach",
        body: [
          "Gravity Drift was built around real 2D physics rather than scripted " +
          "character movement. The player is a Rigidbody2D with a " +
          "CircleCollider2D, and movement applies force and torque so rolling, " +
          "rotation, and momentum emerge naturally from the physics simulation.",

          "Gravity is handled at the player level instead of changing Unity's " +
          "global Physics2D gravity. This allows individual gravity zones to " +
          "reverse the player's gravity without affecting other objects in the " +
          "scene.",

          "Moving platforms expose their frame-to-frame movement, allowing the " +
          "player to inherit the platform's movement while grounded instead of " +
          "relying entirely on physics friction. The swinging pendulum uses a " +
          "HingeJoint2D and real physics rather than a scripted rotation."
        ]
      },
      {
        heading: "Procedural visuals & audio",
        body: [
          "The project deliberately avoids imported art assets for its core " +
          "visuals. Gameplay shapes such as circles, rounded rectangles, " +
          "triangles, stars, rings, and diamonds are generated at runtime using " +
          "signed distance fields and converted into textures and sprites when " +
          "objects are created.",

          "Several gameplay sounds are also generated through runtime waveform " +
          "synthesis, including effects for actions and events such as jumps, " +
          "impacts, pickups, and player interactions. This keeps the visual and " +
          "audio systems highly configurable through code rather than depending " +
          "entirely on external assets."
        ]
      },
      {
        heading: "Level design",
        body: [
          "The level progression introduces one mechanic at a time before " +
          "combining them into more complex challenges.",

          "The early levels establish movement and gravity flipping. Later " +
          "levels introduce wind zones, rotating platforms, crumbling surfaces, " +
          "and the swinging pendulum. The final level brings the major mechanics " +
          "together into a single run that tests the player's understanding of " +
          "the complete movement system."
        ]
      },
      {
        heading: "Technical challenges",
        items: [
          { label: "Gravity flip",
            text: "The gravity-flip system initially appeared to trigger " +
                  "correctly, but the player's actual gravity direction never " +
                  "changed. The issue came from interpolating directly between " +
                  "two opposite direction vectors and normalizing the result. " +
                  "The system was changed to interpolate a signed scalar value " +
                  "instead, using that value to determine the final gravity " +
                  "direction." },
          { label: "Ground detection",
            text: "The player could not jump even when visibly standing on the " +
                  "ground. The original CircleCast was returning the player's " +
                  "own collider as the closest hit, preventing the actual floor " +
                  "from being detected. The ground detection was changed to " +
                  "inspect the complete cast results and ignore the player's own " +
                  "collider." },
          { label: "Camera shake",
            text: "After adding camera shake, gameplay objects became invisible " +
                  "while background elements continued rendering. The camera " +
                  "shake system was restoring the camera to a hardcoded local " +
                  "position instead of its actual starting position, moving the " +
                  "gameplay objects onto the camera's near-clip plane. The fix " +
                  "was to capture and restore the camera's original local " +
                  "position." },
          { label: "Wind & speed cap",
            text: "The wind mechanic correctly applied force to the player, but " +
                  "an existing horizontal speed limit immediately cancelled the " +
                  "additional velocity. The player controller was updated so the " +
                  "normal speed clamp could temporarily yield control while an " +
                  "external force such as wind was actively pushing the player." }
        ]
      }
    ],
    detail: [
      "A deliberate constraint of the project was to build the core visual and " +
      "audio systems without relying heavily on imported assets. This pushed " +
      "the project toward procedural rendering and runtime audio synthesis and " +
      "made the visual and audio parameters directly controllable through code.",

      "The goal was not simply to make the game look different, but to use the " +
      "constraint as a way to understand the systems underneath the final " +
      "experience."
    ],
    media: { video: null, youtube: null, poster: null, images: ["media/gravity-drift.jpg"] }
  },

  /* ---------------------------------------------------------------- 2 --- */
  {
    id: "remnant",
    title: "Remnant",
    kind: "personal",
    type: "2D Puzzle-Platformer",
    blurb: "A 2D puzzle-platformer where every jump is a decision — freeze " +
           "your body to leave behind platforms, springs, and paths that help " +
           "you reach the exit.",
    tagline: [
      "You cannot reach the exit.",
      "What you leave behind can."
    ],
    role: "Solo developer — game design, programming, level design, physics, UI, audio",
    tech: ["Unity 6", "C#", "Custom Physics", "Procedural Systems", "Runtime Audio"],
    platform: "Windows",
    lead: [
      "Remnant is a 2D puzzle-platformer built around a simple rule: you can " +
      "jump once, but you cannot reach every exit with the body you currently " +
      "control.",

      "The player's third ability is Freeze. When activated, the current body " +
      "is left permanently in the level and a new body appears at the starting " +
      "position. The way that body was moving when it was frozen determines " +
      "what it becomes.",

      "Freeze while moving slowly and it becomes a solid platform. Freeze " +
      "while moving quickly and it becomes a springboard that can launch the " +
      "next body higher. Every level is therefore a puzzle about movement, " +
      "timing, and deciding where to spend each body."
    ],
    highlightsHeading: "The core mechanic",
    highlights: [
      "Run and jump using a deliberately limited movement system.",
      "Freeze the current body to turn it into permanent level geometry.",
      "Slow freezes become platforms that can be stood on.",
      "Fast freezes become springboards that launch the next body.",
      "Use multiple bodies together to cross gaps and reach otherwise inaccessible areas.",
      "Undo allows a previous freeze to be reversed and restores the body that was spent.",
      "Each level is designed around a limited number of bodies, making every freeze a meaningful decision."
    ],
    sections: [
      {
        heading: "Technical approach",
        body: [
          "Remnant was designed so the core game rules do not depend on Unity. " +
          "The gameplay simulation is written in plain C#, while the Unity " +
          "layer handles presentation, input, and rendering.",

          "The project uses a custom fixed-step physics simulation rather than " +
          "Rigidbody2D. Movement uses deterministic collision handling with " +
          "axis-at-a-time resolution, allowing the same input to produce the " +
          "same movement across runs.",

          "This gave the game precise control over mechanics such as variable " +
          "jump height, jump buffering, coyote time, asymmetric gravity, and " +
          "the exact movement behaviour required by the puzzle solver."
        ]
      },
      {
        heading: "Custom physics",
        body: [
          "The custom physics system uses a fixed 1/120 second simulation step " +
          "and AABB-based collision resolution.",

          "The reason for building the physics layer from scratch was control " +
          "and reproducibility. A puzzle level needs movement to behave " +
          "consistently because the level design and solver both depend on " +
          "predictable movement.",

          "It also allowed movement behaviour to be tuned specifically for the " +
          "game instead of working around the limitations of a general-purpose " +
          "physics system."
        ]
      },
      {
        heading: "Level design",
        body: [
          "Remnant contains 10 hand-designed levels, including a movement " +
          "tutorial.",

          "The levels are built around progressively introducing the freeze " +
          "mechanic and teaching the player how movement speed changes the body " +
          "they leave behind.",

          "Early levels establish the basic platform and springboard behaviour. " +
          "Later levels require multiple bodies, timing, undo decisions, and " +
          "more precise movement to create a route to the exit."
        ]
      },
      {
        heading: "Level data & generation",
        body: [
          "The levels are authored as data rather than manually assembled " +
          "scenes. Each level is represented as an ASCII-style grid and " +
          "generated into the Unity scene through an editor command.",

          "This keeps level layouts compact, version-controllable, and easy to " +
          "modify while allowing the same data to drive the gameplay simulation " +
          "and level generation."
        ]
      },
      {
        heading: "Solving & verification",
        body: [
          "A custom planner can run the actual gameplay simulation and search " +
          "for a route through each level.",

          "Rather than using a simplified representation of the game, the " +
          "solver interacts with the same core simulation used by the player. " +
          "This makes it possible to check whether a level is actually solvable " +
          "within its intended body budget.",

          "The solver also exposed design issues that were difficult to find " +
          "through normal playtesting. For example, one level initially had a " +
          "route that allowed the player to clear a gap without spending a " +
          "body, which weakened the intended puzzle. The level was redesigned " +
          "after the solver exposed the unexpected solution."
        ]
      },
      {
        heading: "Technical challenge",
        body: [
          "One of the most important challenges was balancing the threshold " +
          "that determines whether a frozen body becomes a platform or a " +
          "springboard.",

          "The threshold is deliberately positioned just above the landing " +
          "speed of a normal jump. This creates a consistent rule: jumping " +
          "alone produces a platform, while falling fast enough can produce a " +
          "springboard.",

          "The threshold is covered by simulation tests that evaluate jump " +
          "trajectories and verify that normal jumps cannot accidentally create " +
          "springboards."
        ]
      },
      {
        heading: "Audio & visual systems",
        body: [
          "The project does not depend entirely on imported assets for its " +
          "presentation.",

          "Gameplay audio such as jumping, landing, freezing, launching, death, " +
          "and the exit sound is synthesized at runtime using code.",

          "The visual system also includes a procedural fallback based on " +
          "signed distance fields, allowing gameplay objects to be represented " +
          "without requiring an external art asset for every element."
        ]
      }
    ],
    detail: [
      "Remnant was built as an exploration of how far a small puzzle game " +
      "could be pushed through systems and simulation rather than relying " +
      "primarily on engine features.",

      "The goal was to make the mechanics predictable enough to reason about, " +
      "testable enough to verify, and flexible enough that level design could " +
      "emerge from the underlying rules rather than from manually scripted " +
      "solutions."
    ],
    media: { video: null, youtube: null, poster: null, images: ["media/remnant.jpg"] }
  },

  /* ---------------------------------------------------------------- 3 --- */
  {
    id: "glowworm",
    title: "Glowworm",
    kind: "personal",
    type: "2D Learning Game",
    blurb: "A 2D early-years learning game where a worm eats the next item in " +
           "a sequence, turning counting, letters, and spelling into one " +
           "simple gameplay mechanic.",
    tagline: "Learn one bite at a time.",
    role: "Solo developer — game design, programming, level design, UI",
    tech: ["Unity 6", "C#", "Custom Simulation", "Procedural Generation", "Runtime Systems"],
    platform: "Windows",
    lead: [
      "Glowworm is a 2D learning game designed for young children who are " +
      "still developing early number and letter recognition.",

      "The core rule is simple: the worm can only eat the next item in a " +
      "sequence. A level might ask the player to collect numbers in order, " +
      "letters in alphabetical order, or the letters of a word.",

      "The same mechanic therefore supports counting, alphabet recognition, " +
      "and early spelling without requiring a completely different game system " +
      "for each subject."
    ],
    highlightsHeading: "Core gameplay",
    highlights: [
      "Guide the worm through a garden and collect items in the required sequence.",
      "Collect numbers in ascending order for counting activities.",
      "Collect letters in alphabetical order for letter-recognition activities.",
      "Collect the letters of a word in the correct order for early spelling activities.",
      "Each collected item adds a segment to the worm and visually records what has already been learned.",
      "The worm's growing body becomes part of the navigation challenge, turning the learning activity into a simple routing puzzle.",
      "Incorrect items cannot be collected, allowing mistakes to become part of the learning process without creating a traditional fail state."
    ],
    sections: [
      {
        heading: "Design for young players",
        body: [
          "The game is designed around the idea that a young child should be " +
          "able to understand the interaction without reading instructions.",

          "There is no timer, lives system, or traditional game-over state. " +
          "When the player reaches for the wrong item, the game simply refuses " +
          "the action rather than punishing the player.",

          "The goal is to make the interaction itself teach the rule: the child " +
          "learns what comes next by playing rather than by reading an " +
          "explanation first."
        ]
      },
      {
        heading: "One mechanic, three subjects",
        body: [
          "The same underlying rule drives three different types of content.",
          "Counting uses sequences such as 1, 2, 3, 4.",
          "Alphabet activities use sequences such as A, B, C, D.",
          "Spelling uses the letters of a target word in order.",

          "Because the gameplay system is independent of the lesson content, " +
          "adding a new learning activity does not require building a new game " +
          "mechanic."
        ]
      },
      {
        heading: "Gameplay architecture",
        body: [
          "The core gameplay rules are implemented as a plain C# simulation " +
          "separated from the Unity presentation layer.",

          "The simulation determines what the worm can eat, how the sequence " +
          "progresses, how the worm grows, and whether the current state is " +
          "valid. Unity acts as the presentation and input layer, responding to " +
          "events from the simulation rather than deciding the game rules " +
          "itself.",

          "This separation makes the core behaviour easier to test " +
          "independently and allows the same rules to drive both authored and " +
          "procedurally generated content."
        ]
      },
      {
        heading: "Procedural level generation",
        body: [
          "The garden layout and lesson content are treated as separate pieces " +
          "of data.",

          "A garden defines the playable space, while a lesson defines the " +
          "sequence the player needs to collect. This allows the same garden " +
          "structure to support different educational content.",

          "Procedural generation can create new gardens while the solver " +
          "verifies that the resulting level can actually be completed before " +
          "it reaches the player."
        ]
      },
      {
        heading: "Level verification",
        body: [
          "Glowworm uses a solver to search for a valid route through each " +
          "generated level.",

          "The solver operates on the same gameplay rules used by the actual " +
          "game rather than using a simplified approximation.",

          "Every generated level is checked for solvability before it is " +
          "presented to the player. This is particularly important for " +
          "procedural content because a randomly generated layout can look " +
          "valid while still producing an impossible route."
        ]
      },
      {
        heading: "Custom mode",
        body: [
          "Glowworm also includes a custom mode where a parent or teacher can " +
          "enter a question and answer.",

          "The game can generate a garden around the supplied content and use " +
          "the same sequence-based gameplay system to turn that content into an " +
          "interactive activity.",

          "This allows the core game to adapt to what a child is currently " +
          "learning rather than limiting the experience to a fixed set of " +
          "lessons."
        ]
      },
      {
        heading: "Teach mode & test mode",
        body: [
          "The game supports different learning contexts using the same " +
          "underlying level.",

          "A teach mode can reveal the target answer so the child can " +
          "understand the sequence, while a test mode can hide that information " +
          "and let the child complete the activity independently.",

          "The important part is that the underlying garden and gameplay rules " +
          "remain the same; only the amount of guidance changes."
        ]
      },
      {
        heading: "Procedural visuals",
        body: [
          "The project was initially built without relying on a large " +
          "collection of imported visual assets.",

          "Gameplay shapes and visual elements can be generated procedurally, " +
          "allowing the game to remain playable while artwork is still being " +
          "developed.",

          "A later art pipeline allows hand-painted assets to replace " +
          "individual generated elements without requiring the gameplay systems " +
          "or level data to be rewritten."
        ]
      },
      {
        heading: "Runtime systems",
        body: [
          "The project also explores runtime-generated content beyond level " +
          "layouts.",

          "Visual elements can be generated from code, and audio can be " +
          "synthesized at runtime, reducing the number of external dependencies " +
          "required by the core game.",

          "This allowed the gameplay systems to remain functional throughout " +
          "development even before the final presentation assets were available."
        ]
      },
      {
        heading: "Testing",
        body: [
          "The project uses both edit-mode and play-mode tests.",

          "Edit-mode tests validate the simulation, sequence rules, level " +
          "generation, and solvability.",

          "Play-mode tests run the actual Unity scene and drive it through the " +
          "same input path used by a player.",

          "This combination helps verify both the underlying game rules and the " +
          "final player-facing behaviour."
        ]
      }
    ],
    detail: [
      "Glowworm was built to explore how a simple gameplay mechanic could " +
      "support meaningful learning without turning the experience into a " +
      "collection of disconnected mini-games.",

      "The project also gave me a way to explore several game-development " +
      "systems together: a Unity-independent simulation core, procedural level " +
      "generation, automated solvability checking, data-driven content, and a " +
      "presentation layer that can evolve independently from the rules.",

      "The result is intentionally small, but the systems underneath it are " +
      "designed to support more content without requiring a new gameplay " +
      "implementation for every lesson."
    ],
    media: { video: null, youtube: null, poster: null, images: ["media/glowworm.jpg"] }
  },

  /* ---------------------------------------------------------------- 4 --- */
  {
    id: "gridpush",
    title: "GridPush",
    kind: "personal",
    type: "2D Puzzle Game",
    blurb: "A 15-level Sokoban puzzle game built to explore grid-based " +
           "movement, level design, undo systems, and automated level " +
           "verification.",
    tagline: "Think ahead. Push carefully. Every move matters.",
    role: "Solo developer — game design, programming, level design, UI",
    tech: ["Unity 6", "C#", "Custom Grid System", "BFS Solver", "Procedural Scene Generation"],
    platform: "Windows",
    lead: [
      "GridPush is a 15-level Sokoban-style puzzle game built around a simple " +
      "set of rules: move around the grid, push crates onto their goals, and " +
      "avoid creating positions that make the level impossible to finish.",

      "I built the project as an exploration of grid-based game development, " +
      "focusing on predictable movement, clean game-state management, level " +
      "generation, undo systems, and verifying that designed levels are " +
      "actually solvable."
    ],
    highlightsHeading: "Core gameplay",
    highlights: [
      "Grid-based player movement with deterministic crate pushing.",
      "15 hand-designed levels with progressively increasing difficulty.",
      "Multiple crates and goals requiring players to plan several moves ahead.",
      "Undo functionality that restores the previous board state.",
      "Restart and level progression systems.",
      "Movement and push counters used to track player performance.",
      "Levels ordered by their optimal solution length to create a measured difficulty progression."
    ],
    sections: [
      {
        heading: "Architecture",
        body: [
          "The core game rules are separated from Unity and implemented as " +
          "plain C#.",

          "The core system manages the board, player position, crate positions, " +
          "movement, pushing, undo, and win detection without depending on " +
          "UnityEngine. Unity acts as the presentation layer, reading the state " +
          "produced by the game engine and displaying the board, UI, " +
          "animations, and effects.",

          "This separation makes the game rules independently testable and " +
          "allows the same simulation to be used by both the actual game and " +
          "the level solver."
        ]
      },
      {
        heading: "Level pipeline",
        body: [
          "Levels are authored as ASCII layouts in a C# source file rather than " +
          "manually assembling Unity scenes.",

          "Each level passes through a validation and generation pipeline:"
        ],
        steps: [
          "Author the level using a compact grid representation.",
          "Parse and validate the layout, including checking that the playable area is properly enclosed.",
          "Solve the level using breadth-first search.",
          "Replay the discovered solution through the actual game rules to verify that the solver and shipping implementation agree.",
          "Order the levels based on their optimal solution length to create a gradual difficulty curve."
        ]
      },
      {
        heading: "Level solver",
        body: [
          "A breadth-first search solver explores possible player and crate " +
          "states to find optimal solutions.",

          "Each state stores the player position and crate configuration, " +
          "allowing the solver to systematically search the available move " +
          "space.",

          "The solver was useful not only for finding solutions but also for " +
          "validating level design. A level that looked reasonable during " +
          "manual testing could still turn out to be impossible or have an " +
          "unintended solution.",

          "One level, for example, appeared playable but was discovered to be " +
          "unsolvable after the solver exhausted its search space. The level " +
          "was removed from the final set rather than relying on visual " +
          "inspection alone."
        ]
      },
      {
        heading: "Verification & testing",
        body: [
          "The project uses multiple layers of verification.",

          "Core tests validate the game rules, movement, pushing, undo " +
          "behaviour, win detection, level parsing, and level solvability.",

          "Play-mode tests run through the actual Unity scene and send input " +
          "through the same path used by a real player.",

          "The project also renders the game at multiple aspect ratios to " +
          "verify that the interface remains usable across different screen " +
          "shapes.",

          "This distinction between testing the simulation and testing the " +
          "actual running game helped catch issues that isolated unit tests " +
          "could not."
        ]
      },
      {
        heading: "Procedural presentation",
        body: [
          "The project does not rely on manually assembled Unity scenes for its " +
          "gameplay content.",

          "The board, HUD, menus, and gameplay objects are generated at runtime " +
          "from the level data. The scene itself acts primarily as a bootstrap " +
          "rather than containing the complete game structure.",

          "This keeps the level data separate from presentation and makes it " +
          "possible to regenerate the game state from the source representation."
        ]
      },
      {
        heading: "Art & audio",
        body: [
          "The game was initially built with procedural visual fallbacks so " +
          "that gameplay could be developed before the final artwork was " +
          "integrated.",

          "Sprites can be generated from simple procedural shapes, while the " +
          "audio system can synthesize gameplay sounds at runtime.",

          "When authored artwork is available, the presentation layer can use " +
          "it without changing the underlying game rules."
        ]
      },
      {
        heading: "Technical challenges",
        items: [
          { label: "Level validation",
            text: "A visually convincing Sokoban level can still be impossible " +
                  "to solve. The solver became an important part of the " +
                  "development process because it could exhaustively search the " +
                  "state space and expose impossible designs before they " +
                  "reached the final build." },
          { label: "Input verification",
            text: "An early automated test suite could pass even when input was " +
                  "not actually reaching the game because a rejected move " +
                  "produced the same visible board state. The play-mode tests " +
                  "were changed to perform real movement so that a broken input " +
                  "path would fail visibly." },
          { label: "Runtime UI",
            text: "A menu panel initially appeared invisible while its buttons " +
                  "continued to render. Instrumenting the runtime object " +
                  "revealed that the panel texture had been reduced to a tiny " +
                  "generated sprite and was being stretched across the entire " +
                  "UI element. The issue was fixed in the presentation pipeline " +
                  "rather than the gameplay code." },
          { label: "Level progression",
            text: "The game initially advanced automatically after completing a " +
                  "level while the restart flow expected the player to remain " +
                  "on the same level. The state transition was changed so " +
                  "completion and restart use explicit, predictable flows." }
        ]
      }
    ],
    detail: [
      "I chose Sokoban because the mechanics are simple enough that the " +
      "engineering problems become easy to see.",

      "There is no complicated combat system or large world hiding the " +
      "underlying architecture. Every movement changes the game state, every " +
      "push can permanently affect the puzzle, and an apparently valid level " +
      "can still be impossible.",

      "That made GridPush a useful project for exploring how to build " +
      "deterministic game rules, separate gameplay logic from presentation, " +
      "generate content from data, and use algorithms to verify the content " +
      "being shipped."
    ],
    media: { video: null, youtube: null, poster: null, images: ["media/gridpush.jpg"] }
  },

  /* ---------------------------------------------------------------- 5 --- */
  {
    id: "chess",
    title: "Chess",
    kind: "personal",
    type: "2D with multiplayer",
    blurb: "A complete chess game with three ways to play — pass-and-play, " +
           "LAN and online — where the rules engine, the network protocol " +
           "and the relay server are all written from scratch.",
    tagline: "The chess was the easy part. Everything between the two players wasn't.",
    role: "Solo developer — rules engine, netcode, relay server, UI",
    tech: ["Unity 6", "C#", "Multiplayer Networking"],
    lead: [
      "I built a chess game to understand multiplayer networking from the " +
      "ground up.",

      "Instead of using Photon or Mirror, I implemented three different " +
      "multiplayer approaches around the same chess engine.",

      "The project became an exploration of networking, architecture, " +
      "deterministic game logic, and testing."
    ],
    highlightsHeading: "Three ways to play",
    highlights: [
      "Pass & Play — two players share one device. The board rotates after every move so each player gets their own perspective.",
      "LAN Multiplayer — two devices communicate directly over the same network. UDP discovery finds available hosts and TCP handles the actual game communication.",
      "Online Multiplayer — players connect to a publicly reachable WebSocket relay. The relay pairs them and forwards moves between clients.",
      "The important part: all three modes use the same chess rules engine."
    ],
    sections: [
      {
        heading: "By the numbers",
        stats: [
          { value: "~5,900", label: "Lines of C#" },
          { value: "1,457",  label: "Lines of rules engine" },
          { value: "978",    label: "Lines of networking" },
          { value: "3",      label: "Multiplayer architectures" },
          { value: "81",     label: "Automated tests" },
          { value: "0",      label: "Third-party networking libraries" }
        ]
      },
      {
        heading: "The architecture",
        body: [
          "The project separates the chess rules, game state, networking, and " +
          "presentation.",

          "The chess engine does not depend on Unity, which means the same " +
          "rules can be tested independently and reused by the networking " +
          "layer.",

          "Network messages are treated as input rather than trusted game " +
          "state. Incoming moves still pass through the same legality checks " +
          "as local moves."
        ]
      },
      {
        heading: "What I learned",
        body: [
          "The biggest lesson was that multiplayer is not one problem.",

          "A local game, a LAN game, and an internet game require different " +
          "networking architectures.",

          "The project gave me practical experience with:"
        ],
        bullets: [
          "TCP and UDP",
          "WebSockets",
          "NAT and relay servers",
          "Client/server communication",
          "Deterministic game logic",
          "Network trust boundaries",
          "Automated testing"
        ]
      },
      {
        heading: "A bug worth mentioning",
        body: [
          "One of the most useful bugs had nothing to do with chess logic.",

          "The pieces could not always be clicked because their UI images were " +
          "intercepting pointer events.",

          "The automated tests initially passed because they were calling game " +
          "functions directly instead of going through the real input path.",

          "The fix was simple, but the lesson was important: testing the game " +
          "logic is not the same as testing the way a player actually uses the " +
          "game."
        ]
      },
      {
        heading: "Verification",
        body: [
          "The chess engine is tested independently using perft-style " +
          "verification.",

          "Known chess positions are searched to specific depths and compared " +
          "against expected move counts."
        ],
        stats: [
          { value: "20",    label: "Depth 1" },
          { value: "400",   label: "Depth 2" },
          { value: "8,902", label: "Depth 3" }
        ],
        after: [
          "The project also includes play-mode tests that exercise the actual " +
          "game and input flow."
        ]
      },
      {
        heading: "What I would build next",
        bullets: [
          "Reconnection after dropped connections",
          "Server-side move validation",
          "Match replay",
          "Mobile support"
        ]
      },
      {
        heading: "AI assistance",
        body: [
          "AI was used as a pair-programming and implementation aid.",

          "The architecture, networking approach, testing strategy, debugging " +
          "decisions, and overall project direction were my own."
        ]
      }
    ],
    detail: [
      "The chess was the easy part.",
      "Everything between the two players wasn't."
    ],
    media: { video: null, youtube: null, poster: null, images: ["media/chess.jpg"] }
  },

  /* ---------------------------------------------------------------- 6 --- */
  {
    id: "hotspot-founder",
    title: "Hotspot Founder",
    kind: "personal",
    type: "2D tool",
    blurb: "Load any image, drop labelled hotspots on the regions that matter, " +
           "then explore it by hovering — the same build both authors the " +
           "lesson and delivers it.",
    tagline: "An interactive image-based learning tool for teaching children through visual exploration.",
    role: "Solo developer — design, gameplay interaction, UI and tooling",
    tech: ["Unity 6", "C#", "uGUI", "Procedural UI"],
    platform: "Windows",
    status: "Playable Unity project",
    lead: [
      "Hotspot Founder is a Unity-based educational tool where images become " +
      "interactive learning experiences. A teacher or content creator can load " +
      "an image, place hotspots on important areas, and label what each region " +
      "represents. Children can then explore the image by hovering over the " +
      "hotspots and learning what they point to."
    ],
    highlights: [
      "Load any image from the computer at runtime and use it as a learning canvas.",
      "Author hotspots by placing them over specific regions of the image.",
      "Each hotspot can be positioned and labelled immediately during authoring.",
      "Hotspot positions are stored independently of the displayed image size, allowing the same content to work across different image dimensions.",
      "In learning mode, hovering over a hotspot highlights the region and displays its label.",
      "The same application supports both creating learning content and exploring it."
    ],
    sections: [
      {
        heading: "Why I built it",
        body: [
          "I wanted to explore how a simple interaction could turn ordinary " +
          "images into reusable educational content.",

          "Instead of building a separate game for every lesson, Hotspot " +
          "Founder treats the image as the content and the hotspot system as " +
          "the reusable interaction layer. A teacher can take an image of an " +
          "animal, a map, a classroom, a vehicle, or almost anything else and " +
          "turn important regions into interactive learning points."
        ]
      },
      {
        heading: "Design decisions",
        items: [
          { label: "Content-first",
            text: "The image provides the subject matter while hotspots define " +
                  "what the child should notice. This keeps the learning " +
                  "experience flexible instead of tying it to a fixed set of " +
                  "levels." },
          { label: "Simple interaction",
            text: "There is no score, timer, or failure state. The goal is " +
                  "exploration and learning rather than winning." },
          { label: "Authoring + learning",
            text: "The same project supports creating the content and using " +
                  "it. Hotspots can be positioned and labelled during " +
                  "authoring, then explored through hover interaction in " +
                  "learning mode." },
          { label: "Responsive hotspots",
            text: "Hotspot positions are stored relative to the image rather " +
                  "than as fixed screen coordinates, allowing the content to " +
                  "remain usable when the image is displayed at a different " +
                  "size or aspect ratio." },
          { label: "Runtime UI",
            text: "The interface is generated at runtime rather than depending " +
                  "on a large collection of hand-authored UI screens. This " +
                  "makes the tool adaptable to different images and learning " +
                  "content." }
        ]
      },
      {
        heading: "What it demonstrates",
        bullets: [
          "Unity UI and interaction design",
          "Runtime/procedural UI",
          "Image coordinate and hotspot positioning",
          "Reusable educational-game architecture",
          "Authoring workflows inside a game application",
          "Designing interactions for children without relying on scores or penalties"
        ]
      }
    ],
    detail: [
      "Hotspot Founder is intentionally a focused learning tool rather than a " +
      "traditional game. Its purpose is to demonstrate how a reusable hotspot " +
      "interaction can turn arbitrary images into simple, interactive " +
      "educational experiences."
    ],
    media: { video: null, youtube: null, poster: null, images: ["media/hotspot-founder.jpg"] }
  },

  /* ---------------------------------------------------------------- 7 --- */
  {
    id: "vr-bowling",
    title: "VR Bowling",
    kind: "personal",
    type: "VR",
    blurb: "Grab the ball with controllers or bare hands, swing, and let the " +
           "release carry your own arm motion down the lane.",
    tagline: "A realistic VR bowling experience built around natural grabbing, throwing, physics, and scoring.",
    role: "Solo developer — VR interaction, physics, gameplay, UI and environment",
    tech: ["Unity", "C#", "XR Interaction Toolkit", "OpenXR", "Android VR"],
    platform: "Meta Quest 2 & Quest 3",
    status: "Playable VR project",
    lead: [
      "VR Bowling is a Unity-based VR bowling game for Meta Quest 2 and Quest " +
      "3. The player can grab the ball using either controllers or hand " +
      "tracking, aim down the lane, swing naturally, and release the ball. The " +
      "project focuses on making the physical interaction feel close to real " +
      "bowling rather than relying on scripted throws."
    ],
    highlights: [
      "Grab the bowling ball using either VR controllers or hand tracking.",
      "Move and aim the ball naturally before the throw.",
      "Release the ball and transfer the motion into its physical trajectory.",
      "Use Rigidbody-based physics with custom tuning for the bowling experience.",
      "Simulate realistic interactions between the ball, lane and pins.",
      "Support standard bowling scoring.",
      "Reset the bowling setup after each round so the experience can continue like a real bowling session.",
      "Run as a standalone VR experience on Meta Quest devices."
    ],
    sections: [
      {
        heading: "The core challenge",
        body: [
          "The difficult part was not creating a bowling lane — it was making " +
          "the throw feel natural.",

          "The ball needs to stay connected to the player's hand while being " +
          "held, follow the player's movement, and receive the right direction " +
          "and momentum when released. Small differences in grabbing, swing " +
          "motion, release timing, and physics can make the same throw feel " +
          "completely different.",

          "The project therefore combines XR Interaction Toolkit with Rigidbody " +
          "physics and custom tuning to make grabbing, swinging, releasing, and " +
          "pin collisions feel responsive and believable."
        ]
      },
      {
        heading: "Design decisions",
        items: [
          { label: "Natural throwing",
            text: "The throw is driven by the player's actual hand/controller " +
                  "movement rather than a predefined throw animation." },
          { label: "Controller + hand tracking",
            text: "The interaction supports both VR controllers and hand " +
                  "tracking, allowing the same bowling experience to work with " +
                  "different input methods." },
          { label: "Physical interaction",
            text: "The ball, lane and pins use physics rather than scripted " +
                  "outcomes. The result of a throw comes from the interaction " +
                  "and physical simulation." },
          { label: "Realistic reset",
            text: "After a round, the bowling setup resets so the player can " +
                  "continue with the next attempt without manually rebuilding " +
                  "the scene." },
          { label: "Standard scoring",
            text: "The game follows bowling-style scoring rather than simply " +
                  "counting how many pins were knocked down." }
        ]
      },
      {
        heading: "What it demonstrates",
        bullets: [
          "VR interaction with Unity",
          "XR Interaction Toolkit and OpenXR",
          "Meta Quest development",
          "Controller and hand-tracking input",
          "Rigidbody-based physics",
          "Custom physics tuning",
          "Realistic object interaction",
          "Bowling gameplay and scoring",
          "VR UI and environment design",
          "Standalone Android VR development"
        ]
      }
    ],
    detail: [
      "VR Bowling is a focused VR project built to explore how physical " +
      "interaction, input and physics come together in a standalone headset. " +
      "The goal was to make the simple act of picking up and throwing a " +
      "bowling ball feel natural and responsive."
    ],
    media: { video: null, youtube: null, poster: null, images: ["media/vr-bowling.jpg"] }
  },

  /* ---------------------------------------------------------------- 8 --- */
  {
    id: "shooting-multiplayer",
    title: "Shooting Multiplayer",
    kind: "personal",
    type: "3D multiplayer FPS",
    blurb: "A round-based multiplayer FPS built in Unity using Netcode for " +
           "GameObjects, focused on the engineering behind networked combat " +
           "rather than visual polish.",
    tagline: "A multiplayer FPS built from scratch to understand networking, server authority, lag compensation, and competitive gameplay systems.",
    role: "Solo developer — networking, gameplay systems, AI, UI",
    tech: ["Unity 6", "C#", "Netcode for GameObjects"],
    meta: [
      { label: "Networking", value: "LAN / IP-based multiplayer" },
      { label: "Map",        value: "1 grey-box arena with A and B bomb sites" }
    ],
    lead: [
      "A round-based multiplayer FPS built in Unity using Netcode for " +
      "GameObjects. The project focuses on the engineering behind networked " +
      "combat rather than visual polish, with server-authoritative shooting, " +
      "lag-compensated hit detection, a complete weapon and economy system, " +
      "bomb objectives, and AI opponents."
    ],
    highlights: [
      "Players connect directly over LAN by entering the host's IP address. The host listens on port 7777; there is no matchmaking, relay service, or lobby backend.",
      "Matches support a variable number of players. New players are assigned to the smaller team, while AI bots can fill the lobby.",
      "The game combines team elimination with a bomb objective. A round can end through team elimination, a successful bomb explosion, a defuse, or the round timer expiring.",
      "Six weapon types are implemented — knife, pistol, SMG, shotgun, rifle, and sniper — each with different stats and recoil, alongside armor, grenades, flashbangs, smoke, defuse kits, and a full buy system.",
      "The economy includes kill, win, loss, assist, plant, and defuse rewards, with weapon purchasing, selling, dropping, and picking up.",
      "Guns use server-side mathematical hit detection against head, torso, and leg hit regions. Physics raycasts are used only to determine whether environmental geometry blocks the shot.",
      "When a player dies, their primary weapon drops into the world and they enter spectator mode until the next round."
    ],
    sections: [
      {
        heading: "The networking problem",
        body: [
          "The main purpose of the project was to understand what actually " +
          "needs to be authoritative in a multiplayer game.",

          "The server controls the important game state: shooting, health, " +
          "money, rounds, and the bomb. Player movement remains " +
          "owner-controlled through Unity's network transform system.",

          "This separation made it possible to keep competitive game rules on " +
          "the authoritative side without trying to make the server simulate " +
          "every aspect of player movement."
        ]
      },
      {
        heading: "Lag-compensated shooting",
        body: [
          "A major focus was making shooting work fairly over a network.",

          "When a shot reaches the server, hit detection is evaluated against " +
          "the historical state relevant to the shot rather than simply " +
          "checking the target's current position. The server evaluates head, " +
          "torso, and leg hit regions separately and checks environmental " +
          "obstruction before accepting the hit.",

          "The result is a system where network latency is considered during " +
          "hit registration instead of treating every delayed shot as if it " +
          "happened at the server's current frame."
        ]
      },
      {
        heading: "Gameplay systems",
        bullets: [
          "Round-based match flow",
          "Team assignment",
          "Buy phase",
          "Weapon purchasing and rebuy",
          "Player economy",
          "Kill / assist / plant / defuse rewards",
          "Loss bonus",
          "Bomb planting and defusing",
          "Weapon drops and pickups",
          "Armor and damage",
          "Recoil and weapon-specific stats",
          "Flashbang and smoke grenades",
          "Spectator mode",
          "Round timer and win conditions"
        ]
      },
      {
        heading: "AI opponents",
        body: [
          "Bots use the same core gameplay systems as human players.",
          "They can:"
        ],
        bullets: [
          "Detect players using line-of-sight checks",
          "Turn toward targets with a limited rotation speed",
          "React after a configurable delay",
          "Strafe while engaging",
          "Navigate toward bomb sites",
          "Avoid obstacles using raycasts",
          "Buy weapons",
          "Plant the bomb",
          "Defuse the bomb"
        ],
        after: [
          "The AI is deliberately lightweight rather than built around Unity " +
          "NavMesh or a large behaviour-tree framework."
        ]
      },
      {
        heading: "What I learned",
        body: [
          "The biggest lesson was that multiplayer architecture is mostly " +
          "about deciding what each side is allowed to control.",

          "The project forced me to work through:"
        ],
        bullets: [
          "Server authority versus client responsibility",
          "Lag-compensated hit registration",
          "Networked player state",
          "Synchronizing gameplay events",
          "Multiplayer round state",
          "Network-safe economy and weapon systems",
          "AI using the same gameplay rules as players",
          "Testing multiple networked instances locally"
        ]
      },
      {
        heading: "Testing",
        body: [
          "There are no automated gameplay tests in this project.",

          "Instead, I used scripted headless runs to launch multiple game " +
          "instances with different combinations of hosts, clients, bots, and " +
          "accelerated rounds. Logs were then inspected to verify networking " +
          "and round behaviour.",

          "I also performed manual playtests on standalone builds.",

          "The project was primarily tested locally rather than through a real " +
          "multi-machine LAN session."
        ]
      },
      {
        heading: "Honest limitations",
        bullets: [
          "LAN multiplayer is the supported networking mode. Internet play would require manual port forwarding and is not configured.",
          "There is one grey-box arena with two bomb sites.",
          "The project uses primitive placeholder visuals rather than production art.",
          "There is no matchmaking, relay service, account system, voice chat, or anti-cheat system.",
          "Player movement does not use client-side prediction.",
          "The project focuses on understanding multiplayer gameplay architecture rather than shipping a complete commercial FPS."
        ]
      },
      {
        heading: "AI assistance",
        body: [
          "AI was used as a development assistant during implementation and " +
          "iteration.",

          "I used it for coding, debugging, and exploring implementation " +
          "approaches, while the architecture, networking model, gameplay " +
          "decisions, testing approach, and final integration were directed " +
          "by me."
        ]
      }
    ],
    detail: [
      "This project demonstrates my understanding of multiplayer gameplay " +
      "beyond simply connecting two players.",

      "The interesting part is the separation of responsibilities: deciding " +
      "what the server owns, what the client controls, how shots are " +
      "validated, how latency affects hit registration, and how gameplay " +
      "systems such as economy, rounds, bombs, weapons, and AI operate " +
      "consistently inside that architecture."
    ],
    media: { video: null, youtube: null, poster: null, images: ["media/shooting-multiplayer.jpg"] }
  },

  /* ---------------------------------------------------------------- 9 --- */
  {
    id: "skyrunner-3d",
    title: "Sky Runner 3D",
    kind: "personal",
    type: "3D Platformer",
    blurb: "A third-person 3D platformer across three floating-island levels, " +
           "with dash, double jump and a speedrun timer — player, levels, " +
           "camera and UI all constructed from code.",
    tagline: "A third-person 3D platformer about movement, timing, and reaching the finish without losing momentum.",
    role: "Solo developer — gameplay, movement, camera, levels, audio, UI",
    tech: ["Unity 6", "C#", "Character Controller", "Procedural Generation", "Procedural Audio"],
    platform: "Windows",
    highlights: [
      "Responsive movement — the player can run, sprint, jump, double jump and dash. These movement abilities form the core of the platforming experience.",
      "Three floating-island levels built around the same movement system, with progressively more demanding platform layouts and hazards.",
      "Checkpoint-based recovery — falling or touching a hazard respawns the player at the latest checkpoint rather than restarting the entire level.",
      "A speedrun timer on each level. The timer continues after a respawn, encouraging players to improve their route and beat their previous best time.",
      "Optional collectibles placed throughout the levels for players who want to explore and improve their completion.",
      "A third-person follow camera that keeps the player readable while moving through the vertical platforming sections.",
      "Code-driven construction — the player, levels, UI and supporting systems are built through code rather than relying heavily on hand-authored Unity scenes.",
      "Procedural audio generated and assembled programmatically to provide feedback for movement and important game events."
    ],
    sections: [
      {
        heading: "What it demonstrates",
        items: [
          { label: "Movement systems",
            text: "A complete third-person movement system with running, " +
                  "sprinting, jumping, double jumping and dash mechanics." },
          { label: "3D level design",
            text: "Three progressively structured platforming levels designed " +
                  "around the player's movement abilities." },
          { label: "Game feel",
            text: "Checkpoint recovery, responsive movement, camera behaviour " +
                  "and forgiveness systems working together to make " +
                  "platforming feel consistent." },
          { label: "Procedural development",
            text: "Core gameplay and presentation systems are constructed " +
                  "through code rather than depending on large amounts of " +
                  "hand-authored scene setup." },
          { label: "Audio systems",
            text: "Runtime-generated gameplay audio connected to player " +
                  "actions and game events." },
          { label: "Build pipeline",
            text: "A Windows build that can be generated from the project " +
                  "alongside the game setup." }
        ]
      }
    ],
    detail: [
      "The interesting part of Sky Runner 3D was not simply making a character " +
      "move between platforms. It was understanding what makes a 3D controller " +
      "feel responsive and forgiving.",

      "Jumping, air control, dash behaviour, checkpoints and camera movement " +
      "all have to work together. A controller can technically function " +
      "correctly while still feeling frustrating to play.",

      "This project was built to explore that difference between a controller " +
      "that works and a controller that feels good."
    ],
    media: { video: null, youtube: null, poster: null, images: ["media/skyrunner-3d.jpg"] }
  },

  /* ------------------------------------------------ client work ---------- */
  {
    id: "vr-training-simulation",
    title: "VR Training Simulation",
    kind: "client",
    type: "VR Training",
    client: "Client work",
    blurb: "Step-by-step VR training on Meta Quest — grab and manipulate " +
           "objects, move by teleport or smooth locomotion, and work through " +
           "a guided task flow.",
    tagline: "A VR training simulation focused on realistic hand interactions, comfortable locomotion and guided training workflows.",
    role: "Unity / XR Developer",
    tech: ["Unity", "C#", "XR Interaction Toolkit", "OpenXR", "Oculus SDK", "AutoHands"],
    platform: "Meta Quest",
    highlights: [
      "Realistic VR interactions — users can grab, hold and manipulate different objects using VR controllers or hands, with different objects supporting different interaction behaviours rather than one generic interaction.",
      "Guided training structured around step-by-step tasks, allowing users to follow a defined workflow inside the VR environment.",
      "Multiple locomotion options — both teleportation and smooth locomotion are available, giving users different ways to move through the environment while considering VR comfort.",
      "An interactive training environment where users interact directly with objects as part of the training process rather than simply observing instructions.",
      "Multi-channel feedback — visual, audio, haptic and in-headset feedback communicate interaction states and training progress.",
      "Task completion and training progression, with assessment and score elements where applicable.",
      "Developed for Meta Quest, and involving OpenXR-based VR development.",
      "I worked on the Unity/XR development side of the project, implementing the interaction, gameplay and training systems, while the 3D modelling work was handled by another team member."
    ],
    sections: [
      {
        heading: "What it demonstrates",
        items: [
          { label: "VR interaction engineering",
            text: "Building physical grab, hold and manipulation interactions " +
                  "for objects in an immersive environment." },
          { label: "XR development",
            text: "Working with Unity, XR Interaction Toolkit, OpenXR, Oculus " +
                  "SDK and AutoHands to build a standalone VR experience." },
          { label: "Training systems",
            text: "Implementing structured, step-by-step training workflows " +
                  "with task progression and assessment." },
          { label: "VR comfort",
            text: "Supporting teleportation and smooth locomotion while " +
                  "considering how movement affects the user's comfort." },
          { label: "Immersive feedback",
            text: "Combining visual, audio, haptic and in-headset feedback to " +
                  "communicate what is happening during training." },
          { label: "End-to-end development",
            text: "Owning the Unity/XR development side of the project from " +
                  "interaction and gameplay systems through to the complete " +
                  "training experience." }
        ]
      }
    ],
    detail: [
      "The interesting part of a VR training simulation is making the " +
      "interaction feel natural enough that the user can concentrate on the " +
      "training itself rather than fighting the controls.",

      "That meant working across several connected problems: physical object " +
      "interaction, hand/controller behaviour, locomotion, VR comfort, UI, " +
      "feedback and the underlying training flow.",

      "The project gave me experience building a complete VR training " +
      "experience rather than treating VR as simply a different camera and " +
      "input device."
    ],
    note: "Client project — details are confidential. I can discuss the implementation, architecture and my contribution as a developer in an interview.",
    media: { video: null, youtube: null, poster: null, images: ["media/vr-training-simulation.jpg"] }
  },

  {
    id: "vision-pro-demo",
    title: "Apple Vision Pro Spatial Demo",
    kind: "client",
    /* filter key stays "AVP" so the chip row is unaffected; typeLabel is what
       actually gets displayed on the card badge and in the modal. */
    type: "AVP",
    typeLabel: "Apple Vision Pro / Spatial Computing",
    client: "Client work",
    blurb: "Look at an element, pinch to select — a controller-free Vision Pro " +
           "prototype combining gaze targeting, hand tracking and spatial UI.",
    tagline: "An interactive spatial prototype for Apple Vision Pro, exploring hand and gaze interaction, spatial UI and object-based experiences.",
    role: "Unity / visionOS Developer",
    tech: ["Unity", "C#", "PolySpatial", "visionOS", "Hand Tracking", "Gaze Tracking"],
    platform: "Apple Vision Pro",
    highlights: [
      "Spatial interaction — the demo explores interaction patterns designed specifically for Apple Vision Pro, replacing traditional controller input with hand and gaze-based interaction.",
      "Hand tracking used for pinch-based selection, allowing users to interact with UI elements naturally without physical controllers.",
      "Gaze interaction — users can look at an element and use a pinch gesture to select it, combining gaze targeting with hand input.",
      "Multiple spatial UI patterns designed for a headset-based interface rather than a traditional flat-screen application.",
      "3D content — the prototype combines spatial UI with client-provided 3D content and environment elements.",
      "Built specifically for Apple Vision Pro using Unity and PolySpatial, requiring a different interaction and presentation model from conventional Unity applications.",
      "I handled the Unity/visionOS development across the interaction, UI, scene integration and supporting systems."
    ],
    sections: [
      {
        heading: "What it demonstrates",
        items: [
          { label: "Apple Vision Pro development",
            text: "Building a dedicated spatial experience for Apple Vision " +
                  "Pro rather than treating the headset as a conventional " +
                  "display." },
          { label: "Spatial computing",
            text: "Working with spatial UI and 3D content in a headset-based " +
                  "environment." },
          { label: "Hand + gaze interaction",
            text: "Combining gaze targeting with pinch-based hand interaction " +
                  "for controller-free input." },
          { label: "Unity + PolySpatial",
            text: "Using Unity and PolySpatial to develop and integrate a " +
                  "visionOS experience." },
          { label: "Spatial UI",
            text: "Designing and implementing UI patterns intended for an " +
                  "immersive spatial environment." },
          { label: "Platform adaptation",
            text: "Adapting existing Unity development knowledge to Apple's " +
                  "spatial computing platform and its interaction model." },
          { label: "End-to-end development",
            text: "Owning the Unity/visionOS implementation of the prototype, " +
                  "including interaction, UI, scene integration and supporting " +
                  "systems." }
        ]
      }
    ],
    detail: [
      "The interesting part of this project was adapting familiar Unity " +
      "development to a platform where there is no traditional mouse, keyboard " +
      "or game controller.",

      "Interaction has to begin with where the user is looking and what their " +
      "hands are doing. That makes seemingly simple UI actions a different " +
      "design problem: targeting needs to feel natural, pinch selection needs " +
      "to respond reliably, and spatial elements need to work comfortably " +
      "within the user's field of view.",

      "The project gave me practical experience building for Apple Vision Pro " +
      "and understanding how spatial computing changes the way interaction, UI " +
      "and 3D content are presented."
    ],
    note: "Client project — details are confidential, but I can discuss the implementation and my contribution as a developer in an interview.",
    media: { video: null, youtube: null, poster: null, images: ["media/vision-pro-demo.jpg"] }
  },

  {
    id: "ar-prototype",
    title: "AR Interactive Prototype",
    kind: "client",
    type: "AR",
    client: "Client work",
    blurb: "Detect a real surface, place 3D objects into the room, then move, " +
           "rotate and scale them by touch and gesture.",
    tagline: "A cross-platform AR prototype focused on placing, manipulating and interacting with 3D objects in the real world.",
    role: "Unity / AR Developer",
    tech: ["Unity", "C#", "AR Foundation", "ARCore", "uGUI"],
    highlights: [
      "Real-world AR placement — the application detects suitable real-world surfaces and allows virtual objects to be placed into the user's physical environment.",
      "Object placement and manipulation — users can select objects, place them in the environment and manipulate them through supported touch and gesture interactions.",
      "Object transformation — placed objects can be moved, rotated and scaled, with controls designed around interaction directly within the AR experience.",
      "An object library providing multiple predefined 3D objects that users can select and place into their environment.",
      "Gesture-based interaction — touch and gesture input are used across object selection, placement and manipulation rather than relying only on conventional UI controls.",
      "Persistent AR placement — objects remain anchored to their positions while the AR session is active, allowing users to continue interacting with the arranged scene.",
      "A reset workflow that removes the currently placed AR content and allows the user to start the arrangement again.",
      "I handled the Unity/AR development, including AR setup, tracking, object placement, manipulation, input handling, UI and scene/session management. 3D modelling was handled separately by a modeller on the team."
    ],
    sections: [
      {
        heading: "What it demonstrates",
        items: [
          { label: "AR Foundation",
            text: "Building an AR application around Unity's AR Foundation " +
                  "framework and device-level AR tracking." },
          { label: "AR object placement",
            text: "Detecting real-world surfaces and placing virtual content " +
                  "into physical space." },
          { label: "Object interaction",
            text: "Implementing selection, placement, movement, rotation and " +
                  "scaling of AR objects." },
          { label: "Gesture & input handling",
            text: "Combining touch and gesture-based interaction with spatial " +
                  "object manipulation." },
          { label: "AR UI",
            text: "Building the supporting UI required to select objects and " +
                  "control the AR experience." },
          { label: "End-to-end AR development",
            text: "Owning the Unity implementation across AR setup, tracking, " +
                  "placement, interaction, UI and session management." },
          { label: "Team development",
            text: "Working as the Unity/AR developer alongside a dedicated 3D " +
                  "modeller responsible for the modelling side of the project." }
        ]
      }
    ],
    detail: [
      "The interesting part of an AR application is not simply displaying a 3D " +
      "object through a camera. The challenge is making that object behave as " +
      "though it belongs in the user's physical space.",

      "Placement, tracking, gestures, transformation controls and UI all have " +
      "to work together. A small mismatch in input or positioning can make an " +
      "object feel disconnected from the real environment.",

      "This project gave me practical experience building an end-to-end AR " +
      "prototype where the interaction model, spatial tracking and user " +
      "interface had to work together as one system."
    ],
    note: "Client project — details are confidential, but I can discuss the implementation and my contribution as a developer in an interview.",
    media: { video: null, youtube: null, poster: null, images: ["media/ar-prototype.jpg"] }
  },

  {
    id: "3d-interactive-app",
    title: "3D Interactive Application",
    kind: "client",
    /* the readable label would only repeat the card title in the corner chip,
       so the chip stays short and the full name shows in the modal. */
    type: "3D",
    typeLabel: "3D Interactive Application",
    client: "Client work",
    blurb: "Navigate a 3D space with keyboard and mouse, trigger interactive " +
           "elements, and move through a world driven by physics and multiple " +
           "camera behaviours.",
    tagline: "A 3D interactive application built around navigation, physics, interaction and user experience.",
    role: "Unity Developer",
    tech: ["Unity", "C#", "Physics", "Camera Systems", "uGUI"],
    highlights: [
      "A 3D interactive experience combining navigation, interactive elements, physics and user-facing systems.",
      "Keyboard and mouse controls with multiple camera behaviours designed around the experience.",
      "Player movement, physics, collision handling and interactive elements implemented as part of the core application.",
      "Interactive elements can be triggered through different interaction mechanisms depending on the context.",
      "UI and input handling integrated directly into the application using Unity's uGUI system.",
      "Scene setup, camera configuration, interaction logic and other gameplay systems implemented as part of the development work.",
      "Multiple systems are connected through a combination of direct references, events and other architectural patterns rather than relying on a single monolithic controller."
    ],
    sections: [
      {
        heading: "My contribution",
        bullets: [
          "Worked as the Unity developer responsible for the application's development and technical implementation.",
          "Implemented gameplay and interaction systems, movement, physics, camera behaviour, UI and input handling.",
          "Integrated the different systems into a functional 3D experience.",
          "Worked alongside a dedicated 3D modeller who handled the modelling side of the project."
        ]
      },
      {
        heading: "Testing",
        bullets: [
          "Manual testing",
          "Playtesting",
          "Input and interaction testing",
          "General functional testing"
        ]
      }
    ],
    detail: [
      "The project brought together several areas of Unity development rather " +
      "than focusing on a single feature — 3D movement, physics, camera " +
      "systems, interaction handling, UI and input all had to work together as " +
      "one experience.",

      "The main development challenge was integrating these systems while " +
      "keeping the interaction and user experience consistent."
    ],
    note: [
      "Delivered as professional client work. Project-specific details and " +
      "media cannot be shared publicly under client confidentiality.",

      "The implementation work can be discussed in an interview, including the " +
      "Unity architecture, interaction systems and development " +
      "responsibilities."
    ],
    media: { video: null, youtube: null, poster: null, images: ["media/3d-interactive-app.jpg"] }
  }
];
