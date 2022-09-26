<?php
    require_once('Controllers/errorsController.php');
    require_once('Controllers/indexController.php');

    if(!isset($_GET["c"])){
        $controlador = new IndexController();
        $controlador->index();

    }else{        
        // verifica que exista el parametro "c" en la url y este tenga el valor "index".
        if(isset($_GET["c"]) && strcasecmp($_GET["c"], "index") == 0){

            // verifica que exista el parametro "m" en la url y que no esté vacio.
            if(isset($_GET["m"]) && !empty($_GET["m"])){               
                $metodo = $_GET["m"];

                //verifica que el valor de el parametro "m" sea un método en la clase IndexController
                if(method_exists("IndexController", $metodo)){   
                    $controlador = new IndexController();                 
                    $controlador->$metodo();
                }else{
                    controladorError(); // si el método no existe
                }
                
            }else{
                controladorError(); // si el parametro "m" no existe o está vacio
            }
        }else{
            controladorError(); // si el parametro "c" no existe o no tiene de valor "index"
        }
    }   
    
    function controladorError(){
        $controlador = new ErrorsController();
        $controlador->error404();
    }
    
?>