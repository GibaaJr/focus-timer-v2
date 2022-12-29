let minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const btnPlay = document.querySelector('.btnPlay')
const btnStop = document.querySelector('.btnStop')
const btnPlus = document.querySelector('.btnPlus')
const btnMinus = document.querySelector('.btnMinus')
let minutes = Number(minutesDisplay.textContent)
let timerTimeOut
let playClick = 0
let minutesFromBeggining = minutesDisplay.textContent


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

function updateSecondsDisplay (seconds) {
    secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function addMinutes() {
    let minutesPlus = String(minutes + 5).padStart(2, '0')
    updateMinutesDisplay(minutesPlus)
    minutes = Number(minutesDisplay.textContent)
}

function subtractMinutes() {
    minutes = Number(minutesDisplay.textContent)
    let minutesSubtract = String(minutes - 5).padStart(2, '0')
    updateMinutesDisplay(minutesSubtract)
    minutes = Number(minutesDisplay.textContent)
    if (minutes <= 0) {
        minutesDisplay.textContent = String(0).padStart(2, '0')
        minutes = 0;
    }
}

function resetTimer() {
    hold()
    updateMinutesDisplay(minutesFromBeggining)
    updateSecondsDisplay(0)
    playClick = 0
    // atualizar a variavel minutes para evitar bug ao finalizar o tempo, clicar em stop e adicionar 5 minutos.
    minutes = Number(minutesDisplay.textContent)
}

function checkPlayButton() {
    if (playClick == 0) {
        ++playClick
        countDown()
    } else {
        hold()
        playClick = 0
    }
}



// EVENTOS

btnPlay.addEventListener('click', () => {
    checkPlayButton()
})

btnStop.addEventListener('click', () => {
    resetTimer()
    hold()
})

btnPlus.addEventListener('click', () => {
    addMinutes()
})

btnMinus.addEventListener('click', () => {
    subtractMinutes()
})

