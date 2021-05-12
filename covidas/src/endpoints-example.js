/*  este es el ejemplo de como se encuentra 
    hecho el archivo "endpoints.js"
    el cual no se encuentra en el repositorio 
    por motivos de seguridad
*/

const ip = "http://localhost:3030/api";
module.exports = {
  //registrar usuario
  postRegistro: ip + "/Registro",
  //ingresar con un usuario
  postLoginDatos: ip + "/LoginDatos",
  //ingresar mediante la camara
  postLoginFoto: ip + "/LoginFoto",
  //listado de albums y fotos
  getAlbumsFotos: ip + "/ListaAlbumsFotos",
  //listado de albums
  getAlbums: ip + "/listaAlbums",
  //traducir un texto
  getTraduccion: ip + "/Traducir/",
  //subir imagen a un album
  postImagen: ip + "/InsertarImagen/",
  //subir e identificar rostros
  postImagenCovid: ip + "/InsertarImagenCovid/",
  //crear album
  postInsertarAlbum: ip + "/InsertarAlbum/",
  //eliminar album
  postDeleteAlbum: ip + "/EliminarAlbum/",
};
