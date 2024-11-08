// api/apiHandler.js
const API_URL = process.env.API_URL || "http://127.0.0.1:8000"; // URL de la API


// Función para obtener todos los elementos (por ejemplo, alumnos)
async function fetchAll(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener ${endpoint}:`, error);
    throw error;
  }
}

// Función para obtener un solo elemento por ID
async function fetchById(endpoint, id) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener ${endpoint} con ID ${id}:`, error);
    throw error;
  }
}

// Función para crear un nuevo elemento
async function createItem(endpoint, data) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error al crear en ${endpoint}:`, error);
    throw error;
  }
}
// Función para crear un nuevo elemento sin enviar un cuerpo
async function createItemWithoutBody(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
    });
    return await response.json();
  } catch (error) {
    console.error(`Error al crear en ${endpoint}:`, error);
    throw error;
  }
}

// Función para actualizar un elemento
async function updateItem(endpoint, id, data) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error al actualizar en ${endpoint} con ID ${id}:`, error);
    throw error;
  }
}

// Función para eliminar un elemento
async function deleteItem(endpoint, id) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error(`Error al eliminar en ${endpoint} con ID ${id}:`, error);
    throw error;
  }
}
// Función para eliminar un elemento sin enviar un cuerpo
async function deleteItemWithoutBody(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Error en el endpoint ${endpoint}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error al eliminar en ${endpoint}:`, error);
    throw error;
  }
}

// Exportar funciones para usarlas en otros archivos
export {
  fetchAll,
  fetchById,
  createItem,
  updateItem,
  deleteItem,
  createItemWithoutBody,
  deleteItemWithoutBody,
};
