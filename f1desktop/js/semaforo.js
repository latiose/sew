"use strict";

class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.clic_moment = null;
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];
        this.createStructure();
    }

    createStructure() {
        let main = document.querySelector("main > section");
        if(!main){
            const section = document.createElement("section");
            const main2 = document.querySelector("main");
            main2.appendChild(section);
            main = document.querySelector("main > section");
        }
        const header = document.createElement("h2");
        header.textContent = "Semáforo";
        main.appendChild(header);

        for (let i = 0; i < this.lights; i++) {
            const div = document.createElement("div");
            main.appendChild(div);
        }

        const boton1 = document.createElement("button");
        boton1.textContent = "Arranque";
        boton1.addEventListener("click", () => this.initSequence());
        main.appendChild(boton1);

        const boton2 = document.createElement("button");
        boton2.textContent = "Reacción";
        boton2.addEventListener("click", () => this.stopReaction());
        boton2.disabled = true;
        main.appendChild(boton2);
    }

    initSequence() {
        const main = document.querySelector("main > section");
        main.classList.add("load");
        const boton = document.querySelectorAll("button")[0];
        boton.disabled = true;
        setTimeout(() => {
            this.endSequence();
        }, 2000 + this.difficulty * 100);
        this.unload_moment = new Date();
    }

    endSequence() {
        const main = document.querySelector("main > section");
        main.classList.add("unload");
        main.classList.remove("load");
        const boton2 = document.querySelectorAll("button")[1];
        boton2.disabled = false;
    }

    stopReaction() {
        this.clic_moment = new Date();
        let tiempo = this.clic_moment - this.unload_moment - 2000;
        tiempo = (tiempo / 1000).toFixed(3);
        const parrafo = document.createElement("p");
        parrafo.textContent = "Tiempo de reacción: " + tiempo + " s";
        const main = document.querySelector("main > section");
        const parrafoExistente = main.querySelector("p");
        if (parrafoExistente && parrafoExistente.textContent.includes("Tiempo de reacción")) {
            main.removeChild(parrafoExistente);
        }
        main.appendChild(parrafo);
        main.classList.remove("unload");
        const boton = document.querySelectorAll("button")[0];
        boton.disabled = false;
        const boton2 = document.querySelectorAll("button")[1];
        boton2.disabled = true;
        this.createRecordForm();
    }

	fetchTopRecords(nivel) {
        $.ajax({
            url: "semaforo.php",
            type: "POST",
            dataType: "json",
            data: {
                action: "getTop",
                nivel: nivel,
            },
            success: (response) => {
                const records = response.data;
                const $main = $("main");
                let $article = $main.find("> article");
                if($article){
                    const $article2 = $("article");
                    $main.append($article2);
                    $article = $main.find("> article");
                }
                $article.find("h3").remove();
                $main.find("p:contains('Tiempo de reacción')").remove();
                const h3 = $("<h3></h3>")
                h3.text(`Top 10 para el nivel de dificultad: ${nivel}`);
                $article.append(h3);
                const $list = $("<ol></ol>");
                records.forEach(record => {
                    const $item = $("<li></li>").text(`${record.nombre} ${record.apellidos} - ${record.tiempo} s`);
                    $list.append($item);
                });
                $article.append($list);
                $article.find("p").filter(function () {
                    return $(this).text().includes("Tiempo");
                }).remove();
           
            },
            error: function (xhr, status, error) {
                console.error("AJAX error:", status, error);
                console.error("a text:", xhr.responseText);
            },
        });
    }
	createRecordForm() {
        const $main = $("main");
        let $article = $main.find("> article");
        if ($article.length === 0) {
            $article = $("<article></article>");
            $main.append($article);
        }
    
        $article.empty();
    
        const $h3 = $("<h3>Formulario</h3>");
        $article.append($h3);
    
        const $form = $("<form></form>");
    
        const $nombreLabel = $("<label>")
            .attr("for", "nombre")
            .text("Nombre: ");
        const $nombreInput = $("<input>")
            .attr({
                id: "nombre",
                type: "text",
                placeholder: "Nombre",
                required: true
            });
    
        const $apellidoLabel = $("<label>")
            .attr("for", "apellido")
            .text("Apellido: ");
        const $apellidoInput = $("<input>")
            .attr({
                id: "apellido",
                type: "text", 
                placeholder: "Apellido",
                required: true
            });
    
        const $nivelLabel = $("<label>")
            .attr("for", "nivel")
            .text("Nivel de dificultad: ");
        const $nivelInput = $("<input>")
            .attr({
                id: "nivel",
                type: "text",
                readonly: true
            })
            .val(this.difficulty);
    
        const $tiempoLabel = $("<label>")
            .attr("for", "tiempo")
            .text("Tiempo de reacción (s): ");
        const $tiempoInput = $("<input>")
            .attr({
                id: "tiempo",
                type: "text",
                readonly: true
            })
            .val(((this.clic_moment - this.unload_moment - 2000) / 1000).toFixed(3));
    
        const $submitButton = $("<input>")
            .attr({
                type: "button",
                value: "Enviar"
            })
            .on("click", () => {
                const nombre = $("input#nombre").val();
                const apellido = $("input#apellido").val();
                const nivel = $("input#nivel").val();
                const tiempo = $("input#tiempo").val();
    
                if (!nombre || !apellido) {
                    let $error = $("<p>Tanto nombre como apellido deben de estar completos</p>");
                    $form.find("p").remove();
                    $form.append($error);
                    return;
                }
    
                $article.find("form").remove();
    
                $.ajax({
                    url: "semaforo.php",
                    type: "POST",
                    data: {
                        nombre: nombre,
                        apellido: apellido,
                        nivel: nivel,
                        tiempo: tiempo,
                        action: "save"
                    },
                    success: () => {
                        this.fetchTopRecords(nivel);
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX error:", status, error);
                        console.error("Response text:", xhr.responseText);
                    }
                });
            });
        $form.append(
            $nombreLabel, $nombreInput, 
            $apellidoLabel, $apellidoInput, 
            $nivelLabel, $nivelInput, 
            $tiempoLabel, $tiempoInput, 
            $submitButton
        );
    
        $article.append($form);
    }
    

 
}

const semaforo = new Semaforo();
