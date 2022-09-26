<?php

class IndexController{    

    /**
     * Retorna la vista principal
     */
    public function index(){
        require_once('Views/index.php');        
    }

    /**
     * Conecta al webservice y devuelve los datos
     */
    public function datos(){
        require_once("core/controllers/conexionWerbServiceController.php");        
        $webService = new ConexionWebServiceController();        
        $query = $webService->getQuery();
        echo $query;
    }    
}

?>