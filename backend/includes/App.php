<?php

require __DIR__ . '/../config/db.php';
use App\Persona;

function mi_autoload($clase){
    $partes = explode('\\', $clase);
    require __DIR__ . '/../model/' . $partes[1] . '.php';
    
}
spl_autoload_register('mi_autoload');

$db = conectarDB();

Persona::setDB($db);