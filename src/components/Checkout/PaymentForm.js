import React from 'react';
import {Typography, Button, Divider} from '@material-ui/core';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import styled from 'styled-components';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function PaymentForm({checkoutToken,shippingData,backStep,handleCaptureCheckout, nextStep}) {
    
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});

        if(error) {
            console.log(error);
        }else{
            const orderData = {
                line_items : checkoutToken.live.line_items,
                customer: {firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email},
                shipping: {
                    name: 'Shipping Address', 
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry,
                },
                billing: {
                    name: 'Billing Address', 
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry,
                },
                fulfillment: { shipping_method: shippingData.shippingOption},
                payment:{
                    gateway: 'test_gateway',
                    card: {
                        // payment_method_id: paymentMethod.id
                        number: '4242424242424242',
                        expiry_month: '02',
                        expiry_year: '24',
                        cvc: '123',
                        postal_zip_code: '94107',
                    }
                }
            }
            handleCaptureCheckout(checkoutToken.id, orderData);
            nextStep();
        }
    }

    return (
        <Container>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>Payment Method</Typography>
            <h5>Test card number 4242 4242 4242 4242 (others numbers can be random)</h5>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit ={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement/>
                            <br/><br/>
                            <div style={{display: 'flex' ,justifyContent: 'space-between'}}>
                                <BackButton onClick={backStep}><h5>Back</h5></BackButton>
                                <Button type='submit' variant='contained' disabled={!stripe} style={{backgroundColor: '#212121', color: '#fff'}}>
                                    Pay {checkoutToken.live.subtotal.formatted_with_code}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </Container>
    )
}

export default PaymentForm;

const Container = styled.div`
    width: 100%;
    height: 100%;
    h5{
        margin-bottom: 20px;
    }
`
const BackButton = styled.div`
    color: black;
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 125px;
    padding:10px;
    border-radius:5px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
`
