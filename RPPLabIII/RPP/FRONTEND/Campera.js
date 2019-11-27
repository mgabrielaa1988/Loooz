"use strict";
/// <reference path="./Ropa.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        //protected _pathFoto : string;
        function Televisor(codigo, marca, precio, talle, color) {
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this._talle = talle;
            //this._pathFoto = path;
            _this._color = color;
            return _this;
        }
        Televisor.prototype.ToJson = function () {
            var ropa = _super.prototype.ToString.call(this);
            return JSON.parse('{' + ropa + '"talle":"' + this._talle + '","color":"' + this._color + '"}');
        };
        return Televisor;
    }(Entidades.Ropa));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Campera.js.map