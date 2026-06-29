const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const form = document.getElementById("onboardingForm");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const finishBtn = document.getElementById("finishBtn");
const progressBar = document.getElementById("onboardingProgress");
const stepLabel = document.getElementById("stepLabel");

let currentStep = 1;
const totalSteps = 4;

const steps = [...document.querySelectorAll(".onboarding-step")];
const stepIndicators = [...document.querySelectorAll(".step-item")];

const showError = (id, show) => {
    const errorEl = document.getElementById(id);
    if (!errorEl) return;
    errorEl.classList.toggle("d-none", !show);
};

const getFieldValue = (id) => document.getElementById(id).value.trim();

const saveDraft = () => {
    const draft = {
        fullName: getFieldValue("fullName"),
        workEmail: getFieldValue("workEmail"),
        companyName: getFieldValue("companyName"),
        teamSize: document.getElementById("teamSize").value,
        businessType: getFieldValue("businessType"),
        primaryGoal: document.getElementById("primaryGoal").value,
        notes: getFieldValue("notes")
    };
    localStorage.setItem("saasOnboardingDraft", JSON.stringify(draft));
};

const loadDraft = () => {
    const draft = JSON.parse(localStorage.getItem("saasOnboardingDraft") || "null");
    if (!draft) return;

    document.getElementById("fullName").value = draft.fullName || "";
    document.getElementById("workEmail").value = draft.workEmail || "";
    document.getElementById("companyName").value = draft.companyName || "";
    document.getElementById("teamSize").value = draft.teamSize || "";
    document.getElementById("businessType").value = draft.businessType || "";
    document.getElementById("primaryGoal").value = draft.primaryGoal || "";
    document.getElementById("notes").value = draft.notes || "";
};

const updateSummary = () => {
    document.getElementById("summaryName").textContent = getFieldValue("fullName") || "-";
    document.getElementById("summaryEmail").textContent = getFieldValue("workEmail") || "-";
    document.getElementById("summaryCompany").textContent = getFieldValue("companyName") || "-";
    document.getElementById("summaryGoal").textContent = document.getElementById("primaryGoal").value || "-";
};

const updateUI = () => {
    steps.forEach((step, index) => {
        step.classList.toggle("active", index + 1 === currentStep);
    });

    stepIndicators.forEach((item, index) => {
        item.classList.toggle("active", index + 1 === currentStep);
    });

    progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
    stepLabel.textContent = `Step ${currentStep} of ${totalSteps}`;

    prevBtn.disabled = currentStep === 1;
    nextBtn.classList.toggle("d-none", currentStep === totalSteps);
    finishBtn.classList.toggle("d-none", currentStep !== totalSteps);

    if (currentStep === 4) updateSummary();
};

const validateStep = (step) => {
    let valid = true;

    if (step === 1) {
        const fullName = getFieldValue("fullName");
        const workEmail = getFieldValue("workEmail");
        showError("fullNameError", !fullName);
        showError("workEmailError", !emailRegex.test(workEmail));
        valid = Boolean(fullName) && emailRegex.test(workEmail);
    }

    if (step === 2) {
        const companyName = getFieldValue("companyName");
        const teamSize = document.getElementById("teamSize").value;
        showError("companyNameError", !companyName);
        showError("teamSizeError", !teamSize);
        valid = Boolean(companyName) && Boolean(teamSize);
    }

    if (step === 3) {
        const primaryGoal = document.getElementById("primaryGoal").value;
        showError("primaryGoalError", !primaryGoal);
        valid = Boolean(primaryGoal);
    }

    return valid;
};

nextBtn.addEventListener("click", () => {
    if (!validateStep(currentStep)) return;
    saveDraft();
    if (currentStep < totalSteps) currentStep += 1;
    updateUI();
});

prevBtn.addEventListener("click", () => {
    if (currentStep > 1) currentStep -= 1;
    updateUI();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateStep(3)) {
        currentStep = 3;
        updateUI();
        return;
    }

    saveDraft();
    const onboardingData = JSON.parse(localStorage.getItem("saasOnboardingDraft") || "{}");
    localStorage.setItem("saasOnboardingComplete", "true");
    localStorage.setItem("saasProfile", JSON.stringify(onboardingData));

    alert("Onboarding completed successfully.");
    window.location.href = "dashboard.html";
});

[
    "fullName", "workEmail", "companyName", "teamSize", "businessType", "primaryGoal", "notes"
].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("input", saveDraft);
        el.addEventListener("change", saveDraft);
    }
});

loadDraft();
updateUI();
