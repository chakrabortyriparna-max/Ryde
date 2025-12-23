import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
    try {
        const sql = neon(process.env.DATABASE_URL!);

        // Create users table
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        clerk_id VARCHAR(100) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        // Create drivers table
        await sql`
      CREATE TABLE IF NOT EXISTS drivers (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        profile_image_url TEXT,
        car_image_url TEXT,
        car_seats INTEGER,
        rating VARCHAR(10)
      );
    `;

        // Create rides table with user_id as INTEGER referencing users(id)
        await sql`
      CREATE TABLE IF NOT EXISTS rides (
        ride_id SERIAL PRIMARY KEY,
        origin_address VARCHAR(255),
        destination_address VARCHAR(255),
        origin_latitude FLOAT,
        origin_longitude FLOAT,
        destination_latitude FLOAT,
        destination_longitude FLOAT,
        ride_time INTEGER,
        fare_price FLOAT,
        payment_status VARCHAR(20),
        driver_id INTEGER REFERENCES drivers(id),
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        // Seed drivers
        const drivers = [
            {
                first_name: "Jane",
                last_name: "Cooper",
                profile_image_url:
                    "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
                car_image_url:
                    "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
                car_seats: 4,
                rating: "4.80",
            },
            {
                first_name: "Esther",
                last_name: "Howard",
                profile_image_url:
                    "https://ucarecdn.com/6ea6d83d-ef1a-4838-8ce5-455a18b42636/-/preview/876x1000/",
                car_image_url:
                    "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
                car_seats: 4,
                rating: "3.50",
            },
            {
                first_name: "Leslie",
                last_name: "Alexander",
                profile_image_url:
                    "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
                car_image_url:
                    "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
                car_seats: 4,
                rating: "5.00",
            },
            {
                first_name: "Robert",
                last_name: "Fox",
                profile_image_url:
                    "https://ucarecdn.com/fdfc4f8c-c96d-47bd-9818-3f26acd05641/-/preview/500x500/",
                car_image_url:
                    "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
                car_seats: 4,
                rating: "4.50",
            },
        ];

        for (const driver of drivers) {
            await sql`
        INSERT INTO drivers (
          first_name,
          last_name,
          profile_image_url,
          car_image_url,
          car_seats,
          rating
        ) VALUES (
          ${driver.first_name},
          ${driver.last_name},
          ${driver.profile_image_url},
          ${driver.car_image_url},
          ${driver.car_seats},
          ${driver.rating}
        );
      `;
        }

        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        console.error("Error seeding database:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
