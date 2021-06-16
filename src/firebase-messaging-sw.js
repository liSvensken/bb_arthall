importScripts('https://www.gstatic.com/firebasejs/6.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.6.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyC8h8JK2oQoHiRdYjiaV94J1O5uJ8ZJ6KY',
    authDomain: 'arthall-online.firebaseapp.com',
    databaseURL: 'https://arthall-online.firebaseio.com',
    projectId: 'arthall-online',
    storageBucket: 'arthall-online.appspot.com',
    messagingSenderId: '984515715995',
    appId: '1:984515715995:web:9874bf23f35c9ddab9b73e',
    measurementId: 'G-XF01MBD0ZS'
});

const messaging = firebase.messaging();
