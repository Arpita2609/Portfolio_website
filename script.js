/* =========================================================
   NAVBAR MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

/* =========================================================
   MOTION REVEALS
========================================================= */

const revealSections = document.querySelectorAll(".section");

if (revealSections.length) {
  document.body.classList.add("motion-ready");
  revealSections.forEach((section) => section.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealSections.forEach((section) => revealObserver.observe(section));
  } else {
    revealSections.forEach((section) => section.classList.add("is-visible"));
  }
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
      menuBtn.setAttribute("aria-label", "Close menu");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
      menuBtn.setAttribute("aria-label", "Open menu");
    }
  });

  // Close menu after clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");

      const icon = menuBtn.querySelector("i");

      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");

      menuBtn.setAttribute("aria-label", "Open menu");
    });
  });
}


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navItems.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingElement = document.getElementById("typing");

const typingWords = [
  "Web Developer",
  "Python Developer",
  "AI & ML Enthusiast",
  "Computer Vision Enthusiast"
];

let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentWord = typingWords[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(
      0,
      characterIndex + 1
    );

    characterIndex++;

    if (characterIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(
      0,
      characterIndex - 1
    );

    characterIndex--;

    if (characterIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }

  const speed = isDeleting ? 60 : 100;

  setTimeout(typeEffect, speed);
}

typeEffect();


/* =========================================================
   PROJECT MODAL
========================================================= */

function openProject(
  title,
  category,
  description,
  result,
  technologies,
  image
) {
  const modal = document.getElementById("projectModal");

  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalDescription = document.getElementById("modalDescription");
  const modalResult = document.getElementById("modalResult");
  const modalTech = document.getElementById("modalTech");
  const modalImage = document.getElementById("modalImage");

  if (!modal) return;

  modalTitle.textContent = title;
  modalCategory.textContent = category;
  modalDescription.textContent = description;
  modalResult.textContent = result;
  modalTech.textContent = technologies;

  modalImage.src = image;
  modalImage.alt = title;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


/* =========================================================
   CLOSE PROJECT MODAL
========================================================= */

function closeProject() {
  const modal = document.getElementById("projectModal");

  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


/* Close modal when clicking outside */

const projectModal = document.getElementById("projectModal");

if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      closeProject();
    }
  });
}


/* Close modal with ESC */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProject();
  }
});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

  });

  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });
}


/* =========================================================
   EMAILJS CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("form-status");

if (contactForm) {

  contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const submitButton =
      contactForm.querySelector(".submit-btn");

    /* Prevent multiple submissions */

    if (submitButton.disabled) {
      return;
    }

    /* Loading state */

    submitButton.disabled = true;

    submitButton.innerHTML =
      'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    if (formStatus) {
      formStatus.textContent = "Sending your message...";
      formStatus.className = "sending";
    }


    /*
      IMPORTANT:
      Replace these with your EmailJS details.
    */

    const SERVICE_ID = "service_ay0pwgx";
    const TEMPLATE_ID = "template_zxqj9js";


    emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      contactForm
    )

    .then(function (response) {

      console.log(
        "EmailJS SUCCESS:",
        response.status,
        response.text
      );

      if (formStatus) {
        formStatus.textContent =
          "Message sent successfully! Thank you for contacting me.";
        formStatus.className = "success";
      }

      /* Clear form */

      contactForm.reset();

      /* Restore button */

      submitButton.disabled = false;

      submitButton.innerHTML =
        'Submit <i class="fa-solid fa-paper-plane"></i>';

    })

    .catch(function (error) {

      console.error(
        "EmailJS ERROR:",
        error
      );

      if (formStatus) {

        formStatus.textContent =
          "Failed to send message. Please try again.";

        formStatus.className = "error";

      }

      submitButton.disabled = false;

      submitButton.innerHTML =
        'Submit <i class="fa-solid fa-paper-plane"></i>';

    });

  });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

  anchor.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

  updateActiveNav();

});


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
  "Arpita Bhattacharya Portfolio Loaded Successfully 🚀"
);
