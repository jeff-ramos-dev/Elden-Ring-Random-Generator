

const api_url = "https://eldenring.fanapis.com/api/weapons?limit=100";
const resultBtn = document.querySelector('.result');
// const clearBtn = document.querySelector('.clear');
let weapon;
let image;
let description;
let category;
let weight;
let attack;
let defense;
let scaling;
let attrReq; 
let attrAmount;
let rand;

async function getEldenRingWeapon() {

	// Making an API call (request)
	// and getting the response back
	const response = await fetch(api_url);

	// Parsing it to JSON format
	const data = await response.json();

    rand = Math.floor(Math.random() * data.count)

	// Retrieving data from JSON
	const eldenring = data.data[rand];
	weapon = eldenring.name;
    image = eldenring.image;
	description = eldenring.description;
    attack = getAttackValues(eldenring.attack);
    defense = getDefenseValues(eldenring.defence);
    scaling = getScaling(eldenring.scalesWith);
    attrReq = getAttrReqs(eldenring.requiredAttributes);
	category = eldenring.category;
	weight = eldenring.weight;

    console.log(image)
    // updating table content
    fillTable();
};

function fillTable() {
    document.querySelector("#weapon").textContent = weapon;
    document.querySelector("#image").innerHTML = `<img src="${image}"></img>`;
	document.querySelector("#description").textContent = description;
    document.querySelector("#attack").textContent = attack;
    document.querySelector("#defense").textContent = defense;
    document.querySelector("#scaling").textContent = scaling;
    document.querySelector("#attribute").textContent = attrReq;
	document.querySelector("#category").textContent = category;
	document.querySelector("#weight").textContent = weight;
    // document.getElementById("table").style.backgroundImage = `url(${image})`
};

function getAttackValues(array) {
    let attackValues = ``;
    array.forEach(function(item) {
        if (item.amount !== 0){
            attackValues += `${item.name}: ${item.amount} | `;
        };
    });
    return attackValues;
};

function getDefenseValues(array) {
    let defenseValues = ``;
    array.forEach(function(item) {
        if (item.amount !== 0){
            defenseValues += `${item.name}: ${item.amount} | `;
        };
    });
    if (defenseValues == ``) {
        return 'None';
    } else {
        return defenseValues;
    };
};

function getScaling(array) {
    let scalingValues = ``;
    array.forEach(function(item) {
        scalingValues += `${item.name}: ${item.scaling} | `;
    });
    if (scalingValues == "-: undefined | ") {
        return 'None';
    } else {
        return scalingValues;
    };
};

function getAttrReqs(array) {
    let attrReqValues = ``;
    array.forEach(function(item) {
        attrReqValues = `${item.name}: ${item.amount} | `;
    });
    return attrReqValues;
};


getEldenRingWeapon();

resultBtn.addEventListener('click', getEldenRingWeapon);