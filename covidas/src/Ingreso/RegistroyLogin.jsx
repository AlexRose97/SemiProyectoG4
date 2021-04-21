import React from "react";
import { Button, IconButton, TextField } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import Swal from "sweetalert2";
import "./style.css";
import imgLogin from "./img/log.svg";
import imgRegistro from "./img/register.svg";
import Credenciales from "../Sesion/Credenciales";

export class RegistroyLogin extends React.Component {
  render() {
    return (
      <div style={{ minWidth: "100%" }}>
        <FullInicio props={this.props} />
      </div>
    );
  }
}

//const errorTXT = { user: "", password: "" };
export default function FullInicio({ props }) {
  //variables
  const [fperfil, setfperfil] = React.useState(Credenciales.PerfilDefault);
  const [fcargada, setfcargada] = React.useState(false);
  const [txtuser, settxtuser] = React.useState("");
  const [txtpass, settxtpass] = React.useState("");
  const [txtuserR, settxtuserR] = React.useState("");
  const [txtpassR1, settxtpassR1] = React.useState("");
  const [txtpassR2, settxtpassR2] = React.useState("");
  const [errorTXT, seterrorTXT] = React.useState({
    user: "",
    password: "",
    userR: "",
    passR1: "",
    passR2: "",
  });

  //------------evitar entrar al registro/login al tener session
  React.useEffect(() => {
    if (Credenciales.isAuthenticated()) {
      //console.log("logueado")
      props.history.push("/Inicio");
    } else {
      //console.log("no logueado")
    }
  }, []);

  //------------metodo para cargar fotos
  const metodoFoto = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setfperfil(reader.result);
        setfcargada(true);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //--------------Metodo para registrar
  const metodoRegistrar = () => {
    //mostrar todos los mensajes, los metodos retornan true/false
    validarInput(txtuserR, "userR");
    validarInput(txtpassR1, "passR1");
    validarInput(txtpassR2, "passR2");
    if (
      validarInput(txtuserR, "userR") &&
      validarInput(txtpassR1, "passR1") &&
      validarInput(txtpassR2, "passR2")
    ) {
      if (txtpassR1 == txtpassR2) {
      } else {
        Swal.fire({
          title: "Error!",
          text: "Las Contraseñas No Coinciden",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Completa los Campos Obligatorios",
        icon: "error",
      });
    }
  };
  //--------------Metodo para el login
  const metodoIngresar = () => {
    //mostrar todos los mensajes
    validarInput(txtuser, "user");
    validarInput(txtpass, "password");
    if (validarInput(txtuser, "user") && validarInput(txtpass, "password")) {
      /*
    //crear el json de session
    const session = {
      idUser: 1,
      nombre: "Alex",
    };
    //guardar sesion en el localStorage
    Credenciales.login(session);
    console.log(Credenciales.isAuthenticated());
    //navegar hacia el inicio
    props.history.push("/Inicio");

    */
    } else {
      Swal.fire({
        title: "Error!",
        text: "Completa los Campos Obligatorios",
        icon: "error",
      });
    }
  };

  //--------------Tomar valores y validar Campos llenos
  const inputChange = (e) => {
    let { id, value } = e.target;
    if (id === "user") {
      settxtuser(value);
      validarInput(value, "user");
    } else if (id === "password") {
      settxtpass(value);
      validarInput(value, "password");
    } else if (id === "passR1") {
      settxtpassR1(value);
      validarInput(value, "passR1");
    } else if (id === "passR2") {
      settxtpassR2(value);
      validarInput(value, "passR2");
    } else if (id === "userR") {
      settxtuserR(value);
      validarInput(value, "userR");
    }
  };
  const validarInput = (valor, campo) => {
    errorTXT[campo] = "";
    var result = true;
    if (valor === "") {
      errorTXT[campo] = "Información Requerida";
      result = false;
    }
    //modificar el estado del json
    seterrorTXT({ ...errorTXT });
    return result;
  };

  //--------------Funciones que permiten cambiar entre login/registro
  const mostrarRegistro = () => {
    const container = document.querySelector(".container");
    container.classList.add("sign-up-mode");
  };
  const mostrarLogin = () => {
    const container = document.querySelector(".container");
    container.classList.remove("sign-up-mode");
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <div className="form sign-in-form">
            <h2 className="title">Ingresar</h2>
            <TextField
              className="input-field"
              id="user"
              label="Usuario"
              margin="normal"
              variant="outlined"
              value={txtuser}
              onChange={inputChange}
              required
              error={errorTXT.user.length != 0}
              helperText={errorTXT.user}
            />
            <TextField
              id="password"
              type="password"
              label="Contraseña"
              className="input-field"
              margin="normal"
              variant="outlined"
              value={txtpass}
              onChange={inputChange}
              required
              error={errorTXT.password.length != 0}
              helperText={errorTXT.password}
            />
            <button className="btn" onClick={metodoIngresar}>
              Ingresar
            </button>

            <p className="social-text">
              O ingresa utilizando la camara
              <IconButton color="primary" style={{ color: "#17a178" }}>
                <PhotoCamera />
              </IconButton>
            </p>
          </div>
          <div className="form sign-up-form">
            <h2 className="title">Registro</h2>
            <div
              style={{
                width: 300,
                height: 200,
                backgroundImage: "url(" + fperfil + ")",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                display: "flex",
                flexFlow: "wrap",
                justifyContent: "center",
                alignContent: "flex-end",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={metodoFoto}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<PhotoCamera />}
                >
                  Cargar Foto
                </Button>
              </label>

              <div style={{ width: "60%" }}></div>
            </div>
            <TextField
              className="input-field"
              id="userR"
              label="Usuario"
              margin="normal"
              variant="outlined"
              value={txtuserR}
              onChange={inputChange}
              required
              error={errorTXT.userR.length != 0}
              helperText={errorTXT.userR}
            />
            <TextField
              className="input-field"
              id="passR1"
              label="Password"
              margin="normal"
              variant="outlined"
              value={txtpassR1}
              onChange={inputChange}
              required
              error={errorTXT.passR1.length != 0}
              helperText={errorTXT.passR1}
            />
            <TextField
              className="input-field"
              id="passR2"
              label="Password"
              margin="normal"
              variant="outlined"
              value={txtpassR2}
              onChange={inputChange}
              required
              error={errorTXT.passR2.length != 0}
              helperText={errorTXT.passR2}
            />
            <button className="btn" onClick={metodoRegistrar}>
              Guardar
            </button>
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Aún no posees una cuenta?</h3>
            <p>Registrate ahora mismo para estar informado</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={mostrarRegistro}
            >
              Registrarse
            </button>
          </div>
          <img src={imgLogin} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>¿Ya posees una cuenta?</h3>
            <p>Utiliza tus credenciales para ingresar</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={mostrarLogin}
            >
              Ingresar
            </button>
          </div>
          <img src={imgRegistro} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
