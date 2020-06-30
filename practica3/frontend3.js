function showdetails(){
    let resp = JSON.parse(localStorage.getItem('usuario'))
    console.log(resp);
    document.getElementById("dnom").innerHTML = resp.nombre;
    document.getElementById("dape").innerHTML = resp.apellido;
    document.getElementById("dcorreo").innerHTML =  resp.correo;
    document.getElementById("dfecha").innerHTML = resp.fecha;
    document.getElementById("dsexo").innerHTML = resp.sexo;
    document.getElementById("dimg").src = resp.url;

}