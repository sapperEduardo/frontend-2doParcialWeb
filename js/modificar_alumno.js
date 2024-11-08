// editar_alumno.js
import { fetchById, updateItem } from "./apiHandler.js";

// Función para obtener el ID del alumno desde la URL
function obtenerIdDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Cargar datos del alumno en el formulario
async function cargarDatosAlumno() {
  const alumnoId = obtenerIdDesdeURL();
  if (alumnoId) {
    try {
      const alumno = await fetchById("alumno", alumnoId);
      document.getElementById("nombre").value = alumno.nombre;
      document.getElementById("apellido").value = alumno.apellido;
      document.getElementById("edad").value = alumno.edad;
    } catch (error) {
      console.error("Error al cargar los datos del alumno:", error);
    }
  }
}

// Función para guardar los cambios del alumno
async function guardarCambios() {
  const alumnoId = obtenerIdDesdeURL();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;

  const datosActualizados = {
    nombre: nombre,
    apellido: apellido,
    edad: parseInt(edad), // Asegúrate de que la edad sea un número
  };

  try {
    await updateItem("alumno", alumnoId, datosActualizados);
    alert("Datos actualizados correctamente");
    window.location.href = "alumnos.html"; // Redirigir a la lista de alumnos
  } catch (error) {
    console.error("Error al actualizar el alumno:", error);
    alert("Ocurrió un error al actualizar los datos del alumno.");
    window.location.href = "alumnos.html"; // Redirigir a la lista de alumnos
  }
}

// Vincular la función al botón "Guardar Cambios"
document
  .querySelector(".btn.btn-primary")
  .addEventListener("click", guardarCambios);

window.addEventListener("DOMContentLoaded", cargarDatosAlumno);
