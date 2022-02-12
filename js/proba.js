var k;
var vinoteke = [];
var aktivnaVinoteka = null;
function promeniAktivnu(selekt) {
    aktivnaVinoteka = vinoteke.filter(function (elem) { return elem.id == Number(selekt.value); })[0];
    refreshIspis();
}
var Vino = /** @class */ (function () {
    function Vino(naziv, cena, varijanta) {
        this.naziv = naziv;
        this.cena = cena;
        this.varijanta = varijanta;
    }
    return Vino;
}());
var Vinoteka = /** @class */ (function () {
    function Vinoteka(id, naziv) {
        this._id = id;
        this._naziv = naziv;
        this._vina = [];
    }
    Object.defineProperty(Vinoteka.prototype, "naziv", {
        get: function () {
            return this._naziv;
        },
        set: function (param) {
            this._naziv = param;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vinoteka.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (param) {
            this._id = param;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vinoteka.prototype, "vina", {
        get: function () {
            return this._vina;
        },
        enumerable: false,
        configurable: true
    });
    Vinoteka.prototype.dodajVino = function (vino) {
        this._vina.push(vino);
    };
    Vinoteka.prototype.getNajskuplje = function () {
        var najskupljeVino = this._vina.reduce(function (acc, obj) {
            if (acc > obj.cena) {
                return acc;
            }
            else {
                return obj.cena;
            }
        }, 0);
        console.log("najskuplje: " + najskupljeVino);
        return najskupljeVino;
    };
    Vinoteka.prototype.getNajjeftnije = function () {
        var najjeftinijeVino = this._vina.reduce(function (acc, obj) {
            if (acc < obj.cena && acc != 0) {
                return acc;
            }
            else {
                return obj.cena;
            }
        }, 0);
        return najjeftinijeVino;
    };
    Vinoteka.prototype.najzastupljenijaVarijanta = function () {
        var outDiv = document.getElementById("varijante");
        var crno = this._vina.filter(function (el) { return el.varijanta == "Crno"; });
        var belo = this._vina.filter(function (el) { return el.varijanta == "Belo"; });
        var rose = this._vina.filter(function (el) { return el.varijanta == "Rose"; });
        var kat = [];
        if (crno.length >= belo.length && crno.length >= rose.length) {
            kat = crno;
        }
        else if (belo.length >= rose.length) {
            kat = belo;
        }
        else {
            kat = rose;
        }
        if (kat.length == 0) {
            outDiv.innerHTML = "<h3>Vinoteka ".concat(aktivnaVinoteka.naziv, " jos uvek nema vina za prodaju!!<h3>");
        }
        else {
            outDiv.innerHTML = "<h3>Najzastupljenija varijanta za vinoteku ".concat(aktivnaVinoteka.naziv, " je: <br/>")
                +
                    "".concat(kat[0].varijanta, " sa ukupno ").concat(kat.length, " vina.</h3>");
        }
    };
    Vinoteka.prototype.najskupljaVarijanta = function () {
        var outDiv = document.getElementById("varijante");
        var telefon = this._vina.filter(function (el) { return el.varijanta == "Crno"; });
        var laptop = this._vina.filter(function (el) { return el.varijanta == "Belo"; });
        var konzola = this._vina.filter(function (el) { return el.varijanta == "Rose"; });
        var kat = [];
        if (telefon.reduce(function (prev, next) { return prev + next.cena; }, 0) >= laptop.reduce(function (prev, next) { return prev + next.cena; }, 0) && // I
            telefon.reduce(function (prev, next) { return prev + next.cena; }, 0) >= konzola.reduce(function (prev, next) { return prev + next.cena; }, 0)) {
            kat = telefon; //najskuplja varijanta crnog vina
        }
        else if (laptop.reduce(function (prev, next) { return prev + next.cena; }, 0) >= konzola.reduce(function (prev, next) { return prev + next.cena; }, 0)) {
            kat = laptop; // niz najskupljih belih vina
        }
        else {
            kat = konzola; // niz najskupljih rose vina
        }
        if (kat.length == 0) {
            outDiv.innerHTML = "<h3>Vinoteka ".concat(aktivnaVinoteka.naziv, " jos uvek nema vina za prodaju!!<h3>");
        }
        else {
            outDiv.innerHTML = "<h3>Najskuplja varijanta u vinoteci ".concat(aktivnaVinoteka.naziv, " je : <br/>") +
                "".concat(kat[0].varijanta, " sa prosecnom cenom po vinu: ").concat(kat.reduce(function (prev, next) { return prev + next.cena; }, 0) / kat.length, ".");
        }
    };
    return Vinoteka;
}());
function refreshIspis() {
    var vinaDiv = document.getElementById("vina");
    var ispis = '<ul class="list-group">';
    for (var i = 0; i < aktivnaVinoteka.vina.length; i++) {
        if (aktivnaVinoteka.vina[i].cena == aktivnaVinoteka.getNajskuplje()) {
            ispis += "<li class=\"list-group-item list-group-item-danger\">".concat(aktivnaVinoteka.vina[i].naziv, " (").concat(aktivnaVinoteka.vina[i].varijanta, ") <span class=\"badge\">").concat(aktivnaVinoteka.vina[i].cena, "</span></li>");
        }
        else if (aktivnaVinoteka.vina[i].cena == aktivnaVinoteka.getNajjeftnije()) {
            ispis += "<li class=\"list-group-item list-group-item-success\">".concat(aktivnaVinoteka.vina[i].naziv, " (").concat(aktivnaVinoteka.vina[i].varijanta, ") <span class=\"badge\">").concat(aktivnaVinoteka.vina[i].cena, "</span></li>");
        }
        else {
            ispis += "<li class=\"list-group-item\">".concat(aktivnaVinoteka.vina[i].naziv, " (").concat(aktivnaVinoteka.vina[i].varijanta, ") <span class=\"badge\">").concat(aktivnaVinoteka.vina[i].cena, "</span></li>");
        }
    }
    ispis += "</ul>";
    vinaDiv.innerHTML = ispis;
}
//# sourceMappingURL=proba.js.map