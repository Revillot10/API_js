async function getRandomUser() {
  try {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    console.log(data);

    const objetoNombre = data.results[0].name; 
    const nombreCompleto = `${objetoNombre.title} ${objetoNombre.first} ${objetoNombre.last}`;

    document.getElementById('nombre').innerHTML = nombreCompleto; 
    document.getElementById('email').innerHTML = data.results[0].email;  
    document.getElementById('foto').src = data.results[0].picture.medium; 

  } catch (e) {
    alert("Error en la ejecución");
  } 
}

getRandomUser();
