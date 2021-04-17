import React from "react";
import { IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import "./style.css";

export class Inicio extends React.Component {
  render() {
    return (
      <div style={{ minWidth: "100%" }}>
        <FullInicio props={this.props} />
      </div>
    );
  }
}

export default function FullInicio({ props }) {
  const mostrarRegistro = () => {
    const container = document.querySelector(".container");
    container.classList.add("sign-up-mode");
    //container.classList.remove("sign-up-mode");
  };
  const mostrarLogin = () => {
    const container = document.querySelector(".container");
    //container.classList.add("sign-up-mode");
    container.classList.remove("sign-up-mode");
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <div className="form sign-in-form">
            <h2 className="title">Ingresar</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <button className="btn" onClick={() => {}}>
              Ingresar
            </button>

            <p className="social-text">
              O ingresa utilizando la camara
              <IconButton color="primary">
                <PhotoCamera />
              </IconButton>
            </p>
          </div>
          <div className="form sign-up-form">
            <h2 className="title">Registro</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <button className="btn" onClick={() => {}}>
              Ingresar
            </button>
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Aun no posees una cuenta?</h3>
            <p>Registrate ahora mismo para estar informado</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={mostrarRegistro}
            >
              Registrarse
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Ya posees una cuenta ?</h3>
            <p>Utiliza tus credenciales para ingresar</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={mostrarLogin}
            >
              Ingresar
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
