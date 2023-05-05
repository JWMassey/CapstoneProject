//Capstone Project - Jack Massey//

//The "Stage," where the game unfolds//
const stage = document.querySelector(`#stage`)

//Class Selection//
//Entire Class Selection "section" element
const classSelection = document.querySelector(`#classSelect`);

//Outline of player stats
const playerInfo = {
    name: "Ashe",
    class: "None",
    subclass: "None",
    maxHp: 0,
    hp: 0,
    maxMp: 0,
    mp: 0,
    pAttack: 0,
    pDefense: 0,
    mAttack: 0,
    mDefense: 0,
    speed: 0,
    spellsList: [],
    equipped: {},
    turn: playerTurn
}

//Base stats for allies (maximum of 3 allies)

let allyOne =  {
    name: "None",
    class: "None",
    maxHp: 0,
    hp: 0,
    maxMp: 0,
    mp: 0,
    pAttack: 0,
    pDefense: 0,
    mAttack: 0,
    mDefense: 0,
    speed: -1,
    spellsList: [],
    equipped: {},
    turn: skipTurn
} 
let allyTwo = {name: "None", class: "None", maxHp: 0, hp: 0, maxMp: 0, mp: 0, pAttack: 0, pDefense: 0, mAttack: 0, mDefense: 0, speed: -1, spellsList: [], equipped: {}, turn: skipTurn} 
let allyThree = {name: "None", class: "None", maxHp: 0, hp: 0, maxMp: 0, mp: 0, pAttack: 0, pDefense: 0, mAttack: 0, mDefense: 0, speed: -1, spellsList: [], equipped: {}, turn: skipTurn} 

//Base stat lineups for enemies (a maximum of 4 enemies may appear in battle)
let enemyOne = {
    name: "None",
    type: "None",
    maxHp: 0,
    hp: 0,
    maxMp: 0,
    mp: 0,
    pAttack: 0,
    pDefense: 0,
    mAttack: 0,
    mDefense: 0,
    speed: -1,
    turn: skipTurn 
}
let enemyTwo = {name: "None",type: "None",maxHp: 0,hp: 0,maxMp: 0,mp: 0,pAttack: 0,pDefense: 0,mAttack: 0,mDefense: 0,speed: -1,turn: skipTurn}
let enemyThree =  {name: "None",type: "None",maxHp: 0,hp: 0,maxMp: 0,mp: 0,pAttack: 0,pDefense: 0,mAttack: 0,mDefense: 0,speed: -1,turn: skipTurn}
let enemyFour =  {name: "None",type: "None",maxHp: 0,hp: 0,maxMp: 0,mp: 0,pAttack: 0,pDefense: 0,mAttack: 0,mDefense: 0,speed: -1,turn: skipTurn}

//Enemy Statblocks//
const dummy = {
    name: "Dummy",
    type: "None",
    maxHp: 10,
    hp: 10,
    maxMp: 0,
    mp: 0,
    pAttack: 0,
    pDefense: 0,
    mAttack: 0,
    mDefense: 0,
    speed: 0,
    turn: dummyTurn
}

//Player Inventories//
//Equipped Gear
playerInfo.equipped = {
    weapon: {
        name: `Nothing`,
        type: `Weapon` ,
        class: `None`,
        pDamage: `0`,
        mDamage: `0`,
        blessing: `Broken`
    },
    armor: {
        name: `Nothing`,
        type: `Armor`,
        class: `None`,
        pDefense: `0`,
        mDefense: `0`,
        blessing: `Broken`
    }
}
//Inventory of all unequipped gear
gearInv = [];

//Inventory of Combat Items
itemInv = [];

//Initialization
let locat = `Tutorial`
let xp = 0;
let money = 0;
let level = 0;

//Info initializations
let garyCount = 0;
let spireGwenCount = 0;
let glitchGwenCount = 0;

//Combat and Turns//
function getEncounter(){
    if (locat == `Tutorial` || locat == `Turian`){
        enemyOne = dummy
        enemyOne.hp = enemyOne.maxHp
        combat();
    }
}

