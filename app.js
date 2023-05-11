//Capstone Project - Jack Massey//

//The "Stage," where the game unfolds//
const stage = document.querySelector(`#stage`)

//Class Selection//
//Entire Class Selection "section" element
const classSelection = document.querySelector(`#classSelect`);

//Getting player name
let getName = ""
while (getName == ""){
    getName = prompt(`Enter your name, traveler: `)
    getName = getName.trim()
    //Used for several name based Easter Eggs
    let nCheck = getName.toLowerCase()
    if (nCheck == `verglas`){
        alert(`You aren't one worth of such title.`)
        getName = ""
    } else if (nCheck == `gary`){
        alert(`A fan of the Legendary Gary, I see.`)
    } else if (nCheck == `traveler`){
        alert(`Ah yes. Very original.`)
    } else if (nCheck == `jack`) {
        alert(`Hey, that's me!`)
    } else if (nCheck == `mr riley` || nCheck == `mrriley` || nCheck == `mr. riley` || nCheck == `mr.riley`){
        alert(`Thank you for being a wonderful teacher. None of this site would've been possible without your help. I really enjoyed this class and it taught me a lot. I hope you enjoy this little project.`)
    } else if (nCheck == `miles`){
        alert(`Hi! Hope you enjoy this little game, Doctor.`)
    } else if (nCheck == `jim`){
        alert(`J I M`)
    }
}

//Outline of player stats
const playerInfo = {
    name: getName,
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
    blocking: 0,
    spellsList: [],
    equipped: {},
    buffs: {
        pAtk: 0,
        mAtk: 0,
        pDef: 0,
        mDef: 0,
    },
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
    buffs: {
        pAtk: 0,
        mAtk: 0,
        pDef: 0,
        mDef: 0
    },
    turn: skipTurn 
}
let enemyTwo = {name: "None",type: "None",side: "Enemy",maxHp: 0,hp: 0,maxMp: 0,mp: 0,pAttack: 0,pDefense: 0,mAttack: 0,mDefense: 0,speed: -1,turn: skipTurn}
let enemyThree =  {name: "None",type: "None",side: "Enemy",maxHp: 0,hp: 0,maxMp: 0,mp: 0,pAttack: 0,pDefense: 0,mAttack: 0,mDefense: 0,speed: -1,turn: skipTurn}
let enemyFour =  {name: "None",type: "None",side: "Enemy",maxHp: 0,hp: 0,maxMp: 0,mp: 0,pAttack: 0,pDefense: 0,mAttack: 0,mDefense: 0,speed: -1,turn: skipTurn}

//Enemy Statblocks//
const statless = {name: "None",type: "None",side: "Enemy",maxHp: 0,hp: 0,maxMp: 0,mp: 0,pAttack: 0,pDefense: 0,mAttack: 0,mDefense: 0,speed: -1, buffs: {pAtk: 0, mAtk: 0, pDef: 0, mDef: 0},turn: skipTurn}
const dummy = {
    name: "Dummy",
    type: "None",
    maxHp: 100,
    hp: 100,
    maxMp: 0,
    mp: 0,
    pAttack: 0,
    pDefense: 0,
    mAttack: 0,
    mDefense: 0,
    speed: 5,
    buffs: {
        pAtk: 0,
        mAtk: 0,
        pDef: 0,
        mDef: 0
    },
    turn: dummyTurn
}

const strawSpider = {
    name: "Straw Spider",
    type: "Natural",
    maxHp: 15,
    hp: 15,
    maxMp: 5,
    mp: 5,
    pAttack: 2,
    pDefense: 1,
    mAttack: 2,
    mDefense: 3,
    speed: 2,
    buffs: {
        pAtk: 0,
        mAtk: 0,
        pDef: 0,
        mDef: 0
    },
    turn: strawSpiderTurn
}

