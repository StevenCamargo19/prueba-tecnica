<?php

class ConexionWebServiceController{

    private $sessionName;

    public function __construct(){
        $this->sessionName = $this->login();
    }

    /**
     * Obtiene el token
     */
    private function getToken() {
        $ch = curl_init();
        $url = "https://develop.datacrm.la/anieto/anietopruebatecnica/webservice.php?operation=getchallenge&username=prueba";

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $respuesta = curl_exec($ch);

        if (curl_errno($ch)) {
            return curl_error($ch);
        }
        curl_close($ch);

        $respuesta = json_decode($respuesta, true);

        return $respuesta["result"]["token"];
    }

    /**
     * Inicia sesión en el webservice y retorna una sessionName
     */
    private function login() {
        $token = $this->getToken();

        $ch = curl_init();
        $url = "https://develop.datacrm.la/anieto/anietopruebatecnica/webservice.php";

        $datos = [
            "operation" => "login",
            "username" => "prueba",
            "accessKey" => md5($token . "3DlKwKDMqPsiiK0B")
        ];

        $header = [
            "Content-Type" => "application/x-www-form-urlencoded"
        ];

        $data = http_build_query($datos);

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

        $respuesta = curl_exec($ch);

        if (curl_errno($ch)) {
            echo curl_error($ch);
        }

        curl_close($ch);

        $respuesta = json_decode($respuesta, true);

        return $respuesta["result"]["sessionName"];
    }


    /**
     * Hace una consulta al webservice y devuelve los datos obtenidos
     * @param string $sessionName
     * @return json
     */
    public function getQuery()  {
        $ch = curl_init();
        $url = "https://develop.datacrm.la/anieto/anietopruebatecnica/webservice.php?operation=query&sessionName=" . $this->sessionName . "&query=select%20*%20from%20Contacts;";

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $respuesta = curl_exec($ch);

        if (curl_errno($ch)) {
            return curl_error($ch);
        }
        curl_close($ch);

        return $respuesta;
    }
}
