## **Instalar aplicaciones para OSX** ##

Aplicativos para la compresión de imágenes.

**pngquant**:

```
$ brew install pngquant
```

**Imagemagik:**

```
$ brew install imagemagick
```

**Graphics Magik**

```
$ brew install graphicsmagick
```


## **Instalar Dependencias** ##


```
$ npm install
```


## **Inicializar el proyecto** ##


```
$ npm init
```


## **Trabajar, syncronizar y actualizar los cambios en el browser** ##

** Para Sincronizar HTML, CSS y JS:**
```
$ gulp
```

**Para compilar las imágenes:**
```
$ gulp images
```

**Para optimizar imágenes:**
```
$ gulp optimize
```

**Para crear sprite:**
```
$ gulp sprite
```

**Para convertir los SVG a Fuentes:**
```
$ gulp iconfont
```

**Para usar una tarea específica**


```
$ gulp NombreDelTask 
```


(revisar gulpfile.js)

## **Creación automatizada de sprites:** ##

**Se deben colocar solo las imágenes que serán sprites en la carpeta:**


```
source/image/sprite
```

Para utilizarlos hay que utilizar el Mixin dentro de la clase que cargará el sprite, de la siguiente manera:


```
sprite(spr-nombreDelArchivo)
```


El task "sprite" genera los estilos de forma automatizada (sprite.styl) que se importa en el style.styl
el archivo en la raiz: stylus.template.mustache.
Se utiliza para generar los estilos del sprite.
Para facilitar el uso hay que utilizar los mixins en mixin.styl, utilizando el mixin: sprite($sprite) ($sprite será el nombre del sprite generado de forma automatizada en sprite.styl).


## **Media Queries con Rupture** ##

Revisar documentación:

[Rupture](https://github.com/jenius/rupture)

## **IconFonts** ##

**Iconos de FontAwesome**
Hay íconos pre-cargados de FontAwesome. Dentro de la carpeta:


```
source/svg/icons
```

Solo se necesita agregar la clase de la siguiente manera en JADE:

```
.icof-elNombreDelIcono 
```

[Buscador de íconos](http://fortawesome.github.io/Font-Awesome/icons/)

**Iconos nuevos**

Para agregar iconos nuevos, solo se deben agregar dentro de una carpeta para poder ordenarlos.

## **HTML/JADE** ##
**Para configurar las variables del JADE, de descipción, código de analitycs y otros metas.**
**Editar el source/jade/template/-config.jade**

```
jade/-config.jade
```