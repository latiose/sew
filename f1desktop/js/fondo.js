"use strict";

class Fondo {
	
    constructor(pais, capital, circuito) {
        this.pais = pais;
        this.capital = capital;
        this.circuito = circuito;
        this.obtenerImagenes(); 
    }

    obtenerImagenes() {
        const flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        const main = document.querySelector("main");

        $.getJSON(flickrAPI, {
                tags: `f1, shanghai, ${this.circuito}`,
                tagmode: "all",
                format: "json"
            })
            .done((data) => {
                if (data.items.length > 0) {
                    const firstImageURL = data.items[0].media.m.replace("_m","_b");
                    this.establecerFondo(firstImageURL); 
                }
            })         
    }

    establecerFondo(imageUrl) {
        $(" body ").css({
            "background-image": `url(${imageUrl})`,
            "background-size": "cover",
        });
    }
}

const fondo = new Fondo("china", "pekin", "shanghai");