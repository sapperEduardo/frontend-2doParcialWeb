// alumnos.js
import {
  fetchAll,
  fetchById,
  createItem,
  updateItem,
  deleteItem,
} from "./apiHandler.js";

// Función para cargar los alumnos y renderizar en la tabla
async function cargarAlumnos() {
  try {
    // Obtener los datos de los alumnos desde la API
    const alumnos = await fetchAll("alumnos"); // 'alumnos' es el endpoint de tu API

    // Seleccionar el tbody de la tabla
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Limpiar cualquier contenido anterior

    // Iterar sobre los alumnos y crear filas para cada uno
    alumnos.forEach((alumno) => {
      const row = document.createElement("tr");
      row.innerHTML = `
  <td>${alumno.id}</td>
  <td>${alumno.nombre}</td>
  <td>${alumno.apellido}</td>
  <td>${alumno.edad}</td>
  <td class="d-flex">
    <button class="btn btn-info flex-fill mr-1">Inscripciones</button>
    <button class="btn btn-warning flex-fill mr-1 editar-btn" data-id="${alumno.id}">Editar</button>
    <button class="btn btn-danger flex-fill eliminar-btn" data-id="${alumno.id}">Eliminar</button>
  </td>
`;

      tbody.appendChild(row);
    });
    // Agregar eventos al botón de "Editar"
    document.querySelectorAll(".editar-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const alumnoId = event.target.getAttribute("data-id");
        window.location.href = `modificar_alumno.html?id=${alumnoId}`;
      });
    });
    // Agregar evento al boton de eliminar
    document.querySelectorAll(".eliminar-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const alumnoId = event.target.getAttribute("data-id");

        // Confirmación al usuario
        if (
          confirm(
            "¿Estás seguro de que deseas eliminar al alumno con ID " +
              alumnoId +
              "?"
          )
        ) {
          eliminarAlumno(alumnoId);
        }
      });
    });
    // Agregar eventos al botón de "Ver Materias"
    document.querySelectorAll(".btn-info").forEach((button) => {
      button.addEventListener("click", (event) => {
        const alumnoId = event.target
          .closest("tr")
          .querySelector("td").textContent;
        window.location.href = `materias_alumno.html?id=${alumnoId}`;
      });
    });
  } catch (error) {
    console.error("Error al cargar alumnos:", error);
  }
}

async function eliminarAlumno(alumnoId) {
  try {
    await deleteItem("alumno", alumnoId); // Llamada a la función deleteItem de apiHandler.js
    // Actualizar la tabla después de eliminar
    cargarAlumnos();
  } catch (error) {
    console.error("Error al eliminar alumno:", error);
  }
}

// Llamar a la función para cargar los alumnos cuando la página esté lista
window.addEventListener("DOMContentLoaded", cargarAlumnos);
