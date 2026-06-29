const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const toggleError = (id, show) => {
    const errorEl = document.getElementById(id);
    if (!errorEl) return;
    errorEl.classList.toggle("d-none", !show);
};

const saveUser = (user) => {
    localStorage.setItem("saasUser", JSON.stringify(user));
    localStorage.setItem("saasSession", "active");
};

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        let valid = true;

        if (!emailRegex.test(email)) {
            toggleError("loginEmailError", true);
            valid = false;
        } else {
            toggleError("loginEmailError", false);
        }

        if (!password) {
            toggleError("loginPasswordError", true);
            valid = false;
        } else {
            toggleError("loginPasswordError", false);
        }

        if (!valid) return;

        const storedUser = JSON.parse(localStorage.getItem("saasUser") || "null");
        if (!storedUser || storedUser.email !== email) {
            alert("No account found for this email. Please sign up first.");
            return;
        }

        alert("Login successful. Redirecting to dashboard preview.");
        window.location.href = "dashboard.html";
    });
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();

        let valid = true;

        if (!name) {
            toggleError("signupNameError", true);
            valid = false;
        } else {
            toggleError("signupNameError", false);
        }

        if (!emailRegex.test(email)) {
            toggleError("signupEmailError", true);
            valid = false;
        } else {
            toggleError("signupEmailError", false);
        }

        if (password.length < 6) {
            toggleError("signupPasswordError", true);
            valid = false;
        } else {
            toggleError("signupPasswordError", false);
        }

        if (!valid) return;

        saveUser({ name, email, password });
        alert("Account created successfully. Continue with onboarding.");
        window.location.href = "onboarding.html";
    });
}
