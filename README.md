## Documentation (TODO) ##
__________________________

## **OSX installation and requirements** ##

**Install [nodeJS](https://nodejs.org/en/)**
```
Node JS must be installed
```

**Install [Gulp](http://gulpjs.com/)**
```
$ npm install gulp -g
```

**Install dependencies**
```
$ npm install
```

**[pngquant](https://pngquant.org/)**
```
$ brew install pngquant
```

**[ImageMagik](http://imagemagick.org/script/index.php)**
```
$ brew install imagemagick
```

**[Graphics Magik](http://www.graphicsmagick.org/)**
```
$ brew install graphicsmagick
```

## **Gulp Tasks** ##

** Development:**
It will watch all changes done and push them into the browser at http://localhost:3000
```
$ gulp
```

** Production:**
How to compile for producction.
```
$ gulp --env=production
```

## **Sprite Generator:** ##

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

# This project has been inspired on:
____________________________________

- [Viget Labs - Gulp Starter](https://github.com/vigetlabs/gulp-starter)
- [Frontend Labs](http://frontendlabs.io/)
- [Trần Xuân Trường - Blog](https://truongtx.me/2014/08/06/using-watchify-with-gulp-for-fast-browserify-build/)
