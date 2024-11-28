document.addEventListener("DOMContentLoaded", function () {
    // General Settings Form Handling
    const generalSettingsForm = document.querySelector("#general-settings-form");
    generalSettingsForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const appName = document.querySelector("#app-name").value;
        const contactEmail = document.querySelector("#contact-email").value;

        // Validate fields
        let isValid = true;
        if (!appName) {
            document.querySelector("#app-name-error").textContent = "App Name is required.";
            isValid = false;
        } else {
            document.querySelector("#app-name-error").textContent = "";
        }
        if (!contactEmail) {
            document.querySelector("#contact-email-error").textContent = "Contact Email is required.";
            isValid = false;
        } else {
            document.querySelector("#contact-email-error").textContent = "";
        }

        if (isValid) {
            alert("General settings saved successfully!");
        }
    });

    // User Management - Add User Handling
    const userManagementForm = document.querySelector("#user-management-form");
    userManagementForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const userEmail = document.querySelector("#user-email").value;
        const userRole = document.querySelector("#user-role").value;

        if (userEmail && userRole) {
            const userList = document.querySelector("#user-list");
            const newUser = document.createElement("li");
            newUser.innerHTML = `${userEmail} - ${userRole} <button class="remove-user-btn">Remove</button>`;
            userList.appendChild(newUser);

            // Clear input fields
            document.querySelector("#user-email").value = "";
            alert("User added successfully!");
        }
    });

    // Remove User
    document.querySelector("#user-list").addEventListener("click", function (e) {
        if (e.target && e.target.matches(".remove-user-btn")) {
            e.target.closest("li").remove();
            alert("User removed.");
        }
    });
});
