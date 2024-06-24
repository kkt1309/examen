import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Función para agregar un alumno
document.getElementById('agregar-alumno').addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const dni = document.getElementById('dni').value;
    const telefono = document.getElementById('telefono').value;

    if (nombre && apellidos && dni && telefono) {
        try {
            await addDoc(collection(db, 'alumnos'), {
                nombre,
                apellidos,
                dni,
                telefono,
                asistencia: false
            });
            cargarAlumnos();
        } catch (error) {
            console.error("Error añadiendo el documento: ", error);
        }
    } else {
        alert('Por favor, completa todos los campos');
    }
});

// Función para cargar los alumnos desde Firestore
async function cargarAlumnos() {
    try {
        const alumnosSnapshot = await getDocs(collection(db, 'alumnos'));
        const alumnosList = document.getElementById('alumnos-tbody');
        alumnosList.innerHTML = '';
        alumnosSnapshot.forEach(doc => {
            const alumno = doc.data();
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="https://api.multiavatar.com/${alumno.nombre}.png" alt="Foto" width="50"></td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellidos}</td>
                <td>${alumno.dni}</td>
                <td>${alumno.telefono}</td>
                <td><button onclick="toggleAsistencia('${doc.id}', ${alumno.asistencia})">${alumno.asistencia ? 'Presente' : 'Ausente'}</button></td>
            `;
            alumnosList.appendChild(tr);
        });
    } catch (error) {
        console.error("Error cargando los documentos: ", error);
    }
}

// Función para cambiar el estado de asistencia
window.toggleAsistencia = async (id, asistencia) => {
    try {
        await updateDoc(doc(db, 'alumnos', id), { asistencia: !asistencia });
        cargarAlumnos();
    } catch (error) {
        console.error("Error actualizando el documento: ", error);
    }
};

// Función para eliminar un alumno
window.eliminarAlumno = async (id) => {
    try {
        await deleteDoc(doc(db, 'alumnos', id));
        cargarAlumnos();
    } catch (error) {
        console.error("Error eliminando el documento: ", error);
    }
};

// Cargar los alumnos cuando la página se carga
window.onload = () => {
    cargarAlumnos();
};
