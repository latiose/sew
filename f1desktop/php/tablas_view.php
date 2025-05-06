<?php
require 'tablas.php'; 
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
	<link rel ="icon" href="../multimedia/imagenes/favicon.ico" />
    <title>F1 Desktop Meteorología</title>
	<meta name ="author" content ="Pablo Pérez Álvarez" />
	<meta name ="description" content =" Base de datos" />
	<meta name ="keywords" content ="f1,base de datos" />
	<meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="../estilo/estilo.css" />
	<link rel="stylesheet" href="../estilo/layout.css" />
</head>

<body>
<header>
    <h1>F1 Desktop</h1>
	<nav>
	<a href="../piloto.html">Piloto</a>
	<a href="../noticias.html">Noticias</a>
	<a href="../calendario.html">Calendario</a>
	<a href="../meteorologia.html">Meteorología</a>
	<a href="../circuito.html">Circuito</a>
	<a href="../viajes.php">Viajes</a>
	<a href="../juegos.html" class="active">Juegos</a>
	</nav>
	</header>
	<p> Estás en: <a href="../index.html">Inicio</a> >> <a href="../juegos.html">Juegos</a> >> <a href="comparacion.php">Juego trivia</a> >> Base de datos</p>
	<section>
            <h2>Juegos</h2>
            <a href="../memoria.html">Memoria</a>
            <a href="../semaforo.php">Semáforo</a>
			<a href="../api.html">Api</a>
			<a href="trivia.php">Juego trivia</a>
       </section> 
	   
<main>
		<form method="POST">
			<button type="submit" name="importar_todos" >Crear base de datos e importar datos</button>
		</form>

        <form method="POST">
            <button type="submit" name="borrar_todo">Borrar todas las tablas</button>
        </form>

		<form method="POST">
            <button type="submit" name="exportar">Exportar todos los datos a un fichero csv</button>
        </form>

		<form method="POST" enctype="multipart/form-data">
			<label for="archivo_csv">Selecciona un archivo CSV:</label>
			<input type="file" name="archivo_csv" id="archivo_csv" accept=".csv" required>
			<button type="submit" name="importar_archivo">Importar archivo CSV</button>
		</form>

		<form method="POST">
            <label for="año">Selecciona un año:</label>
            <select name="año" id="año">
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
            </select>
            <button type="submit" name="mostrar_datos_año">Mostrar datos</button>
        </form>

        <?php 
        if (!empty($resultTable)) {
            echo $resultTable;
        }
        ?>

 </main>
</body>
</html>