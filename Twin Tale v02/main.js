///main\\\

const canvas = document.getElementById('display_canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 600

resizeScreen()
function resizeScreen()
{
    window.requestAnimationFrame(resizeScreen)
    canvas.height = window.innerHeight
    canvas.width = 8*canvas.height/6
    ctx.scale(canvas.width/800, canvas.height/600)
}

///the user's input (controls and stuff) goes here\\\

//final definition
var userInput = {
    up: false,
    left: false,
    down: false,
    right: false,
    enter: false,
    e: false
}
//input listening
window.addEventListener('keydown', (event) => {
    switch (event.key.toString().toLowerCase()) {
        case 'w':
        case 'arrowup':
            userInput.up = true
            break;
        case 'a':
        case 'arrowleft':
            userInput.left = true
            break;
        case 's':
        case 'arrowdown':
            userInput.down = true
            break;
        case 'd':
        case 'arrowright':
            userInput.right = true
            break;
        case 'enter':
            userInput.enter = true
            break;
        case 'e':
            userInput.e = true
            break;
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key.toString().toLowerCase()) {
        case 'w':
        case 'arrowup':
            userInput.up = false
            break;
        case 'a':
        case 'arrowleft':
            userInput.left = false
            break;
        case 's':
        case 'arrowdown':
            userInput.down = false
            break;
        case 'd':
        case 'arrowright':
            userInput.right = false
            break;
        case 'enter':
            userInput.enter = false
            break;
        case 'e':
            userInput.e = false
            break;
    }
})