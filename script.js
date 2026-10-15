"use strict";

/* ==================================================
   01. PROJECT CONTENT
   Edit these details to update the project popups.
================================================== */

const projects = {
  requests: {
    title: "Operations Request Management",
    category: "OPERATIONS AUTOMATION · ZAPIER",
    status: "Personal practice project · Completed & tested",

    image: "images/request-workflow.png",
    imageAlt: "Screenshot of the operations request management workflow",

    overview:
      "A connected workflow built with Google Forms, Google Sheets, " +
      "Zapier, and Gmail to organize incoming operations requests. " +
      "The system records submissions, sends notifications, and " +
      "tracks request statuses and priorities.",

    tools: [
      "Google Forms",
      "Google Sheets",
      "Zapier",
      "Gmail"
    ],

    skills: [
      "Workflow automation",
      "Spreadsheet organization",
      "Request tracking",
      "Email notifications",
      "Status automation"
    ],

    deliverablesTitle: "Deliverables",

    deliverables: [
      "Automated request recording",
      "Automatic request ID generation",
      "Email notifications for new requests",
      "Priority highlighting",
      "Status tracking and status automation",
      "Dashboard reporting"
    ],

    note:
      "Completed and tested as a personal practice project. " +
      "The fallback preview is an illustrative workflow diagram."
  },

  crm: {
    title: "Lead Management CRM",
    category: "LEAD MANAGEMENT · MAKE",
    status: "Personal practice project",

    image: "images/lead-crm.png",
    imageAlt: "Screenshot of the lead management CRM spreadsheet",

    overview:
      "A personal practice project for organizing incoming leads " +
      "using Google Forms, Google Sheets, Make, and Gmail. " +
      "The workflow combines lead records, automatic lead IDs, " +
      "email responses, and follow-up date tracking.",

    tools: [
      "Make",
      "Google Sheets",
      "Google Forms",
      "Gmail"
    ],

    skills: [
      "Workflow automation",
      "Data organization",
      "Spreadsheet formulas",
      "Lead tracking",
      "Email automation"
    ],

    deliverablesTitle: "Project features",

    deliverables: [
      "Structured lead records",
      "Automatic lead ID generation",
      "Automated email responses",
      "Last-contacted date updates",
      "Follow-up date tracking"
    ],

    note:
      "Built as a personal practice project. The fallback stage-board " +
      "preview illustrates an organizational concept rather than live records."
  }
};


/* ==================================================
   02. FOOTER YEAR
================================================== */

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ==================================================
   03. MOBILE NAVIGATION
================================================== */

const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

function closeMenu() {
  if (!menuButton || !mainNav) return;

  menuButton.setAttribute("aria-expanded", "false");
  mainNav.classList.remove("is-open");
}

if (menuButton && mainNav) {
  // Enables the collapsible mobile menu styles.
  document.documentElement.classList.add("js");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") !== "true";

    menuButton.setAttribute("aria-expanded", String(isOpen));
    mainNav.classList.toggle("is-open", isOpen);
  });

  // Close after selecting a section.
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Escape closes the menu and returns focus to its button.
  document.addEventListener("keydown", event => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    if (event.key === "Escape" && isOpen) {
      closeMenu();
      menuButton.focus();
    }
  });
}


/* ==================================================
   04. PROJECT IMAGE LOADING
   Missing screenshots leave the illustrations visible.
================================================== */

function loadImage(container, source, description, onSuccess) {
  if (!container || !source) return;

  const image = new Image();

  image.alt = description || "";
  image.decoding = "async";

  image.onload = () => {
    if (onSuccess) {
      onSuccess(image);
    } else {
      container.replaceChildren(image);
    }
  };

  image.src = source;
}

document.querySelectorAll("[data-screenshot]").forEach(container => {
  loadImage(
    container,
    container.dataset.screenshot,
    container.dataset.alt
  );
});


