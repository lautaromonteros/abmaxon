import React,  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';

import Persona from './Persona';

const Personas = () => {

    const [personas, setPersonas] = useState([]);

    const consultarAPI = async () => {
        const respuesta = await clienteAxios.get('/personas/');

        setPersonas(respuesta.data);
    }

    useEffect(() => {
        let isMounted = true;  

        if(isMounted) consultarAPI();

        return () => { isMounted = false };
    }, []);

    return ( 
        <div className="contenedor">
            <h2>Personas</h2>

            <Link to={'/personas/nuevo'} className="btn btn-verde">Crear Registro</Link>

            <div className="personas">
                { (personas.length > 0) ? 
                    personas.map(persona => (
                        <Persona 
                            key={persona.id}
                            persona={persona}
                        />
                    ))

                : 'No existen registros'

                }
                
            </div>
        </div>
     );
}
 
export default Personas;