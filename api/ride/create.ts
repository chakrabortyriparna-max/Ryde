import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const {
            origin_address,
            destination_address,
            origin_latitude,
            origin_longitude,
            destination_latitude,
            destination_longitude,
            ride_time,
            fare_price,
            payment_status,
            driver_id,
            user_id,
            user_name,
            user_email,
        } = req.body;

        if (
            !origin_address ||
            !destination_address ||
            !origin_latitude ||
            !origin_longitude ||
            !destination_latitude ||
            !destination_longitude ||
            !ride_time ||
            !fare_price ||
            !payment_status ||
            !driver_id ||
            !user_id
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const sql = neon(process.env.DATABASE_URL!);

        // 1. Check if user exists in users table
        const existingUser = await sql`SELECT id FROM users WHERE clerk_id = ${user_id}`;

        let userId;

        if (existingUser.length > 0) {
            userId = existingUser[0].id;
        } else {
            // 2. If not, create user
            const newUser = await sql`
            INSERT INTO users (
                name,
                email,
                clerk_id
            ) VALUES (
                ${user_name || "Unknown"},
                ${user_email || ""},
                ${user_id}
            )
            RETURNING id;
        `;
            userId = newUser[0].id;
        }

        // 3. Insert ride
        const response = await sql`
      INSERT INTO rides (
        origin_address,
        destination_address,
        origin_latitude,
        origin_longitude,
        destination_latitude,
        destination_longitude,
        ride_time,
        fare_price,
        payment_status,
        driver_id,
        user_id
      ) VALUES (
        ${origin_address},
        ${destination_address},
        ${origin_latitude},
        ${origin_longitude},
        ${destination_latitude},
        ${destination_longitude},
        ${ride_time},
        ${fare_price},
        ${payment_status},
        ${driver_id},
        ${userId}
      )
      RETURNING *;
    `;

        return res.status(201).json({ data: response[0], success: true });
    } catch (error) {
        console.error("Error creating ride:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
