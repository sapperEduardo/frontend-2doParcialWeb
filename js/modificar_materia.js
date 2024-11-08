// editar_alumno.js
import { fetchById, updateItem } from "./apiHandler.js";

// Función para obtener el ID del alumno desde la URL
function obtenerIdDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Cargar datos del alumno en el formulario
async function cargarDatosMateria() {
  const materiaId = obtenerIdDesdeURL();
  if (materiaId) {
    try {
      const materia = await fetchById("materias", materiaId);
      document.getElementById("nombre").value = materia.nombre;
      document.getElementById("profesor").value = materia.profesor;
      document.getElementById("promocional").checked = materia.promocional;
    } catch (error) {
      console.error("Error al cargar los datos de la materia:", error);
    }
  }
}

// Función para guardar los cambios del alumno
async function guardarCambios() {
  const materiaId = obtenerIdDesdeURL();
  const nombre = document.getElementById("nombre").value;
  const profesor = document.getElementById("profesor").value;
  const promocional = document.getElementById("promocional").checked;

  const datosActualizados = {
    nombre: nombre,
    profesor: profesor,
    promocional: promocional,
  };

  try {
    await updateItem("materia", materiaId, datosActualizados);
    alert("Datos actualizados correctamente");
    window.location.href = "materias.html"; // Redirigir a la lista de alumnos
  } catch (error) {
    console.error("Error al actualizar la materia:", error);
    alert("Ocurrió un error al actualizar los datos de la materia.");
    window.location.href = "materias.html";
  }
}

// Vincular la función al botón "Guardar Cambios"
document
  .querySelector(".btn.btn-primary")
  .addEventListener("click", guardarCambios);

window.addEventListener("DOMContentLoaded", cargarDatosMateria);