function combat(){
    let turnOrder = [playerInfo, allyOne, allyTwo, allyThree, enemyOne, enemyTwo, enemyThree, enemyFour];
    for (i = turnOrder.length - 1; i > 0; i--){
        if ((turnOrder[i]).speed < 0){
            turnOrder.splice(i, 1)
        }
    }
    for (i = 0; i < turnOrder.length; i++){
        for (j = i; j < turnOrder.length - 1; j++){
            if (turnOrder[j].speed < turnOrder[j + 1].speed){
                let temp = turnOrder[j]
                turnOrder[j] = turnOrder[j+1]
                turnOrder[j+1] = temp
            }
        }
    }
    round = 1
    while (playerInfo.hp > 0 && (enemyOne.hp > 0 || enemyTwo.hp > 0 || enemyThree.hp > 0 || enemyFour.hp > 0)){
        console.log(`\nRound ${round}`);
        for (char of turnOrder){
            if (char.hp > 0){
                console.log(`${char.name}'s turn!`)
                char.turn()
            }
        }
        round++;
    }
    generateMenu()
}

function playerTurn(){
    stage.innerHTML = 
    `<h2> HELP </h2> <button class = "centered" id = "endTurn">Next Turn</button>`
    enemyOne.hp -= 5;
    const endTurn = document.querySelector(`#endTurn`)
    endTurn.addEventListener(`click`, () => {
        return;
    })
}

function dummyTurn(){
    stage.innerHTML = `<p class = "centered">The dummy sits there patiently, waiting for you to act.</p><button class = "centered" id = "endTurn">Next Turn</button>`
    const endTurn = document.querySelector(`#endTurn`)
    endTurn.addEventListener(`click`, () => {
        console.log(`Button pressed`)
    })
}

function skipTurn(){
    console.log(`Turn skipped.`)
}

//The buttons for picking a specified class
const warriorButton = document.querySelector(`#warrior`);
const rangerButton = document.querySelector(`#ranger`);
const mageButton = document.querySelector(`#mage`);

const stats = document.querySelector(`#stats`)

warriorButton.addEventListener(`click`, () => {
    playerInfo.class = "Warrior"
    playerInfo.maxHp = 30
    playerInfo.hp = playerInfo.maxHp
    playerInfo.maxMp = 5
    playerInfo.mp = playerInfo.maxMp
    playerInfo.pAttack = 6
    playerInfo.pDefense = 4
    playerInfo.mAttack = 1
    playerInfo.mDefense = 2
    playerInfo.speed = 2
    playerInfo.spellsList = [
        reinforce = {
            name: `Reinforce`,
            domain: `Protection`,
            cost: 2,
            description: `A simple spell to improve Physical Defense by +2 for the duration of the battle.`,
            target: `Self`
        },
        battleCry = {
            name: `Battle Cry`,
            domain: `Destruction`,
            cost: 3,
            description: `A simple spell to improve Physical Attack by +2 for the duration of the battle.`,
            target: `Self`
        }
    ]
    alert(`You have chosen the path of the Warrior. You pick up your trusty sword and shield and depart for Turian.`)
    playerInfo.equipped = {
        weapon: {
            name: `Traveler's Trusty Sword`,
            type: `Weapon` ,
            class: `Warrior`,
            pDamage: `3`,
            mDamage: `1`,
            blessing: `None`
        },
        armor: {
            name: `Traveler's Trusty Shield`,
            type: `Armor`,
            class: `Warrior`,
            pDefense: `3`,
            mDefense: `1`,
            blessing: `None`
        }
    }
    stage.innerHTML = ""
    generateTutorial()
})

rangerButton.addEventListener(`click`, () => {
    playerInfo.class = "Ranger"
    playerInfo.maxHp = 20
    playerInfo.hp = playerInfo.maxHp
    playerInfo.maxMp = 10
    playerInfo.mp = playerInfo.maxMp
    playerInfo.pAttack = 4
    playerInfo.pDefense = 2
    playerInfo.mAttack = 3
    playerInfo.mDefense = 2
    playerInfo.speed = 4
    playerInfo.spellsList = [
        rapidShots = {
            name: `Rapid Shots`,
            domain: `Destruction`,
            cost: 5,
            description: `Fires 2-5 arrows at the target.`,
            target: `Single Enemy`
        },
        hinder = {
            name: `Hinder`,
            domain: `Pestilence`,
            cost: 2,
            description: `Lowers target's Attack stats by -1`,
            target: `Single Enemy`
        }
    ]
    playerInfo.equipped = {
        weapon: {
            name: `Traveler's Trusty Bow`,
            type: `Weapon`,
            class: `Ranger`,
            pDamage: `2`,
            mDamage: `2`,
            blessing: `None`
        },
        armor: {
            name: `Traveler's Trusty Cloak`,
            type: `Armor`,
            class: `Ranger`,
            pDefense: `2`,
            mDefense: `2`,
            blessing: `None`
        }
    }
    alert(`You have chosen the path of the Ranger. You pick up your trusty bow and arrows and depart for Turian.`)
    stage.innerHTML = ""
    generateTutorial()
})

