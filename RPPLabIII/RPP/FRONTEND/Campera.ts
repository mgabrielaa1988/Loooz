/// <reference path="./Ropa.ts" />

namespace Entidades {
    export class Televisor extends Ropa {
        protected _talle : string;
        protected _color : string;
        //protected _pathFoto : string;

        public constructor(codigo: number, marca: string, precio : number, talle: string, color : string, /*path : string*/) {
            super(codigo, marca, precio);
            this._talle = talle;
            //this._pathFoto = path;
            this._color = color;
        }

        public ToJson():any{
            
            let ropa:string=super.ToString();
            
            return JSON.parse('{'+ropa+'"talle":"'+this._talle+'","color":"'+this._color+'"}');
        }
    }
}
