
let cuentas = [
    {nombre: "Ana Villanueva", saldo: 300, password:'123'},
    {nombre: "Sugeily Cruz", saldo: 500, password:'123'},
    {nombre: "Fernanda Vidkar", saldo: 800, password:'123'}
];

let nombre, saldoInicial, saldoActual

let consultar = document.getElementById('btnConsultar')
let depositar = document.getElementById('btnDepositar')
let boton = document.getElementById('botonIngresar')

if (boton) boton.addEventListener('click', login)
if (!boton) nomUsuario()

if (consultar) consultar.addEventListener('click', consultarSaldo)
if (depositar) depositar.addEventListener('click', depositarMonto)

function mostrarCajero() { 
    location.href = 'cajero.html' 
}

function mostrarInicio() { 
    location.href = 'index.html' 
}

function vaciarSaldo() { 
    document.getElementById('saldo').innerHTML = ('') 
}

function vaciarInputDepositar() { 
    document.getElementById('depositar').value = ('') 
}

function vaciarInputRetirar() { 
    document.getElementById('retirar').value = ('') 
}

function vaciarTransaccion() {
    document.getElementById('transaccion').innerHTML = ('')
    document.getElementById('nuevoSaldo').innerHTML = ('')
}

function vaciarAlertas() {
    document.getElementById('alerta').innerHTML = ('')
    document.getElementById('alertaSaldo').innerHTML = ('')
    document.getElementById('alertaTransaccion').innerHTML = ('')
}

function vaciarAlerta2y3() {
    document.getElementById('alertaSaldo').innerHTML = ('')
    document.getElementById('alertaTransaccion').innerHTML = ('')
}
function vaciarSaldoAlertaTransaccion(){
    vaciarAlerta2y3()
    vaciarSaldo()
    vaciarTransaccion()
}


function login() {

    const usuario = document.getElementById('usuario').value
    const contraseña = document.getElementById('contraseña').value


    for (let i = 0; i < cuentas.length; i++) {

        if(usuario == cuentas[i].nombre && contraseña == cuentas[i].password){
            mostrarCajero()
            nombre = usuario
            localStorage.setItem('saludo', nombre)
            saldoInicial = cuentas[i].saldo
            localStorage.setItem('saldo', saldoInicial)
        }
        else{
            document.getElementById('alerta').innerHTML = ('Usuario o contraseña incorrectoss')
        }
    } 
}

saldoActual = localStorage.getItem('saldo')

function nomUsuario() {
    let nombreUsuario = localStorage.getItem('saludo')
    document.getElementById('saludo').innerHTML = ('Bienvenido/a ' + nombreUsuario)
}

function consultarSaldo() {
    document.getElementById('saldo').innerHTML = ("Saldo: $" + saldoActual)
    vaciarInputDepositar()
    vaciarInputRetirar()
    vaciarAlertas()
    vaciarTransaccion()
}

function depositarMonto() {
    let monto = document.getElementById('depositar').value
    let deposito = parseFloat(monto)
    let saldoMasDeposito = deposito + parseFloat(saldoActual)

    vaciarInputRetirar()

    if (monto === '') {
        document.getElementById('alerta').innerHTML = ('Escriba el monto a depositar')
    vaciarSaldoAlertaTransaccion()
    }
    else if (deposito <= 0) {
        document.getElementById('alerta').innerHTML = ('Ingrese una cantidad válida')
        vaciarSaldo()
        vaciarTransaccion()
    }
    else if (saldoMasDeposito > 990) {
        document.getElementById('alerta').innerHTML = ('Lo lamento, no puede tener más de $990 en su cuenta')
        document.getElementById('alertaSaldo').innerHTML = ('Saldo actual: $' + saldoActual)
        document.getElementById('alertaTransaccion').innerHTML = (' Error en la transacción: depósito de $' + deposito)
        vaciarInputDepositar()
        vaciarSaldo()
        vaciarTransaccion()
    }
    else {
        vaciarAlertas()
        saldoActual = saldoMasDeposito
        document.getElementById('transaccion').innerHTML = ("Depósito de: $" + deposito)
        document.getElementById('nuevoSaldo').innerHTML = ("Saldo actual: $" + saldoActual)
        vaciarInputDepositar()
        vaciarSaldo()
    }
}
function retirarMonto() {
    let cantidad = document.getElementById('retirar').value
    let retiro = parseFloat(cantidad)
    let saldoMenosRetiro = saldoActual - retiro

    vaciarInputDepositar()

    if (cantidad === '') {
        document.getElementById('alerta').innerHTML = ('Escriba el monto a retirar')
        vaciarSaldoAlertaTransaccion()
    }
    else if (retiro <= 0) {
        vaciarSaldoAlertaTransaccion()
        document.getElementById('alerta').innerHTML = ('Ingrese una cantidad válida')
    }
    else if (saldoActual < retiro) {
        document.getElementById('alerta').innerHTML = ('No cuenta con esa cantidad para retirar')
        vaciarSaldoAlertaTransaccion()
    }
    else if (saldoMenosRetiro < 10) {
        vaciarInputRetirar()
        document.getElementById('alerta').innerHTML = ('No puede tener menos de $10 en cuenta')
        document.getElementById('alertaSaldo').innerHTML = ('Saldo actual: $' + saldoActual)
        document.getElementById('alertaTransaccion').innerHTML = (' Error en la transaccion: retiro de $' + retiro)
        vaciarSaldo()
        vaciarTransaccion()
    }
    else {
        vaciarInputRetirar()
        saldoActual = saldoMenosRetiro
        document.getElementById('transaccion').innerHTML = ("Retiro de: $" + retiro)
        document.getElementById('nuevoSaldo').innerHTML = ("Saldo actual: $" + saldoActual)
        vaciarAlertas()
        vaciarSaldo()
    }
}
