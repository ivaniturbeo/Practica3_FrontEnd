
let formedit = document.getElementById('editf');
let bboton =  document.getElementById("borrar_boton");
let bcorreo = "";
function showAllUsers(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://users-dasw.herokuapp.com/api/users');
    let stoken = window.localStorage.getItem('token_alumno') + '';
    let utoken = window.localStorage.getItem('token_usuario') + '';
    xhr.setRequestHeader('x-auth', stoken);
    xhr.setRequestHeader('x-user-token', utoken);
    // xhr.setRequestHeader('Content-Type', 'Application/json')
    xhr.send()
    xhr.onload = ()=>{
        if(xhr.status == 200){
            let resp = JSON.parse(xhr.response);
            lista.innerHTML = resp.map(u =>
            `<div class="media col-8 mt-2" >
                <div class="media-left align-self-center mr-3">
                    <img class="rounded-circle" style="width: inherit;"
                        src="${u.url}">
                </div>
                <div class="media-body">
                    <h4>${u.nombre} ${u.apellido}</h4>
                    <p>Correo: ${u.correo}</p>
                    <p>Fecha de nacimiento:${u.fecha} </p>
                    <p>Sexo: ${u.sexo} </p>
                </div>
                <div class="media-right align-self-center">
                    <div class="row">
                        <a href="#" class="btn btn-primary edit"  onclick="verDetalle('${u.correo}')"><i class="fas fa-search edit  "></i></a>
                    </div>
                    <div class="row">
                        <a href="#" class="btn btn-primary mt-2" onclick="editar('${u.correo}')" data-toggle="modal" data-target="#editarM"><i class="fas fa-pencil-alt edit  "></i></a>
                    </div>
                    <div class="row">
                        <a href="#" class="btn btn-primary mt-2" onclick="borrar('${u.correo}')" data-toggle="modal" data-target="#borrarM"><i class="fas fa-trash-alt  remove "></i></i></a>
                    </div>
                </div>
            </div>`).join('')

        }else if(xhr.status >= 400){
            alert("Debes ingresar como usuario para cargar la pagina.");
            window.location.href = "./index.html";
            $("#modelId").modal()
        }
    }
}
function verDetalle(correo){
    let resp = window.localStorage.getItem('correo');
    console.log(resp);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://users-dasw.herokuapp.com/api/users/'+ correo);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let stoken = window.localStorage.getItem('token_alumno') + '';
    let utoken = window.localStorage.getItem('token_usuario') + '';
    xhr.setRequestHeader('x-auth', stoken); 
    xhr.setRequestHeader('x-user-token', utoken);   
    xhr.send()
    xhr.onload = ()=>{
            if(xhr.status == 200){
                window.localStorage.setItem('usuario', xhr.response)
                window.location.href = "./detalle.html";
            }
        } 
}
formedit.addEventListener("change", function (e) {

    let invalidos = formedit.querySelectorAll(':invalid');
    let editid = document.querySelector('#editId');
    console.log(invalidos);
    if(invalidos.length>0){
        editId.disabled = true;
    }else{
        let pass1 = document.getElementById("Econt1").value;
        let pass2 = document.getElementById("Econt2").value;
        if(pass1 != pass2)alert("Las contraseñas no coinciden!!");
        else{
            editId.disabled = false;

        }

    }
    
  });
