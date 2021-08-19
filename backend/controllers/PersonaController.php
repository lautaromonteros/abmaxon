<?php

use App\Persona;

class PersonaController{
    public static function mostrarPersonas(){
        if(isset($_GET['id'])){
            $personas = Persona::getPersona($_GET['id']);
        }else{
            $personas = Persona::getPersonas();
        }
        
        echo json_encode($personas);
    }

    public static function registroPersona(){
        $persona = new Persona;

        if(isset($_GET['id'])){
            $persona->actualizar();
        }else{
            $persona->crear();
        }
    }

    public static function eliminarPersona(){
        $persona = new Persona;
        $persona->eliminar();
    }
}