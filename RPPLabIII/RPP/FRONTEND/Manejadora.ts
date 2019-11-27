/// <reference path="./ropa.ts" />
/// <reference path="./campera.ts" />
namespace Test{


    export class Manejadora{
        public static AgregarCampera(){
           
              
            var opcion :string= (<HTMLInputElement>document.getElementById("btn-agregar")).value;

            var codigo:number= parseInt((<HTMLInputElement>document.getElementById("txtCodigo")).value);
            var nombre:string= (<HTMLInputElement>document.getElementById("txtNombre")).value;
            var precio:number= parseInt((<HTMLInputElement>document.getElementById("txtPrecio")).value);
            var tipo:string= (<HTMLInputElement>document.getElementById("txtTalle")).value;
            var pais:string= (<HTMLSelectElement>document.getElementById("cboColores")).value;
            //let foto : any = (<HTMLInputElement> document.getElementById("foto"));
                
            var unaCampera= new Entidades.Televisor(codigo,nombre,precio,tipo,pais);//(codigo,nombre,precio,talle,color,retJSON.ruta);
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");                
            Test.Manejadora.AdministrarSpinner(true);
            let form : FormData = new FormData()
            //form.append('foto', foto.files[0]);
            console.log(unaCampera.ToJson());
            form.append('cadenaJson',JSON.stringify(unaCampera.ToJson()));
            if(opcion=="Agregar"){
                form.append('caso', "agregar");
                xhttp.send(form);

                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        let retJSON = JSON.parse(xhttp.responseText);
                        
                        if(retJSON.TodoOK)
                        { 
                            alert("operacion realizada");
                        }   
                    }
                }
                    
            }
            else{
                form.append('caso', "modificar");
                xhttp.send(form);
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        let retJSON = JSON.parse(xhttp.responseText);
                        if(retJSON.TodoOK)
                        { 
                            alert("operacion realizada");
                            Test.Manejadora.MostrarCamperas();
                        }           
                    }
                }   
            }
            Test.Manejadora.AdministrarSpinner(false);    
            Test.Manejadora.LimpiarCampos()  
        }
        public static MostrarCamperas(){
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
            let div= (<HTMLDivElement>document.getElementById("divTabla"));
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");
            Test.Manejadora.AdministrarSpinner(true);
            xmlhttp.onreadystatechange = function() {
               
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                   
                    let response=JSON.parse(xmlhttp.responseText);
                    div.innerHTML="";
                    var tabla =`<table border='1'><tr>
                <td>Codigo</td>
                <td>Nombre</td>
                <td>Precio</td>
                <td>Talle</td>
                <td>Color</td>
                </tr>`;
              
                    for(let i=0; i< response.length; i++){
                        
                        let tv= response[i];
                        
                        tabla+="<tr><td>"+tv.codigo +"</td><td>"+tv.nombre+"</td><td>"+tv.precio+"</td><td>"+tv.talle+"</td><td>"+tv.color+"</td>";
                        let objJson :string= JSON.stringify(tv);
                        tabla+= "<td><input type='button' onclick='new Test.Manejadora.EliminarCampera("+(objJson)+")' value='Eliminar'</td>";
                        tabla+= "<td><input type='button' onclick='new Test.Manejadora.ModificarCampera("+(objJson)+")' value='Modificar'</td>";
                    
                    }
                  Test.Manejadora.AdministrarSpinner(false);
                    tabla+="</tr>";
                    div.innerHTML+=tabla+"</table>";

                }
            }
        }
        private static AdministrarSpinner(mostrar:boolean){
            if(mostrar){
                (<HTMLDivElement>document.getElementById("divSpinner" )).style.display="block";
              //  (<HTMLImageElement>document.getElementById("imgSpinner")).src="./BACKEND/gif-load.gif";
            }else{
                (<HTMLDivElement>document.getElementById("divSpinner" )).style.display="none";
            }
        }
        public static EliminarCampera(cadenaJson:any) 
        {
         if(confirm("Esta seguro que desea eliminar la campera de código "+cadenaJson.codigo+ " y talle " + cadenaJson.talle ))
         {
          let xhr : XMLHttpRequest = new XMLHttpRequest();
      
          let form : FormData = new FormData();
      
          form.append('cadenaJson',JSON.stringify(cadenaJson));
          xhr.open("POST", "BACKEND/administrar.php", true);
          xhr.setRequestHeader("enctype", "multipart/form-data"); 
          form.append('caso', "eliminar");
          xhr.send(form);
      
          xhr.onreadystatechange = () => {
      
              if (xhr.readyState == 4 && xhr.status == 200) {
                //alert(xhr.responseText);
                console.log("Campera eliminada!");
                Manejadora.MostrarCamperas();
          
              }
          };
         }
         else
         {
             alert("Accion cancelada");
         }
           
           
        }
        public static ModificarCampera(cadenaJson: any) 
        {
            (<HTMLInputElement> document.getElementById("txtCodigo")).value=cadenaJson.codigo;
            ((<HTMLInputElement>document.getElementById("txtCodigo")).readOnly)=true;
            (<HTMLInputElement> document.getElementById("txtNombre")).value=cadenaJson.nombre;
            (<HTMLInputElement> document.getElementById("txtTalle")).value=cadenaJson.talle;
            (<HTMLInputElement> document.getElementById("txtPrecio")).value=cadenaJson.precio;
            (<HTMLInputElement> document.getElementById("cboColores")).value=cadenaJson.color;
            //(<HTMLSelectElement> document.getElementById("raza")).value=cadenaJson.raza; 
            
            (<HTMLInputElement> document.getElementById("btn-agregar")).value ="modificar";
            //(<HTMLInputElement> document.getElementById("btn")).className="btn btn-warning";
            
        }
        public static LimpiarCampos()
        {
            (<HTMLInputElement> document.getElementById("txtCodigo")).value="";
            (<HTMLInputElement> document.getElementById("txtNombre")).value="";
            (<HTMLInputElement> document.getElementById("txtTalle")).value="";
            (<HTMLInputElement> document.getElementById("txtPrecio")).value="";
            (<HTMLInputElement> document.getElementById("cboColores")).value="";
            
        }
    }
}