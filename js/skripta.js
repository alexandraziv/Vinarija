
var boja = {
	plava: "blue",
	crvena: "red"
}; 

var upozorenje = {
	poruka: "Grad mora biti velikim slovima"
}

var varijante = {
	crveno: ["Prokupac", "Cabernet Sauvignon"],
	belo: "Sauvignon blanc"
};
	
var vina = [{ naziv: "Svb Rosa", drzava: "Srbija" }, { naziv: "Port", drzava: "Portugal" },
	{ naziv: "Dom", drzava: "Francuska" }];
	

function validateForm(form) {
	//gledamo name polje
	if (form.naziv.value.trim() == "" || form.naziv.value[0].toUpperCase() != form.naziv.value[0]) {
		alertFunction();
		form.naziv.focus();
		return false;
	}
	if (form.drzava.value.trim() == "" || form.drzava.value[0].toUpperCase() != form.drzava.value[0]) {
		alertFunction();
		form.drzava.focus();
		return false;
	}
	if (form.cena.value.trim() == "" || isNaN(form.cena.value)<0 || Number(form.cena.value) < 0) {
		alert("Please enter a number.");
		form.cena.focus();
		return false;
	}
	if (!isUserValid(form.naziv.value, form.drzava.value)) {
		alert("Uneti naziv se ne poklapa sa drzavom");
		return false;
	}
	if (!checkSelectMatch(form.varijanta.value, form.sorta.value)) {
		alert("Niste izabrali dobru sortu vina.");
		return false;
	}

	return true;
	
}
	

function alertFunction() {
	alert("Please fill your form with capital letters");
}



function callAlertFunction(parametar, callback) {
	
	callback(parametar);
}


function ispisiPoruku(param) {
	alert(param.poruka);
}
	function ispisiParagraf(param) {

		var paragraf = document.getElementById("select_sorta");
		var span = paragraf.getElementsByTagName("span")[0];
	
		if (param.value == "crveno") {
			document.getElementById("select_sorta").style.color = "white";
			document.getElementById("select_sorta").style.backgroundColor = boja.crvena;
			span.style.color = "white";
			span.innerHTML = "";
			span.innerHTML = varijante.crveno;
		
	
		}
		else if (param.value == "belo") {
			document.getElementById("select_sorta").style.color = "white";
			document.getElementById("select_sorta").style.backgroundColor = boja.plava;
			span.style.color = "white";
			span.innerHTML = "";
			span.innerHTML = varijante.belo;
		
		}
	}

	function checkSelectMatch(sel1, sel2) {

		for (var i = 0; i < varijante.crveno.length; i++) {
			if (sel1 == "crveno" && sel2 == (varijante.crveno[i])) {
				return true;
			}
		}
		if (sel1 == "belo" && sel2 == varijante.belo) {
			return true;
		}

		return false;
	}

	function isUserValid(par1, par2) {
		for (var i of vina) {
			if (i.naziv == par1 && i.drzava == par2) {
				return true;
			}
		}
		return false;
}