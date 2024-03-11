const mongoose = require('mongoose');

const tableId = new mongoose.Types.ObjectId();
console.log(tableId.toString()); // Esto te dará un ObjectId válido que puedes usar en tus pruebas.
