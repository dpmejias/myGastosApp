export class IngresoEgreso{
    constructor(
        public tipo: string,
        public descripcion: string,
        public monto: number,
        public uid?: string
    ){}
}