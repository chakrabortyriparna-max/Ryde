import { Stripe } from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, amount } = req.body;

        if (!name || !email || !amount) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let customer;
        const existingCustomers = await stripe.customers.list({ email });

        if (existingCustomers.data.length > 0) {
            customer = existingCustomers.data[0];
        } else {
            customer = await stripe.customers.create({
                name,
                email,
            });
        }

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: "2024-06-20" }
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amount) * 100,
            currency: "usd",
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
        });

        return res.status(200).json({
            paymentIntent: paymentIntent,
            ephemeralKey: ephemeralKey,
            customer: customer.id,
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
