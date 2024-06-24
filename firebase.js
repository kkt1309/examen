// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDAseL8FSE8utImzuGiVN6a51EI3vRfQ2E",
    authDomain: "formulariodb-aa8aa.firebaseapp.com",
    projectId: "formulariodb-aa8aa",
    storageBucket: "formulariodb-aa8aa.appspot.com",
    messagingSenderId: "437923214880",
    appId: "1:437923214880:web:15e90bffadfa47aba72e45"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
