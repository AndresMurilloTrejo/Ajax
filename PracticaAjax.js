const urlCategorias =
  "https://my-json-server.typicode.com/DWEC-18-19/TheCatApi/categorias";
const categoriasInput = document.getElementById("select-categorias");
const urlRazas = "https://api.thecatapi.com/v1/breeds";
const razasInput = document.getElementById("select-razas");

// llámada asíncrona con AJAX
var getJSON = function (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        console.log("listo");
        resolve(xhr.response);
      } else {
        reject(status);
        console.log("algo fue mal");
      }
    };
    xhr.send();
  });
};

getJSON(urlCategorias).then(
  function (data) {
    data.forEach(function (categoria) {
      console.log(categoria);
      option = document.createElement("option");
      option.setAttribute("value", categoria.id);
      option.innerHTML = categoria.name;
      categoriasInput.appendChild(option);
    });
  },
  function (status) {
    alert("Algo fue mal.");
  }
);

getJSON(urlRazas).then(
  function (data) {
    data.forEach(function (raza) {
      option = document.createElement("option");
      option.setAttribute("value", raza.id);
      option.innerHTML = raza.name;
      razasInput.appendChild(option);
    });
  },
  function (status) {
    alert("Nein");
  }
);

// Hacemos una petición AJAX para crear las categorias

function fotos() {
  var xhr = new XMLHttpRequest();

  var cantidad = document.getElementById("select-cantidad").value;

  document.getElementById("expositor").innerHTML = "";

  xhr.open(
    "GET",
    "https://api.thecatapi.com/v1/images/search?category_ids=" +
    categoriasInput.value +
    "&breed_ids=" +
    razasInput.value +
    "&limit=" +
    cantidad,
    true
  );
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var imagenes = "";

      var cosas = JSON.parse(xhr.responseText);

      for (let i = 0; i < cosas.length; i++) {
        imagenes += "<img src='" + cosas[i]["url"] + "'>";
      }
      document.getElementById("expositor").innerHTML += imagenes;
    } else {
      console.log("Ha habido fallos");
    }
  };
}