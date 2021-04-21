class Credenciales {
  constructor() {
    this.authenticated = false;
    this.host = "localhost";
    //variables Register-------
    this.PerfilDefault =
      "https://i.pinimg.com/236x/d2/28/71/d22871b6c9e94e1d973663bbe1d0b276.jpg";
  }
  login(user) {
    window.localStorage.setItem("user", JSON.stringify(user));
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
    window.localStorage.clear();
  }

  isAuthenticated() {
    return JSON.parse(window.localStorage.getItem("user"));
  }
}

export default new Credenciales();
