const urlCategorias =
  "https://my-json-server.typicode.com/DWEC-18-19/TheCatApi/categorias";
const categoriasInput = document.getElementById("select-categorias");

// llámada asíncrona con AJAX
var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
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

// Hacemos una petición AJAX para crear las categorias
getJSON(urlCategorias).then(
  function(data) {
    data.forEach(function(categoria) {
      console.log(categoria);
      option = document.createElement("option");
      option.setAttribute("value", categoria.id);
      option.innerHTML = categoria.name;
      categoriasInput.appendChild(option);
    });
  },
  function(status) {
    alert("Algo fue mal.");
  }
);

function fotos() {
  var xhr = new XMLHttpRequest();

  var categorias = document.getElementById("select-categorias").value;
  var cantidad = document.getElementById("select-cantidad").value;
  console.log(categorias);
  console.log(cantidad);
  document.getElementById("expositor").innerHTML = "";

  //xhr.open("GET", "https://api.thecatapi.com/v1/images/search?category_ids=" + categorias + "&limit=" + cantidad, true);
  xhr.open(
    "GET",
    "https://api.thecatapi.com/v1/images/search?category_ids=" +
      categorias +
      "&limit=" +
      cantidad,
    true
  );
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var imagenes = "";

      var cosas = JSON.parse(xhr.responseText);

      for (let i = 0; i < cantidad; i++) {
        imagenes += "<img src='" + cosas[i]["url"] + "'>";
      }

      document.getElementById("expositor").innerHTML += imagenes;
    } else {
      // JA!JA! Ahora puedes ir a la esquina a llorar
      console.log("Ha habido fallos");
    }
  };
}
