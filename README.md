# **Web Starter** #

## Instalar aplicaciones para OSX ##

Aplicativos para la compresión de imágenes.

**pngquant**:
Instalar desde Brew: 

```
#!bash

$ brew install pngquant
```


**Imagemagik:**

```
#!bash

$ brew install imagemagick

```

**Graphics Magik**

```
#!bash

$ brew install graphicsmagick
```


## Instalar Dependencias: ##


```
#!node

$ npm install
```


**Iniciar el proyecto, ejecutar:**

$ npm init


**Para trabajar, syncronizar y actualizar los cambios en el browser usar:**

$ gulp

**Para publicar el proyecto de modo comprimido usar:**
$ gulp deploy

**Para usar una tarea específica**

$ gulp NombreDelTask (revisar gulpfile.js)

**Creación automatizada de sprites:**

Se deben colocar las imágenes que serán sprites en la carpeta:
source/image/sprite

Para utilizarlos hay que utilizar el Mixin dentro de la clase que cargará el sprite, de la siguiente manera:
sprite(spr-nombreDelArchivo)

El task "sprite" genera los estilos de forma automatizada (sprite.styl) que se importa en el style.styl
el archivo en la raiz: stylus.template.mustache.
Se utiliza para generar los estilos del sprite.
Para facilitar el uso hay que utilizar los mixins en mixin.styl, utilizando el mixin: sprite($sprite) ($sprite será el nombre del sprite generado de forma automatizada en sprite.styl).

Importante: Los sprites cogeran el nombre del estilo según el nombre del mismo archivo agregandol un prefijo (spr).

**Media Queries con Rupture:**

**Creación automatizada de iconFonts:**
Los íconos son los de FontAwesome.
Solo se necesita agregar la clase de la siguiente manera:

.icof-elNombreDelIcono 


[Buscador de íconos](http://fortawesome.github.io/Font-Awesome/icons/)

## Editar el source/jade/template/-config.jade ##
**Para configurar las variables del JADE**
jade/-config.jade