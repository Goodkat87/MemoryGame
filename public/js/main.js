let cardsList =  ["./src/img/egypte.png","./src/img/maroc.png","./src/img/senegal.png","./src/img/nigeria.png"]

let cardSet
let board
let card
let cardimg
let section = document.querySelector("section")

let tab = []


let firstChoice
let secondChoice


// to suffle cards
let randomCards = () =>{
    cardSet = cardsList.concat(cardsList)
    let x
    let stock 
    for (let i = 0; i < cardSet.length; i++) {
        x = Math.floor(Math.random()*cardSet.length)
        stock = cardSet[i]
        cardSet[i] = cardSet[x]
        cardSet[x] = stock
    }
}



let game = () =>{
    for (let index = 0; index < 8; index++) {
        cardimg = cardSet.pop()
        card = document.createElement("img")
        section.appendChild(card)
        card.id = index.toString()
        card.className = "card"
        card.src = cardimg
        //the tab stock the positions of the cards 
        tab.push(cardimg)
        card.addEventListener("click",choice)
    }
}

// to discover the card 
let choice = (e) =>{
    // check if the card is hide 
    if (e.target.src.includes("CAN")) {
        if (!firstChoice) {
            firstChoice = e.target
            //change the src of the target to his place 
            firstChoice.src = tab[parseInt(firstChoice.id)]
        //user can't flip same card 
        }else if (!secondChoice && e.target != firstChoice) {
            secondChoice = e.target
            secondChoice.src = tab[parseInt(secondChoice.id)]
        }
        setTimeout(flipback, 1000)
    }
}

//counter to know how many cards user found
let count = 0

let flipback = () => {
    if (firstChoice.src != secondChoice.src) {
        firstChoice.src = "./src/img/CAN.jpg"
        secondChoice.src = "./src/img/CAN.jpg"
    }else{
        firstChoice.classList.add("win")
        secondChoice.classList.add("win")
        console.log(firstChoice);
        console.log(secondChoice);
    }
    
    firstChoice = null
    secondChoice = null
    //verify how many good answers the user have
    document.querySelectorAll("img").forEach(element => {
        if (element.classList.contains("win")) {
            element.classList.remove("win")
            count += 1
            console.log(count);
        }
    });
    // end of the game 
    if (count == 8) {
        document.body.insertBefore(document.createElement("h1"), section)
        //Add of text You WIN
        document.querySelector("h1").innerText = "YOU WIN !"
        document.body.appendChild(document.createElement("button"))
        document.querySelector("button").innerText = "Restart"
        //reload the page
        document.querySelector("button").addEventListener('click',()=>{
            location.reload()
        })
    }
}

//functions to hide card
let hidenCards = () => {
    let hidenCard
    for (let index = 0; index < 8; index++) {
        hidenCard = document.getElementById(index.toString())
        hidenCard.src = "./src/img/CAN.jpg"

    }
}






randomCards()
game()
hidenCards()
