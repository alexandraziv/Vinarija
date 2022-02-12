var k: any;
let vinoteke: Vinoteka[] = [];
let aktivnaVinoteka: Vinoteka = null;

function promeniAktivnu(selekt: HTMLSelectElement){
    aktivnaVinoteka = vinoteke.filter((elem) => elem.id == Number(selekt.value))[0]; 
    refreshIspis();
}

class Vino {
    naziv: string;
    cena: number;
    varijanta: string;
    constructor(naziv: string, cena: number, varijanta: string){
        this.naziv = naziv;
        this.cena = cena;
        this.varijanta = varijanta;
    }
}

class Vinoteka {
    private _naziv: string;
    private _id: number;
    private _vina: Vino[]; 

    constructor(id: number, naziv: string) {
        this._id = id;
        this._naziv = naziv;
        this._vina = [];        
    }

    get naziv(): string{
        return this._naziv;
    }

    set naziv(param: string) {
        this._naziv = param;
    }

    get id(): number{
        return this._id;
    }

    set id(param: number) {
        this._id = param;
    }

    get vina(): Vino[] {
        return this._vina;
    }

    dodajVino(vino: Vino): void {
        this._vina.push(vino);
    }

   
    getNajskuplje(): number {
        let najskupljeVino = this._vina.reduce((acc, obj) => { 
            if(acc > obj.cena) {
                return acc; 
            } else {
                return obj.cena;
            }            
        }, 0); 
        console.log("najskuplje: " + najskupljeVino);
        return najskupljeVino;
    }

    getNajjeftnije(): number {
        let najjeftinijeVino = this._vina.reduce((acc, obj) => { 
            if(acc < obj.cena && acc != 0) {
                return acc; 
            } else {
                return obj.cena;
            }            
        }, 0); 
        return najjeftinijeVino;
    }

    najzastupljenijaVarijanta(): void {
        let outDiv: HTMLElement = document.getElementById("varijante");
        let crno: Vino[] = this._vina.filter((el) => el.varijanta == "Crno");
        let belo: Vino[] = this._vina.filter((el) => el.varijanta == "Belo");
        let rose: Vino[] = this._vina.filter((el) => el.varijanta == "Rose");
        let kat: Vino[] = [];
        
    
        if(crno.length >= belo.length && crno.length >= rose.length){
            kat = crno;
        }else if(belo.length >= rose.length){
            kat = belo;
        }else{
            kat = rose;
        }
     
        if(kat.length == 0){
            outDiv.innerHTML = `<h3>Vinoteka ${aktivnaVinoteka.naziv} jos uvek nema vina za prodaju!!<h3>`;
        }else{
            outDiv.innerHTML = `<h3>Najzastupljenija varijanta za vinoteku ${aktivnaVinoteka.naziv} je: <br/>`
                +
           `${kat[0].varijanta} sa ukupno ${kat.length} vina.</h3>`;
        }

    }

    najskupljaVarijanta(): void {
        let outDiv: HTMLElement = document.getElementById("varijante");
        let telefon: Vino[] = this._vina.filter((el) => el.varijanta == "Crno");
        let laptop: Vino[] = this._vina.filter((el) => el.varijanta == "Belo");
        let konzola: Vino[] = this._vina.filter((el) => el.varijanta == "Rose");
        let kat: Vino[] = [];

        if (telefon.reduce((prev, next) => prev + next.cena, 0) >= laptop.reduce((prev, next) => prev + next.cena, 0) && // I
        telefon.reduce((prev, next) => prev + next.cena, 0) >= konzola.reduce((prev, next) => prev + next.cena, 0)) {
            kat = telefon; //najskuplja varijanta crnog vina
        }else if(laptop.reduce((prev, next) => prev + next.cena, 0) >= konzola.reduce((prev, next) => prev + next.cena, 0)){
            kat = laptop; // niz najskupljih belih vina
        }else{
            kat = konzola; // niz najskupljih rose vina
        }

        if(kat.length == 0){
           outDiv.innerHTML = `<h3>Vinoteka ${aktivnaVinoteka.naziv} jos uvek nema vina za prodaju!!<h3>`;
        }else{
            outDiv.innerHTML = `<h3>Najskuplja varijanta u vinoteci ${aktivnaVinoteka.naziv} je : <br/>` +
                `${kat[0].varijanta} sa prosecnom cenom po vinu: ${kat.reduce((prev, next) => prev + next.cena, 0) / kat.length}.`;
        }
    }
}



function refreshIspis(): void {

    let vinaDiv: HTMLDivElement = document.getElementById("vina") as HTMLDivElement;
    let ispis: string = '<ul class="list-group">';    
    for(let i = 0; i < aktivnaVinoteka.vina.length; i++) {
        if(aktivnaVinoteka.vina[i].cena == aktivnaVinoteka.getNajskuplje()) {
            ispis += `<li class="list-group-item list-group-item-danger">${aktivnaVinoteka.vina[i].naziv} (${aktivnaVinoteka.vina[i].varijanta}) <span class="badge">${aktivnaVinoteka.vina[i].cena}</span></li>`;
        } else if(aktivnaVinoteka.vina[i].cena == aktivnaVinoteka.getNajjeftnije()) {
            ispis += `<li class="list-group-item list-group-item-success">${aktivnaVinoteka.vina[i].naziv} (${aktivnaVinoteka.vina[i].varijanta}) <span class="badge">${aktivnaVinoteka.vina[i].cena}</span></li>`;
        } else {
            ispis += `<li class="list-group-item">${aktivnaVinoteka.vina[i].naziv} (${aktivnaVinoteka.vina[i].varijanta}) <span class="badge">${aktivnaVinoteka.vina[i].cena}</span></li>`;
        }
    }
    ispis += "</ul>"    
    vinaDiv.innerHTML = ispis;
}