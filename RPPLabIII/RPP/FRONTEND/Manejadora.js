"use strict";
/// <reference path="./ropa.ts" />
/// <reference path="./campera.ts" />
var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarCampera = function () {
            var opcion = document.getElementById("btn-agregar").value;
            var codigo = parseInt(document.getElementById("txtCodigo").value);
            var nombre = document.getElementById("txtNombre").value;
            var precio = parseInt(document.getElementById("txtPrecio").value);
            var tipo = document.getElementById("txtTalle").value;
            var pais = document.getElementById("cboColores").value;
            //let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            var unaCampera = new Entidades.Televisor(codigo, nombre, precio, tipo, pais); //(codigo,nombre,precio,talle,color,retJSON.ruta);
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            Test.Manejadora.AdministrarSpinner(true);
            var form = new FormData();
            //form.append('foto', foto.files[0]);
            console.log(unaCampera.ToJson());
            form.append('cadenaJson', JSON.stringify(unaCampera.ToJson()));
            if (opcion == "Agregar") {
                form.append('caso', "agregar");
                xhttp.send(form);
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        var retJSON = JSON.parse(xhttp.responseText);
                        if (retJSON.TodoOK) {
                            alert("operacion realizada");
                        }
                    }
                };
            }
            else {
                form.append('caso', "modificar");
                xhttp.send(form);
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        var retJSON = JSON.parse(xhttp.responseText);
                        if (retJSON.TodoOK) {
                            alert("operacion realizada");
                            Test.Manejadora.MostrarCamperas();
                        }
                    }
                };
            }
            Test.Manejadora.AdministrarSpinner(false);
            Test.Manejadora.LimpiarCampos();
        };
        Manejadora.MostrarCamperas = function () {
            var xmlhttp = new XMLHttpRequest();
            var div = document.getElementById("divTabla");
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");
            Test.Manejadora.AdministrarSpinner(true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var response = JSON.parse(xmlhttp.responseText);
                    div.innerHTML = "";
                    var tabla = "<table border='1'><tr>\n                <td>Codigo</td>\n                <td>Nombre</td>\n                <td>Precio</td>\n                <td>Talle</td>\n                <td>Color</td>\n                </tr>";
                    for (var i = 0; i < response.length; i++) {
                        var tv = response[i];
                        tabla += "<tr><td>" + tv.codigo + "</td><td>" + tv.nombre + "</td><td>" + tv.precio + "</td><td>" + tv.talle + "</td><td>" + tv.color + "</td>";
                        var objJson = JSON.stringify(tv);
                        tabla += "<td><input type='button' onclick='new Test.Manejadora.EliminarCampera(" + (objJson) + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='new Test.Manejadora.ModificarCampera(" + (objJson) + ")' value='Modificar'</td>";
                    }
                    Test.Manejadora.AdministrarSpinner(false);
                    tabla += "</tr>";
                    div.innerHTML += tabla + "</table>";
                }
            };
        };
        Manejadora.AdministrarSpinner = function (mostrar) {
            if (mostrar) {
                document.getElementById("divSpinner").style.display = "block";
                //  (<HTMLImageElement>document.getElementById("imgSpinner")).src="./BACKEND/gif-load.gif";
            }
            else {
                document.getElementById("divSpinner").style.display = "none";
            }
        };
        Manejadora.EliminarCampera = function (cadenaJson) {
            if (confirm("Esta seguro que desea eliminar la campera de código " + cadenaJson.codigo + " y talle " + cadenaJson.talle)) {
                var xhr_1 = new XMLHttpRequest();
                var form = new FormData();
                form.append('cadenaJson', JSON.stringify(cadenaJson));
                xhr_1.open("POST", "BACKEND/administrar.php", true);
                xhr_1.setRequestHeader("enctype", "multipart/form-data");
                form.append('caso', "eliminar");
                xhr_1.send(form);
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                        //alert(xhr.responseText);
                        console.log("Campera eliminada!");
                        Manejadora.MostrarCamperas();
                    }
                };
            }
            else {
                alert("Accion cancelada");
            }
        };
        Manejadora.ModificarCampera = function (cadenaJson) {
            document.getElementById("txtCodigo").value = cadenaJson.codigo;
            (document.getElementById("txtCodigo").readOnly) = true;
            document.getElementById("txtNombre").value = cadenaJson.nombre;
            document.getElementById("txtTalle").value = cadenaJson.talle;
            document.getElementById("txtPrecio").value = cadenaJson.precio;
            document.getElementById("cboColores").value = cadenaJson.color;
            //(<HTMLSelectElement> document.getElementById("raza")).value=cadenaJson.raza; 
            document.getElementById("btn-agregar").value = "modificar";
            //(<HTMLInputElement> document.getElementById("btn")).className="btn btn-warning";
        };
        Manejadora.LimpiarCampos = function () {
            document.getElementById("txtCodigo").value = "";
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtTalle").value = "";
            document.getElementById("txtPrecio").value = "";
            document.getElementById("cboColores").value = "";
        };
        return Manejadora;
    }());
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
//# sourceMappingURL=Manejadora.js.map