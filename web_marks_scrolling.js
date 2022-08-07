let moving = false;
let showingSub = false;
let bottom;
let bigBottom;
let toppy;
let bigTop;
let categories = 7;
let doubleSwitch = 0;

let root = document.querySelector(':root');
let containers = document.querySelectorAll("div.container");
let bigContainers = document.querySelectorAll("div.container-big");
let base = document.querySelector("div.flex-mini-map");
let bigBase = document.querySelector("div#pages-box");
let title = document.querySelector("div.top-title");
let miniCounter = base.querySelectorAll("div > a");
let iconCounter = bigBase.querySelectorAll("img");
let moreButtons = document.querySelectorAll("div.showselection");
let subMenu = document.querySelector("div.sub-domains-list");


let sizes = [134, 134, 98, 98, 98, 62, 62];
let bigSizes = [426, 426, 286, 286, 286, 146, 146];
let pos = [0, 1, 2, 3, 4, 5, 6];

let subLinks = [
	{
		number: 10,
		names: [
				"linus tech tips",
				"gamers nexus",
				"skill up",
				"videogamedunkey",
				"driftor",
				"mr mobile",
				"mkbhd",
				"mlid",
				"sick animation",
				"short circuit"
			],
		urls: [
				"https://www.youtube.com/c/LinusTechTips",
				"https://www.youtube.com/c/GamersNexus",
				"https://www.youtube.com/c/SkillUp",
				"https://www.youtube.com/user/videogamedunkey",
				"https://www.youtube.com/user/Drift0r",
				"https://www.youtube.com/c/TheMrMobile",
				"https://www.youtube.com/c/mkbhd",
				"https://www.youtube.com/c/MooresLawIsDead",
				"https://www.youtube.com/c/sickanimation",
				"https://www.youtube.com/c/ShortCircuit"
			],
	}
];

let topTitle = containers[pos[0]].querySelector("div.category");
let topTitlePrevious;

let topSideThing = bigContainers[pos[0]].querySelector("div.page");
let topSideThingPrevious;

let topPage = bigContainers[pos[0]].querySelector("div.page");

for (let p = 0; p < pos.length; p++)
	containers[p].querySelector("div.category").addEventListener("click", function(){ jumpUp(p); });

for (let z = 0; z < miniCounter.length; z++) {
	miniCounter[z].addEventListener("mouseover", function(){ displaySiteName(miniCounter[z].href); });
	miniCounter[z].addEventListener("mouseout", displayDefault);

	iconCounter[z].addEventListener("mouseover", function(){ displaySiteName(miniCounter[z].href); });
	iconCounter[z].addEventListener("mouseout", displayDefault);
}

for (let m = 0; m < moreButtons.length; m++) {
	moreButtons[m].addEventListener("mousedown", function(){ swapMenu(m); });
}

base.addEventListener("wheel", function(){ scrollDistance(event); });
bigBase.addEventListener("wheel", function(){ scrollDistance(event); });

subMenu.addEventListener("animationend", function(){ resetFromSwap(event); });
base.addEventListener("animationend", function(){ resetFromSwap(event); });

console.log(subLinks[0].urls[2]);
console.log(subLinks[0].names[2]);

function swapMenu(menuNumber) {
	if(!showingSub) {
		populateSub(menuNumber);
		showingSub = true;
		root.style.setProperty('--subDirection', "reverse");
		root.style.setProperty('--mapDirection', "normal");
		root.style.setProperty('--subDelay', "0.3s");
		root.style.setProperty('--mapDelay', "0.0s");
	} else {
		showingSub = false;
		root.style.setProperty('--subDirection', "normal");
		root.style.setProperty('--mapDirection', "reverse");
		root.style.setProperty('--subDelay', "0.0s");
		root.style.setProperty('--mapDelay', "0.3s");
	}

	base.className = "map-fade";
	subMenu.className = "sub-fade";
}


