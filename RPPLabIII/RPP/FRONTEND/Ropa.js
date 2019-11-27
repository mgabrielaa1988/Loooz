"use strict";
var Entidades;
(function (Entidades) {
    var Ropa = /** @class */ (function () {
        function Ropa(codigo, nombre, precio) {
            this._codigo = codigo;
            this._nombre = nombre;
            this._precio = precio;
        }
        Ropa.prototype.ToString = function () {
            return ('"codigo":' + this._codigo + ',"nombre":"' + this._nombre + '","precio":"' + this._precio + '",');
        };
        return Ropa;
    }());
    Entidades.Ropa = Ropa;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Ropa.js.map