"use strict";

(() => {
  const tasks = [
    ["CloseBlenderLid", "Close blender lid", "Closing / opening lids", 2, 3],
    ["CloseFridge", "Close fridge", "Opening / closing doors", 14, 61],
    ["CloseToasterOvenDoor", "Close toaster oven door", "Opening / closing doors", 51, 37],
    ["CoffeeSetupMug", "Coffee setup mug", "Insertion", 10, 37],
    ["OpenCabinet", "Open cabinet", "Opening / closing doors", 31, 24],
    ["OpenDrawer", "Open drawer", "Opening / closing drawers", 25, 70],
    ["OpenStandMixerHead", "Open stand mixer head", "Closing / opening lids", 30, 69],
    ["PickPlaceCounterToCabinet", "Counter → cabinet", "Pick and place", 31, 43],
    ["PickPlaceCounterToStove", "Counter → stove", "Pick and place", 22, 45],
    ["PickPlaceDrawerToCounter", "Drawer → counter", "Pick and place", 15, 7],
    ["PickPlaceSinkToCounter", "Sink → counter", "Pick and place", 24, 74],
    ["PickPlaceToasterToCounter", "Toaster → counter", "Pick and place", 28, 72],
    ["SlideDishwasherRack", "Slide dishwasher rack", "Sliding racks", 32, 61],
    ["TurnOffStove", "Turn off stove", "Twisting knobs", 5, 18],
    ["TurnOnElectricKettle", "Turn on electric kettle", "Pressing buttons", 35, 45],
    ["TurnOnMicrowave", "Turn on microwave", "Pressing buttons", 27, 26],
    ["TurnOnSinkFaucet", "Turn on sink faucet", "Turning levers", 25, 37]
  ];
  const familyOrder = ["Pick and place", "Opening / closing doors", "Closing / opening lids", "Pressing buttons", "Opening / closing drawers", "Sliding racks", "Twisting knobs", "Turning levers", "Insertion"];
  const average = values => values.reduce((sum, value) => sum + value, 0) / values.length;
  const percent = value => `${Number(value.toFixed(1))}%`;
  const families = familyOrder.map(name => {
    const members = tasks.filter(task => task[2] === name);
    return [name, average(members.map(task => task[3])), average(members.map(task => task[4]))];
  });
  const benchmarks = {
    robocasa: {
      baseline: average(tasks.map(task => task[3])), cwam: average(tasks.map(task => task[4])),
      kicker: "MACRO SUCCESS · 17 TASKS", description: "100 episodes per task · 1,700 episodes per policy",
      note: "CWAM improves 13 of 17 individual tasks. Family values are unweighted task means.",
      rows: () => document.querySelector("#result-group").value === "tasks" ? tasks.map(task => [task[1], task[3], task[4]]) : families
    },
    libero: {
      baseline: 93, cwam: 97.75, kicker: "SUITE-MACRO SUCCESS · 40 TASKS",
      description: "4 suites · 100 episodes per task · 4,000 episodes per policy",
      note: "Suite rates follow the rounded values reported in the manuscript assets. The summary averages these four suites.",
      rows: () => [["LIBERO-Spatial", 94, 98], ["LIBERO-Object", 98, 100], ["LIBERO-Goal", 86, 95], ["LIBERO-10", 94, 98]]
    },
    real: {
      baseline: 46, cwam: 82, kicker: "CLOSED-LOOP SUCCESS · STACK CUBE",
      description: "Franka manipulation · 50 trials per policy",
      note: "23 / 50 successful trials for Cosmos 3 and 41 / 50 for CWAM on the stack-cube task.",
      rows: () => [["Stack cube", 46, 82]]
    }
  };
  let activeBenchmark = "robocasa";
  function makeBar(value, label, className = "") {
    const track = document.createElement("div");
    track.className = "bar-track";
    const bar = document.createElement("div");
    bar.className = `chart-bar ${className} ${value >= 88 ? "long" : ""}`;
    bar.style.width = `${value}%`;
    bar.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    text.className = "bar-value";
    text.textContent = percent(value);
    bar.append(text);
    track.append(bar);
    return track;
  }
  function renderBenchmark(name) {
    activeBenchmark = name;
    const data = benchmarks[name];
    document.querySelectorAll("[data-benchmark]").forEach(button => {
      const selected = button.dataset.benchmark === name;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    document.querySelector("#benchmark-panel").setAttribute("aria-labelledby", `tab-${name}`);
    document.querySelector("#baseline-score").textContent = `${data.baseline.toFixed(1)}%`;
    document.querySelector("#cwam-score").textContent = `${data.cwam.toFixed(1)}%`;
    document.querySelector("#gain-score").textContent = `+${(data.cwam - data.baseline).toFixed(1)}`;
    document.querySelector("#result-kicker").textContent = data.kicker;
    document.querySelector("#result-description").textContent = data.description;
    document.querySelector("#result-note").textContent = data.note;
    document.querySelector("#group-control").hidden = name !== "robocasa";
    const chart = document.querySelector("#result-chart");
    chart.replaceChildren();
    chart.setAttribute("aria-label", `${name === "robocasa" ? "RoboCasa365" : name === "libero" ? "LIBERO" : "Real robot"} success rate comparison`);
    for (const [label, baseline, cwam] of data.rows()) {
      const row = document.createElement("div");
      row.className = "chart-row";
      row.setAttribute("role", "img");
      row.setAttribute("aria-label", `${label}: Cosmos 3 ${percent(baseline)}, CWAM ${percent(cwam)}`);
      const title = document.createElement("span");
      title.className = "chart-row-label";
      title.textContent = label;
      const pair = document.createElement("div");
      pair.className = "bar-pair";
      pair.append(makeBar(baseline, "Cosmos 3"), makeBar(cwam, "CWAM", "cwam"));
      row.append(title, pair);
      chart.append(row);
    }
  }
  const tabs = [...document.querySelectorAll("[data-benchmark]")];
  tabs.forEach((button, index) => {
    button.addEventListener("click", () => renderBenchmark(button.dataset.benchmark));
    button.addEventListener("keydown", event => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        tabs[next].focus();
        renderBenchmark(tabs[next].dataset.benchmark);
      }
    });
  });
  document.querySelector("#result-group").addEventListener("change", () => renderBenchmark(activeBenchmark));
  const table = document.querySelector("#task-table");
  tasks.forEach(([id, label, family, baseline, cwam]) => {
    const row = document.createElement("tr");
    const difference = cwam - baseline;
    for (const [index, text] of [id, percent(baseline), percent(cwam), `${difference > 0 ? "+" : ""}${difference} pp`].entries()) {
      const cell = document.createElement(index === 0 ? "th" : "td");
      if (index === 0) cell.scope = "row";
      cell.textContent = text;
      if (index === 3) cell.className = difference < 0 ? "gain-negative" : "gain-positive";
      row.append(cell);
    }
    table.append(row);
  });
  const demos = [...document.querySelectorAll(".demo-panel video")];
  const toggleDemos = document.querySelector("#toggle-demos");
  if (toggleDemos && demos.length) {
    const updateDemoControl = () => {
      const playing = demos.some(video => !video.paused && !video.ended);
      toggleDemos.textContent = playing ? "Pause demos" : "Play demos";
      toggleDemos.setAttribute("aria-pressed", String(!playing));
    };
    demos.forEach(video => {
      video.addEventListener("play", updateDemoControl);
      video.addEventListener("pause", updateDemoControl);
      video.addEventListener("ended", updateDemoControl);
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      demos.forEach(video => { video.autoplay = false; video.pause(); });
    }
    toggleDemos.addEventListener("click", async () => {
      if (demos.some(video => !video.paused && !video.ended)) {
        demos.forEach(video => video.pause());
      } else {
        await Promise.allSettled(demos.map(video => video.play()));
      }
      updateDemoControl();
    });
    updateDemoControl();
  }
  document.querySelector("#copy-citation").addEventListener("click", async () => {
    const citation = document.querySelector("#citation-text").textContent.trim();
    const status = document.querySelector("#copy-status");
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(citation);
      status.textContent = "Citation copied.";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(document.querySelector("#citation-text"));
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Citation selected. Press Ctrl+C or use Download BibTeX.";
    }
  });
  const config = window.CWAM_CONFIG || {};
  for (const [id, value] of [["paper-link", config.paperUrl], ["code-link", config.codeUrl]]) {
    if (typeof value !== "string" || !value.trim()) continue;
    try {
      const url = new URL(value);
      if (url.protocol !== "https:" && url.protocol !== "http:") continue;
      const link = document.getElementById(id);
      link.href = url.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.hidden = false;
    } catch { /* Keep unconfigured or invalid publication links hidden. */ }
  }
  const dialog = document.querySelector("#image-dialog");
  document.querySelector(".overview-link").addEventListener("click", event => {
    if (typeof dialog.showModal !== "function" || event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    dialog.showModal();
  });
  document.querySelector("#close-image").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  renderBenchmark("robocasa");
})();
