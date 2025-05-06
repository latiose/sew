<?php
class Tablas{

	protected $server;
	protected $user;
	protected $pass;
	protected $dbname;
	public $conn;
	protected $tablas;

	public function __construct(){
        $this->server = "localhost";
		$this->user = "DBUSER2024";
		$this->pass = "DBPSWD2024";
		$this->dbname = "f1";
		$this->conn = new mysqli($this->server, $this->user, $this->pass);
		$this->conn->query("CREATE DATABASE IF NOT EXISTS f1");
		$this->tablas = ['resultados', 'coches', 'pilotos', 'temporadas', 'equipos'];
		$this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
		$this->conn->select_db('f1');
		if ($this->conn->connect_error) {
			exit ("<p>ERROR de conexión:".$this->conn->connect_error."</p>");
		}
		foreach ($this->tablas as $tabla) {
            $checkTableQuery = "SHOW TABLES LIKE '$tabla'";
            $tableResult = $this->conn->query($checkTableQuery);
            if ($tableResult->num_rows == 0) {
                $this->crearDatosIniciales(); //si faltan tablas las crea
            }
        }
    
    }


	public function importCSV($filePath) {
		if (!$this->conn) {
			exit("<p>ERROR de conexión:" . $this->conn->connect_error . "</p>");
		}
		try {
			$file = fopen($filePath, "r");
			$tableName = trim(fgets($file));
			$headers = fgetcsv($file);
			$placeholders = implode(",", array_fill(0, count($headers), "?"));
			$query = "INSERT INTO $tableName (" . implode(",", $headers) . ") VALUES ($placeholders)";
			$stmt = $this->conn->prepare($query);
			while ($row = fgetcsv($file)) {
				$stmt->execute($row);
			}
			fclose($file);
			$stmt->close();
		} catch (Exception $e) {
			echo "Error al importar datos: " . $e->getMessage();
		}
	}
	
	public function exportToCSV() {
		if (!$this->conn) {
			exit("<p>ERROR de conexión:" . $this->conn->connect_error . "</p>");
		}
		try {
			header('Content-Type: text/csv');
			header('Content-Disposition: attachment; filename="datos.csv"'); 
			$output = fopen('php://output', 'w');
			foreach ($this->tablas as $tabla) {
				fputcsv($output, [$tabla]);
	
				$query = "SELECT * FROM $tabla";
				$result = $this->conn->query($query);
	
				if ($result) {
					$headers = array_keys($result->fetch_assoc());
					fputcsv($output, $headers);
	
					$result->data_seek(0);
					while ($row = $result->fetch_assoc()) {
						fputcsv($output, $row);
					}
					fputcsv($output, []);
					$result->free();
				}
			}

			fclose($output);
			exit();
		} catch (Exception $e) {
			echo "Error al exportar datos: " . $e->getMessage();
		}
	}

	public function resetearBD() {
		if (!$this->conn) {
            exit ("<p>ERROR de conexión:".$this->conn->connect_error."</p>");
        }
		$this->conn->query("SET FOREIGN_KEY_CHECKS = 0");
		foreach ($this->tablas  as $tabla) {
			$this->conn->query("TRUNCATE TABLE $tabla"); 
		}
		$this->conn->query("SET FOREIGN_KEY_CHECKS = 1");
		
	}

