import React from 'react';
import styled from 'styled-components';

function CartItem({item,handleUpdateQty,handleRemoveProduct}) {

    return (
        <Container>
            <img src={item.media.source} alt={item.name}/>
                <h2>{item.name}</h2>
                <h4>Selected Size : {item.selected_options[0].option_name}</h4>
            <Quantity>
                <h4>Quantity</h4>
                <Button onClick={() => handleUpdateQty(item.id, item.quantity - 1)}>-</Button>
                <h4>{item.quantity}</h4>
                <Button onClick={() => handleUpdateQty(item.id, item.quantity + 1)}>+</Button>
            <RemoveProduct onClick={() => handleRemoveProduct(item.id)}>
                <h5>Remove product</h5>
            </RemoveProduct>
            </Quantity>
            <ProductPrice>
                <h3>{item.line_total.formatted_with_code}</h3>
            </ProductPrice>
        </Container>
    )
}

export default CartItem;

const Container = styled.div`
    position: relative;
    padding:10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 10px;
    width: clamp( 260px, 50%, 400px);
    height: 300px;
    color: white;
    background: linear-gradient(55deg, #212121 0%, #212121 40%, #323232 calc(40% + 1px), #323232 60%, #008F95 calc(60% + 1px), #008F95 70%, #14FFEC calc(70% + 1px), #14FFEC 100%);
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    margin: 10px;
    img{
        width:200px;
    }
`
const Quantity = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    align-items: center;
    justify-content:space-around;
`
const Button = styled.div`
    cursor: pointer;
    width: 35px;
    display: flex;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
    :hover{
        background: rgba( 255, 255, 255, 0.15 );
        backdrop-filter: blur( 9.5px );
        -webkit-backdrop-filter: blur( 9.5px );
    }
`
const ProductPrice = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    color: black;
`
const RemoveProduct = styled.div`
    cursor: pointer;
    padding: 10px;
    font-size:0.9rem;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
    display: flex;
    text-align: center;
    :hover{
        background: rgba( 255, 255, 255, 0.15 );
        backdrop-filter: blur( 9.5px );
        -webkit-backdrop-filter: blur( 9.5px );
    }
    @media screen and (max-width:426px){
        font-size:0.75rem;
    }
`