import axios from "axios";
import './Register.css';
import { NavLink } from "react-router-dom"

function App(){

    const obtener_local = () =>{
        localStorage.removeItem('token');
        alert(localStorage.getItem('tokenLocal'));
    }
    
    const register = () =>{
        var postData = {
            username: document.getElementById("user").value,
            password: document.getElementById("passw").value,
            password2: document.getElementById("passw2").value,
            email: document.getElementById("email").value,
            first_name: document.getElementById("firstName").value,
            last_name: document.getElementById("lastName").value,     
        }

        axios.post("http://localhost:8000/api/v1/registro/",postData,{
            Headers: { "Content-Type": "application/json", 'Authorization': 'Bearer my-token',
        },  
        })
        .then((response) => {
            console.log(response.data)
            window.location = "/"
        })
        .catch((error) => {
            alert("Error")
            console.log(error.response.data)
        })
    }

    return(
    
            <div className="form-box">
                <h1>Registro</h1>
                <div>
                    <label>Nombre:</label> 
                    <input className="input" id="firstName" type="text" placeholder="Nombre"/>
                    <label>Apellido:</label> 
                    <input className="input" id="lastName" type="text" placeholder="Apellido"/>
                    <label>Usuario:</label> 
                    <input className="input" id="user" type="text" placeholder="Usuario"/>
                    <label>Email:</label>
                    <input className="input" id="email" type="text" placeholder="Email"/>
                    <label>Contraseña:</label> 
                    <input className="input" id="passw" type="text" placeholder="Contraseña"/>
                    <label>Contraseña:</label> 
                    <input className="input" id="passw2" type="text" placeholder="Contraseña"/>
                    <input type="submit" onClick={register} className="button" value="Enviar"/>
                    <br></br>
                    <NavLink  id="link" to="/"><div id='link'>¿No tienes una cuenta?</div></NavLink>
                </div>
            </div>
        
    )
}

export default App;