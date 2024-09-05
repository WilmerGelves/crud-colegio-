//Creando variables que reciben la informacion del input.
const form = document.getElementById('formEstudiante');//obtener del documento mediante el id el elemento.
const nombreInput = document.getElementById('nombreInput');
const apellidoInput = document.getElementById('apellidoInput');
const cedulaInput = document.getElementById('cedulaInput');
const grupoInput = document.getElementById('grupoInput');
const tableBody = document.getElementById('tableBody');
//----------------------------------------------------------------

//Guardando la informacion en la local storage. Esta variable se usa para guardar el objeto new data lineas abajo. 
let data = JSON.parse(localStorage.getItem('formData'))  || [];// Se crea una variable data para almacenar la data del formulario, en caso de no haber ningun dato registrado me cree un nuevo array. por eso el o y las llaves.

form.addEventListener('submit',function(event){
    event.preventDefault();//previene que se recargue el fórmulario.

    const nombre = nombreInput.value;//la variable obtiene el valor de la constante de input.
    const apellido = apellidoInput.value;
    const cedula = cedulaInput.value;
    const grupo = grupoInput.value;

    //Se verifica que todos los campor fueron deligenciados.
    if(nombre && apellido && cedula && grupo){
        const newData = {nombre, apellido, cedula, grupo}; //Se crea el objeto. new data

        data.push(newData); //se envía el objeto a data.

        

        guardarLocalStorage();//LLamado de la función para guardar en el localStorage

        renderizarTabla();//llamado a la funcion renderizar tabla.
        form.reset();//resetea el formulario

    }else{
        alert('Deligencie los campos');
    }
});

function guardarLocalStorage(){
    localStorage.setItem('formData',JSON.stringify(data));
};

function renderizarTabla(){
    tableBody.innerHTML = '';

    data.forEach(function(item,index){
        const row = document.createElement('tr');//Creacion de la fila

        //creación de las celdas de la fila anteriormente creada.
        const  celdaNombre = document.createElement('td');
        const celdaApellido = document.createElement('td');
        const celdaCedula = document.createElement('td');
        const celdaGrupo = document.createElement('td');
        const celdaAction = document.createElement('td');//celda action
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        //Se ingresa el contenido a las celdas anteriormente creadas.
        celdaNombre.textContent = item.nombre;
        celdaApellido.textContent = item.apellido;
        celdaCedula.textContent = item.cedula;
        celdaGrupo.textContent = item.grupo;
        editButton.textContent = 'Editar'; //su contenido es un string.
        deleteButton.textContent = 'Eliminar';

        //Agregandole clases a los botones.
        editButton.classList.add('button','button-secundary');
        deleteButton.classList.add('button','button-tertiary');

        //Creación de las funciones para hacer el llamado de las funciones de los botones eliminar y editar.
        editButton.addEventListener('click', function(){
            editData(index);
        });
        
        deleteButton.addEventListener('click', function(){
            deleteData(index);
        }); 


        //Se agregan los botones creados a la celda action. 
        celdaAction.appendChild(editButton); //accion de la celda 
        celdaAction.appendChild(deleteButton);

        //Se agregan las celdas que van acontener los datos.
        row.appendChild(celdaNombre);
        row.appendChild(celdaApellido);
        row.appendChild(celdaCedula);
        row.appendChild(celdaGrupo);
        row.appendChild(celdaAction);

        //Se agrega los datos al tableBody
        tableBody.appendChild(row);
    });
};

function editData(index){
    const item = data[index];//item va obtener el obejto en el indice correspondiente.

    nombreInput.value = item.nombre;//Se hace para que cuando le demos editar los datos se pinten en el imput del formulario.
    apellidoInput.value = item.apellido;
    cedulaInput.value = item.cedula;
    grupoInput.value = item.grupo;

    //eliminar los datos existentes en el indice y remplazarlos. 
    data.splice(index, 1);

    //y se ejecuta nuevamente las funciones para guardar en el local storage.
    guardarLocalStorage();
    renderizarTabla();
};

function deleteData(index){
    data.splice(index, 1);
    guardarLocalStorage();
    renderizarTabla();
};

renderizarTabla();//Se llama la funcion para renderizar los datos en la tabla. 