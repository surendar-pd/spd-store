import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { commerce } from '../../lib/commerce';
import {Link, useHistory} from 'react-router-dom';
import {Typography, Button, Divider, CircularProgress} from '@material-ui/core';


const steps = ['Shipping Address', 'Payment Details']

function CheckOut({cart, order, handleCaptureCheckout, error}) {
    // console.log(order)
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const history = useHistory();
    // console.log(shippingData)

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id,{type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {
                // history.push('/');
            }
        } 
        generateToken();
    },[cart])

    const nextStep = () => setActiveStep((prevState) => prevState + 1);
    const backStep = () => setActiveStep((prevState) => prevState - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    let ConfirmationForm = () => order.customer ? (
        <Confirmation>
            <div>
                <Typography style={{textAlign: 'center'}} variant="h6">Thank you <span>{order.customer.firstname} {order.customer.lastname}</span> for you purchase</Typography>
                <Divider style={{marginBottom: '10px'}}/>
                <Typography variant="subtitle2">Order Ref: {order.customer_reference}</Typography>
                <p>A confirmation email has been sent to {order.customer.email} </p>
            </div>
            <br/>
            <Link to="/">
                <BuyAgain>
                    <h5>Buy Again</h5>
                </BuyAgain>
            </Link>
        </Confirmation>
    ) : (
        <div>
            <CircularProgress/>
        </div>
    );

    if(error){
        <>
            <Typography variant="h5">Error: {error}</Typography><br/>
            <Button component={Link} to='/' variant="outlined" type="button">Buy Again</Button>
        </>
    }

    const CurrentForm = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} nextStep={nextStep}/>
    return (
        <>
        <Container>
            <CheckOutForm>
                <h1>Check Out</h1>
                <Stepper style={{width:'100%',backgroundColor:'transparent'}} activeStep={activeStep}>
                    {
                        steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
                {activeStep === steps.length ? <ConfirmationForm/> : checkoutToken && <CurrentForm/>}
            </CheckOutForm>
        </Container>
        </>
    )
}

export default CheckOut

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`
const CheckOutForm = styled.div`
    padding: 20px;
    width: clamp(350px, 75%, 550px);
    height: fit-content;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    border-radius:10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Confirmation = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    span{
        color:#008F95;
    }
    a{
        text-decoration: none;
    }
    p{
        font-weight: bold;
    }
`
const BuyAgain = styled.div`
    cursor: pointer;
    background-color:#212121;
    color:#fff;
    padding:10px;
    border-radius:5px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
`