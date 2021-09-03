import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import{Switch, Route, HashRouter} from 'react-router-dom';
import Navigation from './Navigation';
import Products from './Products/Products'
import CheckOut from './Checkout/CheckOut';
import Cart from './Cart/Cart';
import {commerce} from '../lib/commerce';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
// import { slide as Menu } from 'react-burger-menu';


function Home(props) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [error, setError] = useState('');

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

    const getProducts = async () => {
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const getCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity,variantInfo) => {
        if(variantInfo){
            const {cart} = await commerce.cart.add(productId,quantity,variantInfo);
            setCart(cart);
        }else{
            handleClick({ vertical: 'bottom', horizontal: 'left' })
        }
    }
    const handleUpdateQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId,{quantity});
        setCart(cart);
    }

    const handleRemoveProduct = async(productId) => {
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async () =>{
        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setError(error.data.error.message);
            alert(error.data.error.message);
        }
    }

    useEffect(() => {
        getProducts();
        getCart();
    },[]);

    
    return (
        <HashRouter>
            <Container>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                autoHideDuration={3000}
                key={vertical + horizontal}
            >
                <Alert severity="error">Make sure that you've selected your size</Alert>
            </Snackbar>
            {/* <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a  className="menu-item--small" href="#">Settings</a>
            </Menu> */}
                <Navigation user={props.user} signOut={props.signOut} cartItems={cart.total_unique_items}/>
                <Content>
                    <Switch>
                        <Route exact path={['/','/products']}>
                            <Products products={products} AddtoCart={handleAddToCart}/>
                        </Route>
                        <Route exact path={'/cart'}>
                            <Cart 
                                cart={cart}
                                handleUpdateQty={handleUpdateQty}
                                handleRemoveProduct={handleRemoveProduct}
                                handleEmptyCart={handleEmptyCart}
                                />
                        </Route>
                        <Route exact path={'/checkout'}>
                            <CheckOut order={order} handleCaptureCheckout={handleCaptureCheckout} error={error} cart={cart}/>
                        </Route>
                    </Switch>
                </Content>
            </Container>
        </HashRouter>
    )
}

export default Home

const Container = styled.div`
    width: 100%;
    height: 100vh;
`
const Content = styled.div`
    width: 100%;
    height: calc(100vh - 75px);
`