function editar(correo){ 
    $(':radio:not(:checked)').attr('disabled', true);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://users-dasw.herokuapp.com/api/users/'+ correo);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let stoken = window.localStorage.getItem('token_alumno') + '';
    let utoken = window.localStorage.getItem('token_usuario') + '';
    xhr.setRequestHeader('x-auth', stoken); 
    xhr.setRequestHeader('x-user-token', utoken);   
    xhr.send()
    xhr.onload = ()=>{
        if(xhr.status == 200){
            let resp = JSON.parse(xhr.response);
            document.getElementById("Efname").value = resp.nombre;
            document.getElementById("Elname").value = resp.apellido;
            document.getElementById("Econt1").value = resp.password;
            document.getElementById("Econt2").value = resp.password;
            document.getElementById("Edbirth").value = resp.fecha;
            document.getElementById("Ecorreo").value = resp.correo;
            document.getElementById(resp.sexo +"").checked = true;

        }
    } 
}
function borrar(correo){ 
    bcorreo = correo;
    //$(':radio:not(:checked)').attr('disabled', true);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://users-dasw.herokuapp.com/api/users/'+ correo);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let stoken = window.localStorage.getItem('token_alumno') + '';
    let utoken = window.localStorage.getItem('token_usuario') + '';
    xhr.setRequestHeader('x-auth', stoken); 
    xhr.setRequestHeader('x-user-token', utoken);   
    xhr.send()
    xhr.onload = ()=>{
        if(xhr.status == 200){
            let resp = JSON.parse(xhr.response);
            document.getElementById("bnom").innerHTML = resp.nombre;
            document.getElementById("bape").innerHTML = resp.apellido;
            document.getElementById("bcorreo").innerHTML =  resp.correo;
            document.getElementById("bfecha").innerHTML = resp.fecha;
            document.getElementById("bsexo").innerHTML = resp.sexo;

        }
    } 
}    
function editSubmit(event){
    let csexo  = ""; 
    var radios = document.getElementsByName('Esexo');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            csexo = radios[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    let xhr = new XMLHttpRequest();
    let val = document.querySelector("input").value;
    console.log(document.querySelector("#Ecorreo").value);
    let stoken = window.localStorage.getItem('token_alumno') + '';
    let utoken = window.localStorage.getItem('token_usuario') + '';
    xhr.open('PUT', 'https://users-dasw.herokuapp.com/api/users/' + document.querySelector("#Ecorreo").value);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', stoken);
    xhr.setRequestHeader('x-user-token', utoken);
    let newUser = {"nombre" : document.querySelector("#Efname").value, "apellido" : document.querySelector("#Elname").value ,  "correo" : document.querySelector("#Ecorreo").value , "url" : "", "sexo" : csexo , "fecha" : document.querySelector("#Edbirth").value , "password" : document.querySelector("#Econt1").value };
    console.log(newUser);
    xhr.send(JSON.stringify(newUser))
    xhr.onload = ()=>{
        if(xhr.status == 200){
            //let resp = JSON.parse(xhr.response);
            alert("se ha ACTUALIZADO el usuario");
            location.reload();
      
        }else{
            console.log(csexo)
            alert("NO se ha ACTUALIZADO");
        }
    }
    event.preventDefault()
}
function getConfirmation() {
    var retVal = confirm("Seguro que desea borrar el usuario?");
    if( retVal == true ) {
       document.write ("OK!");
       return true;
    } else {
       document.write ("Borrado Cancelado!");
       return false;
    }
 }
function borrarsubmit(){
    if(getConfirmation() == true){
        let xhr = new XMLHttpRequest();
        let val = document.querySelector("input").value;
        console.log(bcorreo);
        let stoken = window.localStorage.getItem('token_alumno') + '';
        let utoken = window.localStorage.getItem('token_usuario') + '';
        xhr.open('DELETE', 'https://users-dasw.herokuapp.com/api/users/' + bcorreo);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('x-auth', stoken);
        xhr.setRequestHeader('x-user-token', utoken);
        xhr.send()
        xhr.onload = ()=>{
            if(xhr.status == 200){
                //let resp = JSON.parse(xhr.response);
                alert("se ha Borrado el usuario");
                location.reload();
      
            }else{
                console.log(csexo)
                alert("NO se ha BORRADO");
            }
        }
        event.preventDefault()
    }
    else return;
}
formedit.addEventListener('submit', editSubmit);
bboton.addEventListener('click', borrarsubmit);
