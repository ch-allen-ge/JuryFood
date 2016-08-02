function makeMyWebsiteCool() {
	var wheelOfFoodFortune = Math.floor((Math.random() * 40) + 1).toString();

	document.getElementById("theHtml").style.background = 'url(/images/'+wheelOfFoodFortune+'.jpg) no-repeat fixed center/cover';
}

window.onload = makeMyWebsiteCool();