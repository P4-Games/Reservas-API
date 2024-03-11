import mongoose, { Document, Schema, Types } from "mongoose";

// Interfaz para el documento de reserva de mesa
interface IReservationDocument extends Document {
    table: Types.ObjectId;  // Referencia a la mesa
    time: Date;             // Hora y fecha de la reserva
    mealType: string;       // Tipo de comida (almuerzo o cena)
    clientName: string;     // Nombre del cliente
    partySize: number;      // Cantidad de personas en la reserva
}

// Esquema para la reserva de mesa
const ReservationSchema = new Schema<IReservationDocument>({
    table: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        required: true,
        index: true  // Índice para mejorar búsquedas por mesa
    },
    time: {
        type: Date,
        required: true,
        index: true  // Índice para mejorar búsquedas por fecha/hora
    },
    mealType: {
        type: String,
        enum: ['lunch', 'dinner'],
        required: true
    },
    clientName: {
        type: String,
        required: true,
        index: true  // Índice para búsquedas por nombre del cliente
    },
    partySize: {
        type: Number,
        required: true,
        min: 1       // Asegura al menos una persona en la reserva
    }
    // Aquí puedes agregar más campos si lo necesitas
});

// Índice compuesto opcional para búsquedas por mesa y fecha/hora
ReservationSchema.index({ table: 1, time: 1 });

// Modelo para la reserva de mesa
const Reservation = mongoose.models.Reservation || mongoose.model<IReservationDocument>("Reservation", ReservationSchema);

// Esquema para las mesas
const TableSchema = new Schema({
    capacity: {
        type: Number,
        required: true
    }
    // Aquí puedes agregar más campos para la mesa, como ubicación, estado, etc.
});

// Modelo para las mesas
const Table = mongoose.models.Table || mongoose.model("Table", TableSchema);

export { Reservation, Table };
