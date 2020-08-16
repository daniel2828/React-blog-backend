var coche = {
  modelo: "Mercedes clase A",
  maxima: 500,
  antiguedad: 200,
  mostrarDatos() {
    console.log(this.modelo, this.maxima, this.antiguedad);
  },
};
class Vehiculo {
  constructor(modelo, velocidad, antiguedad) {
    this.modelo = modelo;
    this.velocidad = velocidad;
    this.antiguedad = antiguedad;
  }
  aumentarVelocidad() {
    this.velocidad += 1;
  }
  reducirVelocidad() {
    this.velocidad -= 1;
  }
}
class Coche extends Vehiculo {
  constructor(modelo, velocidad, antiguedad) {
    super(modelo, velocidad, antiguedad);
  }
}
var saludar = new Promise((resolve, reject) => {
  setTimeout(() => {
    let saludo = "Hola muy buenas a todos chavales";
    saludo = false;
    if (saludo) {
      resolve(saludo);
    } else {
      reject("no hay saludo disponible");
    }
  }, 2000);
});
saludar
  .then((resultado) => {
    alert(resultado);
  })
  .catch((err) => {
    alert(err);
  });
var coche1 = new Coche("hola", 1, "hola");
console.log(coche1.velocidad);
