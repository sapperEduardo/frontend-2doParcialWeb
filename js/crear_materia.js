import {
  fetchAll,
  fetchById,
  createItem,
  updateItem,
  deleteItem,
} from "./apiHandler.js";

async function guardarMateria(event) {
  event.preventDefault(); // Evita el envío automático del formulario

  const nombre = document.getElementById("nombre").value;
  const profesor = document.getElementById("profesor").value;
  const promocional = document.getElementById("promocional").checked;

  if (!nombre || !profesor) {
    alert("Por favor, complete los campos de nombre y profesor.");
    return;
  }
  const materiaNueva = {
    nombre: nombre,
    profesor: profesor,
    promocional: promocional,
  };
  try {
    const response = await createItem("materias", materiaNueva);
    console.log("Materia guardada:", response);
    alert("Materia guardada exitosamente.");
    window.location.href = "materias.html";
  } catch (error) {
    console.error("Error al guardar la materia:", error);
    alert("Ocurrió un error al guardar la materia.");
    window.location.href = "materias.html";
  }
}

document
  .querySelector(".btn-primary")
  .addEventListener("click", guardarMateria);