function resetFromSwap(event) {

	if(event.animationName === "swapper") {

		doubleSwitch += 1;

		if(!showingSub) {
			if(doubleSwitch == 1) {
				root.style.setProperty('--subOpacity', "0.0");
				root.style.setProperty('--subPointer', "none");
				subMenu.className = "sub-domains-list";
				clearSub();
			} else {
				root.style.setProperty('--mapOpacity', "1.0");
				root.style.setProperty('--mapPointer', "all");
				base.className = "flex-mini-map";

				doubleSwitch = 0;
			}
		} else {
			if(doubleSwitch == 1) {
				root.style.setProperty('--mapOpacity', "0.0");
				root.style.setProperty('--mapPointer', "none");
				base.className = "flex-mini-map";
			} else {
				root.style.setProperty('--subOpacity', "1.0");
				root.style.setProperty('--subPointer', "all");
				subMenu.className = "sub-domains-list";

				doubleSwitch = 0;
			}
		}
	}
}

function populateSub(menuNumber) {
	for(let p = 0; p < subLinks[menuNumber].number; p++) {
		createItem(subLinks[menuNumber].names[p], subLinks[menuNumber].urls[p]);
	}

	let close = document.createElement("div");
	close.className = "showselection";
	close.id = "menu";
	close.addEventListener("mousedown", function(){ swapMenu(0); });
	subMenu.appendChild(close);
}

function createItem(name, url) {
	let item = document.createElement("a");
	item.id = "list-item";
	item.className = "category";
	item.setAttribute("target", "_blank");
	
	item.innerHTML = name;
	item.setAttribute("href", url);

	subMenu.appendChild(item);
}

function clearSub() {
	subMenu.textContent = '';
}

function displayDefault() {
	title.innerHTML = "net marks";
}

function displaySiteName(name) {
	let chopped = name.slice(8, -1);
	if (name.includes("www", 8))
		chopped = chopped.slice(4);
		
	title.innerHTML = chopped;
}

function scrollDistance(event) {
	if (!moving) {

		if (showingSub) {
			swapMenu();
		}

		if (event.deltaY > 0) {
			moving = true;
			moveUp();
		} else {
			moving = true;
			moveDown();

		}
	}
}

function selectTop() {
	topTitle = containers[pos[0]].querySelector("div.category");
	topTitle.style.animationDuration = '0.7s';
	topTitle.style.animationName = 'selected';
	
	topSideThing = bigContainers[pos[0]].querySelector("div.page");
	topSideThing.style.animationName = 'selPage';
}

function setForUp() {
	bottom = containers[pos[0]].cloneNode(true);
	bottom.querySelector("div.category").style = "";
	bottom.id = "bottom";
	bottom.addEventListener("animationend", resetFromUp);
	
	containers[pos[0]].style.animationName = 'topFadeOut';

	bottom.style.display = 'none';
	bottom.style.animationName = 'botFadeIn';


	
	base.appendChild(bottom);

	root.style.setProperty('--distance', "-" + sizes[0] + "px");




	
	bigBottom = bigContainers[pos[0]].cloneNode(true);
	bigBottom.id = "bigBottom";

	bigContainers[pos[0]].style.animationName = 'topFadeOutBig';
	
	bigBottom.style.display = 'none';
	bigBottom.style.animationName = 'botFadeInBig';

	bigBase.appendChild(bigBottom);

	root.style.setProperty('--distanceBig', "-" + bigSizes[0] + "px");
}

