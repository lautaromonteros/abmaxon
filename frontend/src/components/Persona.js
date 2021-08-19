import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

const Persona = ({persona}) => {

    const eliminarPersona = id => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Un cliente eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/personas/?id=${id}`)
                    .then(respuesta => {
                        Swal.fire(
                            'Deleted!',
                            respuesta.data.respuesta,
                            'success'
                        )
                    })
            }
          })
    }

    return ( 
        <div className="persona">
            <div className="datos-persona">
                <p>Nombre: {persona.nombre}</p>
                <p>Apellido: {persona.apellido}</p>
                <p>Teléfono: {persona.telefono}</p>
                <p>Correo: {persona.correo}</p>
            </div>
            <div className="acciones-persona">
                <Link to={`/personas/editar/${persona.id}`} className="btn btn-azul">Editar Registro</Link>
                <button 
                    type="button"
                    className="btn btn-rojo"
                    onClick={() => eliminarPersona(persona.id)}
                >Eliminar Registro</button>
            </div>
        </div>
     );
}
 
export default Persona;