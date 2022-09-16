const boton = document.querySelector("#boton");
const datos = document.querySelector("#datos");

boton.addEventListener("click", async function(){
   let sessionName = await login()
   let datos = await getQuery(sessionName);
   
   llenarDatos(datos);
});

/**
 * Retorna un token 
 */
async function getToken(){
    let respuesta = await fetch("https://develop.datacrm.la/anieto/anietopruebatecnica/webservice.php?operation=getchallenge&username=prueba")
    .then(response => response.json())
    .then(data => {
        token = data.result.token;
        return token;
    })

    return respuesta
}

/**
 * Crea la conexión con el webservices y devuelve la sessionName.
 */
async function login(){    
    //guarda el token
    let token = await getToken();
    
    let urlencoded = new URLSearchParams();
    urlencoded.append("operation", "login");
    urlencoded.append("username", "prueba");
    urlencoded.append("accessKey", md5(token + "3DlKwKDMqPsiiK0B"));
    
    let respuesta = await fetch("https://develop.datacrm.la/anieto/anietopruebatecnica/webservice.php",{
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : urlencoded
    })
    .then(response => response.json())
    .then(data =>{
        sessionName = data.result.sessionName;
        return sessionName;
    })

    return respuesta;
}

/**
 * Retorna los datos en un array.
 * 
 * @param {string} sessionName Nombre de la sesion.
 */
async function getQuery(sessionName){
    let respuesta = await fetch("https://develop.datacrm.la/anieto/anietopruebatecnica/webservice.php?operation=query&sessionName=" + sessionName + "&query=select * from Contacts;")
    .then(response => response.json())
    .then(data =>{
        return data.result;
    })
    return respuesta
}

/**
 * Agrega los datos del objeto pasado por parametro a la tabla.
 * 
 * @param {Array} result Objeto que se usará para llenar la tabla.
 */
function llenarDatos(result){
    //limpia los datos dentro de la tabla
    datos.innerHTML = "";

    //recorre los datos pasados por parametro
    result.forEach(dato => {
        //creacion de los elementos que seran usados dentro de la tabla
        const tr = document.createElement("tr");
        const id = document.createElement("td");
        const contact_no = document.createElement("td");
        const lastname = document.createElement("td");
        const createdtime = document.createElement("td");

        //asigna el valor a cada uno de ellos
        id.textContent = dato["id"];
        contact_no.textContent = dato["contact_no"];
        lastname.textContent = dato["lastname"];
        createdtime.textContent = dato["createdtime"];

        //agrega los datos a la fila creada
        tr.appendChild(id);
        tr.appendChild(contact_no);
        tr.appendChild(lastname);
        tr.appendChild(createdtime);

        //agrega la fila a la tabla
        datos.appendChild(tr)
    });
}

