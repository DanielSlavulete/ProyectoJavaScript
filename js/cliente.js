export class Cliente{
    constructor(id,nombre,email,telefono,metodoPago){
        this.id = id;
        this.nombre = nombre
        this.email = email
        this.telefono = telefono
        this.metodoPago = metodoPago
    }

    mostrarInfo() {
        return `
            Nombre: ${this.nombre}<br>
            Email: ${this.email}<br>
            Teléfono: ${this.telefono}<br>
            Método de pago: ${this.metodoPago}
        `;
    }

}