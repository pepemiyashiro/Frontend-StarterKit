# Web Starter #

**Instalar Dependencias:**

$ npm install

**Iniciar el proyecto, ejecutar:**

$ npm init

**Instalar aplicaciones para OSX**


Aplicativos para la compresión de imágenes.
pngquant:
https://pngquant.org/ o Instalar desde Brew: 
$ brew install pngquant

Imagemagik:
$ brew install imagemagick

Graphics Magik
$ brew install graphicsmagick


**Instalar dependencias de Browserify**

$ npm install LaDependencia

**Para trabajar, syncronizar y actualizar los cambios en el browser usar:**

$ gulp

**Para publicar el proyecto de modo comprimido usar:**
$ gulp deploy

**Para usar una tarea específica**

$ gulp NombreDelTask (revisar gulpfile.js)

**Creación automatizada de sprites:**

Se deben colocar las imágenes que serán sprites en la carpeta:
source/image/sprite

El task "sprite" genera los estilos de forma automatizada (sprite.styl) que se importa en el style.styl
el archivo en la raiz: stylus.template.mustache.
Se utiliza para generar los estilos del sprite.
Para facilitar el uso hay que utilizar los mixins en mixin.styl, utilizando el mixin: sprite($sprite) ($sprite será el nombre del sprite generado de forma automatizada en sprite.styl).

Importante: Los sprites cogeran el nombre del estilo según el nombre del mismo archivo agregandol un prefijo (spr).

**Media Queries con Rupture:**

## Editar el source/jade/template/-config.jade ##
**Para configurar las variables del JADE**
jade/-config.jade