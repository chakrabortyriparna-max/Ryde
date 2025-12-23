import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
    try {
        const body = await request.json();
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
        } = body;

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
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
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

        return Response.json({ data: response[0], success: true }, { status: 201 });
    } catch (error) {
        console.error("Error creating ride:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