function setForDown() {
	toppy = containers[pos[categories - 1]].cloneNode(true);
	toppy.querySelector("div.category").style = "";
	toppy.id = "toppy";
	toppy.addEventListener("animationend", resetFromDown);
	
	containers[pos[categories - 1]].style.animationName = 'topFadeOut';

	toppy.style.display = 'none';
	toppy.style.animationName = 'botFadeIn';


	
	base.prepend(toppy);

	//base.style = "top: -" + sizes[categories - 1] + "px;";

	root.style.setProperty('--distance', sizes[categories - 1] + "px");




	
	bigTop = bigContainers[pos[categories - 1]].cloneNode(true);
	bigTop.id = "bigTop";

	bigContainers[pos[categories - 1]].style.animationName = 'topFadeOutBig';
	
	bigTop.style.display = 'none';
	bigTop.style.animationName = 'botFadeInBig';

	bigBase.prepend(bigTop);

	root.style.setProperty('--distanceBig', bigSizes[categories - 1] + "px");
}

function resetFromUp() {
	base.removeChild(bottom);
	base.appendChild(containers[pos[0]]);

	bigBase.removeChild(bigBottom);
	bigBase.appendChild(bigContainers[pos[0]]);
	

	containers[pos[0]].style = "";

	bigContainers[pos[0]].style = "";

	for (let i = 0; i < containers.length; i++) {
		containers[i].className = "container";
		bigContainers[i].className = "container-big";
	}


	let bigTemp = bigSizes.shift();
	bigSizes.push(bigTemp);

	let temp = sizes.shift();
	sizes.push(temp);

	temp = pos.shift();
	pos.push(temp);

	topTitlePrevious = topTitle;
	topTitlePrevious.style = "";



	topSideThingPrevious = topSideThing;
	topSideThingPrevious.style = "";
	
	selectTop();

	moving = false;
}

function resetFromDown() {
	//console.log("reset called");
	base.removeChild(toppy);
	base.prepend(containers[pos[categories - 1]]);

	bigBase.removeChild(bigTop);
	bigBase.prepend(bigContainers[pos[categories - 1]]);
	

	containers[pos[categories - 1]].style = "";

	bigContainers[pos[categories - 1]].style = "";

	for (let i = 0; i < containers.length; i++) {
		containers[i].className = "container";
		bigContainers[i].className = "container-big";
	}


	let bigTemp = bigSizes.pop();
	bigSizes.unshift(bigTemp);

	let temp = sizes.pop();
	sizes.unshift(temp);

	temp = pos.pop();
	pos.unshift(temp);

	topTitlePrevious = topTitle;
	topTitlePrevious.style = "";



	topSideThingPrevious = topSideThing;
	topSideThingPrevious.style = "";
	
	selectTop();

	base.style = "";
	bigBase.style = "";
	moving = false;
}


function moveUp() {
	setForUp();

	for (let i = 0; i < containers.length; i++) {
		containers[i].className = 'container-go';
		bigContainers[i].className = 'container-big-go';
	}

	bottom.style.display = 'grid';
	bottom.className = 'container-go';

	bigBottom.style.display = 'flex';
	bigBottom.className = 'container-big-go';
}

function moveDown() {
	setForDown();
	

	//base.style = "transform: translateY(-" + sizes[categories - 1] +"px);";
	base.style = "top: -" + sizes[categories - 1] + "px;";

	bigBase.style = "transform: translateY(-" + bigSizes[categories - 1] +"px);";
	for (let i = 0; i < containers.length; i++) {
		containers[i].className = 'container-go';
		bigContainers[i].className = 'container-big-go';
	}

	toppy.style.display = 'grid';
	toppy.className = 'container-go';

	bigTop.style.display = 'grid';
	bigTop.className = 'container-big-go';
}

function moveDownFromExtra() {
	setForDown();
	

	//base.style = "top: -" + sizes[categories - 1] + "px;";

	bigBase.style = "transform: translateY(-" + bigSizes[categories - 1] +"px);";
	for (let i = 0; i < containers.length; i++) {
		containers[i].className = 'container-go';
		bigContainers[i].className = 'container-big-go';
	}

	toppy.style.display = 'grid';
	toppy.className = 'container-go';

	bigTop.style.display = 'grid';
	bigTop.className = 'container-big-go';
}

