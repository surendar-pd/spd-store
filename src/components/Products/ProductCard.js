import React, {useState} from 'react';
import styled from 'styled-components';


function ProductCard({product,AddtoCart}) {

    const [variantInfo, setVariantInfo] = useState();
    const [active, setActive] = useState();

    return (
        <Container>
            <Image>
                <img alt="shoe" src={product.media.source}></img>
            </Image>
            <Description>
                <h2>{product.name}</h2>
                <h3>{product.price.formatted_with_code}</h3>
                <Sizes>
                    <h4>{product.variant_groups[0].name}</h4>
                    {
                        product.variant_groups.map(({index, options, id}) => (
                            options.map((option) => (
                                <Size active={option.id === active} key={index} onClick={() => {setVariantInfo({[id]: option.id});setActive(option.id)}}>
                                    <p>{option.name}</p>
                                </Size>
                            ))
                        ))
                    }
                </Sizes>
                <AddToCart onClick={() => AddtoCart(product.id, 1, variantInfo)}>
                    <h5>Add to cart</h5>
                </AddToCart>
            </Description>
        </Container>
    )
}

export default ProductCard

const Container = styled.div`
    width: 250px;
    height:300px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 10px;
    background: linear-gradient(55deg, #212121 0%, #212121 40%, #323232 calc(40% + 1px), #323232 60%, #008F95 calc(60% + 1px), #008F95 70%, #14FFEC calc(70% + 1px), #14FFEC 100%);
    color: white;
`
const Image = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height:50%;
    img{
        width:100%;
    }
`
const Description = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
`
const Sizes = styled.div`
    display: flex;
    width:100%;
    justify-content:space-around;

`
const Size = styled.div`
    width: 35px;
    display: flex;
    align-items:center;
    justify-content: center;
    /* margin-left: 10px; */
    cursor: pointer;
    padding: 2px;
    border-radius:5px;
    background: ${p => (p.active ? "rgba( 255, 255, 255, 0.15 )" : "transparent")};
    :hover{
        background: rgba( 255, 255, 255, 0.15 );
        backdrop-filter: blur( 9.5px );
        -webkit-backdrop-filter: blur( 9.5px );
    }
`
const AddToCart = styled.div`
    width: 100%;
    display: flex;
    justify-content:center;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;    
    border-radius: 5px;
    transition: all .2s ease;
    padding:10px;
    :hover{
        background: rgba( 255, 255, 255, 0.15 );
        backdrop-filter: blur( 9.5px );
        -webkit-backdrop-filter: blur( 9.5px );
    }
`