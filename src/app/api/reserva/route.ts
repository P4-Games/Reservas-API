import { Reservation } from '../../model/reservation';
import { connection } from '../../db/conn';
import { NextResponse, NextRequest } from "next/server";
import mongoose from 'mongoose';

// Conexión a la base de datos
connection();

// Método POST: Crear una nueva reserva
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // Asegúrate de que la solicitud sea del tipo correcto
        if (req.method !== "POST") {
            return NextResponse.json({ message: "Método no permitido", status: false });
        }

        // Parsea el cuerpo de la solicitud.
        const body = await req.json();
        const { tableId, mealType, clientName, partySize } = body;

        if (!tableId || !mealType || !clientName || !partySize) {
            return NextResponse.json({ message: "Faltan datos requeridos", status: false });
        }

        if (!mongoose.Types.ObjectId.isValid(tableId)) {
            return NextResponse.json({ message: "ID de mesa inválido", status: false });
        }

        // Genera la fecha y hora actual en UTC -3
        const currentTime = new Date(new Date().getTime() - (3 * 60 * 60 * 1000));

        // Comprueba si ya existe una reserva para esa mesa en ese horario
        const existingReservation = await Reservation.findOne({
            table: tableId,
            mealType: mealType
        });

        if (existingReservation) {
            return NextResponse.json({ message: "Ya existe una reserva para esta mesa en este horario", status: false });
        }

        // Crea una nueva reserva
        const newReservation = new Reservation({
            table: tableId,
            time: currentTime,
            mealType,
            clientName,
            partySize
        });

        // Guarda la reserva en la base de datos
        await newReservation.save();

        // Devuelve una respuesta de éxito
        return NextResponse.json({ message: "Reserva creada con éxito", reservation: newReservation, status: true });
    } catch (err) {
        // Manejar correctamente el error
        console.error(err);
        return NextResponse.json({ message: "Ha ocurrido un error en el servidor", status: false });
    }
}

