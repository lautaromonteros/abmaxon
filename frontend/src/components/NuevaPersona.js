import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

const NuevaPersona = (props) => {

    const [persona, setPersona] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        correo: ''
    });

    const handleChange = e => {
        setPersona({
            ...persona,
            [e.target.name] : e.target.value
        });
    }

    const enviarDatos = async e => {

        e.preventDefault();

        if(persona.nombre.trim() === '' || persona.apellido.trim() === '' || persona.telefono.trim() === '' || persona.correo.trim() === ''){
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error'
            });
            return;
        }

        const formData = new FormData();
        formData.append('nombre', persona.nombre);
        formData.append('apellido', persona.apellido);
        formData.append('telefono', persona.telefono);
        formData.append('correo', persona.correo);

        clienteAxios.post("/personas/", formData)
            .then(respuesta => {
                console.log(respuesta)
                if(respuesta.status === 200){
                    Swal.fire(
                        'Correcto',
                        respuesta.data.respuesta,
                        'success'
                    );
                }
                props.history.push('/');
            }).catch(error => {
                Swal.fire({
                    icon: 'error', 
                    title: 'Error', 
                    text: 'Ocurrió un error'
                })
            })
            
    }

    return ( 
        <div className="contenedor">
            <h2>Agregar Nueva Persona</h2>

            <form onSubmit={enviarDatos}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" name="nombre" onChange={handleChange} />
                </div>
                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" name="apellido" onChange={handleChange} />
                </div>
                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" name="telefono" onChange={handleChange} />
                </div>
                <div className="campo">
                    <label>Email:</label>
                    <input type="email" name="correo" onChange={handleChange} />
                </div>
                <div className="campo enviar">
                    <input type="submit" value="Agregar Registro" className="btn btn-azul" />
                </div>
            </form>
        </div>
     );
}
 
export default withRouter(NuevaPersona);