const scarecrow = {
    name: "Scarecrow",
    type: "Natural",
    maxHp: 12,
    hp: 12,
    maxMp: 0,
    mp: 0,
    pAttack: 4,
    pDefense: 1,
    mAttack: 0,
    mDefense: 1,
    speed: 1,
    buffs: {
        pAtk: 0,
        mAtk: 0,
        pDef: 0,
        mDef: 0
    },
    turn: scarecrowTurn
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
let level = 1;
let xp = 0;
let xpToLevel = 50
let money = 25;
let turnOrder = []
let tTurnCount = 1 

//Quest Initializations//
//Turian//
let turQuestCheck = 0
let scarecrowKills = 0

//Info Initializations
let garyCount = 0;
let spireGwenCount = 0;
let glitchGwenCount = 0;

//Combat and Turns//
function getEncounter(){
    if (locat == `Tutorial`){
        enemyOne = dummy
        enemyOne.hp = enemyOne.maxHp
        combat(0, 0, 0, 0, "dummy");
    } else {
        let randEnc = Math.floor(Math.random() * 2)
        if (randEnc == 0){
            alert(`You get attacked by a strange spider made of straw and covered in ice.`)
            enemyOne = strawSpider
            enemyOne.hp = enemyOne.maxHp
            combat(4, 5, 3, 2, "sSpider")
        } else {
            alert(`You get attacked by a living scarecrow!`)
            enemyOne = scarecrow
            enemyOne.hp = enemyOne.maxHp
            combat(7, 3, 4, 3, "scarecrow")
        }
    }
}

function combat(baseGold, goldRange, baseXp, xpRange, lootTable){
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
    if (playerInfo.hp > 0){
        alert(`You win!\n${getDrops(baseGold, goldRange, baseXp, xpRange, lootTable)}`)
        playerInfo.buffs.pAtk = 0
        playerInfo.buffs.mAtk = 0
        playerInfo.buffs.pDef = 0
        playerInfo.buffs.mDef = 0
        playerInfo.mp = playerInfo.maxMp
        if (turQuestCheck == 1 && enemyOne.name == "Scarecrow"){
            scarecrowKills++
            if (scarecrowKills == 1){
                alert(`[Quest: Killed 1 Scarecrow. Go to the Quest Menu to finish the quest]`)
            }
        }
        generateMenu()
    }
}

function getDrops(baseGold, goldRange, baseXp, xpRange, lootTable){
    let getGold = Math.round(Math.random() * goldRange) + baseGold
    let getXp = Math.round(Math.random() * xpRange) + baseXp
    money += getGold
    xp += getXp
    let lootMessage = ``
    lootMessage += `You gain ${getGold} gold and ${getXp} experience.`
    const dropLuck = Math.floor(Math.random() * 101)
    if (lootTable == `sSpider`){
        if (dropLuck >= 65){
            if (playerInfo.class == `Warrior`){
	            gearInv.push({
                Name: `Frozen Straw Shield`,
                class: `Warrior`,
                type: `Armor`,
                pDefense: `2`,
                mDamage: `3`,
                blessing: `None`})
                lootMessage += `\nYou gained a [Frozen Straw Shield].`
           } else if (playerInfo.class == `Ranger`){
                    gearInv.push({
                    name: `Icy Straw Knives`,
                    class: `Ranger`,
                    type: `Weapon`,
                    pDamage: `2`,
                    mDamage: `3`,
                    blessing: `None`})
                    lootMessage += `\nYou gained a set of [Icy Straw Knives].`
            } else {
                gearInv.push({
                name: `Frozen Straw Staff`,
                class: `Mage`,
                type: `Weapon`,
                pDamage: `1`,
                mDamage: `3`,
                blessing: `None`})
                lootMessage += `\nYou gained a [Frozen Straw Staff].`
            }
        }
        if (dropLuck <= 80 && dropLuck  >= 50){
            itemInv.push(`Sharpened Straw`)
            lootMessage += `\nYou gained a [Sharpened Straw].`
        }
    } else if (lootTable = 'scarecrow'){
        if (dropLuck <= 70 && dropLuck  >= 50){
            itemInv.push(`Sharpened Straw`)
            lootMessage += `\nYou gained a [Sharpened Straw].`
        }
    }
    return lootMessage;
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
            action = prompt(`First, try Attacking! To attack, input "1", "a", or "attack." (Not case sensitive.)`).toLowerCase()
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
            action = prompt(`Second, there's Defending. While your armor will block some damage by default, you can block much more if you Defend. To defend, input "2", "d", or "defend."`).toLowerCase()
            if (action == `2` || action == `d` || action == `defend`){
                alert(`You brace yourself for the Dummy's attack. The dummy does not strike back.`)
                tTurnCount++;
            } else {
                alert(`Not quite! Try to Defend.`)
            }
        }
        else if (tTurnCount == 3){
            action = prompt(`Third, you can cast Spells. Spells have a variety of effects, including healing, damaging, and buffing. All spells consume MP. MP regenerates after each fight, so don't be afraid to cast spells. To open the Spell menu, enter "3", "s", or "spell."`).toLowerCase()
            if (action == "3" || action == "s" || action == "spell" || action == `spells`){
                if (selectSpell()){
                    tTurnCount++;
                } else {
                    alert(`Please cast a spell.`)
                }
            } else {
                alert(`Not quite, try to Cast a Spell`)
            }
        }
        else if (tTurnCount == 4){
            action = prompt(`Next, you'll learn how to use Items. Items have a variety of effects like spells, but can only be used once. Items can deal damage, restore health or MP, and apply buffs or debuffs. To use an Item during battle, enter "4", "i", or "item."`).toLowerCase()
            if (action == "4" || action == "i" || action == "item" || action == `items`){
                if (selectItem()){
                    tTurnCount++;
                } else {
                    alert(`Please use an item`)
                }
            } else {
                alert(`Not quite, try to Use an Item`)
            }
        }
        else if (tTurnCount == 5){
            action = prompt(`Finally, you can CHECK your opponent's stats. This can be useful since it will let you know what kind of attacks work best against your enemy. To Check, enter "5", "c", or "check"`).toLowerCase()
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
            } else {
                alert(`Not quite, try to Check.`)
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
    playerInfo.blocking = 0
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
            let dmgVar = (Math.floor(Math.random() * 8) + 5) / 10 
            //If the generated value is 1.2, changes it to 1.5 declaring it is a "Crit" 
            if (dmgVar >= 1.2){
                dmgVar = 1.5
                alert(`Critical Hit!`)
            }
            let damage = Math.round((playerInfo.pAttack + playerInfo.equipped.weapon.pDamage) * dmgVar) + 1
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
            action = "EndTurn"
        } else if (action == `d` || action == `defend` || action == `2`){
            let baseBlock = Math.max(((playerInfo.pDefense + playerInfo.equipped.armor.pDefense) / 2), (playerInfo.mDefense + playerInfo.equipped.armor.mDefense) / 2)
            let blockVar = (Math.floor(Math.random() * 5) + 7) / 10 // Creates a random number from 0.7 to 1.1
            playerInfo.blocking = Math.round(baseBlock * blockVar)
            alert(`You brace yourself for the oncoming hit`)
            action = "EndTurn"
        } else if (action == `s` || action == `spell` || action == `spells` || action == `3`){
            if (selectSpell()){
                action = "EndTurn"
            }
        } else if (action == `i` || action == `item` || action == `items` || action == `4`){
            if (selectItem()){
                action = "EndTurn"
            }
        } else if (action == `c` || action == `check` || action == `5`){
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
        }
    }
}
function selectSpell(){
    let spells = `Current MP: ${playerInfo.mp}\nSpells:\n`
    let findSpell = true

    function castSpell(spell){
        //Warrior Spells//
        if (spell.name == "Reinforce"){
            playerInfo.buffs.pDef += 2
            alert(`You cast [Reinforce]! Your Physical Defense rises.`)
        } else if (spell.name == "Battle Cry"){
            playerInfo.buffs.pAtk += 2
            alert(`You cast [Battle Cry]! Your Physical Attack rises.`)
        //Ranger Spells//
        } else if (spell.name == "Rapid Shots"){
            const hits = Math.floor(Math.random() * 4) + 2
            let dmg = 0
            for (i = 0; i < hits; i++){
                const dmgVar = (Math.floor(Math.random() * 4) + 5) / 10
                dmg += Math.floor(((playerInfo.pAttack + playerInfo.equipped.weapon.pDamage +  playerInfo.buffs.pAtk) / 2) * dmgVar) 
            }
            dmg -= (enemyOne.pDefense + enemyOne.buffs.pDef)
            if (dmg > 0){
                enemyOne.hp -= dmg
                if (enemyOne.hp > 0){
                    alert(`You fire off ${hits} arrows, dealing ${dmg} damage! (The) ${enemyOne.name} is now at ${enemyOne.hp} health.`)
                } else {
                    alert(`You fire off ${hits} arrows, dealing ${dmg} damage! (The) ${enemyOne.name} collapses from the barrage.`)
                }
            } else {
                alert(`You fire off ${hits} arrows, but none of them land.`)
            }
        } else if (spell.name == `Hinder`){
            enemyOne.buffs.pAtk -= 1
            enemyOne.buffs.mAtk -= 1
            alert(`You cast [Hinder]! The enemy's attacks drop.`)
        //Mage Spells
        } else if (spell.name == `Minor Cure`){
            const heal = Math.floor(Math.random() * 3) + 3 
            playerInfo.hp += heal
            if (playerInfo.hp > playerInfo.maxHp){
                playerInfo.hp = playerInfo.maxHp
            }
            alert(`You cast [Minor Cure]! You gain ${heal} health, putting you at ${playerInfo.hp}.`)
        } else if (spell.name == `Bolt`){
            let dmgVar = (Math.floor(Math.random() * 7) + 5) / 10
            let dmg = Math.floor(((playerInfo.mAttack + playerInfo.equipped.weapon.mDamage + playerInfo.buffs.mAtk) / 2) * dmgVar)
            dmg -= (enemyOne.mDefense + enemyOne.buffs.mDef)
            if (dmg > 0){
                enemyOne.hp -= dmg
                if (enemyOne.hp > 0) {
                    alert(`The magical bolt explodes on contact, dealing ${dmg} damage. (The) ${enemyOne.name} is now at ${enemyOne.hp} health.`)
                } else {
                    alert(`A blinding flash of light is created as the bolt connects. When the light clears, (the) ${enemyOne.name} is lying defeated on the ground.`)
                }
            } else {
                alert(`The magical bolt misses.`)
            }
        } else if (spell.name == `Spark`){
            let dmgVar = (Math.floor(Math.random() * 5) + 5) / 10
            let dmg = Math.floor((playerInfo.mAttack + playerInfo.equipped.weapon.mDamage + playerInfo.buffs.mAtk) * dmgVar)
            if (enemyOne.type == `Ice` || enemyOne.type == `Natural`){
                dmg *= 2
            }
            dmg -= (enemyOne.mDefense + enemyOne.buffs.mDef)
            if (dmg > 0){
                enemyOne.hp -= dmg
                if (enemyOne.hp > 0){
                    alert(`You rain sparks upon (the) ${enemyOne.name}. You deal ${dmg} damage, leaving it at ${enemyOne.hp}`)
                } else {
                    alert(`You deal ${dmg} damage. The enemy succumbs to the flames produced by your shower of sparks.`)
                }
            } else {
                alert(`The shower of sparks appear to be ineffective as an attack.`)
            }
        }
    }

    for (i = 1; i <= playerInfo.spellsList.length; i++){
        
        spells += `  ${i}) ${playerInfo.spellsList[i - 1].name}, MP Cost: ${playerInfo.spellsList[i - 1].cost},\n    Description: ${playerInfo.spellsList[i-1].description}\n\n`
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
                    playerInfo.mp -= playerInfo.spellsList[casting].cost
                    castSpell(playerInfo.spellsList[casting])
                    return 1
                }
            }
        }
    }
}