mageButton.addEventListener(`click`, () => {
    playerInfo.class = "Mage"
    playerInfo.maxHp = 15
    playerInfo.hp = playerInfo.maxHp
    playerInfo.maxMp = 20
    playerInfo.mp = playerInfo.maxMp
    playerInfo.pAttack = 1
    playerInfo.pDefense = 1
    playerInfo.mAttack = 6
    playerInfo.mDefense = 4
    playerInfo.speed = 3
    playerInfo.spellsList = [
        minorCure = {
            name: `Minor Cure`,
            domain: `Life`,
            cost: 2,
            description: `Restores a small amount of health to the target.`,
            target: `Single Ally`
        },
        manaBurst = {
            name: `Mana Burst`,
            domain: `Destruction`,
            cost: 5,
            description: `Releases a small burst of magical energy to damage the target`,
            target: `Single Enemy`
        },
        spark = {
            name: `Spark`,
            domain: `Fire`,
            cost: 3,
            description: `Shoots a small shower of sparks to damage the target`,
            target: `Single Enemy`
        }
    ]
    playerInfo.equipped = {
        weapon: {
            name: `Traveler's Trusty Tome`,
            type: `Weapon` ,
            class: `Mage`,
            pDamage: `1`,
            mDamage: `3`,
            blessing: `None`
        },
        armor: {
            name: `Traveler's Trusty Robes`,
            type: `Armor`,
            class: `Mage`,
            pDefense: `1`,
            mDefense: `3`,
            blessing: `None`
        }
    }
    alert(`You have chosen the path of the Mage. You pick up your trusty tome and depart for Turian.`)
    generateTutorial()
})
//End of Class Selection


//Tutorial
function generateTutorial(){
    stage.innerHTML = `
    <h3 class = "centered"> Do Tutorial? </h3>
    <div>As you approach the town of Turian, you see a small training dummy standing on the side of the road. Knowing your journey ahead will be perilous, maybe this would be a good time to hone your combat skills.</div>
    <p class = "centered">Would you like to do a combat tutorial?</p>
    <ul class = "centered">
        <button id = "doTutorial"> Yes </button>
        <button id = "skipTutorial"> No </button>
    </ul>`

    const doTutorial = document.querySelector(`#doTutorial`)
    doTutorial.addEventListener(`click`, () => {
        stage.innerHTML = `<p>Sadly, this tutorial hasn't been implemented yet, so you'll just have to go without.</p>
        <button id="endTutorial"> Sad... </button>`
        const endTutorial = document.querySelector(`#endTutorial`)
        endTutorial.addEventListener(`click`, () => {
            locat = `Turian`
            generateMenu()
        })
    })

    const skipTutorial = document.querySelector(`#skipTutorial`)
    skipTutorial.addEventListener(`click`, () => {
        stage.innerHTML = `<p>Yeah! You don't need a tutorial, this dummy wouldn't stand a chance against you!</p>
        <p>With your head held high, you continue the journey to Turian, knowing you don't need tutorials.</p> <button id = "endTutorial">Let's get going!</button>`
        const endTutorial = document.querySelector(`#endTutorial`)
        endTutorial.addEventListener(`click`, () => {
            locat = `Turian`
            generateMenu()
        })
    })
    

}

//Menus//
function generateMenu(){
    stage.innerHTML = `
    <h2 class="centered"> Menu: </h2>
    <ul> 
        <li> <button id="menuFirst"> Combat (Not Implemented) </button> </li>
        <li> <button id="menuSecond"> Information </button> </li>
        <li> <button id="menuThird"> Third Menu Option </button> </li>
    </ul>
    `
    const menuFirst = document.querySelector(`#menuFirst`)
    menuFirst.addEventListener(`click`, () => {
        getEncounter()
    })

    const menuSecond = document.querySelector(`#menuSecond`)
    menuSecond.addEventListener(`click`, () => {
        townInfo()
    })

    const menuThird = document.querySelector(`#menuThird`)
    menuThird.addEventListener(`click`, () => {
        alert(`Third Option`)
    })
}


