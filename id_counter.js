let idShortCounter = 0;

function generateSequentialShortId() {
    const id = String(++idShortCounter).padStart(8, '0');
    console.log('Generated ID:', id);
    return id.toUpperCase();
}

function loadIdCounter() {
    // Implementar carga de contador de ID desde algún almacenamiento si es necesario
}

function saveIdCounter() {
    // Implementar guardado de contador de ID en algún almacenamiento si es necesario
}

module.exports = { generateSequentialShortId, loadIdCounter, saveIdCounter };
