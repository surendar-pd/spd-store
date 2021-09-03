import React from 'react';
import styled from 'styled-components';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import {Link, useLocation} from "react-router-dom";

function Navigation(props) {

    const location = useLocation();
    // console.log(location);
    return (
        <>
        {
            location.pathname !== '/checkout' && (
                <Container>
                    <Title>
                        <h1>SPD</h1>
                    </Title>
                    <Links>
                        <Link to={'/products'}>
                            <h1>Products</h1>
                        </Link>
                        <Link to={'/cart'}>
                            <h1>
                                Cart
                                <Badge badgeContent={props.cartItems} color="secondary">
                                    <ShoppingCartOutlinedIcon/>
                                </Badge>
                            </h1>
                        </Link>
                    </Links>
                </Container>
            )
        }
        </>
    )
}

export default Navigation

const Container = styled.div`
    width: 100%;
    height: 75px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 50px;
    background: white;
    /* z-index:1; */
    @media screen and (max-width: 426px){
        padding: 0px 20px;
    }
`
const Title = styled.div``
const Links = styled.div`
    display: flex;
    align-items: center;
    width: clamp( 200px, 50%, 400px);
    justify-content: space-around;
    h1{
        display: flex;
        font-size:1.25rem;
        align-items: center;
        .MuiSvgIcon-root{
            margin-left: 10px;
        }
    }
    a{
        color: #08161D;
        text-decoration: none;
    }
`