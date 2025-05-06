"use strict";
class Noticias {
    constructor() {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }
    }

    readInputFile(files) {
        const main = document.querySelector("main");
        const archivo = files[0];
        const errorArchivo = document.createElement("p");
        const tipoTexto = /text.*/;

        if (archivo.type.match(tipoTexto)) {
            const lector = new FileReader();

            lector.onload = function () {
                const texto = lector.result;
                const articulos = texto.split("\n");

                articulos.forEach((articulo, index) => {
                    const partes = articulo.split("_");

                    const contenedorArticulo = document.createElement("article");
                    const titular = document.createElement("h2");
                    const cuerpo = document.createElement("p");
                    const autor = document.createElement("p");

                    titular.innerText = partes[0] || `Artículo ${index + 1}: Titular no especificado`;
                    cuerpo.innerText = partes[1] || "Cuerpo no especificado";
                    autor.innerText = `Autor: ${partes[2] || "Desconocido"}`;

                    contenedorArticulo.appendChild(titular);
                    contenedorArticulo.appendChild(cuerpo);
                    contenedorArticulo.appendChild(autor);
                    main.appendChild(contenedorArticulo);
                   
                });
            };

            lector.readAsText(archivo);
        } else {
            errorArchivo.innerText = "Error: ¡Archivo no válido!";
            main.appendChild(errorArchivo);
        }
    }


    publicar() {
        const main = document.querySelector("main");
        const article = document.querySelector("article");
        const titulo = article.querySelector("input[name='titular']");
        const cuerpo = article.querySelector("textarea[name='cuerpo']");
        const autor = article.querySelector("input[name='autor']");
    
    
        if (titulo.value.trim() === "" ||cuerpo.value.trim() === "" ||autor.value.trim() === "" ) {
            let main2 = document.querySelector("main > article");
            let p = document.createElement("p");
            let p2 = main2.querySelector("p");
    
            if (!p2) {
                p.innerText = "Por favor, complete todos los campos.";
                main2.appendChild(p);
            }
            return;
        }
    
        const contenedorArticulo = document.createElement("article");
        const h2 = document.createElement("h2");
        const pCuerpo = document.createElement("p");
        const pAutor = document.createElement("p");
    
        h2.innerText = titulo.value;
        pCuerpo.innerText = cuerpo.value;
        pAutor.innerText = `Autor: ${autor.value}`;
    
        contenedorArticulo.appendChild(h2);
        contenedorArticulo.appendChild(pCuerpo);
        contenedorArticulo.appendChild(pAutor);
        main.appendChild(contenedorArticulo);
        titulo.value = "";
        cuerpo.value = "";
        autor.value = "";
        let main2 = document.querySelector("main > article");
        let p3 = main2.querySelector("p");
        if (p3) {
            main2.removeChild(p3);
        }
    }
}

window.noticias = new Noticias();
document.querySelector("button").addEventListener("click", function (event) {
    noticias.publicar();
});
