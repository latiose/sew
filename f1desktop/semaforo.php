<?php
class Record{

	protected $server;
	protected $user;
	protected $pass;
	protected $dbname;
	protected $conn;

	public function __construct(){
        $this->server = "localhost";
		$this->user = "DBUSER2024";
		$this->pass = "DBPSWD2024";
		$this->dbname = "records";
		$this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

		if ($this->conn->connect_error) {
			exit ("<p>ERROR de conexión:".$this->conn->connect_error."</p>");
		}

		$this->conn->select_db("records");
    }
    
	public function saveRecord($nombre, $apellido, $nivel, $tiempo) {
        if (!$this->conn) {
            exit ("<p>ERROR de conexión:".$this->conn->connect_error."</p>");
        }

        $stmt = $this->conn->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");
     
        $stmt->bind_param("sssd", $nombre, $apellido, $nivel, $tiempo);

        $stmt->execute();
        $stmt->close();
    }

	public function getTopRecords($nivel) {
		if (!$this->conn) {
			exit ("<p>ERROR de conexión:".$this->conn->connect_error."</p>");
		}
		$stmt = $this->conn->prepare("SELECT nombre, apellidos, tiempo FROM registro WHERE nivel = ? ORDER BY tiempo ASC LIMIT 10");
	
		$stmt->bind_param("s", $nivel);
		$stmt->execute();
		$result = $stmt->get_result();
		
		$records = [];
	
		while ($row = $result->fetch_assoc()) {
			$records[] = $row;
		}
	
		$stmt->close();
			
		echo json_encode(['data' => $records]);
		exit;
}
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	
	$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
	$apellido = isset($_POST['apellido']) ? $_POST['apellido'] : null;
	$nivel = isset($_POST['nivel']) ? $_POST['nivel'] : null;
	$tiempo = isset($_POST['tiempo']) ? $_POST['tiempo'] : null;
	$record = new Record();
	if( $_POST['action']==="save"){
		$record->saveRecord($nombre, $apellido, $nivel, $tiempo);
	}
	if( $_POST['action']==="getTop"){
    	$record->getTopRecords($nivel);   
	}
}

?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
	<link rel ="icon" href="multimedia/imagenes/favicon.ico" />
    <title>F1 Desktop Meteorología</title>
	<meta name ="author" content ="Pablo Pérez Álvarez" />
	<meta name ="description" content =" Juego semáforo" />
	<meta name ="keywords" content ="f1,minijuego,semáforo,temporizador" />
	<meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="estilo/estilo.css" />
	<link rel="stylesheet" href="estilo/semaforo_grid.css" />
	<link rel="stylesheet" href="estilo/layout.css" />
	<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>

<body>
<header>
    <h1>F1 Desktop</h1>
	<nav>
	<a href="piloto.html">Piloto</a>
	<a href="noticias.html">Noticias</a>
	<a href="calendario.html">Calendario</a>
	<a href="meteorologia.html">Meteorología</a>
	<a href="circuito.html">Circuito</a>
	<a href="viajes.php">Viajes</a>
	<a href="juegos.html" class="active">Juegos</a>
	</nav>
	</header>
	<p> Estás en: <a href="index.html">Inicio</a> >> <a href="juegos.html">Juegos</a> >> Semáforo</p>
	<section>
            <h2>Juegos</h2>
            <a href="memoria.html">Memoria</a>
            <a href="semaforo.php">Semáforo</a>
			<a href="api.html">Api</a>
			<a href="php/trivia.php">Juego trivia</a>
       </section> 
	   
	<main>
   <script src="js/semaforo.js"></script>
 </main>
</body>
</html>

