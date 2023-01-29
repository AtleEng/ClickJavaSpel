let clickingButton = document.querySelector("button");
const context = document.querySelector("canvas").getContext("2d");

clickingButton.addEventListener("click", OnCoinButtonClick);


//coin
let coinAmount = 100000;
let coinLabel = document.querySelector(".coinLabel");

//Uppgrades var
let amountOfCoinsPerClick = 1;

let buttonSize = 1;

let comboAmount = 1;
let _currentCombo = 0;

let fadeTime = 1;
let _currenttime = 0;

let goldenChance = 1;

let passiveIncome = 1;

//UppgradesButtons
let morePointsButton = document.querySelector(".Shopitem1");
morePointsButton.addEventListener("click", UppgradeAmountOfCoinsPerClick);

let buttonSizeButton = document.querySelector(".Shopitem2");
buttonSizeButton.addEventListener("click", UppgradeButtonSize);

let comboAmountButton = document.querySelector(".Shopitem3");
comboAmountButton.addEventListener("click", UppgradeComboAmount);

let fadeTimeButton = document.querySelector(".Shopitem4");
fadeTimeButton.addEventListener("click", UppgradeFadeTime);

let goldChanceButton = document.querySelector(".Shopitem5");
goldChanceButton.addEventListener("click", UppgradeGoldenChance);

let passiveIncomeButton = document.querySelector(".Shopitem6");
passiveIncomeButton.addEventListener("click", UppgradePassiveIncome);

//UppgradesLabels
let morePointsLevelLabel = document.querySelector(".MorePointsLevelLabel");
let morePointsCostLabel = document.querySelector(".MorePointsCostLabel");

let biggerBoxLevelLabel = document.querySelector(".BiggerBoxLevelLabel");
let biggerBoxCostLabel = document.querySelector(".BiggerBoxCostLabel");

let dubbleHitLevelLabel = document.querySelector(".DubbleHitLevelLabel");
let dubbleHitCostLabel = document.querySelector(".DubbleHitCostLabel");

let slowerFadeLevelLabel = document.querySelector(".SlowerFadeLevelLabel");
let slowerFadeCostLabel = document.querySelector(".SlowerFadeCostLabel");

let goldenBlocksLevelLabel = document.querySelector(".GoldenBlocksLevelLabel");
let goldenBlocksCostLabel = document.querySelector(".GoldenBlocksCostLabel");

let passiveIncomeLevelLabel = document.querySelector(".PassiveIncomeLevelLabel");
let passiveIncomeCostLabel = document.querySelector(".PassiveIncomeCostLabel");

Start();
setInterval(Update, 100);

function Start() {
    clickingButton.style.left = 0 + "px";
    clickingButton.style.top = 0 + "px";
    ChangeButtonPosition();
}

