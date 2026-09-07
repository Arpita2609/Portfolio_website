/* =========================================================
   MOBILE NAVBAR
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close menu after clicking a link */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });

}


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingElement = document.getElementById("typing");

const typingWords = [
    "AI & ML Enthusiast",
    "Python Developer",
    "Machine Learning",
    "Web Developer",
    "Computer Vision"
];

let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;


function typeEffect() {

    if (!typingElement) {
        return;
    }

    const currentWord = typingWords[wordIndex];

    /* Typing */

    if (!isDeleting) {

        typingElement.textContent =
            currentWord.substring(0, characterIndex + 1);

        characterIndex++;

        /* Word completed */

        if (characterIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    }

    /* Deleting */

    else {

        typingElement.textContent =
            currentWord.substring(0, characterIndex - 1);

        characterIndex--;

        /* Word deleted */

        if (characterIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length) {
                wordIndex = 0;
            }

        }

    }

    const speed = isDeleting ? 50 : 90;

    setTimeout(typeEffect, speed);
}


/* Start typing effect */

document.addEventListener("DOMContentLoaded", () => {

    setTimeout(typeEffect, 500);

});


/* =========================================================
   PROJECT MODAL
========================================================= */

function openProject(
    title,
    category,
    description,
    result,
    tech,
    image
) {

    const modal =
        document.getElementById("projectModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalResult =
        document.getElementById("modalResult");

    const modalTech =
        document.getElementById("modalTech");


    if (!modal) {
        return;
    }


    /* Add project information */

    if (modalTitle) {
        modalTitle.textContent = title;
    }

    if (modalCategory) {
        modalCategory.textContent = category;
    }

    if (modalDescription) {
        modalDescription.textContent = description;
    }

    if (modalResult) {
        modalResult.textContent = result;
    }

    if (modalTech) {
        modalTech.textContent = tech;
    }


    /* Project image */

    if (modalImage) {

        modalImage.src = image;
        modalImage.alt = title;

    }


    /* Show modal */

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* Close project modal */

function closeProject() {

    const modal =
        document.getElementById("projectModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* Close modal by clicking outside */

const projectModal =
    document.getElementById("projectModal");

if (projectModal) {

    projectModal.addEventListener("click", function(event) {

        if (event.target === projectModal) {
            closeProject();
        }

    });

}


/* Close modal using Escape key */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeProject();
    }

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/* =========================================================
   CONTACT FORM - EMAILJS
========================================================= */

const form =
    document.getElementById("contactForm");

const fMsg =
    document.getElementById("formMessage");


if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();


        /* Correct submit button class */

        const btn =
            form.querySelector(".submit-btn");


        if (!btn) {
            console.error("Submit button not found.");
            return;
        }


        /* Show sending status */

        btn.disabled = true;

        btn.innerHTML =
            'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';


        try {

            /* Send form using EmailJS */

            await emailjs.sendForm(
                "service_ay0pwgx",
                "template_zxqj9js",
                form
            );


            /* Success message */

            if (fMsg) {

                fMsg.textContent =
                    "✓ Message sent! I'll get back to you soon.";

                fMsg.style.color =
                    "var(--teal)";

            }


            /* Clear form */

            form.reset();


        } catch (error) {

            console.error("EmailJS Error:", error);


            /* Error message */

            if (fMsg) {

                fMsg.textContent =
                    "✗ Failed to send. Please try again.";

                fMsg.style.color =
                    "var(--rose)";

            }

        } finally {

            /* Restore button */

            btn.disabled = false;

            btn.innerHTML =
                'Send Message <i class="fa-solid fa-paper-plane"></i>';


            /* Clear status message */

            setTimeout(() => {

                if (fMsg) {
                    fMsg.textContent = "";
                }

            }, 5000);

        }

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================================================
   IMAGE ERROR CHECK
========================================================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        console.warn(
            "Image not found:",
            image.src
        );

    });

});


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(targetId);


        if (!target) {

            return;

        }


        event.preventDefault();


        const header =
            document.querySelector(".header");

        const headerHeight =
            header ? header.offsetHeight : 0;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;


        window.scrollTo({

            top: targetPosition,
            behavior: "smooth"

        });

    });

});