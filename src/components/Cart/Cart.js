import React from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';
import {Link} from "react-router-dom";

function Cart({cart,handleUpdateQty,handleRemoveProduct,handleEmptyCart}) {

    const EmptyCart = () => (
        <EmptyCartDiv>
                <h1>Looks like your cart is empty</h1>
                <h3>Go get some</h3>
                <Link to={'/products'}>
                    <Button><h5>Products</h5></Button>
                </Link>
        </EmptyCartDiv>
    )

    const FilledCart = () => (
        <>
            <CurrentCart>
                {
                    cart.line_items.map((item,index) => (
                        <CartItem handleUpdateQty={handleUpdateQty} handleRemoveProduct={handleRemoveProduct} key={index} item={item}/>
                    ))
                }
            </CurrentCart>
            <Footer>
                <Total>
                    <h3>Your total for today is</h3>
                    <h2>{cart.subtotal.formatted_with_code}</h2>
                </Total>
                <CheckOut>
                    <EmptyCartButton onClick={handleEmptyCart}>
                        <h5>EmptyCart</h5>
                    </EmptyCartButton>
                    <Link to={'/checkout'}>
                        <CheckOutButton>
                            <h5>Check Out</h5>
                        </CheckOutButton>
                    </Link>
                </CheckOut>
            </Footer>
        </>
    )
    
    if(!cart.line_items) return 'Loding...'

    return (
        <Container>
            {
                !cart.line_items.length ? <EmptyCart/> : <FilledCart/>
            }
        </Container>
    )
}

export default Cart

const Container = styled.div`
    /* padding-top: 100px; */
    padding:15px;
    width: 100%;
    height: calc(100vh - 75px);
    padding-left: 20px;
    padding-right: 20px;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        display: none;
    }

`
const EmptyCartDiv = styled.div`
    width: 100%;
    height: calc(100vh - 75px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align:center;
    h3{
        line-height:3;
    }
    a{
        text-decoration: none;
        color: #212121;
    }
`
const Button = styled.div`
    cursor: pointer;
    background-color:#212121;
    color:#fff;
    padding:10px;
    border-radius:5px;
    transition: all .3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
`
const CurrentCart = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
` 
const Footer = styled.div`
    width: 90%;
    height:100px;
    display: flex;
    justify-content:flex-end;
    margin-right: 20px;
    @media screen and (max-width : 426px){
        flex-direction: column;
        justify-content: center;
    }
`
const Total = styled.div`
    font-size: clamp(1rem, 1vw, 2rem);
    margin-top: 15px;
    align-items: center;
    display:flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`
const CheckOut = styled.div`
    align-items: center;
    display:flex;
    justify-content:space-around;
    height: 100%;
    background-color: white;
    margin-left: 20px;
    a{
        text-decoration:none;
    }
    @media screen and (max-width: 426px){
        margin: 10px 0;
    }
`
const EmptyCartButton = styled.div`
    cursor: pointer;
    margin-left: 20px;
    padding:10px;
    border-radius:5px;
    transition: all 0.3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
`
const CheckOutButton = styled.div`
    margin-left: 20px;
    cursor: pointer;
    background-color:#212121;
    color:#fff;
    padding:10px;
    border-radius:5px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
`