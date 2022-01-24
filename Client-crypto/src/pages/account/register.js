import md5 from 'crypto-js/md5';
import { useState } from 'react';
import SnackbarComponent from '~/components/snackbar';
import router from "next/router";
import { Auth } from "~/services/user.service";
import AuthTemplate from "~/components/auth/template";

export default function SignUp() { 
    const [snackbarProps, setSnackbarProps] = useState({
        open: false,
        displayMessage: ''
    });

    const showSnack = (displayMessage) => {
        setSnackbarProps({
            open: true,
            displayMessage: `${displayMessage}`
        })
        setTimeout(() => {
            setSnackbarProps({
                ...snackbarProps,
                open: false
            })
        }, 5000)
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');
        const md5Password = md5(password).toString();

        if (username === '' || password === '') {
            showSnack("Please enter the credentials!");
        }
        else if (confirmPassword !== password) {
            showSnack('Passwords dont match!');
        }
        else {
            const isRegistered = await Auth(username, md5Password, 'register');
            if(!isRegistered) {
                showSnack('User already exists!');
            }
            else {
                console.log("push")
                router.push({pathname: '/'});
            }
        }
    };

    return(
        <div>
            <SnackbarComponent
                open={snackbarProps.open}
                displayMessage={snackbarProps.displayMessage}
            />
            <AuthTemplate 
                submit={handleSignUp}
                method="Sign Up"
                account={{
                    text: "Do you have an account? Sign In",
                    route: "/account/login"
                }}
                isRegisterForm={true}
            />
        </div>
    )   
}