function Update() {
    context.canvas.width = window.innerWidth * 0.8;
    context.canvas.height = context.canvas.width * 0.4;

    clickingButton.style.width = context.canvas.width * 0.1 + context.canvas.width * buttonSize / 100 + "px";
    clickingButton.style.height = context.canvas.width * 0.1 + context.canvas.width * buttonSize / 100 + "px";
    _currenttime++;
    if (_currenttime >= fadeTime * 3 + 10) {
        ChangeButtonPosition();
    }
    if (passiveIncome > 1) {
        let moneyChance = Math.random() * 100;
        if (moneyChance < 10 * (passiveIncome)) {
            addCoin(passiveIncome + 1);
        }
    }

    if (amountOfCoinsPerClick < 30) {
        morePointsLevelLabel.innerHTML = amountOfCoinsPerClick;
        morePointsCostLabel.innerHTML = (amountOfCoinsPerClick * amountOfCoinsPerClick) * 10;
    } else {
        morePointsLevelLabel.innerHTML = amountOfCoinsPerClick + ("(max)");
        morePointsCostLabel.innerHTML = ("---");
    }

    if (buttonSize < 15) {
        biggerBoxLevelLabel.innerHTML = buttonSize;
        biggerBoxCostLabel.innerHTML = (buttonSize * buttonSize / 5) * 30 + 26;
    } else {
        biggerBoxLevelLabel.innerHTML = buttonSize + ("(max)");
        biggerBoxCostLabel.innerHTML = ("---");
    }

    if (comboAmount < 20) {
        dubbleHitLevelLabel.innerHTML = comboAmount;
        dubbleHitCostLabel.innerHTML = (40 + 10 * comboAmount * comboAmount / 2);
    } else {
        dubbleHitLevelLabel.innerHTML = comboAmount + ("(max)");
        dubbleHitCostLabel.innerHTML = ("---");
    }

    if (fadeTime < 20) {
        slowerFadeLevelLabel.innerHTML = fadeTime;
        slowerFadeCostLabel.innerHTML = (20 + 8 * fadeTime * fadeTime / 2);
    } else {
        slowerFadeLevelLabel.innerHTML = fadeTime + ("(max)");
        slowerFadeCostLabel.innerHTML = ("---");
    }

    if (goldenChance < 10) {
        goldenBlocksLevelLabel.innerHTML = goldenChance;
        goldenBlocksCostLabel.innerHTML = (100 * goldenChance * goldenChance / 2);
    } else {
        goldenBlocksLevelLabel.innerHTML = goldenChance + ("(max)");
        goldenBlocksCostLabel.innerHTML = ("---");
    }

    if (passiveIncome < 20) {
        passiveIncomeLevelLabel.innerHTML = passiveIncome;
        passiveIncomeCostLabel.innerHTML = (100 * passiveIncome * passiveIncome / 2)
    } else {
        passiveIncomeLevelLabel.innerHTML = passiveIncome + ("(max)");
        passiveIncomeCostLabel.innerHTML = ("---")
    }
}
//---------------------------------This is the coin section---------------------------------
function OnCoinButtonClick() {

    _currentCombo++;
    addCoin(amountOfCoinsPerClick * _currentCombo);
    if (_currentCombo >= comboAmount) {
        _currentCombo = 0;
        ChangeButtonPosition();
    }
    if (goldenChance > 1) {
        let moneyChance = Math.random() * 100;
        if (moneyChance < 5 * (goldenChance)) {
            addCoin(10 * amountOfCoinsPerClick);
        }
    }
}
function addCoin(gain) {
    coinAmount += gain;
    coinLabel.innerHTML = coinAmount;
}
//---------------------------------This is the button section---------------------------------
function ChangeButtonPosition() {
    _currenttime = 0;
    _currentCombo = 0;

    cW = context.canvas.width - (context.canvas.width * 0.1 + context.canvas.width * buttonSize / 100);
    cH = context.canvas.height - (context.canvas.width * 0.1 + context.canvas.width * buttonSize / 100);

    //skapar slumpade x och y värden för knappen
    let x = Math.floor(Math.random() * cW);
    let y = Math.floor(Math.random() * cH);

    //sätter knappens x och y värde till de slumpade numerna."px" sätter enheten till pixlar
    clickingButton.style.left = cW * 0.13 + x + "px";
    clickingButton.style.top = y + "px";
}
//Sätter number till ett nummer mellan min och max
function Clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
}

//---------------------------------This is the shopping section---------------------------------

function ShopUpgrade(cost, currentlevel, maxLevel) {
    if (coinAmount >= cost && currentlevel < maxLevel) {
        addCoin(-cost);
        currentlevel++;
    }
    return currentlevel;
}

function UppgradeAmountOfCoinsPerClick() {
    amountOfCoinsPerClick = ShopUpgrade((amountOfCoinsPerClick * amountOfCoinsPerClick) * 10, amountOfCoinsPerClick, 30);
}

function UppgradeButtonSize() {
    buttonSize = ShopUpgrade((buttonSize * buttonSize / 5) * 30 + 26, buttonSize, 15);
}

function UppgradeComboAmount() {
    comboAmount = ShopUpgrade((40 + 10 * comboAmount * comboAmount / 2), comboAmount, 20);
}

function UppgradeFadeTime() {
    fadeTime = ShopUpgrade((20 + 8 * fadeTime * fadeTime / 2), fadeTime, 20);
}

function UppgradeGoldenChance() {
    goldenChance = ShopUpgrade((100 * goldenChance * goldenChance / 2), goldenChance, 10);
}

function UppgradePassiveIncome() {
    passiveIncome = ShopUpgrade((100 * passiveIncome * passiveIncome / 2), passiveIncome, 20);
}