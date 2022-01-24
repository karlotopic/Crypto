import router from "next/router";
import md5 from 'crypto-js/md5';
import { useState } from 'react';
import SnackbarComponent from '~/components/snackbar';
import { Auth } from "~/services/user.service";
import AuthTemplate from "~/components/auth/template";

export default function Login() {
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
    
    const handleLogIn = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');

        if (username === '' || password === '') {
            showSnack("Please enter the credentials!");
        }
        else {
            const md5Password = md5(password).toString();
            const isAuthorized = await Auth(username, md5Password, 'login');
            if(!isAuthorized) {
                showSnack("Wrong credentials!");
            } 
            else {
                router.push({pathname: '/'});
            }
        }
    };

    return (
        <div>
            <SnackbarComponent
                open={snackbarProps.open}
                displayMessage={snackbarProps.displayMessage}
            />
            <AuthTemplate 
                submit={handleLogIn}
                method="Sign in"
                account = {{ 
                    text: "Don't have an account? Sign Up",
                    route:"/account/register"
                }}
                isRegisterForm={false}
            />
        </div>
    )
}