function selectItem(){
    if (itemInv.length == 0){
        alert(`You have no items!`)
        return 0
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
    if (item == `Pebble`){
        enemyOne.hp -= 1
        if (enemyOne.hp < 1){
            alert(`You toss the pebble at (the) ${enemyOne.name}. It crumbles before the might of this tiny rock.`)
        } else {
            alert(`You toss the pebble at (the) ${enemyOne.name}, dealing 1 damage. It's now at ${enemyOne.hp} health.`)
        }
    } else if (item == `Sharpened Straw`){
        let dmg = (Math.random() * 3) + 3
        enemyOne.hp -= dmg
        if (enemyOne.hp < 1){
            alert(`You stab the ${enemyOne.name} with the sharp straw, dealing ${dmg} damage. This, apparently, was enough to defeat it.`)
        } else {
            alert(`You stab (the) ${enemyOne.name} with the sharp straw, dealing ${dmg} damage. It's now at ${enemyOne.hp} health.`)
        }
    }
}

function dummyTurn(){
    alert(`The dummy sits there patiently.`)
}

function strawSpiderTurn(){
    let enemAction = Math.floor(Math.random() * 5)
    if (enemAction <= 1){
        let dmgVar = (Math.floor(Math.random() * 4) + 8) / 10 
        let dmg = Math.round((enemyOne.mAttack + enemyOne.buffs.mAtk)* dmgVar) + 4
        dmg -= (Math.floor((playerInfo.mDefense + playerInfo.equipped.armor.mDefense + playerInfo.buffs.mDef) / 3) + playerInfo.blocking)
        if (dmg < 1){
            alert(`The Straw Spider launches a few icy spikes at you, but you manage to block them.`)
        } else {
            playerInfo.hp -= dmg
            if (playerInfo.hp > 0){
                alert(`The Straw Spider launches a few ice spikes, stabbing you. You take ${dmg} damage, leaving you at ${playerInfo.hp} health.`)
            } else {
                alert(`The Straw Spider launches a few ice spikes, impaling you for ${dmg} damage. The bitting cold numbs your body as you fall unconscious.`)
            }
        }
    } else {
        let dmgVar = (Math.floor(Math.random() * 4) + 7) / 10
        let dmg = Math.floor((enemyOne.pAttack + enemyOne.buffs.pAtk) * dmgVar) + 2
        dmg -= (Math.floor((playerInfo.pDefense + playerInfo.equipped.armor.pDefense + playerInfo.buffs.pDef) / 2) + playerInfo.blocking)
        if (dmg < 1){
            alert(`The Straw Spider attempts to bite you, but you block it.`)
        } else {
            playerInfo.hp -= dmg
            if (playerInfo.hp > 0){
                alert(`The Straw Spider lunges at you, biting you. You take ${dmg} damage, leaving you at ${playerInfo.hp} health.`)
            } else {
                alert(`The Straw Spider lunges, landing a devastating bite for ${dmg} damage. Your consciousness fades, the stinging cold from the bite being all you feel before you black out.`)
            }
        }
    }
}

function scarecrowTurn(){
    let enemAction = Math.floor(Math.random() * 3)
    if (enemAction == 2){
        let dmgVar = (Math.floor(Math.random() * 5) + 6) / 10
        let dmg = Math.floor((enemyOne.pAttack + enemyOne.buffs.pAtk) * dmgVar) + 2
        dmg -= ((playerInfo.pDefense + playerInfo.equipped.armor.pDefense + playerInfo.buffs.pDef) + playerInfo.blocking)
        if (dmg < 1){
            alert(`The scarecrow slashes with its scythe, but you manage to dodge.`)
        } else {
            playerInfo.hp -= dmg
            if (playerInfo.hp > 0){
                alert(`The scarecrow swings its scythe. You take ${dmg} damage, leaving you at ${playerInfo.hp} health.`)
            } else {
                alert(`The scarecrow slashes you with its scythe, dealing ${dmg} damage. You collapse, falling unconscious on the ground.`)
            }
        }
    } else {
        const hits = Math.floor(Math.random() * 3) + 2
        let dmg = 0
        for (i = 0; i < hits; i++){
            let dmgVar = (Math.floor(Math.random() * 3) + 5) / 10
            dmg += Math.floor((enemyOne.pAttack  + enemyOne.buffs.pAtk) * dmgVar) - 1
        }
        dmg -= (Math.floor((playerInfo.pDefense + playerInfo.equipped.armor.pDefense + playerInfo.buffs.pDef) / 1.75) + playerInfo.blocking)
        if (dmg < 1){
            alert(`The scarecrow fires a barrage of sharpened straw, but they all miss.`)
        } else {
            playerInfo.hp -= dmg
            if (playerInfo.hp > 0){
                alert(`The scarecrow fires ${hits} straws at you. You take ${dmg} damage, leaving you at ${playerInfo.hp} health.`)
            } else {
                alert(`The scarecrow launches a barrage of sharp straw at you, dealing ${dmg} damage. The numbing cold is the only respite you get from the stinging cuts as your consciousness fades.`)
            }
        }
    }
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
            description: `Fires 2-5 arrows at the target to deal damage.`,
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
            description: `Restores a small amount of health to the user.`,
            target: `Self`
        },
        manaBurst = {
            name: `Bolt`,
            domain: `Destruction`,
            cost: 5,
            description: `Releases a small burst of magical energy to damage the target.`,
            target: `Single Enemy`
        },
        spark = {
            name: `Spark`,
            domain: `Fire`,
            cost: 3,
            description: `Shoots a small shower of sparks to damage the target.`,
            target: `Single Enemy`
        }
    ]
    playerInfo.equipped = {
        weapon: {
            name: `Traveler's Trusty Tome`,
            type: `Weapon` ,
            class: `Mage`,
            pDamage: 1,
            mDamage: 3,
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
        <li> <button id="menuFirst"> Combat </button> </li>
        <li> <button id="menuSecond"> Information </button> </li>
        <li> <button id="menuThird"> Town </button> </li>
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
        townMenu()
    })
}

