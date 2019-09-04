let userInput;
var progressBar = document.getElementById('progress');
let balance;
let raidsLeft;

//Function to comma delimate integers
function thousands_separators(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

//jQuery experimental
$(document).ready(function () {

    $('.welcome').delay(4000).fadeOut('fast');

    $('#igHandle').mouseover( function () { 
        bounce($('#igLogo'), 2, '10px', 200);
    });

    window.setInterval(function(){
        bounceLeft($('#hand'), 5, '-10px', 200);
    }, 10000);

    window.setInterval(function(){
        bounceLeft($('#motd-message'), 5, '10px', 200);
    }, 10000);

    $('.motd').on('click', () => {
        userInput = prompt('Please enter your total XP below:');
        $('#hand').html('&#128293;');
        $('#motd-message').text('Your total experience of ' + thousands_separators(userInput) + " is now being taken into account! Click me anytime to reset!");
        fetchLevelData(userInput);
    });

    /* Bounce - Code from Will Demaine @ https://stackoverflow.com/a/10363828 */
    function bounce(element, times, distance, speed) {
        for(i = 0; i < times; i++) {
            element.animate({marginTop: '-='+distance},speed)
                .animate({marginTop: '+='+distance},speed);
        }        
    }

    /* Above function modified for custom function */
    function bounceLeft(element, times, distance, speed) {
        for(i = 0; i < times; i++) {
            element.animate({marginLeft: '-='+distance},speed)
                .animate({marginLeft: '+='+distance},speed);
        }        
    }

});

//Runs when input bar is interacted with.
function setGenericData(level){ 
    var levelData = new Array(4);
    switch (true) {        
        case level == 1:
            levelData = [1,1000,0,1000];
            break;
        case level == 2:
            levelData = [2,2000,1000,3000];
            break;
        case level == 3:
            levelData = [3,3000,3000,6000];
            break;
        case level == 4:
            levelData = [4,4000,6000,10000];
            break;
        case level == 5:
            levelData = [5,5000,10000,15000];
            break;
        case level == 6:
            levelData = [6,6000,15000,21000];
            break;
        case level == 7:
            levelData = [7,7000,21000,28000];
            break;
        case level == 8:
            levelData = [8,8000,28000,36000];
            break;
        case level == 9:
            levelData = [9,9000,36000,45000];
            break;
        case level == 10:
            levelData = [10,10000,45000,55000];
            break;
        case level == 11:
            levelData = [11,10000,55000,65000];
            break;
        case level == 12:
            levelData = [12,10000,65000,75000];
            break;
        case level == 13:
            levelData = [13,10000,75000,85000];
            break;
        case level == 14:
            levelData = [14,15000,85000,100000];
            break;
        case level == 15:
            levelData = [15,20000,100000,120000];
            break;
        case level == 16:
            levelData = [16,20000,120000,140000];
            break;
        case level == 17:
            levelData = [17,20000,140000,160000];
            break;
        case level == 18:
            levelData = [18,25000,160000,185000];
            break;
        case level == 19:
            levelData = [19,25000,185000,210000];
            break;
        case level == 20:
            levelData = [20,50000,210000,260000];
            break;
        case level == 21:
            levelData = [21,75000,260000,335000];
            break;
        case level == 22:
            levelData = [22,100000,335000,435000];
            break;
        case level == 23:
            levelData = [23,125000,435000,560000];
            break;
        case level == 24:
            levelData = [24,150000,560000,710000];
            break;
        case level == 25:
            levelData = [25,190000,710000,900000];
            break;
        case level == 26:
            levelData = [26,200000,900000,1100000];
            break;
        case level == 27:
            levelData = [27,250000,1100000,1350000];
            break;
        case level == 28:
            levelData = [28,300000,1350000,1650000];
            break;
        case level == 29:
            levelData = [29,350000,1650000,2000000];
            break;
        case level == 30:
            levelData = [30,500000,2000000,2500000];
            break;
        case level == 31:
            levelData = [31,500000,2500000,3000000];
            break;
        case level == 32:
            levelData = [32,750000,3000000,3750000];
            break;
        case level == 33:
            levelData = [33,1000000,3750000,4750000];
            break;
        case level == 34:
            levelData = [34,1250000,4750000,6000000];
            break;
        case level == 35:
            levelData = [35,1500000,6000000,7500000];
            break;
        case level == 36:
            levelData = [36,2000000,7500000,9500000];
            break;
        case level == 37:
            levelData = [37,2500000,9500000,12000000];
            break;
        case level == 38:
            levelData = [38,3000000,12000000,15000000];
            break;
        case level == 39:
            levelData = [39,5000000,15000000,20000000];
            break;
        case level == 40:
            levelData = [40,0,20000000,20000000];
            break;
        default:
            levelData = [1,1000,0,1000];
            break;
    }
    setDataOnLevel(levelData[0], levelData[1], levelData[2], levelData[3]);
}

function setDataOnLevel(level, currentLevelXP, currentLevelTotalXP, totalNextLevelXP) { 
    //Affects MOTD.
    document.getElementById('hand').innerHTML = "&#10067;";
    document.getElementById('motd-message').innerHTML = "Didn't mean to click on that? You can always click here to input your total experience!";
    
    //Sets generic data.
    document.getElementById('curXPValue').innerHTML = thousands_separators(currentLevelTotalXP);
    document.getElementById('xpValue').innerHTML = thousands_separators(currentLevelXP) + " XP";
    //defaults progressbar.
    progressBar.style.width = "2%";

    //Tooltip information.
    document.getElementById('curXPSpan').innerHTML = "Below is the amount of experience you need to get to selected level.";
    if(level != 40){
        document.getElementById('nextLevelSpan').innerHTML = "The below experience is how much is required for level " + (level+1);
    }else{
        document.getElementById('nextLevelSpan').innerHTML = "Level 40 is the current max level on PokemonGO!"
    }

    //setRaidInfo
    if (level >= 5){
        document.getElementById('raidsImage').setAttribute('src', './img/t1-raids.svg');
        document.getElementById('raidValue').innerHTML = 'TIER1';
        setRaids(currentLevelXP);
    }else{
        document.getElementById('raidsLeft').innerHTML = "TRAINER LEVEL 5 IS REQUIRED FOR RAIDS.";
    }

    //setPokestopsInfo
    setPokestops(currentLevelXP, 'range');
}

//Runs on user input.
function run(){
    var value = document.getElementById('rangeInput').value;
    document.getElementById('rangeOutput').value = value;
   }

function fetchLevelData(userXP){ 
    var levelData = new Array(4);
    switch (true) {        
        case userXP < 1000:
            levelData = [1,1000,0,1000];
            break;
        case userXP < 3000 && userXP > 999:
            levelData = [2,2000,1000,3000];
            break;
        case userXP < 6000 && userXP > 2999:
            levelData = [3,3000,3000,6000];
            break;
        case userXP < 10000 && userXP > 5999:
            levelData = [4,4000,6000,10000];
            break;
        case userXP < 15000 && userXP > 9999:
            levelData = [5,5000,10000,15000];
            break;
        case userXP < 21000 && userXP > 14999:
            levelData = [6,6000,15000,21000];
            break;
        case userXP < 28000 && userXP > 20999:
            levelData = [7,7000,21000,28000];
            break;
        case userXP < 36000 && userXP > 27999:
            levelData = [8,8000,28000,36000];
            break;
        case userXP < 45000 && userXP > 35999:
            levelData = [9,9000,36000,45000];
            break;
        case userXP < 55000 && userXP > 44999:
            levelData = [10,10000,45000,55000];
            break;
        case userXP < 65000 && userXP > 54999:
            levelData = [11,10000,55000,65000];
            break;
        case userXP < 75000 && userXP > 64999:
            levelData = [12,10000,65000,75000];
            break;
        case userXP < 85000 && userXP > 74999:
            levelData = [13,10000,75000,85000];
            break;
        case userXP < 100000 && userXP > 84999:
            levelData = [14,15000,85000,100000];
            break;
        case userXP < 120000 && userXP > 99999:
            levelData = [15,20000,100000,120000];
            break;
        case userXP < 140000 && userXP > 119999:
            levelData = [16,20000,120000,140000];
            break;
        case userXP < 160000 && userXP > 139999:
            levelData = [17,20000,140000,160000];
            break;
        case userXP < 185000 && userXP > 159999:
            levelData = [18,25000,160000,185000];
            break;
        case userXP < 210000 && userXP > 184999:
            levelData = [19,25000,185000,210000];
            break;
        case userXP < 260000 && userXP > 209999:
            levelData = [20,50000,210000,260000];
            break;
        case userXP < 335000 && userXP > 259999:
            levelData = [21,75000,260000,335000];
            break;
        case userXP < 435000 && userXP > 334999:
            levelData = [22,100000,335000,435000];
            break;
        case userXP < 560000 && userXP > 434999:
            levelData = [23,125000,435000,560000];
            break;
        case userXP < 710000 && userXP > 559999:
            levelData = [24,150000,560000,710000];
            break;
        case userXP < 900000 && userXP > 709999:
            levelData = [25,190000,710000,900000];
            break;
        case userXP < 1100000 && userXP > 899999:
            levelData = [26,200000,900000,1100000];
            break;
        case userXP < 1350000 && userXP > 1099999:
            levelData = [27,250000,1100000,1350000];
            break;
        case userXP < 1650000 && userXP > 1349999:
            levelData = [28,300000,1350000,1650000];
            break;
        case userXP < 2000000 && userXP > 1649999:
            levelData = [29,350000,1650000,2000000];
            break;
        case userXP < 2500000 && userXP > 1999999:
            levelData = [30,500000,2000000,2500000];
            break;
        case userXP < 3000000 && userXP > 2499999:
            levelData = [31,500000,2500000,3000000];
            break;
        case userXP < 3750000 && userXP > 2999999:
            levelData = [32,750000,3000000,3750000];
            break;
        case userXP < 4750000&& userXP > 3749999:
            levelData = [33,1000000,3750000,4750000];
            break;
        case userXP < 6000000&& userXP > 4749999:
            levelData = [34,1250000,4750000,6000000];
            break;
        case userXP < 7500000 && userXP > 5999999:
            levelData = [35,1500000,6000000,7500000];
            break;
        case userXP < 9500000 && userXP > 7499999:
            levelData = [36,2000000,7500000,9500000];
            break;
        case userXP < 12000000 && userXP > 9499999:
            levelData = [37,2500000,9500000,12000000];
            break;
        case userXP < 15000000 && userXP > 11999999:
            levelData = [38,3000000,12000000,15000000];
            break;
        case userXP < 20000000 && userXP > 14999999:
            levelData = [39,5000000,15000000,20000000];
            break;
        case userXP >= 20000000:
            levelData = [40,0,20000000,20000000];
            break;
        default:
            levelData = [1,1000,0,1000];
            break;
    }
    setData(levelData[0], levelData[1], levelData[2], levelData[3]);
}

function setData(level, currentLevelXP, currentLevelTotalXP, totalNextLevelXP){
    let currentXP = userInput - currentLevelTotalXP;
    let balanceXP = currentLevelXP - currentXP;
    let percentage = ((currentXP/currentLevelXP)*100);

    if(level == 40){
        document.getElementById('rangeOutput').innerHTML = level;
        document.getElementById('rangeInput').value = level;
    }else{
        document.getElementById('rangeOutput').innerHTML = level + " &#10142; " + (level+1);
        document.getElementById('rangeInput').value = level;
    }
    document.getElementById('curXPValue').innerHTML = thousands_separators(currentXP) + " XP";
    document.getElementById('xpValue').innerHTML = thousands_separators(balanceXP) + " XP";
    if(userInput < 20000000){
        progressBar.style.width =  percentage + "%";
        document.getElementById('nextLevelSpan').innerHTML = "You are " + Math.floor(percentage) + "% into level " + level + "!";
    }else{
        progressBar.style.width =  "100%";
        document.getElementById('nextLevelSpan').innerHTML = "You are maxed out! More services are under development. Stay tuned!";
        document.getElementById('curXPValue').innerHTML = thousands_separators(20000000) + " XP";
    }
    
    //setRaidInfor
    if (level >= 5){
    setRaids(balanceXP);
    }

    //setPokestopsInfo
    setPokestops(balanceXP);
}

//Functions that set raids left to level up.
function setRaids(balanceXP, raidTier){
    let raidsLeft;
    if(balanceXP != null){
        balance = balanceXP;

        //On user input.
        raidsLeft = Math.floor(balance/3000) + 1;
    }else{
        //On tier cycle.
        var raidData = [3000, 3500, 4000, 5000, 10000];
        let raidXP = raidData[raidTier-1];
        raidsLeft = Math.floor(balance/raidXP) + 1;
    }
    if(balance == 0){
        raidsLeft = "DID YOU CATCH'EM ALL?";
    }
    document.getElementById('raidsLeft').innerHTML = raidsLeft;

}

//Cycle raids when raid tier selector is interacted with.
function cycleRaids() { 
    let imgPath = document.getElementById('raidsImage').getAttribute('src');
    let newImgPath;
    let raidText;
    if(document.getElementById('rangeOutput').value > 5){
        switch (true) {
            case imgPath == './img/t1-raids.svg':
                newImgPath = './img/t2-raids.svg';
                raidText = "TIER2";
                setRaids(null,2);
                break;
            case imgPath == './img/t2-raids.svg':
                newImgPath = './img/t3-raids.svg';
                raidText = "TIER3";
                setRaids(null,3);
                break;
            case imgPath == './img/t3-raids.svg':
                newImgPath = './img/t4-raids.svg';
                raidText = "TIER4";
                setRaids(null,4);
                break; 
            case imgPath == './img/t4-raids.svg':
                newImgPath = '/img/t5-ex-raids.svg';
                raidText = "TIER5/EX";
                setRaids(null,5);
                break;
            default:
                newImgPath = './img/t1-raids.svg';
                raidText = "TIER1";
                setRaids(null,1);
                break;
        }
        document.getElementById('raidsImage').setAttribute('src', newImgPath);
        document.getElementById('raidValue').innerHTML = raidText;
    }
 }

//Sets new pokestop left to spin.
function setPokestops(balanceXP, inputType) {
    if(inputType != 'range'){
        let stops = Math.floor(balanceXP/250) + 1;
        document.getElementById('stopValue').innerHTML = stops;
    }else{
        let stops = Math.floor(balanceXP/250);
        document.getElementById('stopValue').innerHTML = stops;
    }

}