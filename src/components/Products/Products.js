import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
// import shoe1 from '../images/shoe1.png';

function Products({products, AddtoCart}) {


    return (
        <Container>
            <Cards>
                {
                    products.map((product, index) => (
                        <ProductCard key={index} product={product} AddtoCart={AddtoCart}/>
                    ))
                }
            </Cards>
        </Container>
    )
}

export default Products

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 75px);
    display: flex;
    align-items: center;
    justify-content: center;
`
const Cards = styled.div`
    width: 95%;
    padding-top:15px;
    height: calc(100vh - 75px);
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
`