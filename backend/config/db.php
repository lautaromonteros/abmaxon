<?php 

function conectarDB(){
    $db = new mysqli('localhost', 'root', '', 'apirest');

    if(!$db){
        echo "Error";
        exit;
    }

    return $db;
}