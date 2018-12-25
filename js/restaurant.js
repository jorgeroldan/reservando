const Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    this.horarios = this.horarios.filter(function(horario){
        return horario !== horarioReservado;
    });
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return this.promedio(this.calificaciones);
    }
}

Restaurant.prototype.sumatoria = function(arregloASumar){
    let sumatoria = 0;

    arregloASumar.forEach(element => {
        sumatoria += element;
    });

    return sumatoria;
}

Restaurant.prototype.promedio = function(arregloAPromediar){
    return Math.round((this.sumatoria(arregloAPromediar) / arregloAPromediar.length) * 10) / 10;
}

