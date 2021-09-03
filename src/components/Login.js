import React from 'react';
import styled from 'styled-components';
import {auth, provider,db} from '../firebase';

function Login(props) {

    const signIn = () => {
        // console.log('hiii')
        auth.signInWithPopup(provider)
        .then((result) => {
            const newUser = {
                name: result.user.displayName,
                photo: result.user.photoURL,
                uid: result.user.uid,
                email: result.user.email,
            }
            // console.log(result)
            localStorage.setItem('user', JSON.stringify(newUser))
            props.setUser(newUser);
            db.collection('/users').doc(newUser.uid).set({
                name : newUser.name,
                photo: newUser.photo 
            }).catch(error => alert(error))
        }).catch((error) => alert(error))

    }

    return (
        <Container>
            <LoginCard>
                <Title>
                    <h1>SPD</h1>
                    <h2>STORE</h2>
                </Title>
                <SignIn>
                    <Button onClick={() => signIn()}><h5>Sign In with Google</h5></Button>
                </SignIn>
            </LoginCard>
        </Container>
    )
}

export default Login

const Container = styled.div`
    width:100%;
    height: 100vh;
    /* background: #fafefd; */
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width:426px){
        flex-direction: column;
    }
    `
const LoginCard = styled.div`
    display: flex;
    align-items: center;
    width: clamp( 600px, 85vw, 800px);
    height: 500px;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    color: white;
`
const Title = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: #08161D; */
    background: linear-gradient(55deg, #212121 0%, #212121 40%, #323232 calc(40% + 1px), #323232 60%, #008F95 calc(60% + 1px), #008F95 70%, #14FFEC calc(70% + 1px), #14FFEC 100%);
    border-radius:10px 0 0 10px;
    h1{
        line-height:1.5;
        font-size:5rem;
    }
    h2{
        line-height:1;
        font-size:2rem;
    }
`
const SignIn = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(-55deg, #212121 0%, #212121 40%, #323232 calc(40% + 1px), #323232 60%, #008F95 calc(60% + 1px), #008F95 70%, #14FFEC calc(70% + 1px), #14FFEC 100%);
    border-radius: 0px 10px 10px 0px;
`
const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    :hover{
        background: rgba( 255, 255, 255, 0.15 );
        backdrop-filter: blur( 9.5px );
        -webkit-backdrop-filter: blur( 9.5px );
    }
`