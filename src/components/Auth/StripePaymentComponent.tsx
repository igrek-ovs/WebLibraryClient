import React, {useState} from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import '../../StripePaymentForm.css';
import api from "../../services/api";

const StripePaymentForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setError(error.message ?? 'An error occurred');
            } else {
                await sendPaymentToken(paymentMethod?.id);
            }
        }
    };

    const sendPaymentToken = async (paymentMethodId: string | undefined) => {
        if (!paymentMethodId) return;

        try {
            const response = await api.post('/api/Payment', {
                paymentMethodId: paymentMethodId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            console.log('Payment successful');
        } catch (error) {
            setError('Payment failed. Please try again.');
        }
    };



    return (
        <form onSubmit={handleSubmit} className="card-element-container">
            <div >
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            fontFamily: 'Arial, sans-serif',
                        }
                    }
                }}/>
            </div>
            {error && <div>{error}</div>}
            <button type="submit" disabled={!stripe}>
                Pay $5
            </button>
        </form>
    );
};

export default StripePaymentForm;
