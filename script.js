import { addPatientBtn, patientFormContainer } from "./patients";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Hospsync Homepage Loaded!");

    // Additional JavaScript functionality can be added here
});// ✅ Show Form when clicking "Add Patient" button
addPatientBtn.addEventListener("click", () => {
    patientFormContainer.style.display = "block";
});

