// Guía 3: Modelar el objeto Reserva

const Reserva = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
}

// Desarrollar la funcionalidad que calcule el precio base de una reserva
// El precio base de una reserva es igual a la cantidad de personas por el precio por persona.

Reserva.prototype.precioBase = function(){
    return this.cantidadPersonas * this.precioPersona;
}
    

Reserva.prototype.precioTotal = function(){
    const precioBase = this.precioBase();
    const adicional = this.adicionales(precioBase);
    const descuento = this.descuentos(precioBase);
    return precioBase + adicional - descuento;
}


// ADICIONALES

Reserva.prototype.adicionales = function(precioBase){
    return this.adicionalFinDeSemana(precioBase) + this.adicionalHorario(precioBase);
}

// Date.prototype.getUTCDay()
// Returns the day of the week (0-6) in the specified date according to universal time.

// Date.prototype.getHours()
// Returns the hour (0-23) in the specified date according to local time.

// Date.prototype.getMinutes()
// Returns the minutes (0-59) in the specified date according to local time.

Reserva.prototype.adicionalFinDeSemana = function(precioBase) {
    const diaSemana = this.horario.getUTCDay();
    console.log(diaSemana)
    // 0 5 y 6 corresponden a Viernes, Sabado y Domingo donde se habilita un 10% adicional
    if (diaSemana === 0 || diaSemana === 5 || diaSemana === 6){
        return precioBase * .10;
    };
    return 0;
}

Reserva.prototype.adicionalHorario = function(precioBase) {
    const minutos = (this.horario.getHours() * 60) + this.horario.getMinutes();
    console.log(minutos)
    // Se le agrega un 5% adicional si el horario de reserva es 13 a 14 o de 20 a 21 
    if ((minutos >= 780 && minutos < 840) || (minutos >= 1200 && minutos < 1260)){
        return precioBase * .05;
    };
    return 0;
}


// DESCUENTOS

Reserva.prototype.descuentos = function(precioBase) {
    return this.descuentosGrupo(precioBase) + this.descuentosCodigo(precioBase);
}

Reserva.prototype.descuentosGrupo = function(precioBase) {
    let descuento = 0;
    // Descuentos: entre 4 y 6 personas, 5% de descuento. 7 y 8 personas un 10% de descuento y para 8 personas un 15% de descuento.
    if (this.cantidadPersonas >= 4 && this.cantidadPersonas < 6){
        descuento = .05;
    } else if (this.cantidadPersonas >= 6 && this.cantidadPersonas < 8) {
        descuento = .10;
    } else if (this.cantidadPersonas >= 8){
        descuento = .15;
    }
    return precioBase * descuento;
}

Reserva.prototype.descuentosCodigo = function(precioBase) {
    let descuento = 0;

    if (this.codigoDescuento === 'DES15'){
        // Usando: DES15: obtiene un 15% de descuento.
        descuento = precioBase * .15;
    } else if (this.codigoDescuento === 'DES200') {
        // Usando: DES200: obtiene $200 de descuento.
        descuento = 200;
    } else if (this.codigoDescuento === 'DES1'){
        // Usando: DES1: obtiene de descuento el valor equivalente al precio de una persona.
        descuento = this.precioPersona;
    }
    return descuento;
}


// Ejemplos de restaurantes con su respectivo precio base y precio final 

    // Reserva 1:

        // Precio base: 2800
        // Precio final: 2310

       //  2800 + Fin de semana: Viernes dia 5 (10% adicional) + descuentos grupo 8 personas (-15% descuento) 
       //  2800 + Fin de semana (280) + descuento 8 persona (-420) + DES1 (-350)

    
    // Reserva 2:

        // Precio base: 300
        // Precio final: 100

        // Parametros (horario, cantidadPersonas, precioPersona, codigoDescuento)

const listadoDeReservas  = [
    new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1"),
    new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200"),
];