import { NextApiRequest, NextApiResponse } from 'next';
import { Reservation } from '../model/reservation';
import { connection } from '../db/conn';
import mongoose from 'mongoose';

// Conexión a la base de datos
connection();

// Método POST: Crear una nueva reserva
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Método no permitido", status: false });
        }

        const { tableId, time, mealType, clientName, partySize } = req.body;
        if (!tableId || !time || !mealType || !clientName || !partySize) {
            return res.status(400).json({ message: "Faltan datos requeridos", status: false });
        }

        if (!mongoose.Types.ObjectId.isValid(tableId)) {
            return res.status(400).json({ message: "ID de mesa inválido", status: false });
        }

        const newReservation = new Reservation({
            table: tableId,
            time: new Date(time),
            mealType,
            clientName,
            partySize
        });

        await newReservation.save();
        return res.status(201).json({ message: "Reserva creada con éxito", reservation: newReservation, status: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Ha ocurrido un error en el servidor", status: false });
    }
}
