"use strict";

class Memoria {
    elements = {
        "elements": [
            { "element": "RedBull", "source": "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { "element": "RedBull", "source": "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { "element": "McLaren", "source": "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { "element": "McLaren", "source": "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { "element": "Alpine", "source": "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { "element": "Alpine", "source": "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { "element": "AstonMartin", "source": "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { "element": "AstonMartin", "source": "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { "element": "Ferrari", "source": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { "element": "Ferrari", "source": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { "element": "Mercedes", "source": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" },
            { "element": "Mercedes", "source": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" }
        ]
    };

    constructor() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
		this.shuffleElements();
        this.createElements();
        this.addEventListeners();
       // console.log(document.documentElement.outerHTML);
    }

    shuffleElements() {
        const elementos = this.elements["elements"];
        for (let i = elementos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [elementos[i], elementos[j]] = [elementos[j], elementos[i]];
        }
    }

   	unflipCards(){
		this.lockBoard=true;
		
		setTimeout(() => {
            if (this.firstCard && this.secondCard) {
                this.firstCard.setAttribute("data-state", "hidden");
                this.secondCard.setAttribute("data-state", "hidden");
            }
            this.resetBoard(); 
        }, 1000); 
	}

   resetBoard(){
		this.firstCard=null;
		this.secondCard=null;
		this.hasFlippedCard=false;
		this.lockBoard=false;
	}

    checkForMatch() {
        if (this.firstCard.getAttribute("data-element") === this.secondCard.getAttribute("data-element")) {
            this.disableCards();
        } else {
            this.unflipCards();
        }
    }

    disableCards() {
        this.firstCard.setAttribute("data-state", "revealed");
        this.secondCard.setAttribute("data-state", "revealed");
        this.resetBoard();
    }

    createElements() {
        const elementos = this.elements["elements"];
        const seccion = document.createElement("section");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        p.innerHTML = "Haz clic en las parejas de imagen hasta tenerlas todas para ganar";
        h2.innerHTML = "Juego de memoria";
        seccion.appendChild(h2);
        seccion.appendChild(p);
        elementos.forEach(element => {
            const article = document.createElement("article");
            article.setAttribute("data-element", element.element);
			 article.setAttribute("data-state", "hidden");

            const header = document.createElement("h3");
            header.textContent = "Tarjeta de memoria";
            article.appendChild(header);

            const img = document.createElement("img");
            img.setAttribute("src", element.source);
            img.setAttribute("alt", element.element);
            article.appendChild(img);

            seccion.appendChild(article);
        });

        document.querySelector("main").appendChild(seccion);
        
    }

    addEventListeners() {
        document.querySelectorAll("article").forEach(card => {
            card.addEventListener("click", this.flipCard.bind(this, card,this));
        });
    }

     flipCard(card,game) {
        if (card.getAttribute("data-state") === "revealed" || game.lockBoard || card === game.firstCard) return;

        card.setAttribute("data-state", "flip");

        if (!game.hasFlippedCard) {
            game.hasFlippedCard = true;
            game.firstCard = card;
        } else {
            game.secondCard = card;
            game.checkForMatch();
        }
    }
}


const juego = new Memoria();  