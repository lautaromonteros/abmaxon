<?php

require __DIR__ . '/includes/App.php';
require __DIR__ . '/Router.php';
require __DIR__ . '/controllers/PersonaController.php';

$router = new Router();

$router->get('/personas/', [PersonaController::class, 'mostrarPersonas']);

$router->post('/personas/', [PersonaController::class, 'registroPersona']);

$router->delete('/personas/', [PersonaController::class, 'eliminarPersona']);

$router->comprobarRutas();