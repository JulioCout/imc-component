// Variables
const form = document.querySelector("form")
const inputWeight = document.querySelector("#weight")
const inputHeight = document.querySelector("#height")

const errorAlert = document.querySelector(".alert-error")

// Modal
const Modal = {
    wrapper: document.querySelector(".modal-wrapper"),
    messageTitle: document.querySelector(".modal .title span"),
    buttonClose: document.querySelector(".modal .close"),
    message: document.querySelector(".modal .result"),

    open(){
        Modal.wrapper.classList.add("open")
    },

    close(){
        Modal.wrapper.classList.remove("open")
        form.reset()
    }
}

// Data Validation
function notANumber(value){
    return isNaN(value) || value == ""
}

// Form Submit Event
function IMC(weight, height){
    return(weight / ((height / 100) ** 2)).toFixed(2)
}

form.onsubmit = function(event){
    event.preventDefault()

    const weight = inputWeight.value
    const height = inputHeight.value
    const showAlertError = notANumber(weight) || notANumber(height)

    if(showAlertError){
        errorAlert.classList.add("open")
        return;
    }
    
    const result = IMC(weight, height)
    const messageTitle = `Seu IMC é de ${result}`

    let message = ""

    if(result >= 40){
        message = "Seu índice de massa corporal é considerado obsedidade III (mórbida)."
    } else if (result >= 35) {
        message = "Seu índice de massa corporal é considerado obsedidade II (severa)."
    } else if (result >= 30) {
        message = "Seu índice de massa corporal é considerado obsedidade de grau I."
    } else if (result >= 25) {
        message = "Seu índice de massa corporal é considerado levemente acima do peso."
    } else if (result >= 18,6) {
        message = "Seu índice de massa corporal é considerado peso ideal."
    } else {
        message = "Seu índice de massa corporal é considerado abaixo do peso ideal."
    }


    Modal.messageTitle.innerText = messageTitle
    Modal.message.innerText = message
    
    Modal.open()
}

//error alert close
inputWeight.addEventListener("keydown", closeErrorAlert)
inputHeight.addEventListener("keydown", closeErrorAlert)

function closeErrorAlert(){
    if(errorAlert.classList.contains("open")){
        errorAlert.classList.remove("open")
        console.log("tirei o erro")
    }
    
}

// Modal Close Event
Modal.buttonClose.onclick = () => {
    Modal.close()
}

window.addEventListener('keydown', handleKeyDown)

function handleKeyDown(event) {
    if(event.key == 'Escape') {
        Modal.close()
    }
}