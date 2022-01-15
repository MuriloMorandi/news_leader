import { query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { fauna } from "service/fauna";
import { stripe } from "service/stripe";

type User = {
    ref: {
        id: string;
    },
    data: {
        stripe_customer_id: string;
    }
}

export default async function Subscribe(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const sessions = await getSession({ req });
        
        
        const user = await fauna.query<User>(
            query.Get(
                query.Match(
                    query.Index('user_by_email'),
                    query.Casefold(sessions.user.email)
                )
            )
        )

        let customerId = user.data.stripe_customer_id;

        if (!customerId) {

            const stripeCustomer = await stripe.customers.create({
                email: sessions.user.email,
            });

            await fauna.query(
                query.Update(
                    query.Ref(
                        query.Collection('users'),
                        user.ref.id
                    ),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id
                        }
                    }
                )
            );

            customerId = stripeCustomer.id

        }

        console.log(customerId, 'customerId');
        
        const checkoutSession = await stripe.checkout.sessions.create(
            {
                customer: customerId,
                payment_method_types: ['card'],
                billing_address_collection: 'required',
                line_items: [
                    { price: 'price_1KGsi5DmWZ4Pfu9OAH6NLIlb', quantity: 1 }
                ],
                mode: 'subscription',
                allow_promotion_codes: true,
                success_url: process.env.STRIPE_SUCCESS_URL,
                cancel_url: process.env.STRIPE_CANCEL_URL
            }
        )

        return res.status(200).json({ sessionId: checkoutSession.id })
    }
    else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed')
    }

}