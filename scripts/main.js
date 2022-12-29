let minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const btnPlay = document.querySelector('.btnPlay')
const btnStop = document.querySelector('.btnStop')
const btnPlus = document.querySelector('.btnPlus')
const btnMinus = document.querySelector('.btnMinus')
let minutes = minutesDisplay.textContent
let timerTimeOut
let playClick = 0


// FUNÇÕES
function countDown() {
    timerTimeOut = setTimeout(function() {
        let seconds = Number(secondsDisplay.textContent)
        minutes = Number(minutesDisplay.textContent)
        let isFinished = minutes <= 0 && seconds <= 0

        if(seconds <= 0) {
            seconds = 5
            --minutes
        }
        
        if(isFinished){
            return
        }

        minutesDisplay.textContent = String(minutes).padStart('2', 0)
        secondsDisplay.textContent = String(seconds - 1).padStart(2, '0')

        countDown()


    }, 1000)

}

function hold() {
    clearTimeout(timerTimeOut)
}

function updateMinutesDisplay (minutes) {
    minutesDisplay.textContent = minutes
}

function addMinutes() {
    minutes = Number(minutesDisplay.textContent)
    let minutesPlus = String(minutes + 5).padStart(2, '0')
    updateMinutesDisplay(minutesPlus)
}

function subtractMinutes() {
    minutes = Number(minutesDisplay.textContent)
    let minutesSubtract = String(minutes - 5).padStart(2, '0')
    updateMinutesDisplay(minutesSubtract)
}

function resetTimer() {
    minutesDisplay = minutesOrigin
}


// EVENTOS

btnPlay.addEventListener('click', () => {
    if (playClick == 0) {
        ++playClick
        countDown()
    } else {
        console.log('cheguei')
        hold()
        playClick = 0
    }
})

btnStop.addEventListener('click', () => {
    resetTimer()
})

btnPlus.addEventListener('click', () => {
    addMinutes()
})

btnMinus.addEventListener('click', () => {
    subtractMinutes()
})

