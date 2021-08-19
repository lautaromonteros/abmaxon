import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

const EditarPersona = (props) => {
    const id = props.match.params.id;

    const [persona, setPersona] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        correo: ''
    });
    
    const consultarAPI = async () => {
        const consulta = await clienteAxios.get(`/personas/?id=${id}`);
        setPersona(consulta.data);
    }

    useEffect(() => {

        consultarAPI();
        // eslint-disable-next-line
    }, []);

    const handleChange = e => {
        setPersona({
            ...persona,
            [e.target.name] : e.target.value
        });
    }

    const enviarDatos = e => {
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

        clienteAxios.post(`/personas/?id=${id}`, formData)
            .then(respuesta => {
                console.log(respuesta)
                if(respuesta.status === 200){
                    Swal.fire(
                        'Se modificó el Registro',
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
            <h2>Editar Persona</h2>

            <form onSubmit={enviarDatos}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={persona.nombre} onChange={handleChange} />
                </div>
                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" name="apellido" value={persona.apellido} onChange={handleChange} />
                </div>
                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" name="telefono" value={persona.telefono} onChange={handleChange} />
                </div>
                <div className="campo">
                    <label>Email:</label>
                    <input type="email" name="correo" value={persona.correo} onChange={handleChange} />
                </div>
                <div className="campo enviar">
                    <input type="submit" value="Agregar Registro" className="btn btn-azul" />
                </div>
            </form>
        </div>
    );
}
 
export default withRouter(EditarPersona);