
const profile = JSON.parse(localStorage.getItem("saasProfile") || "{}");
const user = JSON.parse(localStorage.getItem("saasUser") || "{}");
const profileName = document.getElementById("profileName");
const profileRole = document.getElementById("profileRole");
const profileEmail = document.getElementById("profileEmail");
const profileCompany = document.getElementById("profileCompany");
const profileGoal = document.getElementById("profileGoal");
const profileAvatar = document.getElementById("profileAvatar");

// Toggle
const themeToggles = document.querySelectorAll(".theme-nav-btn");
const dashboardMain = document.querySelector(".dashboard-main");

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
    if (dashboardMain) {
        if (isLight) {
            dashboardMain.classList.add("light-mode");
        } else {
            dashboardMain.classList.remove("light-mode");
        }
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
        const isCurrentlyLight = dashboardMain
            ? dashboardMain.classList.contains("light-mode")
            : false;
        if (isCurrentlyLight) {
            applyTheme("dark");
        } else {
            applyTheme("light");
        }
    });
});

initThemeToggle();

if (profileName) {
    const displayName = profile.fullName || user.name || "User Name";
    profileName.textContent = displayName;
    profileRole.textContent = profile.businessType || "Growth Manager";
    profileAvatar.textContent = displayName.charAt(0).toUpperCase();
}
if (profileEmail) profileEmail.textContent = profile.workEmail || user.email || "user@example.com";
if (profileCompany) profileCompany.textContent = profile.companyName || "SaaS Company";
if (profileGoal) profileGoal.textContent = profile.primaryGoal || "Lead generation";