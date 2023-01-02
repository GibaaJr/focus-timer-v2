// Timer Variables


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


// Card Variables
let btnTreeCard = document.querySelector('.btnTree')
let btnRainCard = document.querySelector('.btnRain')
let btnStoreCard = document.querySelector('.btnStore')
let btnFireCard = document.querySelector('.btnFire')



let treeCard = document.querySelector('.tree')
let rainCard = document.querySelector('.rain')
let storeCard = document.querySelector('.store')
let fireCard = document.querySelector('.fire')

let inputCards = document.querySelectorAll('input[type="range"]')

let treeInputCard = document.querySelector('input[type="range"].treeInput')
let rainInputCard = document.querySelector('input[type="range"].rainInput')
let storeInputCard = document.querySelector('input[type="range"].storeInput')
let fireInputCard = document.querySelector('input[type="range"].fireInput')


let cards = document.querySelectorAll('.card')

let treeCardAudio = new Audio('./audios/Floresta.wav')
let rainCardAudio = new Audio('./audios/Chuva.wav')
let storeCardAudio = new Audio('./audios/Cafeteria.wav')
let fireCardAudio = new Audio('./audios/Lareira.wav')

let volumeTree = treeInputCard.value
let volumeRain = rainInputCard.value
let volumeStore = storeInputCard.value
let volumeFire = fireInputCard.value





// FUNÇÕES TIMER
function countDown() {
    timerTimeOut = setTimeout(function() {
        let seconds = Number(secondsDisplay.textContent)
        minutes = Number(minutesDisplay.textContent)
        let isFinished = minutes <= 0 && seconds <= 0

        if(seconds <= 0) {
            seconds = 60
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

// Card Functions

function playCardAudio(card) {
    card.play()
    card.loop = true
}

function pauseCardsAudio(card, card2, card3) {
    card.pause()
    card2.pause()
    card3.pause()
}

function pauseAudio(card) {
    card.pause()
}

function verifyAudioPlaying(card) {
    if (card.currentTime > 0 && !card.paused) {
        pauseAudio(card)
    } else {
        playCardAudio(card)
    }
}

function activeCard(card, input) {
    card.classList.toggle('active')
    input.classList.toggle('active')
}

function removeActiveFromCards(card, card2, card3) {
    card.classList.remove('active')
    card2.classList.remove('active')
    card3.classList.remove('active')
}


function volumeChange(audioCard, volume) {
    audioCard.volume = volume
}




// EVENTOS TIMER

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


// Cards Events

btnTreeCard.addEventListener('click', () => {
    verifyAudioPlaying(treeCardAudio)
    pauseCardsAudio(rainCardAudio, storeCardAudio, fireCardAudio)
    activeCard(treeCard, treeInputCard)
    removeActiveFromCards(rainCard, storeCard, fireCard)
})

btnRainCard.addEventListener('click', () => {
    verifyAudioPlaying(rainCardAudio)
    pauseCardsAudio(treeCardAudio, storeCardAudio, fireCardAudio)
    activeCard(rainCard, rainInputCard)
    removeActiveFromCards(treeCard, storeCard, fireCard)
})

btnStoreCard.addEventListener('click', () => {
    verifyAudioPlaying(storeCardAudio)
    pauseCardsAudio(rainCardAudio, treeCardAudio, fireCardAudio)
    activeCard(storeCard, storeInputCard)
    removeActiveFromCards(rainCard, treeCard, fireCard)
})

btnFireCard.addEventListener('click', () => {
    verifyAudioPlaying(fireCardAudio)
    pauseCardsAudio(rainCardAudio, storeCardAudio, treeCardAudio)
    activeCard(fireCard, fireInputCard)
    removeActiveFromCards(rainCard, storeCard, treeCard)
})

treeInputCard.addEventListener('change', () => {
    volumeTree = (Number(treeInputCard.value)) / 100 
    volumeChange(treeCardAudio, volumeTree)
    
})
rainInputCard.addEventListener('change', () => {
    volumeRain = (Number(rainInputCard.value)) / 100 
    volumeChange(rainCardAudio, volumeRain)
})
storeInputCard.addEventListener('change', () => {
    volumeStore = (Number(storeInputCard.value)) / 100 
    volumeChange(storeCardAudio, volumeStore)
})
fireInputCard.addEventListener('change', () => {
    volumeFire = (Number(fireInputCard.value)) / 100 
    volumeChange(fireCardAudio, volumeFire)
})

// Dark Mode
const btnLightMode = document.querySelector('.btn-light-mode')
const btnDarkMode = document.querySelector('.btn-dark-mode')
const lightModeClass = document.querySelectorAll('.light-mode')

function activeDarkMode() {
    btnLightMode.classList.toggle('hide')
    btnDarkMode.classList.toggle('hide')
    for (let i = 0; i < inputCards.length; i++) {
        inputCards[i].classList.toggle('dark-mode')
    }

    for (let i = 0; i < lightModeClass.length; i++) {
        lightModeClass[i].classList.toggle('dark-mode')
    }
}

btnLightMode.addEventListener('click', () => {
    activeDarkMode()
})

btnDarkMode.addEventListener('click', () => {
    activeDarkMode()
})

