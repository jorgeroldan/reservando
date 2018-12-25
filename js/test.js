let expect = chai.expect

// describe('lo que quiero testear', function() {
//     it('prueba unitaria', function(){
//         expect(parametro1).to.be.a(prueba lógica)
//     })
// })

describe('Reservar horario', function() {

    it('El horario seleccionado no es una alternativa disponible, el arreglo se mantiene igual', function(){
        let restaurante0 = listado.restaurantes[0];
        // Reservo una opción fuera de las opciones
        restaurante0.reservarHorario('9:45');
        expect(restaurante0.horarios).to.have.lengthOf(3);
    })

    it('se elimina del arreglo la opción elegida', function(){
        // Guardar en una variable, el primer restaurante del listado 
        const restaurante0 = listado.restaurantes[0];
        // Reservo una opción
        restaurante0.reservarHorario('13:00');

        expect(restaurante0.horarios[0]).to.equal('15:30');
        expect(restaurante0.horarios[1]).to.equal('18:00');
        expect(restaurante0.horarios.length).to.equal(2);
    })

    it('se ejecuta funcion reservarHorario sin parametro', function(){
        expect(listado.restaurantes[0].reservarHorario()).to.be.undefined
    })

}),

describe('Obtener puntuación', function() {

    it('Calcular el promedio', function(){
        const restaurante0 = listado.restaurantes[0]
        // Crear una variable reducer para utilizar el metodo reduce y sumar los elementos de un arreglo
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        // Dividir la suma de los elementos de arreglo entre la longitud del arreglo para obtener el promedio
        const promedio = restaurante0.calificaciones.reduce(reducer)/(restaurante0.calificaciones.length)
        
        expect(restaurante0.obtenerPuntuacion()).to.equal(promedio)
    })

    it('Restaurante sin puntuación', function(){
        const restaurante0 = listado.restaurantes[0]
        restaurante0.calificaciones = []
        expect(restaurante0.calificaciones).to.have.lengthOf(0)
    })
})

// Paso 4

describe('Testear la función calificar', function(){
    it('Validar que la calificacion sea un numero', function(){
        const calificacion = 8
        expect(calificacion).to.be.a('Number')
    })

    it('Debe aumentar la longitud del arreglo en 1 elemento después de recibir una calificación', function(){
        const restaurante0 = listado.restaurantes[0];
        const calificacionesR0 = listado.restaurantes[0].calificaciones.length;
        restaurante0.calificar(7);
        const nuevoCalificacionesR0 = listado.restaurantes[0].calificaciones.length;
        expect(nuevoCalificacionesR0).to.equal(calificacionesR0+1)
    })
})

// Paso 5

describe('Testear la función buscarRestaurante(id)', function(){
    
    it('Verifica que el ID corresponde al restaurante correcto', function(){
        const idRestaurante24 = listado.restaurantes[23]
        expect(idRestaurante24.id).to.equal(24) 
        expect(idRestaurante24.nombre).to.equal('Maison Kayser')
        expect(idRestaurante24.id).to.not.equal(2)
    })

    it('Confirma que sea un ID valido', function(){
        const idRestaurante0 = listado.restaurantes[0].id
        expect(idRestaurante0).to.equal(1) 
    })

    it('Confirma que sea un ID invalido', function(){
        const idRestaurante0 = listado.restaurantes[0].id
        expect(idRestaurante0).to.not.equal(2) 
    })

    it('ID inexistente', function(){
        const idRestaurante25 = listado.restaurantes[25]
        expect(idRestaurante25).to.be.equal(undefined) 
    })
})

//Paso 6

describe('Probamos la funcion de obtenerRestaurantes', function () {

    it('Debe retornar un restaurante segun los filtros seleccionados', function () {
        expect(listado.obtenerRestaurantes(null,null,null).length).to.equal(24);
        expect(listado.obtenerRestaurantes(null,'Londres',null).length).to.equal(4);
        expect(listado.obtenerRestaurantes('Desayuno',null,null).length).to.equal(4);
        expect(listado.obtenerRestaurantes(null,null,'05:00').length).to.equal(0);
        expect(listado.obtenerRestaurantes('Desayuno','París','17:00').length).to.equal(1);
    })
})



// Se prueba la funcion del precio base del precio por persona y cantidad de personas

describe('Probamos la funcion de precioBase del objeto reserva', function() {
    it('Debe calcular correctamente el precio base', function() {
      expect(listadoDeReservas[0].precioBase()).to.equal(2800);
      expect(listadoDeReservas[1].precioBase()).to.equal(300);
    });
  });

  // Se prueba la funcion del precio total despues de adicionales y descuentos

  describe('Probamos la funcion de precioTotal del objeto reserva', function() {
    it('Debe calcular correctamente el precio total', function() {
      expect(listadoDeReservas[0].precioTotal()).to.equal(2310);
      expect(listadoDeReservas[1].precioTotal()).to.equal(100);
    });
  });