function townInfo(){
    if (locat == `Tutorial`){
        alert(`This shouldn't be displaying`)
        generateMenu()
    } else if (locat == `Turian`){
        stage.innerHTML = `
        <button id = "aboutTurian"> Turian </button>
        <button id = "aboutSpire"> The Great Spire </button>
        <button id = "aboutGlitches"> Glitches </button>
        <button id = "aboutRaces"> Races of the World </button>
        <button id = "back"> Back </button>
        `
        const aboutTurian = document.querySelector(`#aboutTurian`)
        aboutTurian.addEventListener(`click`, () => {
            stage.innerHTML = `
            <p>A small town in ruins that surround The Great Spire. Despite being far from most other settlements, it's popular for travelers wishing to visit The Spire. The population is mostly Glitches, as this is rumored to be where the first Glitch was created.</p>
            <button id = "return"> Back </button>`

            const backButton = document.querySelector(`#return`)
            backButton.addEventListener(`click`, () => {
                townInfo();
            })
        })

        const aboutSpire = document.querySelector(`#aboutSpire`)
        aboutSpire.addEventListener(`click`, () => {
            stage.innerHTML = `
            <p>A small town in ruins that surround The Great Spire. Despite being far from most other settlements, it's popular for travelers wishing to visit The Spire. The population is mostly Glitches, as this is rumored to be where the first Glitch was created.</p>
            <button id = "return"> Back </button>`
            spireGwenCount = 1

            const backButton = document.querySelector(`#return`)
            backButton.addEventListener(`click`, () => {
                townInfo();
            })
        })
        const aboutGlitches = document.querySelector(`#aboutGlitches`)
        aboutGlitches.addEventListener(`click`, () => {
            stage.innerHTML = `
            <p>Glitches are people distorted by the effects of Gwendolyn. It is said that the first glitch, Gary, was distorted by Gwendolyn following a duel between the two. Glitches can be derived from any race, though typically Distorted Animals are referred to as Chimeras, while distorted humanoid races (Humans, Fiends, Beastkin, etc.) are called Glitches.</p>
            <button id = "return"> Back </button>`
            garyCount = 1
            glitchGwenCount = 1

            const backButton = document.querySelector(`#return`)
            backButton.addEventListener(`click`, () => {
                townInfo();
            })
        })
        const aboutRaces = document.querySelector(`#aboutRaces`)
        aboutRaces.addEventListener(`click`, () => {
            stage.innerHTML = `
            <p>The world of XXXXX is home to many intelligent humanoid species, including Humans, Fiends (Typically with red or purple skin and horns, often mischievous casters), Beastkin (A more tribal race, having features of animals common in the world, such as tails, fangs, or wings), Bau'kir (Have darker skin, typically dull grays. Common in the northern region of Taria), and Glitches (Any humanoid distorted by the effects of Gwendolyn).
            </p>
            <button id = "return"> Back </button>`

            const backButton = document.querySelector(`#return`)
            backButton.addEventListener(`click`, () => {
                townInfo();
            })
        })

        const back = document.querySelector(`#back`)
        back.addEventListener(`click`, () => {
            generateMenu()
        })

        if (garyCount == 1){
            const aboutGary = document.createElement(`button`)
            aboutGary.innerText = `Gary`
            back.insertAdjacentElement(`beforebegin`, aboutGary)
            aboutGary.addEventListener(`click`, () => {
                stage.innerHTML = `
                <p>The original Glitch, Gary was Distorted by Gwendolyn in an attempt to save his life following their duel. Most Glitches, especially in Turian, see Gary as a hero, just as responsible for their creation as Gwendolyn.
                </p>
                <button id = "return"> Back </button>`
    
                const backButton = document.querySelector(`#return`)
                backButton.addEventListener(`click`, () => {
                    townInfo();
                })
            })
        }

        if (spireGwenCount == 1 && glitchGwenCount == 1){
            const aboutGwen = document.createElement(`button`)
            aboutGwen.innerText = `Gwendolyn`
            back.insertAdjacentElement(`beforebegin`, aboutGwen)
            aboutGwen.addEventListener(`click`, () => {
                stage.innerHTML = `
                <p>Both the Elemental Lord of Flames and Lord of Distortion, Gwendolyn is a major deity, worshiped by most Glitches as they are seen as the cause for their creation. It is believed that they reside in The Spire, but no one has been able to confirm these rumors.</p>
                <button id = "return"> Back </button>`
    
                const backButton = document.querySelector(`#return`)
                backButton.addEventListener(`click`, () => {
                    townInfo();
                })
            })
        }
    }
}