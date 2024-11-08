import {
  fetchAll,
  fetchById,
  createItem,
  updateItem,
  deleteItem,
} from "./apiHandler.js";

// Función para cargar las materias y renderizar en la tabla
async function cargarMaterias() {
  try {
    // Obtener los datos de los alumnos desde la API
    const materias = await fetchAll("materias"); // 'alumnos' es el endpoint de tu API

    // Seleccionar el tbody de la tabla
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Limpiar cualquier contenido anterior

    // Iterar sobre los alumnos y crear filas para cada uno
    materias.forEach((materia) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                  <td>${materia.id}</td>
                  <td>${materia.nombre}</td>
                  <td>${materia.profesor}</td>
                  <td>${materia.promocional ? "Si" : "No"}</td>
                  <td class="d-flex">
                      <button class="btn btn-info flex-fill mr-1">Ver Alumnos</button>
                      <button class="btn btn-warning flex-fill mr-1 editar-btn" data-id="${
                        materia.id
                      }">Editar</button>
                      <button class="btn btn-danger flex-fill eliminar-btn" data-id="${
                        materia.id
                      }">Eliminar</button>
                  </td>
              `;
      tbody.appendChild(row);
    });
    // Agregar metodo para editar materia
    document.querySelectorAll(".editar-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const materiaId = event.target
          .closest("tr")
          .querySelector("td").textContent;
        window.location.href = `modificar_materia.html?id=${materiaId}`;
      });
    });
    // Agregar evento al boton de eliminar
    document.querySelectorAll(".eliminar-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const materiaId = event.target.getAttribute("data-id");

        // Confirmación al usuario
        if (
          confirm(
            "¿Estás seguro de que deseas eliminar a la materia con ID " +
              materiaId +
              "?"
          )
        ) {
          eliminarMateria(materiaId);
        }
      });
    });
    // Agregar eventos al botón de "Ver Materias"
    document.querySelectorAll(".btn-info").forEach((button) => {
      button.addEventListener("click", (event) => {
        const materiaId = event.target
          .closest("tr")
          .querySelector("td").textContent;
        window.location.href = `alumnos_materia.html?id=${materiaId}`;
      });
    });
  } catch (error) {
    console.error("Error al cargar materias:", error);
  }
}

async function eliminarMateria(materiaId) {
  try {
    await deleteItem("materia", materiaId);
    cargarMaterias();
    alert("Se ha eliminado la materia " + materiaId + " con éxito!!!");
  } catch (error) {
    console.error("Error al eliminar materia:", error);
  }
}

window.addEventListener("DOMContentLoaded", cargarMaterias);
