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
    side: "Ally",
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
    turn: tutorialTurn
}

//Base stats for allies (maximum of 3 allies) //Only 1v1 implemented currently

let allyOne =  {
    name: "None",
    class: "None",
    side: "Ally",
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
let allyTwo = {name: "None", class: "None",  side: "Ally", maxHp: 0, hp: 0, maxMp: 0, mp: 0, pAttack: 0, pDefense: 0, mAttack: 0, mDefense: 0, speed: -1, spellsList: [], equipped: {}, turn: skipTurn} 
let allyThree = {name: "None", class: "None",  side: "Ally", maxHp: 0, hp: 0, maxMp: 0, mp: 0, pAttack: 0, pDefense: 0, mAttack: 0, mDefense: 0, speed: -1, spellsList: [], equipped: {}, turn: skipTurn} 

//Base stat lineups for enemies (a maximum of 4 enemies may appear in battle) // Only 1v1 implemented currently
let enemyOne = {
    name: "None",
    type: "None",
    side: "Enemy",
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
let enemyTwo = {name: "None",type: "None",side: "Enemy",maxHp: 0,hp: 0,maxMp: 0,mp: 0,pAttack: 0,pDefense: 0,mAttack: 0,mDefense: 0,speed: -1,turn: skipTurn}
let enemyThree =  {name: "None",type: "None",side: "Enemy",maxHp: 0,hp: 0,maxMp: 0,mp: 0,pAttack: 0,pDefense: 0,mAttack: 0,mDefense: 0,speed: -1,turn: skipTurn}
let enemyFour =  {name: "None",type: "None",side: "Enemy",maxHp: 0,hp: 0,maxMp: 0,mp: 0,pAttack: 0,pDefense: 0,mAttack: 0,mDefense: 0,speed: -1,turn: skipTurn}

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
        pDamage: 0,
        mDamage: 0,
        blessing: `Broken`
    },
    armor: {
        name: `Nothing`,
        type: `Armor`,
        class: `None`,
        pDefense: 0,
        mDefense: 0,
        blessing: `Broken`
    }
}
//Inventory of all unequipped gear
gearInv = [];

//Inventory of Combat Items
itemInv = [`Pebble`];

//Initialization
let locat = `Tutorial`
let xp = 0;
let money = 0;
let level = 0;
let turnOrder = 0
let tTurnCount = 1 

//Info initializations
let garyCount = 0;
let spireGwenCount = 0;
let glitchGwenCount = 0;

//Combat and Turns//
function getEncounter(){
    if (locat == `Tutorial`){
        enemyOne = dummy
        enemyOne.hp = enemyOne.maxHp
        combat();
    } else {
        alert(`There's no one here to fight`)
    }
}

