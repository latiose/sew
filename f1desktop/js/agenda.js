"use strict";

class Agenda {
    constructor(url) {
        this.url = url;
        //this.cargarDatos(); 
    }

    cargarDatos() {
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: (datos) => {
                this.mostrarDatos(datos.MRData.RaceTable.Races);
            },
            error: () => {
                this.crearElemento("p", "Error al cargar los datos", "main");
            }
        });
    }

    mostrarDatos(races) {
        let raceInfoHtml = "";
 
        races.forEach((race) => {
            raceInfoHtml += `<ul>
                                <li>Nombre de la carrera: ${race.raceName}</li>
                                <li>Circuito: ${race.Circuit.circuitName}</li>
                                <li>Localización: ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</li>
                                <li>Latitud: ${race.Circuit.Location.lat}°</li>
                                <li>Longitud: ${race.Circuit.Location.long}°</li>
                                <li>Fecha: ${race.date}</li>
                                <li>Hora: ${race.time}</li>
                             </ul>`;
        });
     
        $("main").html(raceInfoHtml);
    }

  
    crearElemento(tipoElemento, texto, insertarAntesDe) {
        const elemento = document.createElement(tipoElemento);
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
	
	 verJSON(){
             
              this.crearElemento("h4","JSON","footer");       
              this.crearElemento("pre","","footer"); 
              this.crearElemento("h4","Datos","footer"); 
              this.crearElemento("p","","footer"); 
              this.cargarDatos();
              $("button").attr("disabled","disabled");
    }
}
var agenda = new Agenda("http://ergast.com/api/f1/current.json");
