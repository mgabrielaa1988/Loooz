namespace Entidades {
    export class Ropa {
        protected _codigo : number;
        protected _nombre : string;
        protected _precio : number;

        public constructor(codigo: number, nombre: string, precio : number)
        {
            this._codigo = codigo;
            this._nombre = nombre;
            this._precio = precio;
        }

        public ToString():string{
            return ('"codigo":'+this._codigo+',"nombre":"'+this._nombre+'","precio":"' + this._precio+'",');
        }
    }
}