function setJump(blocksAbove) {
	let bottomBlocks = [];
	for (let i = 0; i < blocksAbove; i++) {
		bottomBlocks[i] = containers[pos[i]].cloneNode(true);
		bottomBlocks[i].id += "Clone";
		containers[pos[i]].style.animationName = 'topFadeOut';
		bottomBlocks[i].style.display = 'none';
		bottomBlocks[i].style.animationName = 'botFadeIn';
	}
	
	bottomBlocks[0].querySelector("div.category").style = "";
	bottomBlocks[0].addEventListener("animationend", function(){ resetFromJump(blocksAbove, bottomBlocks); });

	topTitlePrevious = topTitle;
	topTitlePrevious.style = "";



	let sum = 0;
	for (let k = 0; k < blocksAbove; k++) {
		sum += sizes[k];
		base.appendChild(bottomBlocks[k]);
	}

	root.style.setProperty('--distance', "-" + sum + "px");

	return bottomBlocks;
}

function setFade(blocksAbove) {
	let bottomBlocks = [];
	for (let i = 0; i < blocksAbove; i++) {
		bottomBlocks[i] = bigContainers[pos[i]].cloneNode(true);
		bottomBlocks[i].id += "Clone";
	}
	
	//bottomBlocks[0].querySelector("category").style = "";
	bottomBlocks[0].addEventListener("animationend", function(){ backIn(blocksAbove, bottomBlocks); });


	let sum = 0;
	for (let k = 0; k < blocksAbove; k++)
		bigBase.appendChild(bottomBlocks[k]);

	root.style.setProperty('--nameBig', "flatFadeOut");
	root.style.setProperty('--speedBig', "0.15s");

	return bottomBlocks;
}

function resetFromJump(blocksAbove, bottomBlocks) {
	for (let i = 0; i < blocksAbove; i++) {
		base.removeChild(bottomBlocks[i]);
		base.appendChild(containers[pos[i]]);	
		containers[pos[i]].style = "";
	}

	for (let k = 0; k < containers.length; k++)
		containers[k].className = "container";

	for (let g = 0; g < containers.length; g++)
		bigContainers[g].className = "container-big";

	root.style.setProperty('--nameBig', "upBig");
	root.style.setProperty('--speedBig', "0.3s");

	for (let m = 0; m < blocksAbove; m++) {
		let temp = sizes.shift();
		sizes.push(temp);

		temp = pos.shift();
		pos.push(temp);
	}



	selectTop();

	moving = false;
}

function backIn(blocksAbove, bottomBlocks) {

	topSideThingPrevious = topSideThing;
	topSideThingPrevious.style = "";

	for (let i = 0; i < blocksAbove; i++) {
		bigBase.removeChild(bottomBlocks[i]);
		bigBase.appendChild(bigContainers[pos[i]]);
	}
	
	root.style.setProperty('--nameBig', "flatFadeIn");

	for (let k = 0; k < containers.length; k++)
		bigContainers[k].style = "opacity: 0.0;";

	for (let g = 0; g < containers.length; g++)
		bigContainers[g].className = "container-big";

	for (let e = 0; e < containers.length; e++) {
		bigContainers[e].style = "";
		bigContainers[e].className = "container-big-go";
	}

	for (let m = 0; m < blocksAbove; m++) {
		let temp = bigSizes.shift();
		bigSizes.push(temp);
	}

}

function jumpUp(current) {
	let blocksAbove = pos.indexOf(current)
	
	if(!moving && blocksAbove > 0) { 
		let bottomBlocks = setJump(blocksAbove);
		let bigBottomBlocks = setFade(blocksAbove);		

		for (let i = 0; i < containers.length; i++) {
			containers[i].className = 'container-go';
			bigContainers[i].className = 'container-big-go';
		}

		for (let k = 0; k < blocksAbove; k++) {		
			bottomBlocks[k].style.display = 'grid';
			bottomBlocks[k].className = 'container-go';
			bigBottomBlocks[k].className = 'container-big-go';
		}
	}
}