function combat(){
    turnOrder = [playerInfo, allyOne, allyTwo, allyThree, enemyOne, enemyTwo, enemyThree, enemyFour];
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

function tutorialTurn(){
    tTurnCount == 1
    if (tTurnCount = 1){
        alert(`Welcome to the Tutorial! Through this, you'll learn the basics of combat with our friend, Training Dummy! (Press Enter or click OK to continue)`)
        alert(`During combat, you have 5 actions: 
        \tAttacking
        \tDefending
        \tCasting Spells
        \tUsing Items
        \tChecking your opponent's stats`)
    }
    action = "None"
    while (action != `EndTurn`){
        if (tTurnCount == 1){
            action = prompt(`First, try Attacking! To attack, input "1", "a", or "attack." (Not case sensitive.)`)
            action = action.toLowerCase()
            if (action == `1` || action == `a` || action == `attack`){
                if (playerInfo.class == `Warrior`){
                    alert(`You swing your sword at the Dummy, causing it to wobble back and forth from the impact.`)
                } else if (playerInfo.class == `Ranger`){
                    alert(`You fire an arrow at the Dummy. It sticks into its chest, making it wobble a bit.`)
                } else {
                    alert(`You smack the Dummy with your tome. It wobbles slightly from the impact.`)
                }
                tTurnCount++;
            } else {
                alert(`Not quite! Try to Attack first.`)
            }
        }
        else if (tTurnCount == 2){
            action = prompt(`Second, there's Defending. While your armor will block some damage by default, you can block much more if you Defend. To defend, input "2", "d", or "defend."`)
            action = action.toLowerCase()
            if (action == `2` || action == `defend` || action == `defend`){
                alert(`You brace yourself for the Dummy's attack. The dummy does not strike back.`)
                tTurnCount++;
            } else {
                alert(`Not quite! Try to Defend.`)
            }
        }
        else if (tTurnCount == 3){
            action = prompt(`Third, you can cast Spells. Spells have a variety of effects, including healing, damaging, and buffing. All spells consume MP. MP regenerates after each fight, so don't be afraid to cast spells. To open the Spell menu, enter "3", "s", or "spell."`)
            action = action.toLowerCase()
            if (action == "3" || action == "m" || action == "magic"){
                if (selectSpell()){
                    tTurnCount++;
                } else {
                    alert(`Please cast a spell.`)
                }
            }
        }
        else if (tTurnCount == 4){
            action = prompt(`Next, you'll learn how to use Items. Items have a variety of effects like spells, but can only be used once. Items can deal damage, restore health or MP, and apply buffs or debuffs. To use an Item during battle, enter "4", "i", or "item."`)
            if (action == "4" || action == "i" || action == "item"){
                if (selectItem()){
                    tTurnCount++;
                } else {
                    alert(`Please use an item`)
                }
            }
        }
        else if (tTurnCount == 5){
            action = prompt(`Finally, you can CHECK your opponent's stats. This can be useful since it will let you know what kind of attacks work best against your enemy. To Check, enter "5", "c", or "check"`)
            if (action == "5" || action == "c" || action == "check"){
                alert(`Enemy Info:
                \tName: ${enemyOne.name}
                \tType: ${enemyOne.type}
                \tHealth: ${enemyOne.hp} / ${enemyOne.maxHp}
                \tAttack:
                \t\tPhysical: ${enemyOne.pAttack}
                \t\tMagical: ${enemyOne.mAttack}
                \tDefense:
                \t\tPhysical: ${enemyOne.pDefense}
                \t\tMagical: ${enemyOne.mDefense}
                \tSpeed: ${enemyOne.speed}
                `)
                tTurnCount++
            }
        } else {
            alert(`That's all you need to know about Combat! Be warned, in real combat the enemy won't be as kind as Training Dummy. You can do one action (Attack, Defend, Cast Spells, or Use Items) during your turn. Checking an enemy does not use your turn.`)
            action = "EndTurn"
            enemyOne.hp = 0
        }
    }
}
function playerTurn(){
    let action = "None"
    while (action != `EndTurn`){
        action = prompt(`Enter the action you wish to take:
        1) [A]ttack
        2) [D]efend
        3) [S]pell
        4) [I]tem
        5) [C]heck
        `)
        action = action.toLowerCase()
        if (action == `a` || action == `attack` || action == `1`){
            let damage = Math.round((playerInfo.pAttack + playerInfo.equipped.weapon.pDamage) * 0.5) + 1
            damage -= (enemyOne.pDefense)
            if (damage < 1){
                alert(`${enemyOne.name} blocked your attack!`)
            } else {
                enemyOne.hp -= damage
                if (enemyOne.hp <= 0) {
                    alert(`You attack ${enemyOne.name}! You deal ${damage} damage, defeating it!`)
                } else {
                    alert(`You attack ${enemyOne.name}! You deal ${damage} damage. It's now at ${enemyOne.hp}`)
                }
            }
        }
        action = "EndTurn"
    }
}

function selectSpell(){
    let spells = `Current MP: ${playerInfo.mp}\nSpells:\n`
    let findSpell = true
    for (i = 1; i <= playerInfo.spellsList.length; i++){
        
        spells += `  ${i}) ${playerInfo.spellsList[i - 1].name}, MP Cost: ${playerInfo.spellsList[i - 1].cost}\n`
    }
    spells += `Enter the NUMBER of the spell you want to cast enter -1 to go back:`
    while (findSpell){
        let casting = prompt(spells)
        if (casting == -1){
            return 0
        } else {
            parseInt(casting)
            if (!casting){
                alert(`Not a valid spell number.`)   
            } else {
                casting--
                if (casting < 0 || casting >= playerInfo.spellsList.length){
                    alert(`Not a valid spell number.`)
                } else if (playerInfo.spellsList[casting].cost > playerInfo.mp) {
                    alert(`You don't have enough MP to cast this spell.`)
                } else {
                    findSpell = false
                    castSpell(playerInfo.spellsList[casting])
                    return 1
                }
            }
        }
    }
}

function castSpell(spell){
    alert(`Not Implemented`)
}

function selectItem(){
    if (itemInv.length == 0){
        alert(`You have no items!`)
    } else {
        let findItem = true
        while (findItem){
            let items = "Items: \n";
            for (i = 1; i <= itemInv.length; i++){
                items += `  ${i}) ${itemInv[i-1]}\n`
            }
            items += `Enter the NUMBER of the item you wish to use. Enter -1 to go back.`
            let using = prompt(items)
            if (using == -1){
                return 0
            } else {
                parseInt(using)
                using--
                if (using < 0 || using >= itemInv.length){
                    alert(`Invalid Item Number`)
                } else {
                    findItem = false
                    useItem(itemInv[using])
                    return 1
                }
            }
        } 
    }
}

function useItem(item){
    alert(`NOT IMPLEMENTED`)
}

function dummyTurn(){
    alert(`The dummy sits there patiently.`)
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
            pDamage: 3,
            mDamage: 1,
            blessing: `None`
        },
        armor: {
            name: `Traveler's Trusty Shield`,
            type: `Armor`,
            class: `Warrior`,
            pDefense: 3,
            mDefense: 1,
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
            pDamage: 2,
            mDamage: 2,
            blessing: `None`
        },
        armor: {
            name: `Traveler's Trusty Cloak`,
            type: `Armor`,
            class: `Ranger`,
            pDefense: 2,
            mDefense: 2,
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
            pDefense: 1,
            mDefense: 3,
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
        stage.innerHTML = `<p>The dummy sits there patiently waiting, letting you learn the ropes.</p>
        <button id="endTutorial"> Thanks, dummy! </button>`
        const endTutorial = document.querySelector(`#endTutorial`)
        endTutorial.addEventListener(`click`, () => {
            getEncounter()
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
    playerInfo.turn = playerTurn
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
        infoMenu()
    })

    const menuThird = document.querySelector(`#menuThird`)
    menuThird.addEventListener(`click`, () => {
        alert(`Third Option`)
    })
}

function infoMenu(){
    stage.innerHTML = `<h2 class = "centered"> Information </h2>
    <ul>
        <li> <button id="townInfo"> Town Info</button> </li>
        <li> <button id="stats"> Player Stats</button> </li>
        <li> <button id="back"> Back </button> </li>
    </ul>`
    const tInfoButton = document.querySelector(`#townInfo`)
    tInfoButton.addEventListener(`click`, () => {townInfo()})

    const statsButton = document.querySelector(`#stats`)
    statsButton.addEventListener(`click`, () => {getStats()})

    const back = document.querySelector(`#back`)
    back.addEventListener(`click`, () => {generateMenu()})
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
            <p>Turian is a relatively poor town, having very little trade with any other towns. They survive almost exclusively off of the crops they produce.</p>
            <button id = "return"> Back </button>`

            const backButton = document.querySelector(`#return`)
            backButton.addEventListener(`click`, () => {
                townInfo();
            })
        })

        const aboutSpire = document.querySelector(`#aboutSpire`)
        aboutSpire.addEventListener(`click`, () => {
            stage.innerHTML = `
            <p>It is said that The Spire is the home of Gwendolyn, Lord of Distortion. Guarded by a number of Chimeras and an Ancient, no traveler has successfully reached the Spire and returned to confirm these rumors. Many people take the Chimeras themselves as proof, as that means that Gwendolyn must've distorted the creatures near the Spire.</p>
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
            <p>The process of "distorting" someone into a Glitch is supposedly very painful, though Glitches never have memories of the distortion or any prior events. Strangely, distortion is genetic, as children of a Glitch will also be a Glitch. This fact is why Glitches are deemed a separate race.</p>
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
            <p>The world of Fivexa is home to many intelligent humanoid species, including (but not limited to):
            <ul>
                <li>Humans - Fairly average in terms of size and build. </li>
                <li>Fiends - Typically with red or purple skin and horns, often mischievous casters. </li>
                <li>Beastkin - A more tribal race, having features of animals common in the world, such as tails, fangs, or wings.</li>
                <li>Bau'kir - Have darker skin, typically dull grays. Common in the northern region of Taria.</li>
                <li>Glitches - Any humanoid "distorted" by the effects of Gwendolyn. The easiest way to identify a Glitch is that they always have one Fiend-like horn. (If distorted from a Fiend, one horn will grow to be significantly larger than the other.)</li>
            </ul>
            </p>
            <button id = "return"> Back </button>`
            //Thanks to Miles for the name Fivexa
            const backButton = document.querySelector(`#return`)
            backButton.addEventListener(`click`, () => {
                townInfo();
            })
        })

        const back = document.querySelector(`#back`)
        back.addEventListener(`click`, () => {
            infoMenu()
        })

        if (garyCount == 1){
            const aboutGary = document.createElement(`button`)
            aboutGary.innerText = `Gary`
            back.insertAdjacentElement(`beforebegin`, aboutGary)
            aboutGary.addEventListener(`click`, () => {
                stage.innerHTML = `
                <p>The original Glitch, Gary was Distorted by Gwendolyn in an attempt to save his life following their duel. Most Glitches, especially in Turian, see Gary as a hero, just as responsible for their creation as Gwendolyn. Sadly, while Gary is often regarded as the first Glitch, there are very few records of his existence and even fewer that prove Gary was the first to be distorted.</p>
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

function getStats(){
    stage.innerHTML = `
    <h2 class = "centered"> Player Stats </h2>
    <ul>
        <li> Name: ${playerInfo.name} </li>
        <li> Class: ${playerInfo.class}</li>
        <ul>
            <li> \tSubclass: ${playerInfo.subclass} </li>
        </ul>
        <li> Attack: </li> 
        <ul>
            <li> Physical: ${playerInfo.pAttack} </li>
            <li> Magical: ${playerInfo.mAttack} </li>
        </ul>
        <li> Defense: </li> 
        <ul>
            <li> Physical: ${playerInfo.pDefense} </li>
            <li> Magical: ${playerInfo.mDefense} </li>
        </ul>
        <li> Speed: ${playerInfo.speed} </li>
    </ul>
    <button id="back"> Back </button>
    `
    const back = document.querySelector(`#back`)
    back.addEventListener(`click`, () => {
        infoMenu()
    })
}