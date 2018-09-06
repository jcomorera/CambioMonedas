function Moneda(moneda, dinero, tipo) {
		this.moneda = moneda;
		this.dinero = dinero;
		this.cantidad = 0;
		this.tipo = tipo;
}

var monedas = [];

function generarMonedas() {
	monedas.push(new Moneda("500€", 500.00, "billete"));
	monedas.push(new Moneda("200€", 200.00, "billete"));
	monedas.push(new Moneda("100€", 100.00, "billete"));
	monedas.push(new Moneda("50€", 50.00, "billete"));
	monedas.push(new Moneda("20€", 20.00, "billete"));
	monedas.push(new Moneda("10€", 10.00, "billete"));
	monedas.push(new Moneda("5€", 5.00, "billete"));
	monedas.push(new Moneda("2€", 2.00, "moneda"));
	monedas.push(new Moneda("1€", 1.00, "moneda"));
	monedas.push(new Moneda("50ct", 0.50, "moneda"));
	monedas.push(new Moneda("20ct", 0.20, "moneda"));
	monedas.push(new Moneda("10ct", 0.10, "moneda"));
	monedas.push(new Moneda("5ct", 0.05, "moneda"));
	monedas.push(new Moneda("2ct", 0.02, "moneda"));
	monedas.push(new Moneda("1ct", 0.01, "moneda"));
}

function calcularCambio(precio, pagado) {
	return Math.round((pagado - precio) * 100) / 100;
}

function calcularMonedasCambio(cambio){
	let monedasCambio = [];
	let cambioRestante = cambio;
	let i = 0;
	let j = 0;

	while (i < monedas.length || cambioRestante > 0) {
		if (cambioRestante >= monedas[i].dinero) {
			cambioRestante -= monedas[i].dinero;
			cambioRestante = Math.round(cambioRestante * 100) / 100;
			j++;
		} else {
			if (j > 0) {
				monedas[i].cantidad = j;
				monedasCambio.push(monedas[i]);
			}
			i++;
			j = 0;
		}
	}

	return monedasCambio;

}

function obtenerCambio(precio, pagado){
	generarMonedas();
	let cambio = calcularCambio(precio, pagado);
	let monedasCambio = calcularMonedasCambio(cambio);

	return monedasCambio;
}

function mostrar(){
	let precio = document.getElementById("precio").value;
	let pagado = document.getElementById("pagado").value;
	let cambio = calcularCambio(precio, pagado);

	document.getElementById("resultado").innerHTML = "";

	if(cambio > 0){
		document.getElementById("cambio").innerHTML = "Cambio: " + cambio + "€";

		let monedasCambio = obtenerCambio(precio, pagado);
		console.log(monedasCambio);

		for (var i = 0; i < monedasCambio.length; i++) {
			if (monedasCambio[i].cantidad > 1){
				monedasCambio[i].tipo += "s";
			}
			document.getElementById("resultado").innerHTML += monedasCambio[i].cantidad + " " + monedasCambio[i].tipo + " de " + monedasCambio[i].moneda + "</br>";
		}	
	}else{
		document.getElementById("cambio").innerHTML = "No hay cambio!";
	}
}
