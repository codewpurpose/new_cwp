(function () {
  "use strict";

  var RAIL_ID = "cwp-lesson-rail";
  var BODY_CLASS = "cwp-lesson-chrome";

  var scrollSpy = null;
  var mutationObserver = null;

  function lessonSlug() {
    var parts = window.location.pathname.split("/").filter(Boolean);
    var learnIndex = parts.indexOf("learn");
    return learnIndex >= 0 && parts[learnIndex + 2]
      ? parts[learnIndex + 2]
      : "lesson";
  }

  function addLessonHooks() {
    var slug = lessonSlug();
    document.documentElement.dataset.cwpLesson = slug;
    document.body.dataset.cwpLesson = slug;
    document.body.classList.add(BODY_CLASS, "cwp-lesson-" + slug);
  }

  function createMasthead() {
    if (document.querySelector(".cwp-lesson-masthead")) {
      return;
    }

    var masthead = document.createElement("div");
    masthead.className = "cwp-lesson-masthead";
    masthead.setAttribute("role", "presentation");

    var mark = document.createElement("img");
    mark.src = "/learn/ml/assets/cwp-logo-mark.svg";
    mark.alt = "";
    mark.setAttribute("aria-hidden", "true");

    var copy = document.createElement("div");
    copy.className = "cwp-lesson-masthead-copy";

    var kicker = document.createElement("span");
    kicker.className = "cwp-lesson-masthead-kicker";
    kicker.textContent = "CodeWithPurpose · ML visual lesson";

    var title = document.createElement("span");
    title.className = "cwp-lesson-masthead-title";
    title.textContent = "Made by CodeWithPurpose Team";

    var homeLink = document.createElement("a");
    homeLink.className = "cwp-lesson-home-link";
    homeLink.href = "/";
    homeLink.textContent = "Back to Home";
    homeLink.setAttribute("aria-label", "Back to CodeWithPurpose home");

    copy.appendChild(kicker);
    copy.appendChild(title);
    masthead.appendChild(mark);
    masthead.appendChild(copy);
    masthead.appendChild(homeLink);
    document.body.insertBefore(masthead, document.body.firstChild);
  }

  function trimText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function normalizeLabel(label) {
    var cleaned = trimText(label);
    if (!cleaned || /^codewithpurpose$/i.test(cleaned)) {
      return "Introduction";
    }
    return cleaned;
  }

  function headingFromSection(section) {
    var heading = section.querySelector("h1, h2");
    if (!heading) {
      return null;
    }
    return normalizeLabel(heading.textContent);
  }

  function discoverFromToc() {
    var links = document.querySelectorAll("#toc a[href^=\"#\"]");
    if (!links.length) {
      return [];
    }

    var items = [];
    var seen = new Set();

    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }
      var id = href.slice(1);
      if (!id || seen.has(id)) {
        return;
      }
      seen.add(id);
      var label = normalizeLabel(link.textContent);
      if (isSkippedSection(id, label)) {
        return;
      }
      items.push({
        id: id,
        label: label,
      });
    });

    return items;
  }

  function discoverFromIntro() {
    var intro = document.getElementById("intro");
    if (!intro) {
      return null;
    }
    return {
      id: "intro",
      label: "Introduction",
      element: intro,
    };
  }

  function discoverFromIntroSubheadings() {
    var intro = document.getElementById("intro");
    if (!intro) {
      return [];
    }

    var headings = intro.querySelectorAll(
      "h2.subtitle, h2:not(.logo):not(.cwp-brand-name)"
    );
    if (headings.length < 2) {
      return [];
    }

    var items = [
      {
        id: "intro",
        label: "Introduction",
        element: intro,
      },
    ];

    headings.forEach(function (heading, index) {
      if (!heading.id) {
        heading.id = "cwp-intro-h2-" + (index + 1);
      }
      var label = normalizeLabel(heading.textContent);
      if (isSkippedSection(heading.id, label)) {
        return;
      }
      items.push({
        id: heading.id,
        label: label,
        element: heading,
      });
    });

    return items;
  }

  function discoverFromArticleSections() {
    var sections = document.querySelectorAll(
      "article section[id], main > section[id]"
    );
    var items = [];
    var seen = new Set();

    sections.forEach(function (section) {
      var id = section.id;
      if (!id || seen.has(id)) {
        return;
      }
      if (id === "resources" || id === "outro" || id === "references") {
        return;
      }
      var label = headingFromSection(section);
      if (!label || isSkippedSection(id, label)) {
        return;
      }
      seen.add(id);
      items.push({
        id: id,
        label: id === "intro" ? "Introduction" : label,
        element: section,
      });
    });

    return items;
  }

  function discoverFromSteps() {
    var steps = document.querySelectorAll(".step[data-step]");
    var items = [];

    steps.forEach(function (step, index) {
      if (!step.id) {
        step.id = "cwp-step-" + (index + 1);
      }

      var label = "";
      var head = step.querySelector(".step-head");
      if (head) {
        label = trimText(head.textContent);
      }
      if (!label) {
        var firstP = step.querySelector("p");
        label = firstP ? trimText(firstP.textContent).slice(0, 80) : "";
      }
      if (!label) {
        label = "Step " + (index + 1);
      }

      items.push({
        id: step.id,
        label: normalizeLabel(label),
        element: step,
      });
    });

    return items.filter(function (item) {
      return !isSkippedSection(item.id, item.label);
    });
  }

  function discoverFromBodyHeaders() {
    var headers = document.querySelectorAll("h3.body-header");
    var items = [];

    headers.forEach(function (header, index) {
      var section = header.closest("section") || header.parentElement;
      var id = section && section.id ? section.id : header.id;

      if (!id) {
        id = "cwp-section-" + (index + 1);
        if (section) {
          section.id = id;
        } else {
          header.id = id;
          section = header;
        }
      }

      items.push({
        id: id,
        label: normalizeLabel(header.textContent),
        element: section || header,
      });
    });

    return items;
  }

  function prependIntro(items) {
    var intro = discoverFromIntro();
    if (!intro) {
      return items;
    }
    if (items.some(function (item) { return item.id === intro.id; })) {
      return items;
    }
    return [intro].concat(items);
  }

  function discoverSections() {
    var toc = discoverFromToc();
    if (toc.length) {
      return toc;
    }

    var steps = discoverFromSteps();
    if (steps.length >= 2) {
      return prependIntro(steps);
    }

    var bodyHeaders = discoverFromBodyHeaders();
    if (bodyHeaders.length >= 2) {
      return bodyHeaders;
    }

    var sections = discoverFromArticleSections();
    if (sections.length) {
      return sections;
    }

    var introSubheadings = discoverFromIntroSubheadings();
    if (introSubheadings.length) {
      return introSubheadings;
    }

    if (steps.length) {
      return prependIntro(steps);
    }

    if (bodyHeaders.length) {
      return bodyHeaders;
    }

    var intro = discoverFromIntro();
    return intro ? [intro] : [];
  }

  function resolveElement(item) {
    if (item.element) {
      return item.element;
    }
    return document.getElementById(item.id);
  }

  function removeDuplicateRails() {
    var rails = document.querySelectorAll("#" + RAIL_ID);
    for (var i = 1; i < rails.length; i++) {
      rails[i].remove();
    }
  }

  function createRailItem(section) {
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#" + section.id;
    link.dataset.sectionId = section.id;
    link.setAttribute("aria-label", section.label);
    link.title = section.label;

    var line = document.createElement("span");
    line.className = "cwp-rail-line";
    line.setAttribute("aria-hidden", "true");

    link.appendChild(line);
    link.addEventListener("click", onRailClick);
    li.appendChild(link);
    return li;
  }

  function createRail(sections) {
    var existing = document.getElementById(RAIL_ID);
    if (existing) {
      return existing;
    }

    var rail = document.createElement("nav");
    rail.id = RAIL_ID;
    rail.className = "cwp-lesson-rail";
    rail.setAttribute("aria-label", "Lesson sections");

    var list = document.createElement("ul");
    list.className = "cwp-rail-list";

    sections.forEach(function (section) {
      list.appendChild(createRailItem(section));
    });

    rail.appendChild(list);
    document.body.appendChild(rail);
    return rail;
  }

  function updateRailList(sections) {
    var rail = document.getElementById(RAIL_ID);
    if (!rail) {
      return;
    }

    var list = rail.querySelector(".cwp-rail-list");
    if (!list) {
      return;
    }

    list.innerHTML = "";
    sections.forEach(function (section) {
      list.appendChild(createRailItem(section));
    });
  }

  function onRailClick(event) {
    event.preventDefault();
    var id = event.currentTarget.dataset.sectionId;
    var target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });

    var links = document.querySelectorAll(".cwp-rail-list a");
    links.forEach(function (link) {
      link.classList.toggle("active", link.dataset.sectionId === id);
    });
  }

  function setupScrollSpy(sections) {
    if (scrollSpy) {
      scrollSpy.disconnect();
      scrollSpy = null;
    }

    var elements = sections
      .map(function (item) {
        return resolveElement(item);
      })
      .filter(Boolean);

    if (!elements.length) {
      return;
    }

    var links = document.querySelectorAll(".cwp-rail-list a");
    if (!links.length) {
      return;
    }

    var visible = new Map();

    scrollSpy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible.set(entry.target.id, entry.isIntersecting);
        });

        var activeId = null;
        for (var i = 0; i < sections.length; i++) {
          var el = resolveElement(sections[i]);
          if (el && visible.get(el.id)) {
            activeId = el.id;
          }
        }

        if (!activeId && elements.length) {
          activeId = elements[0].id;
        }

        links.forEach(function (link) {
          link.classList.toggle(
            "active",
            link.dataset.sectionId === activeId
          );
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach(function (el) {
      scrollSpy.observe(el);
    });
  }

  function init() {
    removeDuplicateRails();
    addLessonHooks();
    createMasthead();
    return true;
  }

  function isReferencesHeading(text) {
    return /^(references|notes\s*&\s*resources|resources\s*(\+|&)\s*open\s*source|references\s*(\+|&)\s*open\s*source)/i.test(
      trimText(text)
    );
  }

  function isSkippedSection(id, label) {
    if (!id) {
      return isReferencesHeading(label);
    }
    return id === "resources" || id === "outro" || id === "references" || isReferencesHeading(label);
  }

  function hideFollowingSiblings(element) {
    var node = element;
    while (node) {
      node.style.setProperty("display", "none", "important");
      node = node.nextElementSibling;
    }
  }

  function trimReferencesPrefix(element) {
    var prev = element.previousElementSibling;
    while (prev) {
      var tag = prev.tagName;
      if (tag === "HR" || tag === "BR") {
        var toRemove = prev;
        prev = prev.previousElementSibling;
        toRemove.style.setProperty("display", "none", "important");
        continue;
      }
      break;
    }
  }

  function removeReferences() {
    document
      .querySelectorAll("#resources, #outro, section#resources, section#outro")
      .forEach(function (section) {
        section.style.setProperty("display", "none", "important");
        section.setAttribute("aria-hidden", "true");
      });

    document.querySelectorAll("h1, h2, h3").forEach(function (heading) {
      if (!isReferencesHeading(heading.textContent)) {
        return;
      }
      trimReferencesPrefix(heading);
      hideFollowingSiblings(heading);
      heading.style.setProperty("display", "none", "important");
      heading.setAttribute("aria-hidden", "true");
    });
  }

  function removePrecisionRecallEditorialCopy() {
    if (!/precision-recall/.test(window.location.pathname)) {
      return;
    }

    document.querySelectorAll("p, li, section, footer, .outro, .closing").forEach(function (element) {
      var text = trimText(element.textContent);
      if (!text) {
        return;
      }

      var authorMarker = ["Jared", "Wilber"].join(" ");
      var dateMarker = ["March", "2022"].join(" ");
      var thanksMarker = ["Thanks", "for", "reading"].join(" ");
      var editorsMarker = ["A special thanks", "to the editors"].join(" ");

      if (text.indexOf(authorMarker) !== -1 || text.indexOf(dateMarker) !== -1) {
        var attribution = element.closest("p, li, header, .byline, .author, .meta");
        if (attribution && attribution !== document.body) {
          attribution.style.setProperty("display", "none", "important");
          attribution.setAttribute("aria-hidden", "true");
        }
      }

      if (text.indexOf(thanksMarker) !== -1 || text.indexOf(editorsMarker) !== -1) {
        var closing = element.closest("p, li, section, footer, .outro, .closing");
        if (closing && closing !== document.body) {
          closing.style.setProperty("display", "none", "important");
          closing.setAttribute("aria-hidden", "true");
        }
      }
    });
  }

  function removeLegacyEndings() {
    document.querySelectorAll("#conclusion").forEach(function (section) {
      if (section.tagName === "SECTION") {
        section.style.setProperty("display", "none", "important");
        section.setAttribute("aria-hidden", "true");
      }
    });

    document.querySelectorAll("h1, h2, h3").forEach(function (heading) {
      if (trimText(heading.textContent) !== "It's Finally Over") {
        return;
      }
      var section = heading.closest("section");
      if (section) {
        section.style.setProperty("display", "none", "important");
        section.setAttribute("aria-hidden", "true");
      }
    });
  }

  function scheduleRetries() {
    [500, 1500].forEach(function (delay) {
      window.setTimeout(function () {
        removeReferences();
        removePrecisionRecallEditorialCopy();
        removeLegacyEndings();
        init();
      }, delay);
    });
  }

  function watchDom() {
    if (mutationObserver) {
      return;
    }

    mutationObserver = new MutationObserver(function () {
      removeReferences();
      removePrecisionRecallEditorialCopy();
      removeLegacyEndings();
      createMasthead();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function boot() {
    removeReferences();
    removePrecisionRecallEditorialCopy();
    removeLegacyEndings();
    init();
    scheduleRetries();
    watchDom();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
