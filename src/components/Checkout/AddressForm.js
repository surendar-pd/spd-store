import React,{ useState, useEffect }  from 'react';
import styled from 'styled-components';
import {useForm, FormProvider} from 'react-hook-form';
import {Grid, Select, MenuItem, InputLabel} from '@material-ui/core';
import InputField from './InputField';
import {commerce} from '../../lib/commerce';
import {Link} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


function AddressForm({checkoutToken, next}) {

    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));
    const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_code})`}));

    const [position, setPosition] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = position;

    const handleClick = (newState) => {
        setPosition({ open: true, ...newState });
    };
    
    const handleClose = () => {
        setPosition({ ...position, open: false });
    };

    const getShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const getSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const getShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country, region});
        setShippingOptions(options);
        setShippingOption(options[0].id)
    }


    useEffect(() =>{
        getShippingCountries(checkoutToken.id);
    },[])

    useEffect(() =>{
        if(shippingCountry) getSubdivisions(shippingCountry);
    },[shippingCountry])

    useEffect(() =>{
        if(shippingSubdivision) getShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision);
    },[shippingSubdivision])
    
    return (
        <Container>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                autoHideDuration={3000}
                key={vertical + horizontal}
            >
                <Alert severity="error">You have entered an invalid email address!</Alert>
            </Snackbar>
            <h2>Shipping Address</h2>
            <FormProvider { ...methods}>
                <form onSubmit={
                    methods.handleSubmit((data) => {
                        if(data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                            next({ ...data, shippingCountry, shippingSubdivision, shippingOption})
                        }else{
                            handleClick({ vertical: 'bottom', horizontal: 'left' })
                        }
                    })
                    }>
                    <Grid container spacing={3}>
                        <InputField name='firstName' label='First name'/>
                        <InputField name='lastName' label='Last name'/>
                        <InputField name='address1' label='Address'/>
                        <InputField name='email' label='Email'/>
                        <InputField name='city' label='City'/>
                        <InputField name='zip' label='ZIP Code'/>
                        {/* <InputField name='phone' label='Phone Number'/> */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry ? shippingCountry : ""} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {
                                    countries.map((country)=>(
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping State</InputLabel>
                            <Select value={shippingSubdivision ? shippingSubdivision : ""} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {
                                    subdivisions.map((subdivision)=>(
                                        <MenuItem key={subdivision.id} value={subdivision.id}>
                                            {subdivision.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption ? shippingOption : ""} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {
                                    options.map((option)=>(
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Link to={'/cart'}>
                            <BackToCartButton><h5>Back to Cart</h5></BackToCartButton>
                        </Link>
                        <NextButton><button type="submit">Next</button></NextButton>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}

export default AddressForm

const Container = styled.div`
    display:flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    a{
        text-decoration: none;
    }
`
const BackToCartButton = styled.div`
    color: black;
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 125px;
    padding:10px;
    border-radius:5px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
`
const NextButton = styled.div`
    button{
        width: 125px;
        height: 100%;
        cursor: pointer;
        /* background: none; */
        border: none;
        padding:0;
        background-color:#212121;
        color: #fff;
        border-radius:5px;
        box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    }
`
