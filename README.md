# Web Starter #

**Instalar Gulp:**

$ npm install -g gulp

**Iniciar el proyecto, ejecutar:**

$ npm init

**Instalar aplicaciones para OSX**

Instalar 

Bower:
$ npm install -g bower

pngquant:
https://pngquant.org/ o Instalar desde Brew: 
$ brew install pngquant

Imagemagik:
$ brew install imagemagick

Graphics Magik
$ brew install graphicsmagick

**Instalar dependencias de Gulp**

$ npm install --save-dev gulp gulp-jade gulp-stylus nib browser-sync gulp-imagemin gulp-concat gulp-uglify jshint-stylish gulp-jshint gulp-newer gulp-pngmin bower gulp-util gulp-plumber gulp.spritesmith gulp-image-resize gulp-iconfont gulp-iconfont-css

**Instalar dependencias de Bower**

$ bower install

**Para trabajar, syncronizar y actualizar los cambios en el browser usar:**

$ gulp

**Para publicar el proyecto usar:**
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


## Editar el source/jade/template/-config.jade ##
**Para configurar las variables del JADE**
jade/-config.jade