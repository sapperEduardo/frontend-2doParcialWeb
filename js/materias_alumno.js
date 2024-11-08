import {
  fetchById,
  fetchAll,
  createItem,
  createItemWithoutBody,
  deleteItemWithoutBody,
} from "./apiHandler.js";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const alumnoId = urlParams.get("id");

  if (!alumnoId) {
    console.error("ID de alumno no proporcionado");
    return;
  }

  // Mostrar el nombre del alumno en el título
  const alumno = await fetchById("alumno", alumnoId);
  document.getElementById(
    "tituloAlumno"
  ).textContent = `Materias de ${alumno.nombre} ${alumno.apellido}`;

  // Función para cargar y mostrar las materias
  async function cargarMaterias() {
    // Cargar las materias inscritas
    const materiasInscritas = await fetchAll(`materias/alumno/${alumnoId}`);
    const inscritasContainer = document.getElementById("materiasInscritas");
    inscritasContainer.innerHTML = "";
    materiasInscritas.forEach((materia) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${materia.id}</td><td>${materia.nombre}</td>
          <td><button class="btn btn-danger darbaja-btn" data-id="${materia.id}">Baja</button></td>
    `;
      inscritasContainer.appendChild(row);
    });

    // Cargar las materias disponibles para inscripción
    const materiasDisponibles = await fetchAll("materias");
    const disponiblesContainer = document.getElementById("materiasDisponibles");
    disponiblesContainer.innerHTML = "";

    const materiasFiltradas = materiasDisponibles.filter(
      (materia) =>
        !materiasInscritas.some((inscrita) => inscrita.id === materia.id)
    );

    materiasFiltradas.forEach((materia) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${materia.id}</td>
        <td>${materia.nombre}</td>
        <td><button class="btn btn-success inscribir-btn" data-id="${materia.id}">Inscribir</button></td>
      `;
      disponiblesContainer.appendChild(row);
    });

    // Agregar eventos de inscripción y baja
    agregarEventos(materiasInscritas.length);
  }

  // Función para agregar eventos de inscripción y baja con validación
  function agregarEventos(totalMateriasInscritas) {
    // Evento para inscribir a una nueva materia
    document.querySelectorAll(".inscribir-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        if (totalMateriasInscritas >= 8) {
          alert(
            "El alumno ya está inscrito en el número máximo de 8 materias."
          );
          return;
        }

        const materiaId = event.target.getAttribute("data-id");
        await createItemWithoutBody(
          `alta/alumno/${alumnoId}/materia/${materiaId}`
        );
        alert(`El alumno ha sido inscrito en la materia ${materiaId}`);
        location.reload(); // Recargar la página para mostrar los cambios
      });
    });

    // Evento para dar de baja a un alumno en una materia
    document.querySelectorAll(".darbaja-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        if (totalMateriasInscritas <= 3) {
          alert("El alumno debe estar inscrito en al menos 3 materias.");
          return;
        }

        const materiaId = event.target.getAttribute("data-id");
        const confirmacion = confirm(
          `¿Estás seguro de que quieres dar de baja la materia ${materiaId}?`
        );
        if (!confirmacion) return;

        await deleteItemWithoutBody(
          `baja/alumno/${alumnoId}/materia/${materiaId}`
        );
        location.reload(); // Recargar la página para mostrar los cambios
      });
    });
  }

  // Cargar y mostrar las materias iniciales
  cargarMaterias();
});
