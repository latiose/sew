# 02020-KML.py
# # -*- coding: utf-8 -*-

import xml.etree.ElementTree as ET

class Kml(object):

    """
    Genera archivo KML con puntos y líneas
    @version 1.0 17/Noviembre/2023
    @author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
    """
    def __init__(self):
        """
        Crea el elemento raíz y el espacio de nombres
        """
        self.raiz = ET.Element('kml', xmlns="http://www.opengis.net/kml/2.2")
        self.doc = ET.SubElement(self.raiz,'Document')


    def addPlacemark(self,nombre,descripcion,long,lat,alt, modoAltitud):
        """
        Añade un elemento <Placemark> con puntos <Point>
        """
        pm = ET.SubElement(self.doc,'Placemark')
        ET.SubElement(pm,'name').text = '\n' + nombre + '\n'
        ET.SubElement(pm,'description').text = '\n' + descripcion + '\n'
        punto = ET.SubElement(pm,'Point')
        ET.SubElement(punto,'coordinates').text = '\n{},{},{}\n'.format(long,lat,alt)
        ET.SubElement(punto,'altitudeMode').text = '\n' + modoAltitud + '\n'

    def addLineString(self,nombre,extrude,tesela, listaCoordenadas, modoAltitud, color, ancho):
        """
        Añade un elemento <Placemark> con líneas <LineString>
        """
        ET.SubElement(self.doc,'name').text = '\n' + nombre + '\n'
        pm = ET.SubElement(self.doc,'Placemark')
        ls = ET.SubElement(pm, 'LineString')
        ET.SubElement(ls,'extrude').text = '\n' + extrude + '\n'
        ET.SubElement(ls,'tessellation').text = '\n' + tesela + '\n'
        ET.SubElement(ls,'coordinates').text = '\n' + listaCoordenadas + '\n'
        ET.SubElement(ls,'altitudeMode').text = '\n' + modoAltitud + '\n'

        estilo = ET.SubElement(pm, 'Style')
        linea = ET.SubElement(estilo, 'LineStyle')
        ET.SubElement (linea, 'color').text = '\n' + color + '\n'
        ET.SubElement (linea, 'width').text = '\n' + ancho + '\n'

    def escribir(self,nombreArchivoKML):
        """
        Escribe el archivo KML con declaración y codificación
        """
        arbol = ET.ElementTree(self.raiz)
        arbol.write(nombreArchivoKML, encoding='utf-8', xml_declaration=True)

    def ver(self):
        """
        Muestra el archivo KML. Se utiliza para depurar
        """
        print("\nElemento raiz = ", self.raiz.tag)

        if self.raiz.text != None:
            print("Contenido = "    , self.raiz.text.strip('\n')) #strip() elimina los '\n' del string
        else:
            print("Contenido = "    , self.raiz.text)

        print("Atributos = "    , self.raiz.attrib)

        # Recorrido de los elementos del árbol
        for hijo in self.raiz.findall('.//'): # Expresión XPath
            print("\nElemento = " , hijo.tag)
            if hijo.text != None:
                print("Contenido = ", hijo.text.strip('\n')) #strip() elimina los '\n' del string
            else:
                print("Contenido = ", hijo.text)
            print("Atributos = ", hijo.attrib)

def xPath(nombreXML):
    NAMESPACE = {'uniovi': 'http://www.uniovi.es'}
    try:
        arbol = ET.parse(nombreXML)
        raiz = arbol.getroot()
        Longitudes=[]
        Latitutdes=[]
        Altitudes=[]

        #print("Raíz del documento XML:", raiz.tag)


        for tramo in raiz.findall(".//uniovi:tramo", NAMESPACE):
            #print("Atributos del tramo: ", tramo.attrib)


            coordenada = tramo.find("uniovi:coordenada", NAMESPACE)
            if coordenada is not None:
                #print("Coordenadas del tramo:")
                #print(" Longitud:", coordenada.get("longitud"))
                #print(" Latitud:", coordenada.get("latitud"))
                #print(" Altitud:", coordenada.get("altitud"))
                Longitudes.append(coordenada.get("longitud"))
                Latitutdes.append(coordenada.get("latitud"))
                Altitudes.append(coordenada.get("altitud"))

        return Longitudes,Latitutdes,Altitudes
    except IOError:
        print('No se encuentra el archivo ', nombreXML)
        exit()
    except ET.ParseError:
        print("Error procesando el archivo XML = ", nombreXML)
        exit()


def main():
    nombreXML=input('Introduzca el nombre del archivo XML = ')
    Longitudes,Latitudes,Altitudes = xPath(nombreXML)

    """Prueba unitaria de la clase Kml"""

    """nombreKML = input('Introduzca el nombre del archivo KML = ') """

    nombreKML = "circuito.kml"

    nuevoKML = Kml()
    cont = 1
    for lon, lat, alt in zip(Longitudes, Latitudes, Altitudes):
        nuevoKML.addPlacemark(
            'Tramo '+str(cont),
            'Punto del tramo del circuito',
            lon, lat, alt,
            'relativeToGround'
        )
        #print(cont)
        cont+=1

    coordenadasCircuito = "\n".join(
        "{},{},{}".format(lon, lat, alt)
        for lon, lat, alt in zip(Longitudes, Latitudes, Altitudes)
    )


    nuevoKML.addLineString(
        "Recorrido del Circuito", "1", "1", coordenadasCircuito,
        'relativeToGround', '#ff0000ff', "5"
    )


    """Visualización del KML creado"""
    #nuevoKML.ver()

    """Creación del archivo en formato KML"""
    nuevoKML.escribir(nombreKML)
    print("Creado el archivo: ", nombreKML)

if __name__ == "__main__":
    main()


