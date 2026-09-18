/*
 * Growing Up Online — templating + rendering layer.
 *
 * Loads JSON data files over HTTP (fetch), runs a small hand-written
 * validator over the shape Handlebars is about to receive, and only
 * then compiles + renders the Handlebars template already embedded
 * in the page. If validation fails, the page shows a plain-language
 * error banner instead of letting Handlebars fail on bad data.
 */

/**
 * Checks that a single timeline/era event object has every field the
 * templates rely on, with the right type. Returns a list of problem
 * strings (empty list = valid).
 */
function validateEvent(event, index) {
  const problems = [];
  const where = `events[${index}]`;

  if (typeof event !== "object" || event === null) {
    return [`${where} is not an object`];
  }
  if (typeof event.year !== "number") {
    problems.push(`${where}.year must be a number`);
  }
  if (typeof event.headline !== "string" || event.headline.trim() === "") {
    problems.push(`${where}.headline must be a non-empty string`);
  }
  if (typeof event.detail !== "string" || event.detail.trim() === "") {
    problems.push(`${where}.detail must be a non-empty string`);
  }
  if (typeof event.sourceName !== "string" || event.sourceName.trim() === "") {
    problems.push(`${where}.sourceName must be a non-empty string`);
  }
  if (typeof event.sourceUrl !== "string" || !/^https?:\/\//.test(event.sourceUrl)) {
    problems.push(`${where}.sourceUrl must be a full http(s) URL`);
  }
  return problems;
}

/**
 * Validates the JSON shape expected by an era page (broadband,
 * mobile, streaming, ai-era). Used before any Handlebars rendering
 * happens, per the assessment's JSON-validation requirement.
 */
function validateEraData(data) {
  const problems = [];

  if (typeof data !== "object" || data === null) {
    return { valid: false, problems: ["Root data is not an object"] };
  }
  if (typeof data.meta !== "object" || data.meta === null) {
    problems.push("meta object is missing");
  } else {
    if (typeof data.meta.pageTitle !== "string" || data.meta.pageTitle.trim() === "") {
      problems.push("meta.pageTitle must be a non-empty string");
    }
    if (typeof data.meta.eraLabel !== "string" || data.meta.eraLabel.trim() === "") {
      problems.push("meta.eraLabel must be a non-empty string");
    }
    if (!Array.isArray(data.meta.intro) || data.meta.intro.length === 0) {
      problems.push("meta.intro must be a non-empty array of paragraph strings");
    }
  }
  if (!Array.isArray(data.events) || data.events.length === 0) {
    problems.push("events must be a non-empty array");
  } else {
    data.events.forEach((event, index) => {
      problems.push(...validateEvent(event, index));
    });
  }

  return { valid: problems.length === 0, problems };
}

/** Validates the JSON shape expected by the home page timeline strip. */
function validateTimelineData(data) {
  const problems = [];

  if (typeof data !== "object" || data === null) {
    return { valid: false, problems: ["Root data is not an object"] };
  }
  if (!Array.isArray(data.highlights) || data.highlights.length === 0) {
    problems.push("highlights must be a non-empty array");
    return { valid: false, problems };
  }
  data.highlights.forEach((item, index) => {
    const where = `highlights[${index}]`;
    if (typeof item.year !== "number") problems.push(`${where}.year must be a number`);
    if (typeof item.headline !== "string" || item.headline.trim() === "") {
      problems.push(`${where}.headline must be a non-empty string`);
    }
    if (typeof item.era !== "string" || item.era.trim() === "") {
      problems.push(`${where}.era must be a non-empty string`);
    }
    if (typeof item.page !== "string" || item.page.trim() === "") {
      problems.push(`${where}.page must be a non-empty string`);
    }
  });

  return { valid: problems.length === 0, problems };
}

/** Shows a red error banner inside `containerEl` listing what failed validation. */
function showDataError(containerEl, problems) {
  const banner = document.createElement("div");
  banner.className = "data-status is-error";
  banner.setAttribute("role", "alert");
  banner.innerHTML =
    "<strong>This page's data could not be displayed.</strong> " +
    "The JSON file did not pass validation, so nothing was rendered from it, to avoid showing broken or missing information:" +
    "<ul>" +
    problems.map((p) => `<li>${p}</li>`).join("") +
    "</ul>";
  containerEl.innerHTML = "";
  containerEl.appendChild(banner);
}

/**
 * Fetches an era page's JSON data file, validates it, and — only if
 * valid — compiles the page's Handlebars templates and renders the
 * hero and event list into the given container elements.
 */
async function renderEraPage({ jsonPath, heroContainerId, eventsContainerId, pageTitleElId, eraLabelElId }) {
  const eventsContainer = document.getElementById(eventsContainerId);
  const heroContainer = document.getElementById(heroContainerId);

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} while fetching ${jsonPath}`);
    }
    const data = await response.json();

    const { valid, problems } = validateEraData(data);
    if (!valid) {
      showDataError(eventsContainer, problems);
      return;
    }

    const heroTemplateSrc = document.getElementById("hero-template").innerHTML;
    const eventTemplateSrc = document.getElementById("event-card-template").innerHTML;
    const heroTemplate = Handlebars.compile(heroTemplateSrc);
    const eventTemplate = Handlebars.compile(eventTemplateSrc);

    // The <h1> and era-label pill are set directly (not through Handlebars) so a
    // real level-1 heading already exists in the static HTML before this script
    // runs, keeping the page valid even a moment before the fetch resolves.
    document.getElementById(pageTitleElId).textContent = data.meta.pageTitle;
    document.getElementById(eraLabelElId).textContent = data.meta.eraLabel;
    document.title = `${data.meta.pageTitle} — Growing Up Online`;

    if (heroContainer) {
      heroContainer.className = "";
      heroContainer.innerHTML = heroTemplate(data.meta);
    }

    const sortedEvents = [...data.events].sort((a, b) => a.year - b.year);
    eventsContainer.innerHTML = sortedEvents.map((event) => eventTemplate(event)).join("");
  } catch (error) {
    showDataError(eventsContainer, [String(error.message || error)]);
  }
}

/** Fetches, validates and renders the home page's highlight timeline. */
async function renderTimeline({ jsonPath, containerId }) {
  const container = document.getElementById(containerId);

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} while fetching ${jsonPath}`);
    }
    const data = await response.json();

    const { valid, problems } = validateTimelineData(data);
    if (!valid) {
      showDataError(container, problems);
      return;
    }

    const itemTemplateSrc = document.getElementById("timeline-item-template").innerHTML;
    const itemTemplate = Handlebars.compile(itemTemplateSrc);

    const sorted = [...data.highlights].sort((a, b) => a.year - b.year);
    container.innerHTML = sorted.map((item) => itemTemplate(item)).join("");
  } catch (error) {
    showDataError(container, [String(error.message || error)]);
  }
}
