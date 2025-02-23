// Initialize Firebase (Replace with your own configuration)
const firebaseConfig = {
    apiKey: "AIzaSyBSybdlOMGRXWj0UCRgffUR1c9cscrGeFk",
    authDomain: "hospsync.firebaseapp.com",
    databaseURL: "https://hospsync-default-rtdb.firebaseio.com",
    projectId: "hospsync",
    storageBucket: "hospsync.firebasestorage.app",
    messagingSenderId: "889936471704",
    appId: "1:889936471704:web:c047d319f751b40410d2ed"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const bookNowButton = document.getElementById('book-now');
const bookingForm = document.getElementById('booking-form');
const confirmation = document.getElementById('confirmation');
const submitbookingButton = document.getElementById('submit-booking');

bookNowButton.addEventListener('click', () => {
    bookingForm.style.display = 'block';
    bookNowButton.style.display = 'none';
});

submitbookingButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    db.collection('appointments').add({
        name: name,
        email: email,
        date: date,
        time: time,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        bookingForm.style.display = 'none';
        confirmation.style.display ='block';
    })

    .catch((error) => {
        console.error("Error adding document: ", error);
    });
});