//Information submenu
function infoMenu(){
    stage.innerHTML = `<h2 class = "centered"> Information </h2>
    <ul>
        <li> <button id="townInfo"> Town Info</button> </li>
        <li> <button id="stats"> Player Stats</button> </li>
        <li> <button id="bag"> Inventories </button> </li>
        <li> <button id="back"> Back </button> </li>
    </ul>`
    const tInfoButton = document.querySelector(`#townInfo`)
    tInfoButton.addEventListener(`click`, () => {townInfo()})

    const statsButton = document.querySelector(`#stats`)
    statsButton.addEventListener(`click`, () => {getStats()})

    const bag = document.querySelector(`#bag`)
    bag.addEventListener(`click`, () => {getInvs()})

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
            <li> \tLevel: ${level} (${xp} / ${xpToLevel} XP)</li>
        </ul>
        <li> HP: ${playerInfo.hp} / ${playerInfo.maxHp} </li>
        <li> MP: ${playerInfo.maxMp} </li>
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

function getInvs(){
    stage.innerHTML = `<h2 class = "centered"> Inventory Selection </h2>
    <button id = "gearInvButton"> Equipment Inventory </button>
    <button id = "itemInvButton"> Items </button> 
    <button id = "spellListButton"> Known Spells </button>
    <button id = "back"> Back </button>`

    const gearInvButton = document.querySelector(`#gearInvButton`)
    gearInvButton.addEventListener(`click`, () => {gearInventory()})
    const itemInvButton = document.querySelector(`#itemInvButton`)
    itemInvButton.addEventListener(`click`, () => {
        let items = ""
        for (i = 0; i < itemInv.length; i++){
            items += `${i + 1}) ${itemInv[i]}\n`
        }
        alert(items)
    })
    const spellListButton = document.querySelector(`#spellListButton`)
    spellListButton.addEventListener(`click`, () => {
        let spells = "Known Spells: \n"
        for (i = 1; i <= playerInfo.spellsList.length; i++){
            spells += `  ${i}) ${playerInfo.spellsList[i - 1].name}, MP Cost: ${playerInfo.spellsList[i - 1].cost},\n    Description: ${playerInfo.spellsList[i-1].description}\n\n`
        }
        alert(spells)
    })
    const back = document.querySelector(`#back`)
    back.addEventListener(`click`, () => {infoMenu()})
}

function gearInventory(){
    stage.innerHTML = `
    <h2 class = "centered"> Equipment Inventory </h2>
    <p class = "centered" id = "viewBoard"> In this menu, you can view your current equipment, change equipment, view equipment stats, and learn what "Blessings" can do. </p>
    <button id="viewCurrent"> View Current Equipment Stats </button> <button id="change"> Change Equipment (Not Implemented) </button> <button id="viewInvStats"> View Inventory </button> <button id="blessings"> Blessings </button> <button id="back"> Back </button> 
    `
    const viewBoard = document.querySelector(`#viewBoard`)
    document.querySelector(`#viewCurrent`).addEventListener(`click`, () => {
        viewBoard.innerText = 
        `Weapon: \n  ${playerInfo.equipped.weapon.name}
          Physical Damage: ${playerInfo.equipped.weapon.pDamage}
          Magic Damage: ${playerInfo.equipped.weapon.mDamage}
          Blessing: ${playerInfo.equipped.weapon.blessing}
          
        Armor: \n ${playerInfo.equipped.armor.name}
          Physical Defense: ${playerInfo.equipped.armor.pDefense}
          Magic Defense: ${playerInfo.equipped.armor.mDefense}
          Blessing: ${playerInfo.equipped.weapon.blessing}`
    })
    document.querySelector(`#change`).addEventListener(`click`, () => {
        alert(`Not implemented currently`)
    })
    document.querySelector(`#viewInvStats`).addEventListener(`click`, () => {
        let maxPage = Math.ceil(gearInv.length / 5)
        let page = prompt(`Enter a <page> to view (1 - ${maxPage})`)
        viewBoard.innerText = ``
        for (i = 0 + ((page - 1) * 5); i < 5 + ((page - 1) * 5) && i < gearInv.length; i++){
            viewBoard.innerText += `${(i + 1)}) ${gearInv[i].name}, ${gearInv[i].type}, `
            if (gearInv[i].type == `Weapon`){
                viewBoard.innerText += ` P Atk: ${gearInv[i].pDamage}, M Atk: ${gearInv[i].mDamage}` 
            } else {
                viewBoard.innerText += ` P Def: ${gearInv[i].pDefense}, M Def: ${gearInv[i].mDefense}` 
            }
            viewBoard.innerText += ` Blessing: ${gearInv[i].blessing}\n`
        }
    })
    document.querySelector(`#back`).addEventListener(`click`, () => {getInvs()})

}

//Town submenu
function townMenu(){
    stage.innerHTML = `<h2 class = "centered"> The Town of ${locat} </h2>
    <ul>
        <li> <button id="rest"> Rest </button> </li>
        <li> <button id="quest"> Quest </button> </li>
        <li> <button id="chat"> Chat (Not Implemented)</button> </li>
        <li> <button id="shop"> Shop (Not Implemented) </button> </li>
        <li> <button id="back"> Back </button> </li>
    </ul>`
    const rest = document.querySelector(`#rest`)
    rest.addEventListener(`click`, () => {resting()})

    document.querySelector(`#quest`).addEventListener(`click`, () => {getQuest()})

    const chat = document.querySelector(`#chat`)
    chat.addEventListener(`click`, () => {alert(`Chat Not Implemented`)})

    const shop = document.querySelector(`#shop`)
    shop.addEventListener(`click`, () => {alert(`Sadly, the shop is not open at the moment. Come back later`)})

    const back = document.querySelector(`#back`)
    back.addEventListener(`click`, () => {generateMenu()})
}

function resting(){
    if (playerInfo.hp == playerInfo.maxHp){
        alert(`You're already fully healed!`)
        townMenu()
    } else {
        let innCost = Math.floor((playerInfo.maxHp - playerInfo.hp) / 2) + 5
        stage.innerHTML = `<h3 class = "centered"> Resting in the Inn </h3>
        <p class = "centered"> To rest in the Inn, you'll need to spend ${innCost} gold. Resting fully restores your HP. </p>
        <p> You currently have ${money} gold.</p>
        <button id="accept"> Pay to Rest </button> 
        <button id="deny"> Leave </button>`
        
        const yes = document.querySelector(`#accept`)
        yes.addEventListener(`click`, () => {
            if (innCost > money){
                stage.innerHTML = `<h3 class = "centered"> Resting in the Inn </h3>
                <p class="centered"> Sadly, you can't afford to stay at the in, so you'll have to do without for now. </p> 
                <button id="leave"> Leave the Inn </button>`
                const leave = document.querySelector(`#leave`)
                leave.addEventListener(`click`, () => {townMenu()})
            } else {
                playerInfo.hp = playerInfo.maxHp
                money -= innCost
                stage.innerHTML = `<h3 class = "centered"> Resting in the Inn </h3>
                <p class="centered"> After a long rest, you feel much better. Your HP is back to full! </p> 
                <button id="leave"> Leave the Inn </button>`
                const leave = document.querySelector(`#leave`)
                leave.addEventListener(`click`, () => {townMenu()})
            }
        })
        const no = document.querySelector(`#deny`)
        no.addEventListener(`click`, () => {townMenu()})
    }
}

function getQuest(){
    if (locat == `Turian`){
        if (turQuestCheck == 0){
            stage.innerHTML = `
            <section class = "centered">
                <h2> An Injured Man's Request </h2>
                <div id = "request">
                    <p> As you wander around Turian, you spot an old man, clutching his side as he supports himself on his cane. The man notices you and weakly calls out.</p>
                    <p> Man: "You there... please, I need help." </p>
                    <p> Having any shred of morality, you decide you have to help him. </p>
                    <button> What do you need, sir? </button>
                </div>
            </section>`
            const request = document.querySelector(`#request`)
            document.querySelector(`button`).addEventListener(`click`, () => {
                request.innerHTML = `
                <p> Man: "You see, I'm a farmer, but recently my Scarecrows started to disappear. Well, only a day or so ago they showed back up, walkin' on their own. I'm not much of a fighter, but surely a young'un like you could help me out." </p>
                <p> Strange, typically scarecrows stay pretty still. </p>
                <button id = "helpOut"> I'll take care of them for you! </button> 
                <button id = "dontMove"> Scarecrows don't really move. </button>
                `
                document.querySelector(`#helpOut`).addEventListener(`click`, () => {
                    request.innerHTML = `
                    <p> ${playerInfo.name}: "Of course I'll help you out! How strong can they be, they're just scarecrows."
                    <p> Man: "Heh. I like your enthusiasm, kid. Be careful though, they're certainly stronger than they look."
                    <p> The man coughs and gives you a weak smile before walking off. Looks like you have a scarecrow to kill.
                    <p> [Quest: Kill 1 Scarecrow]
                    <button> Let's go hunt a scarecrow! </button>`
                    turQuestCheck++
                    document.querySelector(`button`).addEventListener(`click`, () => {townMenu()})
                })
                document.querySelector(`#dontMove`).addEventListener(`click`, () => {
                    request.innerHTML = `
                    <p> ${playerInfo.name}: "I've never seen a walking scarecrow. You feeling alright?" </p>
                    <p> Man: "You think I did this to myself? Look, if you don't think scarecrows should move, try tellin' that to them." </p>
                    <p> Walking scarecrows, what nonsense is that? </p>
                    <p> [Quest: Kill 1 Scarecrow] </p>
                    <button> Guess I'll go look for a scarecrow. </button>`
                    turQuestCheck++
                    document.querySelector(`button`).addEventListener(`click`, () => {townMenu()})

                })
            })
        } else if (turQuestCheck == 1){
            if (scarecrowKills == 0){
                stage.innerHTML = `
                <section class = "centered"> 
                    <h2> Scarecrow Hunt </h2>
                    <div>
                        <p> You haven't killed the scarecrow the man was asking about </p>
                        <button> Go find a scarecrow. </button>
                    </div>
                </section>`
                document.querySelector(`button`).addEventListener(`click`, () => {townMenu()})
            } else {
                stage.innerHTML = `
                <section class = "centered">
                    <h2> Frozen Trail</h2>
                    <div id = "request"> 
                        <p> After killing the scarecrow, you bring it back to the man. </p>
                        <p>${playerInfo.name}: "Hello, sir. I brought back the scarecrow." </p>
                        <p> Man: "Hand it over. I've got a hunch about what's goin' on here. </p>
                        <p> You hand over the scarecrow, the man stares at it for a minute. </p>
                        <button id="whatIsIt"> What's wrong with it? </button> <button id="canIGo"> Am I good to leave now? </button>
                    </div>
                </section>`
                const request = document.querySelector(`#request`)
                document.querySelector(`#whatIsIt`).addEventListener(`click`, () => {
                    request.innerHTML = `
                        <p> ${playerInfo.name}: "What's wrong with the scarecrow?" </p>
                        <p> Man: "Well, y'see, Turian's pretty warm year-round, but this scarecrow is covered in frost." </p>
                        <p> ${playerInfo.name}: "So it's magical ice?" </p>
                        <p> Man: "Exactly. But no one 'round here knows that kind o' magic. Someone else came here to cause trouble."
                        <button id="notMe"> It wasn't me! </button> <button id="knowWho"> Any idea who? </button>`
                    document.querySelector(`#notMe`).addEventListener(`click`, () => {
                            request.innerHTML = `
                                <p> ${playerInfo.name}: "It wasn't me! I swear!" </p>
                                <p> The man shakes his head and sighs. </p>
                                <p> Man: "Of course it's not you. Only one man in all of Wyvizik has this kind of magic." </p>
                                <p> Only one man? What would he want with a town like this then? </p>
                                <p> Man: "Look. I need to ask you one more favor. Get me a piece of straw from one of those weird spiders. If this is who I think it is, we could be in trouble." </p>
                                <p> [Quest: Give 1 Sharpened Straw to the man.] </p>
                                <button> I'll go get it </button>`
                                turQuestCheck++
                            document.querySelector(`button`).addEventListener(`click`, () => {townMenu()})
                    })
                    document.querySelector(`#knowWho`).addEventListener(`click`, () => {
                            request.innerHTML = `
                                <p> ${playerInfo.name}: "Any Idea who could've done this?" </p>
                                <p> Man: "As far as I know, only one man has magic like that. But I couldn't tell ya what he'd want with a town like this." </p>
                                <p> The man looks distraught. If only one person can do this, they must be pretty powerful. </p>
                                <p> Man: "Bring me a piece of straw from one of those spiders. That'll be the only way I can really confirm." </p>
                                <p> [Quest: Give 1 Sharpened Straw to the man.] </p>
                                <button> I'll go get it </button>`
                                turQuestCheck++
                            document.querySelector(`button`).addEventListener(`click`, () => {townMenu()}) 
                    }) 
                })
                document.querySelector(`#canIGo`).addEventListener(`click`, () => {
                    request.innerHTML = `
                    <p> ${playerInfo.name}: "If that's all you need, I'm going to go." </p>
                    <p> Man: "Wait. One more thing. Bring me some straw from one of those spiders. I think something bad's about to happen here." </p>
                    <p> [Quest: Give 1 Sharpened Straw to the man.] </p>
                    <button> Okay then. </button>`
                    turQuestCheck++
                    document.querySelector(`button`).addEventListener(`click`, () => {townMenu()}) 
                    
                })
            }
        } else {
            stage.innerHTML = `<h2 class = "centered"> Sorry </h2>
            <p> You reached the end of the quests for now. I simply ran out of time, but I hope you enjoyed this demo! </p>
            <p>    - Jack, the Creator </p>
            <button id = "did"> I enjoyed it </button> <button id = "not"> I didn't enjoy it </button>`
            const not = document.querySelector(`#not`)
            document.querySelector(`#did`).addEventListener(`click`, () => {
                stage.innerHTML = `<h2 class = "centered"> Thank you! </h2>
                <p> I'm really glad you enjoyed it. This project was a lot of fun to work on, and was put together relatively quickly. A shame I ran out of time to work on it, but I'm glad you had fun playing with what there is. Though there may not be any more quests, you can keep fighting Scarecrows and Straw Spiders to your heart's content. </p>
                <p> Thank you so much for giving your time to this little project. </p>
                <p>   - Jack, the Creator </p>
                <button> Continue Playing </button>`
                document.querySelector(`button`).addEventListener(`click`, () => {townMenu()})
            })
            not.addEventListener(`click`, () => {
                stage.innerHTML = `<h2 class = "centered"> That's okay! </h2>
                <p> Sorry it wasn't enjoyable. Chances are, if you're playing this, you know me personally. Feel free to reach out with any criticism. This game was made pretty quickly, and I definitely have more to learn. I hope that even if you didn't really enjoy this game, it inspires you to make something of your own. </p>
                <p> Thank you so much for giving your time to this little project. </p>
                <p>    - Jack, the Creator </p>
                <button> Continue Playing </button>`
                document.querySelector(`button`).addEventListener(`click`, () => {townMenu()})
            })

        }
    }
}