import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const id = req.query.id as string;

        if (!id) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const sql = neon(process.env.DATABASE_URL!);

        // 1. Get the Postgres user ID from the Clerk ID
        const user = await sql`SELECT id FROM users WHERE clerk_id = ${id}`;

        if (user.length === 0) {
            return res.status(200).json({ data: [] });
        }

        const userId = user[0].id;

        // 2. Fetch rides with driver details
        const response = await sql`
      SELECT
        rides.ride_id,
        rides.origin_address,
        rides.destination_address,
        rides.origin_latitude,
        rides.origin_longitude,
        rides.destination_latitude,
        rides.destination_longitude,
        rides.ride_time,
        rides.fare_price,
        rides.payment_status,
        rides.created_at,
        'driver', json_build_object(
          'driver_id', drivers.id,
          'first_name', drivers.first_name,
          'last_name', drivers.last_name,
          'profile_image_url', drivers.profile_image_url,
          'car_image_url', drivers.car_image_url,
          'car_seats', drivers.car_seats,
          'rating', drivers.rating
        ) AS driver
      FROM rides
      JOIN drivers ON rides.driver_id = drivers.id
      WHERE rides.user_id = ${userId}
      ORDER BY rides.created_at DESC
      LIMIT 5;
    `;

        return res.status(200).json({ data: response });
    } catch (error) {
        console.error("Error fetching recent rides:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
