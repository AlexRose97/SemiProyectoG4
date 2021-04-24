import React from "react";
import Navbar from "../Navbar/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Credenciales from "../Sesion/Credenciales";

export class Ayuda extends React.Component {
  render() {
    return (
      <div style={{ minWidth: "100%" }}>
        <FullAyuda props={this.props} />
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

export default function FullAyuda({ props }) {
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

  return (
    <div className={classes.root}>
      <Navbar
        props={props}
        tituloP={"Ayuda"}
        foto={Credenciales.isAuthenticated().foto}
        colorB={colorEstado()}
      />
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
