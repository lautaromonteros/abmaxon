<?php 

namespace App;

use Exception;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

class Persona{
    protected static $db;

    public $id, $nombre, $apellido, $telefono, $correo;

    public static function setDB($database){
        self::$db = $database;
    }

    public function __construct($args = []) {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? null;
        $this->apellido = $args['apellido'] ?? null;
        $this->telefono = $args['telefono'] ?? null;
        $this->correo = $args['correo'] ?? null;
    }

    public static function getPersonas(){
        $query = "SELECT * FROM personas";

        $resultado = self::$db->query($query);

        $array = [];

        while($row = $resultado->fetch_assoc()){
            $array[] = static::crearObjeto($row);
        }

        return $array;

    }

    protected static function crearObjeto($registro){
        $objeto = new static;

        foreach ($registro as $key => $value) {
            if(property_exists($objeto, $key)){
                $objeto->$key = $value;
            }
        }

        return $objeto;
    }

    public static function getPersona($id){
        $query = "SELECT * FROM personas WHERE id = $id";

        $resultado = self::$db->query($query);

        return $resultado->fetch_assoc();
    }

    public function crear(){
        
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $apellido = filter_var($_POST['apellido'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
        $correo = filter_var($_POST['correo'], FILTER_SANITIZE_EMAIL);

        $query = "INSERT INTO personas (nombre, apellido, telefono, correo) VALUES  ('$nombre', '$apellido', '$telefono', '$correo')";
        $resultado = self::$db->query($query);

        if($resultado){
            $respuesta = array(
                'respuesta' => 'Ingresado Correctamente'
            );
        }else{
            http_response_code(400);
            $respuesta = array(
                'respuesta' => 'Ocurrió un error'
            );
        }

        echo json_encode($respuesta);
    }

    public function actualizar(){
        $id = $_GET['id'];

        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $apellido = filter_var($_POST['apellido'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
        $correo = filter_var($_POST['correo'], FILTER_SANITIZE_EMAIL);

        $query = "UPDATE personas SET nombre = '$nombre', apellido = '$apellido', telefono = '$telefono', correo = '$correo' WHERE id = $id ";
        

        try{
            $resultado = self::$db->query($query);

            if($resultado){
                $respuesta = array(
                    'respuesta' => 'Registro Actualizado Correctamente'
                );
            }else{
                http_response_code(400);
                $respuesta = array(
                    'respuesta' => "Error"
                );
            }
        }catch(Exception $e){
            $respuesta = array(
                'respuesta' => $e
            );
        }

        echo json_encode($respuesta);
    }

    public function eliminar(){
        $id = $_GET['id'];

        $query = "DELETE FROM personas WHERE id = $id ";
        
        $resultado = self::$db->query($query);

        if($resultado){
            $respuesta = array(
                'respuesta' => 'Registro Eliminado Correctamente'
            );
        }else{
            $respuesta = array(
                'respuesta' => 'Error'
            );
        }

        echo json_encode($respuesta);
        
    }
}