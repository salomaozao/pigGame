var scores, roundScore, activePlayer, isGamePlaying
var diceDOM = document.querySelector(".dice")

var DOM = {
    resetScore: function() {
        playerScoresDOM = document.querySelectorAll(".player-score")
        for (var i=0; i < playerScoresDOM.length; i++) playerScoresDOM[i].textContent = '0'
    },


    resetCurrent: function(){
        playerCurrentScoresDOM = document.querySelectorAll(".player-current-score")
        for (var t=0; t < playerCurrentScoresDOM.length; t++) playerCurrentScoresDOM[t].textContent = '0'
    },


    resetAll: function(){
        this.resetCurrent()
        this.resetScore()
    }
}

var game = {
    init: function() {
        DOM.resetAll()

        document.querySelector(".player-0-panel").classList.remove("winner")
        document.querySelector(".player-1-panel").classList.remove("winner")

        scores = [0, 0]
        roundScore = 0
        activePlayer = 0

        diceDOM.style.display = "none"

        document.querySelector("#name-0").textContent = "PLayer 1"
        document.querySelector("#name-1").textContent = "Player 2"

        document.querySelector(".player-" + activePlayer + "-panel").classList.add("active")
        isGamePlaying = true
    },

    hold: function(){
        scores[activePlayer] += roundScore
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]
    },

    nextPlayer: function() {
        activePlayer == 0 ? activePlayer = 1 : activePlayer = 0
        roundScore = 0

        DOM.resetCurrent()
        document.querySelector(".player-0-panel").classList.toggle("active")
        document.querySelector(".player-1-panel").classList.toggle("active")

        diceDOM.style.display = "none"
    },

    addPoint: function(){
        var dice = Math.ceil( Math.random() * 6 )
    
        diceDOM.style.display = 'block'
        diceDOM.src =  "dice-" + dice + ".png"
    
        if(dice !== 1){
            roundScore += dice
            document.querySelector("#current-" + activePlayer).textContent = roundScore

        } else {
            this.nextPlayer()
        }
    },

    end: function(){
        document.querySelector("#name-" + activePlayer).textContent = "Winner!"
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner")
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active")
        diceDOM.style.display = "none"

        isGamePlaying = false
    }
}

game.init()

DOM.resetAll()


document.querySelector(".btn-roll").addEventListener("click", () => {
    isGamePlaying ? game.addPoint() : {} 
});

document.querySelector(".btn-hold").addEventListener("click", () => {
    game.hold()
    if (scores[activePlayer] >= 100){
        game.end()
    } else {
        game.nextPlayer()
    }
});

document.querySelector(".btn-new").addEventListener("click", () => {
    game.init()
})
