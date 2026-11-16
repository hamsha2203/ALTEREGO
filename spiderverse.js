(() => {
  const profiles = [
    {
      id: "miles",
      name: "Miles Morales",
      title: "The Unexpected Spidey",
      file: "miles-morales.avif",
      weights: { C: 2, I: 2, D: 2, M: 1 },
      archetypes: { C: 2, V: 1, W: 1 },
      colors: ["#d93d52", "#1766bd"],
      superpower: "Turning a new idea into a brave first move.",
      move: "You adapt quickly and make the unfamiliar your own.",
      chaos: "Your curiosity can open three new portals before lunch.",
      warning: "May improvise first and read the instruction manual later.",
      blurb: "Original thinking and flexible action help you find a path that did not exist a moment ago."
    },
    {
      id: "gwen",
      name: "Gwen Stacy",
      title: "The Independent Spidey",
      file: "gwen-stacy.jpg",
      weights: { I: 2, A: 1, D: 2, S: 1 },
      archetypes: { A: 1, W: 1 },
      colors: ["#d75e9d", "#5377ca"],
      superpower: "Trusting your own direction while staying resilient.",
      move: "You regroup, reflect, and keep moving on your terms.",
      chaos: "You can be so self-reliant that nobody knows you need backup.",
      warning: "Even the most independent heroes benefit from a team-up.",
      blurb: "Self-awareness and resilience help you hold your course without needing everyone else to draw the map."
    },
    {
      id: "hobie",
      name: "Hobie Brown / Spider-Punk",
      title: "The Rebel Spidey",
      file: "hobie-brown.jpg",
      weights: { C: 2, I: 2, D: 1, M: 1 },
      archetypes: { C: 1, V: 1, W: 1 },
      colors: ["#d94b57", "#64754a"],
      superpower: "Spotting when a rule needs a rethink.",
      move: "You question assumptions and test a different route.",
      chaos: "A simple suggestion can become a full system redesign.",
      warning: "Challenge the status quo; remember to bring people along.",
      blurb: "Curiosity, originality, and a willingness to experiment make convention feel more like a suggestion."
    },
    {
      id: "peter-b",
      name: "Peter B. Parker",
      title: "The Mentor Spidey",
      file: "peter-b-parker.jpg",
      weights: { P: 2, M: 2, D: 1 },
      archetypes: { N: 2 },
      colors: ["#c84c55", "#55677d"],
      superpower: "Making people feel heard and able to grow.",
      move: "You listen first, then help the team find its footing.",
      chaos: "You may adopt one more responsibility than your schedule can handle.",
      warning: "Mentor the team, but remember to save some energy for yourself.",
      blurb: "Empathy and communication make you the kind of teammate people can learn and regroup with."
    },
    {
      id: "miguel",
      name: "Miguel O'Hara / Spider-Man 2099",
      title: "The Strategist Spidey",
      file: "miguel-ohara.jpg",
      weights: { A: 2, S: 2, E: 2, I: 1 },
      archetypes: { A: 2, C: 1 },
      colors: ["#b64255", "#23518a"],
      superpower: "Turning complex goals into a clear, owned plan.",
      move: "You organise the next steps and follow through.",
      chaos: "Your plan may already have a backup plan and a backup for that.",
      warning: "Leave a little room for a good surprise.",
      blurb: "Planning, ownership, and execution help you bring order to a complicated mission."
    },
    {
      id: "noir",
      name: "Spider-Man Noir",
      title: "The Detective Spidey",
      file: "spider-man-noir.jpg",
      weights: { A: 2, D: 1, S: 1, M: 1 },
      archetypes: { A: 2, W: 1 },
      colors: ["#8793a4", "#333d51"],
      superpower: "Noticing details and asking the useful second question.",
      move: "You observe, gather clues, and test what the evidence says.",
      chaos: "A tiny inconsistency can send you into a full investigation.",
      warning: "The case can wait long enough for a snack break.",
      blurb: "Careful observation and critical thinking help you uncover what others might overlook."
    },
    {
      id: "peni",
      name: "Peni Parker",
      title: "The Techie Spidey",
      file: "peni-parker.jpg",
      weights: { A: 2, C: 1, S: 2, E: 1 },
      archetypes: { A: 1, V: 1 },
      colors: ["#df6677", "#555fc4"],
      superpower: "Seeing how systems fit together and how to improve them.",
      move: "You break a tough problem into logical, workable parts.",
      chaos: "You might optimise the process before anyone asked for version two.",
      warning: "The best solution still needs a human-friendly interface.",
      blurb: "Systems thinking and practical problem-solving turn complicated ideas into something that works."
    },
    {
      id: "ham",
      name: "Spider-Ham",
      title: "The Chaos Spidey",
      file: "spider-ham.jpg",
      weights: { C: 1, D: 2, I: 1, M: 1 },
      archetypes: { W: 2, C: 1 },
      colors: ["#d85c71", "#9d4777"],
      superpower: "Finding a surprising way through a changing situation.",
      move: "You stay flexible and bring a playful spark to the team.",
      chaos: "The detour may become more memorable than the destination.",
      warning: "Keep one eye on the mission while chasing the funny idea.",
      blurb: "Spontaneity, humour, and adaptability help you keep momentum when the plot gets weird."
    }
  ];

  const dimensionNames = {
    A: "analytical thinking",
    P: "people energy",
    C: "creativity",
    E: "execution",
    S: "strategic structure",
    I: "initiative",
    D: "adaptability",
    M: "communication"
  };
  let artworkManifest;

  function answerSignal(option) {
    const [text, ebDims, , archetype] = option.split("|");
    return { text, dimensions: ebDims, archetype };
  }

  function score(answers, questions) {
    const scored = profiles.map(profile => {
      let total = 0;
      let maximum = 0;
      answers.forEach((choice, questionIndex) => {
        const options = questions[questionIndex][1];
        const signals = options.map(answerSignal);
        const points = signal => [...signal.dimensions].reduce(
          (sum, dimension) => sum + (profile.weights[dimension] || 0),
          0
        ) + (profile.archetypes[signal.archetype] || 0);
        total += points(signals[choice]);
        maximum += Math.max(...signals.map(points));
      });
      return { ...profile, score: maximum ? Math.round(total / maximum * 100) : 0 };
    }).sort((a, b) => b.score - a.score || profiles.indexOf(a) - profiles.indexOf(b));

    const primary = scored[0];
    const secondary = scored[1] && primary.score - scored[1].score <= 4 ? scored[1] : null;
    return { primary, secondary, ranked: scored };
  }

  function traits(dimensions) {
    const values = Object.entries(dimensions)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([key]) => dimensionNames[key]);
    return values;
  }

  function artUrl(profile) {
    return `assets/spider-verse/${profile.file}`;
  }

  async function availableArt(profile) {
    try {
      artworkManifest ||= fetch("assets/spider-verse/artwork.json").then(response => {
        if (!response.ok) throw new Error(`Artwork manifest returned HTTP ${response.status}`);
        return response.json();
      });
      const { available } = await artworkManifest;
      return Array.isArray(available) && available.includes(profile.file);
    } catch (error) {
      console.error("Could not read the Spider-Verse artwork manifest:", error);
      return false;
    }
  }

  window.SpiderVerse = { profiles, score, traits, artUrl, availableArt };
})();
