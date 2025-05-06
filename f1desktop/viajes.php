<?php
class Carrusel{
	protected $capital;
	protected $pais;
	protected $url;
	protected $fotos = [];

	public function __construct($capital, $pais){
		$this->capital = $capital;
		$this->pais = $pais;
		$perPage = 10;
		$this->url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
		$this->url.= '&tags='.$this->capital;
		$this->url.= '&per_page='.$perPage;
		$this->url.= '&format=json';
		$this->url.= '&nojsoncallback=1';
		$this->obtenerFotos();
		
		}	
		
	protected function obtenerFotos() {
		$respuesta = file_get_contents($this->url);
		$json = json_decode($respuesta);
		
		if ($json === null) {
				echo "<h3>Error al procesar el archivo JSON recibido</h3>";
		} else {
				foreach ($json->items as $item) {
					$this->fotos[] = [
						'titulo' => $item->title,
						 'url' => $item->media->m
					];
				}
			}
		}
		
	

	public function getFotos() {
		return json_encode($this->fotos); 
	}
	
	}

	class Moneda{
		const APIKEY ="466f99b86321a0460dd75399";
		protected $local;
		protected $cambio;
		

		public function __construct($local, $cambio){
			$this->local = $local;
			$this->cambio = $cambio;
		}

		public function obtenerCambio() {
			$apiUrl = "https://v6.exchangerate-api.com/v6/" . self::APIKEY . "/pair/" . $this->local . "/" . $this->cambio;
	
			$response = file_get_contents($apiUrl);
	
			if (!$response) {
				return "Error: No se pudo conectar con la API de tasas de cambio.";
			}
	
			$data = json_decode($response, true);
	
			if (!isset($data['conversion_rate'])) {
				return "Error: No se pudo obtener la tasa de cambio.";
			}
	
			$tasaCambio = $data['conversion_rate'];
	
			return $tasaCambio;
		}
	}

	

	$carrusel = new Carrusel("Pekin", "China"); 
	$moneda = new Moneda("CNY", "EUR"); 
	$equivalencia = $moneda->obtenerCambio();
	echo "<script>window.imagenes = " . $carrusel->getFotos() . ";</script>";
	?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
	<link rel ="icon" href="multimedia/imagenes/favicon.ico" />
    <title>F1 Desktop Viajes</title>
	<meta name ="author" content ="Pablo Pérez Álvarez" />
	<meta name ="description" content =" Viajes" />
	<meta name ="keywords" content ="f1,mapas,china,shanghai,carrusel" />
	<meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="estilo/estilo.css" />
	<link rel="stylesheet" href="estilo/layout.css" />
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTrIKXCE08WLNimTdu5W0taOgFe08W6N4" async defer></script>
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
	<a href="viajes.php" class="active">Viajes</a>
	<a href="juegos.html">Juegos</a>
	</nav>
	</header>
	<p> Estás en: <a href="index.html">Inicio</a> >> Viajes </p>
	<main>
	<h2>Viajes</h2>
	<button>Cargar mapa estático</button>
	<button>Cargar mapa dinámico</button>
	<p></p>
	<section>
	<h3>Mapa</h3>
	<div></div>
	<article> <h4>Carrusel de imagenes</h4><button> &gt; </button>
	<button> &lt; </button></article>
	</section>
	<script src="js/viajes.js"></script> 
	<h4> Valor de la moneda china: </h4>
	<p>1 CNY = <?php echo $equivalencia; ?> EUR</p>	
  	</main>
	
	
</body>
</html>