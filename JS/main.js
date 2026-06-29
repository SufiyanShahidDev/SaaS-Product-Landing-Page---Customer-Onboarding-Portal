// Theme toggle
const themeToggles = document.querySelectorAll(".theme-nav-btn");

const setToggleButtonLook = (toggle, isLight) => {
    const icon = toggle.querySelector("i");

    if (icon) {
        if (isLight) {
            icon.className = "fa-solid fa-sun";
        } else {
            icon.className = "fa-solid fa-moon";
        }
    }

    if (isLight) {
        toggle.title = "Switch to dark mode";
    } else {
        toggle.title = "Switch to light mode";
    }
};

const applyTheme = (mode) => {
    let isLight = false;
    if (mode === "light") {
        isLight = true;
    }

    if (isLight) {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }

    localStorage.setItem("saasTheme", mode);

    themeToggles.forEach((toggle) => {
        setToggleButtonLook(toggle, isLight);
    });
};

const initThemeToggle = () => {
    let savedTheme = localStorage.getItem("saasTheme");
    if (!savedTheme) {
        savedTheme = "dark";
    }
    applyTheme(savedTheme);
};

themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const isCurrentlyLight = document.body.classList.contains("light-mode");
        if (isCurrentlyLight) {
            applyTheme("dark");
        } else {
            applyTheme("light");
        }
    });
});

// Mobile navbar toggle
const navbarToggleBtn = document.getElementById("navbarToggleBtn");
const navbarNav = document.getElementById("navbarNav");

if (navbarToggleBtn && navbarNav) {
    navbarToggleBtn.addEventListener("click", () => {
        navbarNav.classList.toggle("nav-open");
    });

    navbarNav.querySelectorAll("a, button").forEach((control) => {
        control.addEventListener("click", () => {
            navbarNav.classList.remove("nav-open");
        });
    });
}

// FAQ list
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        if (!answer) return;

        const wasOpen = answer.classList.contains("open");

        document.querySelectorAll(".faq-answer").forEach((a) => {
            a.classList.remove("open");
        });
        document.querySelectorAll(".faq-question").forEach((q) => {
            q.classList.remove("active");
        });

        if (!wasOpen) {
            answer.classList.add("open");
            question.classList.add("active");
        }
    });
});

// Pricing toggle
const pricingToggle = document.getElementById("pricingToggle");

const pricingPlans = [
    { id: "priceStarter", monthly: 19, yearly: 15 },
    { id: "priceGrowth", monthly: 49, yearly: 39 },
    { id: "priceEnterprise", monthly: 99, yearly: 79 }
];

const updatePrices = () => {
    if (!pricingToggle) return;
    const isYearly = pricingToggle.checked;

    pricingPlans.forEach((plan) => {
        const priceEl = document.getElementById(plan.id);
        if (!priceEl) return;

        if (isYearly) {
            priceEl.textContent = `$${plan.yearly}`;
        } else {
            priceEl.textContent = `$${plan.monthly}`;
        }
    });
};

if (pricingToggle) {
    pricingToggle.addEventListener("change", updatePrices);
    updatePrices();
}

document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
});
