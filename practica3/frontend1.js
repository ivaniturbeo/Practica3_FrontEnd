
let form = document.querySelector('#ej1');
let formlogin = document.querySelector('#loginform');

function getToken(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://users-dasw.herokuapp.com/api/tokenDASW');
    xhr.setRequestHeader('x-expediente', '719173')
    xhr.send()
    xhr.onload = ()=>{
        if(xhr.status == 200){
            let token= JSON.parse(xhr.response).token;
            window.localStorage.setItem('token_alumno', token)
            console.log(window.localStorage.getItem('token_alumno'));
        }
    }
}

getToken();

form.addEventListener("change", function (e) {

    let invalidos= form.querySelectorAll(':invalid');
    let regid = document.querySelector('#regId');
    console.log(invalidos);
    if(invalidos.length>0){
        regid.disabled = true;
    }else{
        let pass1 = document.getElementById("cont1").value;
        let pass2 = document.getElementById("cont2").value;
        if(pass1 != pass2)alert("Las contraseñas no coinciden!!");
        else{
            regid.disabled = false;

        }

    }
    
  });


function regSubmit(event){
    let csexo  = ""; 
    var radios = document.getElementsByName('sexo');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            csexo = radios[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    console.log(csexo);
    let xhr = new XMLHttpRequest();
    let val = document.querySelector("input").value;
    xhr.open('POST', 'https://users-dasw.herokuapp.com/api/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    let stoken = window.localStorage.getItem('token_alumno') + '';
    xhr.setRequestHeader('x-auth', stoken);
    let newUser = {"nombre" : document.querySelector("#fname").value, "apellido" : document.querySelector("#lname").value ,  "correo" : document.querySelector("#correo").value , "url" : "", "sexo" : csexo , "fecha" : document.querySelector("#dbirth").value , "password" : document.querySelector("#cont1").value };
    console.log(newUser);
    xhr.send(JSON.stringify(newUser))
    xhr.onload = ()=>{
        if(xhr.status == 201){
            //let resp = JSON.parse(xhr.response);
            alert("se ha creado el usuario");
            $('#registro').modal('hide');

      
        }else{
            alert("NO se ha creado");
        }
    }
    event.preventDefault()
}
function logSubmit(event){
    let xhr = new XMLHttpRequest();
    let val = document.querySelector("input").value;
    xhr.open('POST', 'https://users-dasw.herokuapp.com/api/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    let stoken = window.localStorage.getItem('token_alumno') + '';
    xhr.setRequestHeader('x-auth', stoken);
    let loguser = {"correo" : document.querySelector("#logmail").value , "password" : document.querySelector("#logpass").value };
    console.log(loguser);
    xhr.send(JSON.stringify(loguser))
    xhr.onload = ()=>{
        if(xhr.status == 200){
            //let resp = JSON.parse(xhr.response);
            let token= JSON.parse(xhr.response).token;
            window.localStorage.setItem('token_usuario', token)
            console.log(window.localStorage.getItem('token_usuario'));
            alert("se ha ingresado");
            window.location.href = "./consulta.html";
      
        }else{
            alert("NO se ha podido ingresar");
        }
    }
    event.preventDefault()
}
  form.addEventListener('submit', regSubmit);
  formlogin.addEventListener('submit', logSubmit);