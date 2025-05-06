<?php
require 'tablas.php'; 

$tablas = new Tablas(); 
$mensaje = "";
$mensaje2 = "";
$items = []; 
$tipo = "pilotos"; 
$dato_aleatorio = [];

function obtenerComparacion($tipo, $conn) {
   
    if ($tipo === "pilotos") {
        $query = "SELECT id_piloto, Nombre, Apellido FROM pilotos ORDER BY RAND() LIMIT 2";
    } elseif ($tipo === "coches") {
        $query = "SELECT id_coche, modelo, año_modelo FROM coches ORDER BY RAND() LIMIT 2";
    } else {
        return [];
    }

    $result = $conn->query($query);
    if ($result) {
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    return [];
}



function generarDatoAleatorioEquipo($conn) {
    $opciones = [
        function($conn) {
            $query = "SELECT nombre, pais_origen FROM equipos ORDER BY RAND() LIMIT 1";
            $result = $conn->query($query);
            $equipo = $result->fetch_assoc();
            
            $datos_posibles = [
                ["texto" => "{$equipo['nombre']} fue fundado antes de 1970", "verdadero" => false],
                ["texto" => "{$equipo['nombre']} ha ganado más de 5 campeonatos de constructores", "verdadero" => false],
                ["texto" => "{$equipo['nombre']} proviene de {$equipo['pais_origen']}", "verdadero" => true]
            ];
            
            return $datos_posibles[array_rand($datos_posibles)];
        },
        
        function($conn) {
            $query = "SELECT e.nombre, 
                     COUNT(DISTINCT r.id_piloto) as num_pilotos, 
                     SUM(r.puntos) as puntos_totales,
                     t.Año as ultima_temporada
                     FROM equipos e
                     JOIN resultados r ON r.id_equipo = e.id_equipo
                     JOIN temporadas t ON r.id_temporada = t.id_temporada
                     GROUP BY e.nombre, t.Año
                     ORDER BY RAND() LIMIT 1";
            $result = $conn->query($query);
            $equipo = $result->fetch_assoc();
            
            $datos_posibles = [
                ["texto" => "{$equipo['nombre']} ha tenido más de 3 pilotos en {$equipo['ultima_temporada']}", "verdadero" => false],
                ["texto" => "{$equipo['nombre']} ha obtenido más de 500 puntos en total", "verdadero" => false],
                ["texto" => "El número de pilotos de {$equipo['nombre']} es {$equipo['num_pilotos']}", "verdadero" => true]
            ];
            
            return $datos_posibles[array_rand($datos_posibles)];
        },
        
        function($conn) {
            $query = "SELECT e.nombre, 
                     GROUP_CONCAT(p.Nombre, ' ', p.Apellido SEPARATOR ', ') as pilotos
                     FROM equipos e
                     JOIN resultados r ON r.id_equipo = e.id_equipo
                     JOIN pilotos p ON p.id_piloto = r.id_piloto
                     WHERE r.id_temporada = (SELECT MAX(id_temporada) FROM temporadas)
                     GROUP BY e.nombre
                     ORDER BY RAND() LIMIT 1";
            $result = $conn->query($query);
            $equipo = $result->fetch_assoc();
            
            $datos_posibles = [
                ["texto" => "{$equipo['nombre']} tiene pilotos de más de 3 nacionalidades diferentes", "verdadero" => false],
                ["texto" => "Los pilotos de {$equipo['nombre']} son: {$equipo['pilotos']}", "verdadero" => true],
                ["texto" => "Ninguno de los pilotos de {$equipo['nombre']} ha sido campeón mundial", "verdadero" => false]
            ];
            
            return $datos_posibles[array_rand($datos_posibles)];
        }
    ];
    return $opciones[array_rand($opciones)]($conn);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if (!$tablas->conn) {
       exit("<p>ERROR de conexión:" . $tablas->conn->connect_error . "</p>");
   }
   
   if (isset($_POST['tipo'])) {
       $tipo = $_POST['tipo'];
   }
   
   $items = obtenerComparacion($tipo, $tablas->conn);
   
   if (isset($_POST['eleccion']) && isset($_POST['id1']) && isset($_POST['id2'])) {

        $eleccion = $_POST['eleccion'];
        $id1 = $_POST['id1'];
        $id2 = $_POST['id2'];
    
        if ($tipo === "pilotos") {
            $query = "SELECT r.id_piloto, p.Nombre, p.Apellido, COALESCE(SUM(r.puntos), 0) AS total_puntos FROM pilotos p LEFT JOIN resultados r ON p.id_piloto = r.id_piloto 
            WHERE p.id_piloto IN (?, ?) GROUP BY p.id_piloto"; //hay pilotos que no participaron en todos los años, por eso uso coalesce 
            $stmt = $tablas->conn->prepare($query);
            $stmt->bind_param("ii", $id1, $id2);
        } elseif ($tipo === "coches") {
            $query = "SELECT id_coche, modelo, año_modelo, MAX(velocidad_max) AS mejor_velocidad FROM coches WHERE id_coche IN (?, ?) GROUP BY id_coche";
            $stmt = $tablas->conn->prepare($query);
            $stmt->bind_param("ii", $id1, $id2);
        }
    
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        
        $datos = $result->fetch_all(MYSQLI_ASSOC);
        
        if (count($datos) === 2) {
            if ($tipo === "pilotos") {
                $ganador = $datos[0]['total_puntos'] > $datos[1]['total_puntos'] ? $datos[0] : $datos[1];
                $perdedor = $datos[0]['total_puntos'] < $datos[1]['total_puntos'] ? $datos[0] : $datos[1];
            } elseif ($tipo === "coches") {
                $ganador = $datos[0]['mejor_velocidad'] > $datos[1]['mejor_velocidad'] ? $datos[0] : $datos[1];
                $perdedor = $datos[0]['mejor_velocidad'] < $datos[1]['mejor_velocidad'] ? $datos[0] : $datos[1];
            }
            
            if ((int)$eleccion === (int)$ganador['id_' . ($tipo === "pilotos" ? 'piloto' : 'coche')]) {
                if($tipo === "pilotos"){
                $mensaje = "¡Correcto! ".$ganador['Nombre']." ". $ganador['Apellido']." obtuvo más puntos durante las 3 últimas temporadas.";
                }
                else{
                    $mensaje = "¡Correcto! ".$ganador['modelo']." ". $ganador['año_modelo']." alcanza una velocidad máxima mayor que el otro modelo.";
                }
            } else {
                if($tipo === "pilotos"){
                    $mensaje = "¡Incorrecto! ".$perdedor['Nombre']." ". $perdedor['Apellido']." obtuvo menos puntos durante las 3 últimas temporadas.";
                    }
                    else{
                        $mensaje = "¡Incorrecto! ".$perdedor['modelo']." ". $perdedor['año_modelo']." alcanza una velocidad máxima menor que el otro modelo.";
                    }
            }
        }
    }

    if (!isset($_POST['texto']) || !isset($_POST['verdadero'])) {
        $dato_aleatorio = generarDatoAleatorioEquipo($tablas->conn);
    } else {
        $texto_original = $_POST['texto'];
        $verdadero_original = $_POST['verdadero'] === 'true';
        $respuesta_jugador = isset($_POST['respuesta']) ? $_POST['respuesta'] === 'true' : null;

        if ($respuesta_jugador === $verdadero_original) {
            $mensaje2 = "¡Correcto! Has acertado.";
        } else {
            $mensaje2 = "Incorrecto. La respuesta era " . ($verdadero_original ? "Verdadero" : "Falso");
        }
        $dato_aleatorio = generarDatoAleatorioEquipo($tablas->conn);
    }
} else {
    $dato_aleatorio = generarDatoAleatorioEquipo($tablas->conn);
} 
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
	<link rel ="icon" href="../multimedia/imagenes/favicon.ico" />
    <title>F1 Desktop Meteorología</title>
	<meta name ="author" content ="Pablo Pérez Álvarez" />
	<meta name ="description" content =" Juego trivia" />
	<meta name ="keywords" content ="f1,trivia,preguntas" />
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
	<p> Estás en: <a href="../index.html">Inicio</a> >> <a href="../juegos.html">Juegos</a> >> Juego trivia</p>
	<section>
            <h2>Juegos</h2>
            <a href="../memoria.html">Memoria</a>
            <a href="../semaforo.php">Semáforo</a>
			<a href="../api.html">Api</a>
			<a href="trivia.php">Juego trivia</a>
       </section> 
	   
       <main>
       <a href="tablas_view.php">Acceso a la base de datos..</a>


    <form method="POST">
        <h2>¿Quién es mejor?</h2>
        <label for="tipo">Selecciona el tipo de comparación:</label>
        <select name="tipo" id="tipo">
            <option value="pilotos" <?= $tipo === 'pilotos' ? 'selected' : '' ?>>Pilotos</option>
            <option value="coches" <?= $tipo === 'coches' ? 'selected' : '' ?>>Coches</option>
        </select>
        <button type="submit">Comparar</button>
    </form>

    <?php if (count($items) === 2): ?>
        <form method="POST">
            <input type="hidden" name="tipo" value="<?= htmlspecialchars($tipo) ?>">
            <input type="hidden" name="id1" value="<?= $tipo === 'pilotos' ? $items[0]['id_piloto'] : $items[0]['id_coche'] ?>">
            <input type="hidden" name="id2" value="<?= $tipo === 'pilotos' ? $items[1]['id_piloto'] : $items[1]['id_coche'] ?>">
            <button type="submit" name="eleccion" value="<?= $tipo === 'pilotos' ? $items[0]['id_piloto'] : $items[0]['id_coche'] ?>">
                <?= $tipo === "pilotos" ? "{$items[0]['Nombre']} {$items[0]['Apellido']}" : "{$items[0]['modelo']} - {$items[0]['año_modelo']}" ?>
            </button>
            <span>o</span>
            <button type="submit" name="eleccion" value="<?= $tipo === 'pilotos' ? $items[1]['id_piloto'] : $items[1]['id_coche'] ?>">
                <?= $tipo === "pilotos" ? "{$items[1]['Nombre']} {$items[1]['Apellido']}" : "{$items[1]['modelo']} - {$items[1]['año_modelo']}" ?>
            </button>
        </form>
    <?php endif; ?>

    <?php if (!empty($mensaje)): ?>
        <p><?= $mensaje ?></p>
    <?php endif; ?>

    <?php if (!empty($dato_aleatorio)): ?>
        <form method="POST">
            <input type="hidden" name="texto" value="<?= htmlspecialchars($dato_aleatorio['texto']) ?>">
            <input type="hidden" name="verdadero" value="<?= $dato_aleatorio['verdadero'] ? 'true' : 'false' ?>">
            
            <h3>¿Es verdadero o falso?</h3>
            <p><?= $dato_aleatorio['texto'] ?></p>
            
            <button type="submit" name="respuesta" value="true">Verdadero</button>
            <button type="submit" name="respuesta" value="false">Falso</button>
        </form>
    <?php endif; ?>

    <?php if (!empty($mensaje2)): ?>
        <p><?= $mensaje2 ?></p>
    <?php endif; ?>
</main>
</body>
</html>
