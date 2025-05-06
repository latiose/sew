"use strict";
class Circuito{
	
	constructor(){
	 if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
         document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
     }
	}
	 
    leerArchivoXML(files) {
        const archivo = files[0];
        const lector = new FileReader();
    
        lector.onload = () => {
            const $contenedorArchivo = $("input[type='file'][accept='.xml']").parent();
            const $contenedorPrevio = $contenedorArchivo.find("article:first-of-type");
            if ($contenedorPrevio) {
                $contenedorPrevio.remove();
            }
    
            const $nuevoContenedor = $("<article></article>");
            const $header = $("<h3></h3>").text("Contenido archivo XML:");
            const $nombre = $("<p></p>").text("Nombre del archivo: " + archivo.name);
            const $tamaño = $("<p></p>").text("Tamaño del archivo: " + archivo.size + " bytes");
            const $tipo = $("<p></p>").text("Tipo del archivo: " + archivo.type);
            const $ultima = $("<p></p>").text(
                "Fecha de la última modificación: " + new Date(archivo.lastModified).toLocaleString()
            );
            const $contenido = $("<p></p>").text("Contenido del archivo XML:");
            const $areaVisualizacion = $("<pre></pre>").text(lector.result);
    
            $nuevoContenedor.append($header,$nombre, $tamaño, $tipo, $ultima, $contenido, $areaVisualizacion);
            $contenedorArchivo.append($nuevoContenedor);
        };
    
        lector.readAsText(archivo);
       
    }    

	leerArchivoKML(files) {
        const archivo = files[0];
        const lector = new FileReader();
      
        lector.onload = (evento) => {
          const kmlContent = evento.target.result;
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(kmlContent, "application/xml");
          const $coordinatesElements = $(xmlDoc).find("coordinates");
          if (!window.viaje.mapaGeoposicionado) {
            window.viaje.initMap(true);
          }
          const ruta = [];
          let centro = null;
      
          $coordinatesElements.each((_, element) => {
            const coordinates = $(element).text().trim().split(" ");
            coordinates.forEach((coord) => {
              const [lng, lat, alt] = coord.split(",").map(Number);
              ruta.push({ lat, lng });
      
              if (!centro) {
                centro = { lat, lng };
              }
      
              new google.maps.Marker({
                position: { lat, lng },
                map: window.viaje.mapaGeoposicionado,
                title: `Altitud: ${alt}m`,
              });
            });
          });
      
          new google.maps.Polyline({
            path: ruta,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 5,
            map: window.viaje.mapaGeoposicionado,
          });
      
          if (centro) {
            window.viaje.mapaGeoposicionado.setCenter(centro);
            window.viaje.mapaGeoposicionado.panTo(centro);
            window.viaje.mapaGeoposicionado.setZoom(15);
          }
        };
      
        lector.readAsText(archivo);
      }
    


 
    leerArchivoSVG(files) {
        const archivo = files[0];
        const lector = new FileReader();
    
        lector.onload = () => {
            const $contenedorArchivo = $("input[type='file'][accept='.svg']").parent();
            const $contenedorPrevio = $contenedorArchivo.find("article:first-of-type");
    
            if ($contenedorPrevio) {
                $contenedorPrevio.remove();
            }
            const $nuevoContenedor = $("<article></article>");
            const $areaVisualizacion = $("svg");
            $areaVisualizacion.html(lector.result); 
            const $nombre = $("<p></p>").text("Nombre del archivo: " + archivo.name);
            const $tamaño = $("<p></p>").text("Tamaño del archivo: " + archivo.size + " bytes");
            const $tipo = $("<p></p>").text("Tipo del archivo: " + archivo.type);
            const $ultima = $("<p></p>").text("Fecha de la última modificación: " + new Date(archivo.lastModified).toLocaleString());
            const $areaVisualizacion2 = $("<pre></pre>").text(lector.result);
            $nuevoContenedor.append($nombre, $tamaño, $tipo, $ultima,$areaVisualizacion2);
            $contenedorArchivo.append($nuevoContenedor);
        };
    
        lector.readAsText(archivo);
      
    }
    


}
window.circuito = new Circuito();