<?php 

class Router {

    public $rutasGET = [];
    public $rutasPOST = [];
    public $rutasDELETE = [];

    public function get($url, $fn){
        $this->rutasGET[$url] = $fn;
    }

    public function post($url, $fn){
        $this->rutasPOST[$url] = $fn;
    }

    public function delete($url, $fn){
        $this->rutasDELETE[$url] = $fn;
    }

    public function comprobarRutas() {
        $urlActual = $_SERVER['PATH_INFO'] ?? '/';
        $metodo = $_SERVER['REQUEST_METHOD'];

        if($metodo === 'GET'){
            $fn = $this->rutasGET[$urlActual] ?? null;
        } else if($metodo === 'POST'){
            $fn = $this->rutasPOST[$urlActual] ?? null;
        } else if($metodo === 'DELETE'){
            $fn = $this->rutasDELETE[$urlActual] ?? null;
        }

        if($fn){
            call_user_func($fn, $this);
        }else{
            echo "Página no encontrada";
        }
    }
}