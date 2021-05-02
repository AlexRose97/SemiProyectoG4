import React from "react";
import Navbar from "../Navbar/Navbar";
import {
  makeStyles,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  GridList,
  GridListTile,
  GridListTileBar,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import Swal from "sweetalert2";
import Credenciales from "../Sesion/Credenciales";
import { getAlbums, getTraduccion } from "../endpoints";

export class Albums extends React.Component {
  render() {
    return (
      <div style={{ minWidth: "100%" }}>
        <FullAlbums props={this.props} />
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "center",
  },
  gridList: {
    width: "70%",
    height: "200px",
  },
  containerList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  itemList: {
    minWidth: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  potho: {
    maxWidth: 200,
    maxHeight: 200,
  },
}));

export default function FullAlbums({ props }) {
  const classes = useStyles();
  //obtener datos de la session
  const [session, setsession] = React.useState(Credenciales.isAuthenticated());

  //-----------agregar color de barra por estado
  const colorEstado = () => {
    if (session.estado === 1) {
      return "#ffa600";
    } else if (session.estado === 2) {
      return "#c02748";
    } else {
      return "";
    }
  };

  const [consulta, setconsulta] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [infoIMG, setinfoIMG] = React.useState([]);
  const [idiomatxt, setidiomatxt] = React.useState("");

  //---------------Cargar albumnes al mostrar pagina
  var data = { usuario: "cristel" };
  React.useEffect(() => {
    fetch(getAlbums, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .then((json) => {
        //console.log(json);
        setconsulta(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const GenerarFotos = (listFots) => {
    const tileData = [];
    if (listFots !== undefined) {
      for (let index = 0; index < listFots.length; index++) {
        tileData.push({
          img: listFots[index].urlfoto,
          title: listFots[index].nombre,
          author: Credenciales.User,
          descripcion: listFots[index].descripcion,
          cols: 1,
        });
      }
    }
    return tileData;
  };
  const GenerarAlbums = () => {
    const nuevoAlbums = [];
    for (let index = 0; index < consulta.length; index++) {
      const listFots = consulta[index].listF;
      const tileData = GenerarFotos(listFots);
      nuevoAlbums.push(
        <Grid item xs={12} key={index}>
          <h2>Album {consulta[index].nombre}</h2>
          <div className={classes.containerList}>
            <GridList className={classes.gridList} cols={3}>
              {tileData.map((tile) => (
                <GridListTile
                  key={String(tile.img)}
                  className={classes.itemList}
                >
                  <Paper>
                    <img
                      src={tile.img}
                      alt={tile.title}
                      className={classes.potho}
                      onClick={() => {
                        MostarFoto(tile);
                      }}
                    />
                    <GridListTileBar title={tile.title} />
                  </Paper>
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Grid>
      );
    }
    return nuevoAlbums;
  };

  const MostarFoto = (infoFoto) => {
    setinfoIMG(infoFoto);
    setOpen(true);
  };

  //cerrar cuadro emergente de fotos
  const handleClose = () => {
    setOpen(false);
  };

  //seleccionar el item/idioma
  const selecIdioma = (event) => {
    const name = event.target.value;
    setidiomatxt(name);
  };
  //---------------traducir descripcion
  const traducirInfo = () => {
    setOpen(false);
    if (idiomatxt !== "") {
      var data = {
        idioma: idiomatxt,
        texto: infoIMG.descripcion,
      };
      fetch(getTraduccion, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json2) => {
          return json2;
        })
        .then((json2) => {
          if (json2.status === 200) {
            Swal.fire({
              title: idiomatxt,
              text: json2.texto,
              icon: "success",
            }).then((result) => {
              setOpen(true);
            });
          } else {
            Swal.fire({
              title: idiomatxt,
              text: json2.msg,
              icon: "error",
            }).then((result) => {
              setOpen(true);
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Debes Seleccionar Un Idioma",
        icon: "error",
      }).then((result) => {
        setOpen(true);
      });
    }
    setidiomatxt("");
  };

  return (
    <div className={classes.root}>
      <Navbar
        props={props}
        tituloP={"Albums"}
        foto={Credenciales.isAuthenticated().foto}
        colorB={colorEstado()}
      />
      <Grid container spacing={4}>
        {GenerarAlbums()}
      </Grid>
      <Dialog onClose={handleClose} open={open} scroll={"paper"}>
        <DialogTitle onClose={handleClose} style={{ textAlign: "center" }}>
          {infoIMG.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom align={"center"}>
            <img
              src={infoIMG.img}
              style={{ maxWidth: "100%", maxHeight: 500 }}
              alt={""}
            />
          </Typography>
          <Typography gutterBottom>{infoIMG.descripcion}</Typography>
          <Typography gutterBottom component="div" align={"center"}>
            <Select
              native
              onChange={selecIdioma}
              defaultValue={idiomatxt}
              inputProps={{
                name: "age",
                id: "filled-age-native-simple",
              }}
            >
              <option aria-label="None" value="">
                Seleccionar idioma...
              </option>
              <option value={"Ingles"}>Ingles</option>
              <option value={"Español"}>Español</option>
              <option value={"Ruso"}>Ruso</option>
            </Select>
            <Button variant="contained" color="primary" onClick={traducirInfo}>
              Traducir
            </Button>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            variant="contained"
            color="secondary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
