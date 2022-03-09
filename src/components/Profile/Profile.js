import axios from 'axios';
import './Profile.css'

function App() {

    var data = {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
    }

    const obtener_local = () => {
        var id = localStorage.getItem('id');
        data.username = localStorage.getItem('username')
        data.email = localStorage.getItem('email')
        data.first_name = localStorage.getItem('first_name')
        data.last_name = localStorage.getItem('last_name')
        obtener_datos(id)
    }

    const obtener_datos = (id) => {
        var url = "http://localhost:8000/api/v1/userprofile/data/" + id
        axios.get(url, {
            headers: {
                "Content-Type": "application/json", 'Authorization': 'Token ' + localStorage.getItem('tokenLocal'),
            },
        })
            .then((response) => {
                let url_image = "http://localhost:8000"
                url_image += response.data.url_image   
                console.log(response.data)
                document.getElementById('img').src = url_image;
            })
            .catch((error) => {
                //alert("Error")
                console.log(error.response.data)
                if(error.response.data === "No hay datos"){
                    completar_perfil()
                }
            })
    }

    const completar_perfil = () => {
        document.getElementById('background').style.display = "block"
        document.getElementById('formImg').style.display = "block"
    }

    const crear_perfil = () => {
        var url = "http://localhost:8000/api/v1/userprofile/list/"
        let putData = new FormData();
        putData.append('id_user', localStorage.getItem('id'));
        putData.append('url_image', document.getElementById('img_profile').files[0]);
        axios.post(url, putData, {
            headers: {
                "Content-Type": "application/form-data", 'Authorization': 'Token ' + localStorage.getItem('tokenLocal'),
            },
        })
        .then((response) => {
            console.log(response.data)
            document.getElementById('background').style.display = "none"
            document.getElementById('formImg').style.display = "none"
            window.location.reload();
        })
        .catch((error) => {
            alert("Error")
            console.log(error.response.data)
        })
    }

    const editar_perfil = () => {
        if( document.getElementById('upload_img').value !== "" && 
        (document.getElementById('username') !== data.username || document.getElementById('email') !== data.email || 
        document.getElementById('fname') !== data.first_name || document.getElementById('lname') !== data.last_name)) {

            editar_img()
            editar_datos()
        }
        if(document.getElementById('upload_img').value !== ""){
            editar_img()
        }
        if(document.getElementById('username') !== data.username || document.getElementById('email') !== data.email || 
        document.getElementById('fname') !== data.first_name || document.getElementById('lname') !== data.last_name) {
            editar_datos()
        }
    }

    const editar_img = () => {
        let putData = new FormData();
        putData.append('id_user', localStorage.getItem('id'));
        putData.append('url_image', document.getElementById('upload_img').files[0]);

        var url = "http://localhost:8000/api/v1/userprofile/data/" + localStorage.getItem('id')
        axios.put(url, putData, {
            headers: {
                'Content-Type': 'application/form-data',
                'Authorization': 'Token ' + localStorage.getItem('tokenLocal'),
            },
        }).then((response) => {
            console.log(response.data);
            var url_image = 'http://localhost:8000'
            url_image += response.data.url_image;
            document.getElementById('img').src = url_image;

            ocultar_formulario()
        }).catch((error) => {
            alert("Error")
            console.log(error.response.data);
        });
    }

    const editar_datos = () => {
        var editedData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            first_name: document.getElementById('fname').value,
            last_name: document.getElementById('lname').value,
        }
    
        var url = "http://localhost:8000/api/v1/userprofile/updateData/" + localStorage.getItem('id')
        axios.put(url, editedData, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Token ' + localStorage.getItem('tokenLocal'),
            },
        }).then((response) => {
            console.log(response.data);
            
            localStorage.removeItem('username')
            localStorage.removeItem('email')
            localStorage.removeItem('first_name')
            localStorage.removeItem('last_name')

            localStorage.setItem('username', response.data.username)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('first_name', response.data.first_name) 
            localStorage.setItem('last_name', response.data.last_name)

            ocultar_formulario()
        }).catch((error) => {
            console.log(error.response.data);
        });
        
    }

    const borrar_perfil = () =>{
        var url = "http://localhost:8000/api/v1/userprofile/data/" + localStorage.getItem('id')
        axios.delete(url, {
            headers: {
                "Content-Type": "application/json", 'Authorization': 'Token ' + localStorage.getItem('tokenLocal'),
            },
        })
            .then((response) => {
                console.log(response.data)
                cerrar_sesion()
            })
            .catch((error) => {
                //alert("Error")
                console.log(error.response.data)
            })
    }


    const mostrar_formulario = () =>{
        document.getElementById('background').style.display = "block"
        document.getElementById('form').style.display = "block"
    }

    const ocultar_formulario = () => {
        document.getElementById('background').style.display = "none"
        document.getElementById('form').style.display = "none"
        document.getElementById('formImg').style.display = "none"
        window.location.reload();
    }

    const cerrar_sesion = () =>{
        localStorage.removeItem('id')
        localStorage.removeItem('tokenLocal')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('first_name')
        localStorage.removeItem('last_name')
        window.location = "/"
    }

    obtener_local()

    return (
        <>
            <div id='background' onClick={ocultar_formulario}></div>
            <div id="container"> 
                <div id='data'>  
                    <img id="img" src="http://localhost:8000/assets/img/defaultUser.png" alt="error"></img>
                    <div>
                        <span id="userN">{data.username}</span>
                        <hr></hr>
                        <span className='text'>{data.first_name}  {data.last_name} </span>
                        <span className='text'>{data.email}</span>
                    </div>
                </div>
                <div id="buttons"> 
                    <button id='edit' onClick={mostrar_formulario}>Editar perfil</button>
                    <button id='close' onClick={cerrar_sesion}>Salir</button>
                </div>
            </div>

            <div className="forms" id='formImg'>
                <h2>Completa tu perfil</h2>
                <label className="formProfile">Añade una imagen de perfil:</label>
                <input type="file" id="img_profile" name="url_image"accept="image/png, image/jpeg, image/jpg"></input>
                <div id='options'><button id='send' onClick={crear_perfil}>Guardar</button> </div>
            </div>

            <div className="forms" id='form'>
                <h2>Editar perfil</h2>
                <label className="formProfile">Imagen de perfil:</label>
                <input type="file" id="upload_img" name="url_image"accept="image/png, image/jpeg, image/jpg"></input>
                <label className="formProfile">Usuario:</label>
                <input className="inputText" id='username' type="text" placeholder="Usuario" defaultValue={data.username}></input>
                <label className="formProfile">Correo:</label>
                <input className="inputText" id='email' type="text" placeholder="Correo" defaultValue={data.email}></input>
                <label className="formProfile">Nombre:</label>
                <input className="inputText" id='fname' type="text" placeholder="Nombre" defaultValue={data.first_name}></input>
                <label className="formProfile">Apellidos:</label>
                <input className="inputText" id='lname' type="text" placeholder="Apellidos" defaultValue={data.last_name}></input>
                <div id='options'><button id='exit' onClick={borrar_perfil}>Eliminar perfil</button>   <button id='send' onClick={editar_perfil}>Guardar</button> </div>
            </div>
        </>
    );

}

export default App;