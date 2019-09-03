let userXP;
let barXP;
let userLvl;
let totalNewStops;

function barPercent(Xp, Lvl){
    switch (true){
        case Lvl == 1 : 
            barXP = 0;
            break;
        case Lvl == 2 :
            barXP = 1000;
            break;
        default :
            break;
    }
    console.log(Math.floor(Xp/barXP));
    console.log(document.getElementById("levelbar").style.width = (Math.floor(parseFloat(Xp/barXP)))+"%")
}

function setLevel(XP){
    switch (true) {
        case (XP >= 1000):
            document.getElementById("levelnum").innerHTML = "2";
            userLvl = 2;
            break;
    
        default:
            document.getElementById("levelnum").innerHTML = "1";
            userLvl = 1;
            break;
    }
}

function getUserXP(){
    userXP = document.getElementById("inputbox").value;
    setLevel(userXP);
    barPercent(userXP,userLvl);
}

function main(){
    document.getElementById("inputbox").addEventListener("keyup", getUserXP);
    
}

main();