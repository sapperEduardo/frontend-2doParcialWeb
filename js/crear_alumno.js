import {
  fetchAll,
  fetchById,
  createItem,
  updateItem,
  deleteItem,
} from "./apiHandler.js";
var materiasIds = [];
// Función para cargar las materias y renderizar en el contenedor
async function cargarMaterias() {
  try {
    // Obtener los datos de las materias desde la API
    const materias = await fetchAll("materias"); // 'materias' es el endpoint de tu API
    // Seleccionar el contenedor de materias
    const materiasContainer = document.getElementById("materiasContainer");
    materiasIds = materias.map((materia) => materia.id);

    materiasContainer.innerHTML = ""; // Limpiar cualquier contenido anterior

    // Iterar sobre las materias y crear checkboxes para cada una
    materias.forEach((materia, index) => {
      const div = document.createElement("div");
      div.className = "form-check";
      div.innerHTML = `
          <input
            type="checkbox"
            class="form-check-input"
            id="materia${index + 1}"
            name="materia${index + 1}"
          />
          <label class="form-check-label" for="materia${index + 1}">${
        materia.nombre
      }</label>
        `;
      materiasContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Error al cargar materias:", error);
  }
}

async function guardarAlumno(event) {
  event.preventDefault(); // Evita el envío automático del formulario

  // Obtener los valores de los campos
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const edad = parseInt(document.getElementById("edad").value, 10);

  // Validar que el nombre y apellido no estén vacíos
  if (!nombre || !apellido) {
    alert("Por favor, complete los campos de nombre y apellido.");
    return;
  }

  // Validar que la edad sea mayor o igual a 17
  if (edad < 17 || !edad) {
    alert("Inrese la edad, debe ser 17 años o más.");
    return;
  }

  // Verificar que al menos 3 materias estén seleccionadas
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const materiasSeleccionadas = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  ).length;

  if (materiasSeleccionadas < 3) {
    alert("Por favor, seleccione al menos 3 materias.");
    return;
  }

  // Si pasa todas las validaciones, proceder con el alta del alumno
  const alumno = {
    nombre: nombre,
    apellido: apellido,
    edad: edad,
  };

  try {
    // Dar de alta al alumno
    const response = await createItem("alumnos", alumno); // Llama a la función de alta de alumno
    console.log("Alumno guardado:", response);
    alert("Alumno guardado exitosamente.");

    // Buscar el ID del alumno por nombre y apellido
    const alumnoBuscado = await fetchAll(
      `nombre/${nombre}/apellido/${apellido}`
    );
    const idAlumno = alumnoBuscado.id;

    // Inscribir materias
    const materiasInscritas = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id.replace("materia", "")); // Obtener solo el ID de la materia

    for (const idMateria of materiasInscritas) {
      await createItem(
        `alta/alumno/${idAlumno}/materia/${materiasIds[idMateria - 1]}`
      ); // Inscribir materia
    }

    alert("Materias inscritas exitosamente.");
  } catch (error) {
    console.error("Error al guardar el alumno:", error);
    alert("Ocurrió un error al guardar el alumno.");
  }
}

// Asegúrate de que el botón "Guardar Alumno" llame a esta función
document.querySelector(".btn-primary").addEventListener("click", guardarAlumno);

// Llamar a la función para cargar las materias al cargar la página
document.addEventListener("DOMContentLoaded", cargarMaterias);
