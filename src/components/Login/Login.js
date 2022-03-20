import axios from 'axios';
import './Login.css';
import imgPassw from '../../img/password.png'
import { NavLink } from "react-router-dom"
import { useState } from "react";

function Login() {

    const [passwordShown, setPasswordShown] = useState(false);

    const consumir_login = () => {

        var postData = {
            username: document.getElementById("user").value,
            password: document.getElementById("passw").value,
        }

        axios.post("http://localhost:8000/api/v2/login",postData, {
            Headers: { "Content-Type": "application/json", },
        })
        .then((response) => {
            console.log(response.data);
            localStorage.setItem('id', response.data.user_id)
            localStorage.setItem('tokenLocal', response.data.token)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('first_name', response.data.first_name)
            localStorage.setItem('last_name', response.data.last_name)

            window.location = "/profile"

        })
        .catch((error) => {
            console.log(error.response.data)
        })

    }

    const ver_contraseña = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <>
            <div className="form-box">
                <h1>Login</h1>
                <div>
                    <label className='texto'>Usuario:</label> 
                    <input className="input" id="user" type="text" placeholder="Usuario"/>
                    <label className='texto'>Contraseña:</label> 
                    <div className='password'>  
                        <input className="input" id="passw" type={passwordShown ? "text" : "password"} placeholder="Contraseña"/>
                        <img id="passwImg" alt='error' onClick={ver_contraseña} src={imgPassw}></img>
                    </div>
                    <input type="submit" onClick={consumir_login} className="button" value="Enviar"/>
                    <br></br>
                    <NavLink  id="link" to="/register"><div id='link'>¿No tienes una cuenta?</div></NavLink>
                </div>
            </div>
        </>
    );

}

export default Login;