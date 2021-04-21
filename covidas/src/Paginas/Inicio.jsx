import React from "react";
import Navbar from "../Navbar/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Credenciales from "../Sesion/Credenciales";

export class Inicio extends React.Component {
  render() {
    return (
      <div style={{ minWidth: "100%" }}>
        <Navbar
          props={this.props}
          tituloP={"Inicio"}
          foto={Credenciales.PerfilDefault}
          //colorB="#c02748"
          //colorB="#ffa600"
        />
        <FullInicio props={this.props} />
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  photo: {
    maxWidth: 300,
    maxHeight: 300,
    //borderRadius: "50%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    display: "none",
  },
}));

export default function FullInicio({ props }) {
  const classes = useStyles();
  const [newfoto, setnewfoto] = React.useState(Credenciales.PerfilDefault);
  const [fcargada, setfcargada] = React.useState(false);
  //--------------------------- cargar foto
  const CargarFoto = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setnewfoto(reader.result);
        setfcargada(true);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={classes.root}>
      <h1>hola</h1>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
    </div>
  );
}