	public function crearDatosIniciales() {
		$this->conn->query("CREATE TABLE if not exists `equipos` (
			`id_equipo` int(11) NOT NULL AUTO_INCREMENT,
			`nombre` varchar(32) NOT NULL,
			`pais_origen` varchar(32) NOT NULL,
			PRIMARY KEY (`id_equipo`),
			UNIQUE KEY `nombre` (`nombre`)
		  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");
		  
		  $this->conn->query("CREATE TABLE if not exists `pilotos` (
			`id_piloto` int(11) NOT NULL AUTO_INCREMENT,
			`Nombre` varchar(32) NOT NULL,
			`Apellido` varchar(32) NOT NULL,
			`Nacionalidad` varchar(32) NOT NULL,
			`Fecha_Nacimiento` date NOT NULL,
			PRIMARY KEY (`id_piloto`)
		  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");
		  
		  $this->conn->query("CREATE TABLE if not exists `resultados` (
			`id_resultado` int(11) NOT NULL AUTO_INCREMENT,
			`id_temporada` int(11) NOT NULL,
			`id_piloto` int(11) NOT NULL,
			`id_equipo` int(11) NOT NULL,
			`puntos` int(11) NOT NULL,
			`posicion` int(11) NOT NULL,
			PRIMARY KEY (`id_resultado`),
			KEY `fk_equipo` (`id_equipo`),
			KEY `fk_piloto` (`id_piloto`),
			KEY `fk_temporada` (`id_temporada`)
		  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");
		  $this->conn->query("CREATE TABLE if not exists `coches` (
			`id_coche` int(11) NOT NULL AUTO_INCREMENT,
			`modelo` varchar(100) NOT NULL,
			`año_modelo` int(11) NOT NULL,
			`Chasis` varchar(32) NOT NULL,
			`velocidad_max` decimal(5,2) NOT NULL,
			`potencia_motor` int(11) NOT NULL,
			`id_equipo` int(11) NOT NULL,
			PRIMARY KEY (`id_coche`),
			KEY `fk_equipocoche` (`id_equipo`)
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");
		  $this->conn->query("CREATE TABLE if not exists `temporadas`
			(
			`id_temporada` int(11) NOT NULL AUTO_INCREMENT,
			`Año` int(11) NOT NULL,
			`Campeon` varchar(100) NOT NULL,
			`Numero_Carreras` int(11) NOT NULL,
			PRIMARY KEY (`id_temporada`)
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci");
		

		$this->resetearBD();
		$this->importCSV("equipos.csv");
		$this->importCSV("pilotos.csv");
		$this->importCSV("coches.csv");
		$this->importCSV("temporadas.csv");
		$this->importCSV("resultados.csv");
    }

 
	public function mostrarDatosPorAño($año) {
        if (!$this->conn) {
            exit("<p>ERROR de conexión:" . $this->conn->connect_error . "</p>");
        }
        try {
            $query = "
                SELECT t.Año, p.Nombre, p.Apellido, r.puntos, r.posicion, e.nombre AS equipo
                FROM temporadas t
                INNER JOIN resultados r ON t.id_temporada = r.id_temporada
                INNER JOIN pilotos p ON r.id_piloto = p.id_piloto
                INNER JOIN equipos e ON r.id_equipo = e.id_equipo
                WHERE t.Año = ?
                ORDER BY r.posicion ASC";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("i", $año);
            $stmt->execute();
            $result = $stmt->get_result();
    
            $tableHtml = "";
            if ($result->num_rows > 0) {
                $tableHtml = "<table>
                    <caption>Temporada $año</caption>
                    <tr>
                        <th scope='col' id = 'piloto'> Piloto</th>
                        <th scope='col' id = 'equipo'>  Equipo</th>
                        <th scope='col' id = 'posicion'>  Posición</th>
                        <th scope='col' id = 'puntos'>  Puntos</th>
                    </tr>";
                
                while ($row = $result->fetch_assoc()) {
                    $tableHtml .= "<tr>
                        <td headers = 'piloto'> {$row['Nombre']} {$row['Apellido']}</td>
                        <td headers = 'equipo'> {$row['equipo']}</td>
                        <td headers = 'posicion'>{$row['posicion']}º</td>
                        <td headers = 'puntos'> {$row['puntos']}</td>
                    </tr>";
                }
                $tableHtml .= "</table>";
            }
			else{
				return "<p>Error al mostrar datos: no se encuentran datos en la base de datos</p>";
			}
            
            $stmt->close();
            return $tableHtml;
        } catch (Exception $e) {
            return "<p>Error al mostrar datos: " . $e->getMessage() . "</p>";
        }
    }
}

$tablas = new Tablas();
$resultTable = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['importar_todos'])) {
        $tablas->crearDatosIniciales();
    }
    if (isset($_POST['borrar_todo'])) {
        $tablas->resetearBD();
    }
	if (isset($_POST['exportar'])) {
        $tablas->exportToCSV();
    }
	if (isset($_POST['importar_archivo']) && isset($_FILES['archivo_csv'])) {
        $archivoTmp = $_FILES['archivo_csv']['tmp_name'];
        $tablas->importCSV($archivoTmp,false);
    }
	if (isset($_POST['mostrar_datos_año'])) {
        $año = intval($_POST['año']);
        $resultTable = $tablas->mostrarDatosPorAño($año);
    }
	
}



?>