/* ==================================================
   05. PROJECT FILTERS
================================================== */

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");
const filterStatus = document.querySelector("#filter-status");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;
    let visibleCount = 0;

    // Update the selected filter's appearance.
    filterButtons.forEach(filter => {
      filter.setAttribute("aria-pressed", String(filter === button));
    });

    // Show projects matching the selected category.
    projectCards.forEach(card => {
      const matches =
        selectedCategory === "all" ||
        selectedCategory === card.dataset.category;

      card.hidden = !matches;

      if (matches) visibleCount++;
    });

    // Announce the result to screen readers.
    if (filterStatus) {
      const label = visibleCount === 1 ? "project" : "projects";
      filterStatus.textContent = `${visibleCount} ${label} shown`;
    }
  });
});


/* ==================================================
   06. PROJECT POPUP HELPERS
================================================== */

const modal = document.querySelector("#project-modal");
const modalPreview = document.querySelector("#modal-preview");

// Identifies the latest image request.
let previewRequest = 0;

function setText(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

function fillTags(selector, items) {
  const container = document.querySelector(selector);

  if (!container) return;

  container.replaceChildren();

  items.forEach(item => {
    const tag = document.createElement("span");
    tag.textContent = item;
    container.append(tag);
  });
}

function fillDeliverables(items) {
  const list = document.querySelector("#modal-deliverables");

  if (!list) return;

  list.replaceChildren();

  items.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.append(listItem);
  });
}


/* ==================================================
   07. OPEN A PROJECT
================================================== */

function openProject(key) {
  const project = projects[key];

  if (!project || !modal || !modalPreview) return;

  // Fill the popup with the selected project's details.
  setText("#modal-title", project.title);
  setText("#modal-category", project.category);
  setText("#modal-status", project.status);
  setText("#modal-overview", project.overview);
  setText("#modal-note", project.note);
  setText("#modal-deliverables-title", project.deliverablesTitle);

  fillTags("#modal-tools", project.tools);
  fillTags("#modal-skills", project.skills);
  fillDeliverables(project.deliverables);

  // Remove the previous project's preview.
  modalPreview.replaceChildren();
  modalPreview.classList.remove("has-screenshot");

  // Show the matching illustration until a screenshot loads.
  const cardPreview = document.querySelector(
    `.project-preview[data-project="${key}"] .preview-illustration`
  );

  if (cardPreview) {
    modalPreview.append(cardPreview.cloneNode(true));
  }

  // Ignore an older image if another project has since opened.
  const currentRequest = ++previewRequest;

  loadImage(
    modalPreview,
    project.image,
    project.imageAlt,
    image => {
      if (currentRequest !== previewRequest) return;

      modalPreview.replaceChildren(image);
      modalPreview.classList.add("has-screenshot");
    }
  );

  if (!modal.open) {
    modal.showModal();
  }

  modal.scrollTop = 0;
  document.body.classList.add("dialog-open");
}

// Connect both the preview buttons and the project links.
document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => {
    openProject(button.dataset.project);
  });
});


/* ==================================================
   08. CLOSE THE PROJECT POPUP
================================================== */

if (modal) {
  modal.querySelectorAll(
    ".modal-close, .modal-bottom-close"
  ).forEach(button => {
    button.addEventListener("click", () => {
      modal.close();
    });
  });

  // Also runs when Escape closes the native dialog.
  modal.addEventListener("close", () => {
    previewRequest++;
    document.body.classList.remove("dialog-open");
  });

  // Clicking outside the dialog closes it.
  // Clicking inside its padding keeps it open.
  let backdropPress = false;

  function isOutsideDialog(event) {
    const bounds = modal.getBoundingClientRect();

    return (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    );
  }

  modal.addEventListener("pointerdown", event => {
    backdropPress =
      event.target === modal &&
      isOutsideDialog(event);
  });

  modal.addEventListener("pointercancel", () => {
    backdropPress = false;
  });

  modal.addEventListener("click", event => {
    const clickedBackdrop =
      backdropPress &&
      event.target === modal &&
      isOutsideDialog(event);

    if (clickedBackdrop) {
      modal.close();
    }

    backdropPress = false;
  });
}


/* ==================================================
   TOOLKIT NOTE
   Movement and hover-to-pause are handled in CSS.
   No pause button or toolkit JavaScript is needed.
================================================== */