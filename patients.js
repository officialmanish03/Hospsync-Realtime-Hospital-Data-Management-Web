// Firebase Imports
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBSybdlOMGRXWj0UCRgffUR1c9cscrGeFk",
    authDomain: "hospsync.firebaseapp.com",
    databaseURL: "https://hospsync-default-rtdb.firebaseio.com",
    projectId: "hospsync",
    storageBucket: "hospsync.firebasestorage.app",
    messagingSenderId: "889936471704",
    appId: "1:889936471704:web:c047d319f751b40410d2ed"
  };
 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const patientRef = ref(db, "patients");

// Select DOM Elements
export const addPatientBtn = document.getElementById("addPatientBtn");
export const patientFormContainer = document.getElementById("patientFormContainer");
const patientList = document.getElementById("patientList");
const patientCount = document.getElementById("patientCount");
const searchInput = document.getElementById("searchInput");

// Form Elements
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const sexInput = document.getElementById("sex");
const aadharInput = document.getElementById("aadhar");
const submitPatient = document.getElementById("submitPatient");
const closeForm = document.getElementById("closeForm");

// ✅ Hide Form when clicking "Cancel" button
closeForm.addEventListener("click", () => {
    patientFormContainer.style.display = "none";
});

// ✅ Submit Patient Data to Firebase
submitPatient.addEventListener("click", (e) => {
    e.preventDefault();

    let name = nameInput.value.trim();
    let age = ageInput.value.trim();
    let sex = sexInput.value;
    let aadhar = aadharInput.value.trim();
    let time = new Date().toLocaleString(); // Capture current timestamp

    if (name && age && sex && aadhar) {
        push(patientRef, { name, age, sex, aadhar, time });

        alert("Patient added successfully!");

        // Hide form and reset fields
        patientFormContainer.style.display = "none";
        nameInput.value = "";
        ageInput.value = "";
        sexInput.value = "Male";
        aadharInput.value = "";
    } else {
        alert("Please fill in all fields.");
    }
});

// ✅ Load and Display Patients from Firebase
onValue(patientRef, (snapshot) => {
    patientList.innerHTML = ""; // Clear table before reloading data
    let count = 0;

    snapshot.forEach((childSnapshot) => {
        let data = childSnapshot.val();
        let key = childSnapshot.key;
        count++;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>${data.sex}</td>
            <td>${data.aadhar}</td>
            <td>${data.time}</td>
            <td>
                <button class="delete-btn" data-id="${key}">❌</button>
            </td>
        `;
        patientList.appendChild(row);
    });

    // Update patient count
    patientCount.textContent = `Patients Today: ${count}`;

    // Attach Delete Button Functionality
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let patientId = e.target.getAttribute("data-id");
            remove(ref(db, "patients/" + patientId));
        });
    });
});

// ✅ Search Functionality
searchInput.addEventListener("keyup", () => {
    let filter = searchInput.value.toLowerCase();
    let rows = patientList.getElementsByTagName("tr");

    for (let row of rows) {
        let firstCellText = row.getElementsByTagName("td")[0]?.textContent.toLowerCase();
        row.style.display = firstCellText && firstCellText.includes(filter) ? "" : "none";
    }
});
