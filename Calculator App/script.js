function clearDisplay() {
    document.getElementById('display').innerText = "0"
}
function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (display.innerText === "0") {
        display.innerText = value
    } else {
        display.innerText += value
    }
}
function calculateResult() {
    const display = document.getElementById('display')
    try{
        const result = eval(display.innerText)
        display.innerText = result
    }catch(error){
        display.innerText = "Error"
    }
}