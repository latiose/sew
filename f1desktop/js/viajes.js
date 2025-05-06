"use strict";
class Viajes {
  constructor() {
    this.mapaGeoposicionado = null;
    this.infoWindow = null;
    navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    this.addCarrusel();
    const botonEstatico = document.querySelector("button");
    const botonDinamico = document.querySelector("button:nth-of-type(2)");
    if(botonEstatico){ 
      botonEstatico.addEventListener("click", () => {
        if (this.latitud && this.longitud) {
          this.getMapaEstatico();
        } 
      });
     }
     if(botonDinamico){ 
      botonDinamico.addEventListener("click", () => {
          this.initMap(false);
      });
     }
  }



  getMapaEstatico() {
  
    const ubicacion = document.querySelector("main > p");
    const apiKey = "&key=AIzaSyCTrIKXCE08WLNimTdu5W0taOgFe08W6N4";
    const url = "https://maps.googleapis.com/maps/api/staticmap?";

    const centro = "center=" + this.latitud + "," + this.longitud;
    const zoom = "&zoom=15";
    const tamaño = "&size=800x600";
    const marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
    const sensor = "&sensor=false";

    this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
    ubicacion.innerHTML = "<img src='" + this.imagenMapa + "' alt='mapa estático google' />";
  }
 

  getPosicion(posicion) {
    this.longitud = posicion.coords.longitude;
    this.latitud = posicion.coords.latitude;
    this.precision = posicion.coords.accuracy;
    this.altitud = posicion.coords.altitude;
    this.precisionAltitud = posicion.coords.altitudeAccuracy;
    this.rumbo = posicion.coords.heading;
    this.velocidad = posicion.coords.speed;
   // this.getMapaEstatico();
  }

  verErrores(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.mensaje = "El usuario no permite la petición de geolocalización";
        break;
      case error.POSITION_UNAVAILABLE:
        this.mensaje = "Información de geolocalización no disponible";
        break;
      case error.TIMEOUT:
        this.mensaje = "La petición de geolocalización ha caducado";
        break;
      case error.UNKNOWN_ERROR:
        this.mensaje = "Se ha producido un error desconocido";
        break;
    }
  }

	initMap(kml) {
  
      const centro = { lat: 43.3672702, lng: -5.8502461 };
      this.mapaGeoposicionado = new google.maps.Map(document.querySelector("div"), {
      zoom: 8,
      center: centro,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      this.infoWindow = new google.maps.InfoWindow();
    
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        };
        if(!kml){
       this.infoWindow.setPosition(pos);
       this.infoWindow.setContent('Localización encontrada');
      this.mapaGeoposicionado.setCenter(pos);
        }
      }, () => {
        this.handleLocationError(true, this.infoWindow, this.mapaGeoposicionado.getCenter());
      });
      } else {
      this.handleLocationError(false, this.infoWindow, this.mapaGeoposicionado.getCenter());
      }
	}

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    this.infoWindow.setPosition(pos);
    this.infoWindow.setContent(
      browserHasGeolocation
        ? "Error: Ha fallado la geolocalización"
        : "Error: Su navegador no soporta geolocalización"
    );
    infoWindow.open(this.mapaGeoposicionado);
  }
  
 addCarrusel() {
  
  const article = document.querySelector("main > section > article"); 

  if (!window.imagenes) {
     
      return;
  }

  window.imagenes.forEach((img) => {
    const imgElement = document.createElement("img");
    const firstImageURL = img.url.replace("_m", "_b"); 
    imgElement.src = firstImageURL;  
    imgElement.alt = img.titulo;
    imgElement.title = img.titulo;
    article.appendChild(imgElement);
  });
  
  const slides = document.querySelectorAll("img");
  const nextSlide = document.querySelector("article > button:nth-of-type(1)");
  let curSlide = 3;
  let maxSlide = slides.length - 1;
  
  nextSlide.addEventListener("click", function () {
   
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
  

    slides.forEach((slide, indx) => {
      var trans = 100 * (indx - curSlide);
      $(slide).css('transform', 'translateX(' + trans + '%)')
    });
  });
  

  const prevSlide = document.querySelector("article > button:nth-of-type(2)");
  
  prevSlide.addEventListener("click", function () {
 
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
  
   
    slides.forEach((slide, indx) => {
      var trans = 100 * (indx - curSlide);
      $(slide).css('transform', 'translateX(' + trans + '%)')
    });
  });
 ;

}


  }

 
window.viaje = new Viajes();
//window.viaje.initMap();