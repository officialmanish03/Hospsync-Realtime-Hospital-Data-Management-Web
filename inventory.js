import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Your Firebase configuration
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
const db = getFirestore(app);

// Function to run after DOM is loaded
function init() {
    // Counter Elements
    const icuBedsCount = document.getElementById('icu-beds-count');
    const oxygenCylindersCount = document.getElementById('oxygen-cylinders-count');
    const bedsCount = document.getElementById('beds-count');
    const bloodGroupsCount = document.getElementById('blood-groups-count');

    // Table Elements
    const icuBedsTableBody = document.querySelector('#icu-beds-table tbody');
    const oxygenCylindersTableBody = document.querySelector('#oxygen-cylinders-table tbody');
    const bedsTableBody = document.querySelector('#beds-table tbody');
    const bloodGroupsTableBody = document.querySelector('#blood-groups-table tbody');

    // Form Elements
    const forms = {
        'icu-beds-form': document.getElementById('icu-beds-form'),
        'oxygen-cylinders-form': document.getElementById('oxygen-cylinders-form'),
        'beds-form': document.getElementById('beds-form'),
        'blood-groups-form': document.getElementById('blood-groups-form')
    };

    // Form Input Elements
    const icuSnoInput = document.getElementById('icu-sno');
    const icuNoInput = document.getElementById('icu-no');
    const icuStatusInput = document.getElementById('icu-status');
    const oxygenQuantityInput = document.getElementById('oxygen-quantity');
    const bedsSnoInput = document.getElementById('beds-sno');
    const bedsNoInput = document.getElementById('beds-no');
    const bedsStatusInput = document.getElementById('beds-status');
    const bloodGroupInput = document.getElementById('blood-group');
    const bloodAvailabilityInput = document.getElementById('blood-availability');

    // Submit Buttons
    const submitIcuBedsButton = document.getElementById('submit-icu-beds');
    const submitOxygenCylindersButton = document.getElementById('submit-oxygen-cylinders');
    const submitBedsButton = document.getElementById('submit-beds');
    const submitBloodGroupsButton = document.getElementById('submit-blood-groups');

    // Update Buttons
    const updateButtons = document.querySelectorAll('.update-btn');

    // Function to toggle form visibility
    function toggleForm(formId) {
        for (const id in forms) {
            forms[id].style.display = (id === formId) ? 'block' : 'none';
        }
    }

    // Event listeners for update buttons
    updateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const formId = button.getAttribute('data-form');
            toggleForm(formId);
        });
    });

    // Realtime updates for ICU Beds
    onSnapshot(collection(db, 'icuBeds'), (snapshot) => {
        let count = 0;
        icuBedsTableBody.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            const row = `<tr><td>${data.sno}</td><td>${data.icuNo}</td><td>${data.status}</td></tr>`;
            icuBedsTableBody.innerHTML += row;
            if (data.status === 'Available') {
                count++;
            }
        });
        icuBedsCount.textContent = count;
    });

    // Realtime updates for Oxygen Cylinders
    onSnapshot(collection(db, 'oxygenCylinders'), (snapshot) => {
        let count = 0;
        oxygenCylindersTableBody.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            const row = `<tr><td>${data.quantity}</td></tr>`;
            oxygenCylindersTableBody.innerHTML += row;
            count += data.quantity;
        });
        oxygenCylindersCount.textContent = count;
    });

    // Realtime updates for Beds
    onSnapshot(collection(db, 'beds'), (snapshot) => {
        let count = 0;
        bedsTableBody.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            const row = `<tr><td>${data.sno}</td><td>${data.bedNo}</td><td>${data.status}</td></tr>`;
            bedsTableBody.innerHTML += row;
            if (data.status === 'Available') {
                count++;
            }
        });
        bedsCount.textContent = count;
    });

    // Realtime updates for Blood Groups
    onSnapshot(collection(db, 'bloodGroups'), (snapshot) => {
        let count = 0;
        bloodGroupsTableBody.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            const row = `<tr><td>${data.bloodGroup}</td><td>${data.availability}</td></tr>`;
            bloodGroupsTableBody.innerHTML += row;
            if (data.availability === 'Available') {
                count++;
            }
        });
        bloodGroupsCount.textContent = count;
    });

    // Form submission handlers
    submitIcuBedsButton.addEventListener('click', async () => {
        await addDoc(collection(db, 'icuBeds'), {
            sno: parseInt(icuSnoInput.value),
            icuNo: icuNoInput.value,
            status: icuStatusInput.value,
        });
        toggleForm(null);
        icuSnoInput.value = '';
        icuNoInput.value = '';
    });

    submitOxygenCylindersButton.addEventListener('click', async () => {
        await addDoc(collection(db, 'oxygenCylinders'), {
            quantity: parseInt(oxygenQuantityInput.value),
        });
        toggleForm(null);
        oxygenQuantityInput.value = '';
    });

    submitBedsButton.addEventListener('click', async () => {
        await addDoc(collection(db, 'beds'), {
            sno: parseInt(bedsSnoInput.value),
            bedNo: bedsNoInput.value,
            status: bedsStatusInput.value,
        });
        toggleForm(null);
        bedsSnoInput.value = '';
        bedsNoInput.value = '';
    });

    submitBloodGroupsButton.addEventListener('click', async () => {
        await addDoc(collection(db, 'bloodGroups'), {
            bloodGroup: bloodGroupInput.value,
            availability: bloodAvailabilityInput.value,
        });
        toggleForm(null);
        bloodGroupInput.value = '';
        bloodAvailabilityInput.value = '';
    });
}

// Run init function after DOM is loaded
document.addEventListener('DOMContentLoaded', init);
