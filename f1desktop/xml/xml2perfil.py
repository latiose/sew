# -*- coding: utf-8 -*-
import xml.etree.ElementTree as ET

class Svg(object):
    def __init__(self):
        self.doc = ET.Element('svg', width='100%', height='100%', style="overflow:visible", version='1.1', xmlns='http://www.w3.org/2000/svg', viewBox="0 0 2000 1200")

    def addPolyline(self, listaX, listaY, color, ancho):

        puntos = " ".join(f"{x},{y}" for x, y in zip(listaX, listaY))
        ET.SubElement(self.doc, 'polyline', points=puntos, stroke=color, fill="white", stroke_width=ancho)

    def escribir(self, nombreArchivoSVG):
        arbol = ET.ElementTree(self.doc)
        arbol.write(nombreArchivoSVG, encoding='utf-8', xml_declaration=True)


def xPath(nombreXML):
    NAMESPACE = {'uniovi': 'http://www.uniovi.es'}
    try:
        arbol = ET.parse(nombreXML)
        raiz = arbol.getroot()
        Altitudes = []
        Distancias = []
        distanciaAcumulada = 0

        for tramo in raiz.findall(".//uniovi:tramo", NAMESPACE):
            distanciaAcumulada+=float(tramo.get("distancia"))
            Distancias.append(distanciaAcumulada)
            coordenada = tramo.find("uniovi:coordenada", NAMESPACE)
            if coordenada is not None:
                Altitudes.append(float(coordenada.get("altitud"))*200) #*200 para escalarlo



        return Distancias, Altitudes
    except IOError:
        print('No se encuentra el archivo ', nombreXML)
        exit()
    except ET.ParseError:
        print("Error procesando el archivo XML = ", nombreXML)
        exit()


def main():

    listaPrimera, listaSegunda = xPath("circuitoEsquema.xml")

    nombreSVG = "perfil.svg"
    nuevoSVG = Svg()


    nuevoSVG.addPolyline(listaPrimera, listaSegunda, color='red', ancho='4')


    nuevoSVG.escribir(nombreSVG)
    print("Creado el archivo: ", nombreSVG)


if __name__ == "__main__":
    main()
