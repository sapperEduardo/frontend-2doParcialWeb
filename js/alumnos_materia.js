import {
  fetchAll,
  fetchById,
  createItem,
  updateItem,
  deleteItem,
  deleteItemWithoutBody,
} from "./apiHandler.js";

const urlParams = new URLSearchParams(window.location.search);
const materiaId = urlParams.get("id");

const endpointAlumnos = `alumnos/materia/${materiaId}`;
const endpointAlumnosMaterias = "materias/alumno/"; // Para obtener las materias inscritas de un alumno

// Función para cargar la lista de alumnos de la materia
async function cargarAlumnos() {
  try {
    const alumnos = await fetchAll(endpointAlumnos);
    const listaAlumnos = document.getElementById("lista-alumnos");
    listaAlumnos.innerHTML = "";

    alumnos.forEach((alumno) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${alumno.id}</td><td>${alumno.nombre}</td>
            <td><button class="btn btn-danger darbaja-btn" data-id="${alumno.id}">Baja</button></td>
      `;
      listaAlumnos.appendChild(row);
    });

    // Agregar evento de baja para cada botón
    document.querySelectorAll(".darbaja-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const alumnoId = event.target.getAttribute("data-id");
        await darBajaAlumno(alumnoId);
      });
    });
  } catch (error) {
    console.error("Error al cargar alumnos:", error);
  }
}

// Función para dar de baja a un alumno en la materia actual con validación
async function darBajaAlumno(alumnoId) {
  try {
    // Obtener todas las materias en las que el alumno está inscrito
    const materiasAlumno = await fetchAll(
      `${endpointAlumnosMaterias}${alumnoId}`
    );

    if (materiasAlumno.length <= 3) {
      alert("El alumno debe estar inscrito en al menos 3 materias.");
      return;
    }

    // Confirmación de la baja
    const confirmacion = confirm(
      `¿Estás seguro de que quieres dar de baja a este alumno en la materia ${materiaId}?`
    );
    if (!confirmacion) return;

    // Eliminar la asignación
    await deleteItemWithoutBody(`baja/alumno/${alumnoId}/materia/${materiaId}`);
    location.reload();
  } catch (error) {
    console.error("Error al dar de baja al alumno:", error);
    alert("Error al dar de baja al alumno.");
  }
}

// Cargar los datos cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  cargarAlumnos();
});
