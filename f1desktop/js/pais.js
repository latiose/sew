"use strict";

class Pais {
    constructor(nombre,capital,poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
    }

    getCapital(){
        return this.capital;
    }

    getNombre(){
        return this.nombre;
    }
     
    setAtributos(gobierno, religion,latMeta,longMeta,nombreCircuito){
        this.religion = religion;
        this.gobierno = gobierno;
        this.latMeta=latMeta;
        this.longMeta=longMeta;
        this.nombreCircuito=nombreCircuito;
    }

    obtenerInformacionSecundaria() {
        return `
            <ul>
                <li>Nombre del país: ${this.nombre}</li>
                <li>Población: ${this.poblacion}</li>
                <li>Forma de gobierno: ${this.gobierno}</li>
                <li>Religión mayoritaria: ${this.religion}</li>
            </ul>
        `;
    }

    escribir() {
        const main = document.querySelector("main");
        const firstH2 = main.querySelector("h2");

        if (firstH2) {
            const container = document.createElement("section");
            container.innerHTML = "<h3>Datos del país:</h3><ul></ul>"+this.obtenerInformacionSecundaria();
            firstH2.after(container);
        }
    }

    escribirCoordenadasMeta() {
        const main = document.querySelector("main");
        const firstH2 = main.querySelector("h2");

        if (firstH2) {
            const container = document.createElement("section");
            container.innerHTML = `
                <h3>Coordenadas de la línea de meta:</h3>
                <p>Latitud: ${this.latMeta}</p>
                <p>Longitud: ${this.longMeta}</p>
            `;

            firstH2.after(container);
        }
    }

    cargarDatos() {
        var apikey = "9b78bae472a2bd2d0d112053ad77a805";
        var tipo = "&mode=xml";
        var unidades = "&units=metric";
        var idioma = "&lang=es";
        var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + this.latMeta +"&lon="+this.longMeta + tipo + unidades + idioma + "&appid=" + apikey;
        $.ajax({
            dataType: "xml",
            url: url,
            method: 'GET',
            success: (datos) => {
                let stringDatos = "<h2>Pronóstico a las 12:00 para los próximos 5 días</h2>";
                let entradas = $(datos).find("time");

                let contador = 0;

                entradas.each(function () {
                    let hora = $(this).attr("from").split("T")[1];
                    if (hora === "12:00:00" && contador < 5) {
                        contador++;
                        let fecha = $(this).attr("from").split("T")[0];
                        let temperaturaMin = $(this).find("temperature").attr("min");
                        let temperaturaMax = $(this).find("temperature").attr("max");
                        let humedad = $(this).find("humidity").attr("value");
                        let precipitacionValue =  $(this).find("precipitation").attr("value");
                        let precipitationUnit = $(this).find("precipitation").attr("unit");
                        let simbolo = $(this).find("symbol").attr("var");
                        let iconUrl = "http://openweathermap.org/img/wn/" + simbolo + "@2x.png";
                        if (!precipitacionValue) {
                            precipitacionValue = "No disponible.";
                            precipitationUnit = "";
                        }
                        stringDatos += `
                            <article>
                                <h3>${fecha}</h3>
                                <ul>
                                    <li>Temperatura mínima: ${temperaturaMin}°C</li>
                                    <li>Temperatura máxima: ${temperaturaMax}°C</li>
                                    <li>Humedad: ${humedad}%</li>
                                    <li>Precipitación: ${precipitacionValue} ${precipitationUnit}</li>
                                    <li><img src="${iconUrl}" alt="Icono del clima"></li>
                                </ul>
                            </article>`;
                    }
                });
                const main = document.querySelector("main");
                const container = document.createElement("article");
                container.innerHTML = stringDatos;
                main.appendChild(container);

            },
            error: function () {
                let main = document.querySelector("main");
                let h3 = document.createElement("h3");
                main.appendChild(h3);
                $("h3").html("¡Tenemos problemas! No puedo obtener datos XML de OpenWeatherMap");
            }
        });
    }

    verXML() {
        this.cargarDatos();
        $("button").attr("disabled", "disabled");
    }
    
}

const pais = new Pais("China","Pekin",1409670000);
pais.setAtributos("Socialismo de mercado libre","Budismo",31.336667, 121.218611,"Shanghai");
pais.escribir();
pais.escribirCoordenadasMeta();

