//Capstone Project - Jack Massey//

//The "Stage," where the game unfolds//
const stage = document.querySelector(`#stage`)

//Class Selection//
//Entire Class Selection "section" element
const classSelection = document.querySelector(`#classSelect`);

//Outline of player stats
const playerInfo = {
    name: "",
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
    equipped: {}
}
//Player Inventories
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
            generateMenu()
        })
    })

    const skipTutorial = document.querySelector(`#skipTutorial`)
    skipTutorial.addEventListener(`click`, () => {
        stage.innerHTML = `<p>Yeah! You don't need a tutorial, this dummy wouldn't stand a chance against you!</p>
        <p>With your head held high, you continue the journey to Turian, knowing you don't need tutorials.</p> <button id = "endTutorial">Let's get going!</button>`
        const endTutorial = document.querySelector(`#endTutorial`)
        endTutorial.addEventListener(`click`, () => {
            generateMenu()
        })
    })
    

}

//Menus//
function generateMenu(){
    stage.innerHTML = `
    <h2 class="centered"> Menu: </h2>
    <ul> 
        <li> <button id="menuFirst"> First Menu Option </button> </li>
        <li> <button id="menuSecond"> Second Menu Option </button> </li>
        <li> <button id="menuThird"> Third Menu Option </button> </li>
    </ul>
    `
    const menuFirst = document.querySelector(`#menuFirst`)
    menuFirst.addEventListener(`click`, () => {
        alert(`First Option`)
    })

    const menuSecond = document.querySelector(`#menuSecond`)
    menuSecond.addEventListener(`click`, () => {
        alert(`Second Option`)
    })

    const menuThird = document.querySelector(`#menuThird`)
    menuThird.addEventListener(`click`, () => {
        alert(`Third Option`)
    })
}
