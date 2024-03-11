// Importa el modelo de reserva y cualquier otra dependencia necesaria
import { NextResponse } from "next/server";
import { Reservation } from "../../model/reservation"; 
import { connection } from "../../db/conn";
import mongoose from "mongoose";

// Conexión a la base de datos
connection();

// Método GET: Obtener la disponibilidad de mesas
export async function GET(request: { url: string | URL; }) {
    try {
        const { searchParams } = new URL(request.url); // Obtener los parámetros de búsqueda de la URL
        const tableId = searchParams.get("tableId"); // Obtener el valor de tableId

        let reservations;

        // Si se proporciona tableId, buscar reservas para esa mesa específica
        if (tableId) {
            if (!mongoose.Types.ObjectId.isValid(tableId)) {
                return NextResponse.json({ message: "ID de mesa inválido", status: false });
            }

            reservations = await Reservation.find({ table: tableId });
            if (reservations.length === 0) {
                return NextResponse.json({ message: "No hay reservas para esta mesa", status: false });
            }
        } else {
            // Si no se especifica tableId, devolver todas las reservas
            reservations = await Reservation.find({});
            if (reservations.length === 0) {
                return NextResponse.json({ message: "No hay reservas disponibles", status: false });
            }
        }

        // Devolver las reservas encontradas
        return NextResponse.json({ reservations, status: true });
    } catch(err) {
        // Manejar correctamente el error de tipo "unknown"
        if (err instanceof Error) {
            console.error(err);
            return NextResponse.json({ message: err.message, status: false });
        } else {
            return NextResponse.json({ message: "Ha ocurrido un error desconocido", status: false });
        }
    }
}
