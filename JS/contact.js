
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const subjectInput = document.getElementById("contactSubject");
    const messageInput = document.getElementById("contactMessage");
    const successMsg = document.getElementById("contactSuccess");

    const toggleError = (id, show) => {
        const errorEl = document.getElementById(id);
        if (!errorEl) return;
        errorEl.classList.toggle("d-none", !show);
    };

    const saveSubmission = (entry) => {
        const history = JSON.parse(localStorage.getItem("saasContactSubmissions") || "[]");
        history.push(entry);
        localStorage.setItem("saasContactSubmissions", JSON.stringify(history));
    };

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        let valid = true;

        if (!name) {
            toggleError("contactNameError", true);
            valid = false;
        } else {
            toggleError("contactNameError", false);
        }

        if (!emailRegex.test(email)) {
            toggleError("contactEmailError", true);
            valid = false;
        } else {
            toggleError("contactEmailError", false);
        }

        if (!message) {
            toggleError("contactMessageError", true);
            valid = false;
        } else {
            toggleError("contactMessageError", false);
        }

        if (!valid) {
            if (successMsg) successMsg.classList.add("d-none");
            return;
        }

        saveSubmission({
            name,
            email,
            subject,
            message,
            submittedAt: new Date().toISOString()
        });

        contactForm.reset();
        if (successMsg) successMsg.classList.remove("d-none");
    });

    [nameInput, emailInput, subjectInput, messageInput].forEach((field) => {
        field.addEventListener("input", () => {
            if (successMsg) successMsg.classList.add("d-none");
        });
    });
}
