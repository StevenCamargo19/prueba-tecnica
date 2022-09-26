const boton = document.querySelector("#boton");
const datos = document.querySelector("#datos");

boton.addEventListener("click", async function(){
   let datos = await getDatos();  
   llenarDatos(datos);
});

/**
 * Retorna los datos 
 */
async function getDatos(){
    let respuesta = await fetch("?c=index&m=datos")
    .then(response => response.json())
    .then(data => {
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

