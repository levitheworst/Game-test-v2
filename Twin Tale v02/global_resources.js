//global_classes
"This array contains entities/settings behaviour";
const _updates = {
    //player default behaviour
    'player_default': () => {
        //setting a path to "player" allocated memory => (lvlLoad.player)
        const player = lvlLoad.player
        //image drawing
        ctx.translate(-lvlLoad.camera.x, -lvlLoad.camera.y)
        //defines direction
        if(player.other.faceright)
        {
            player.other.frameState = 1
            player.other.faceright = false
        }
        //rendering
        ctx.drawImage(player.img,
            player.img.srcsize.x*(player.other.frameState*4+player.other.frame), 0,
            player.img.srcsize.x, player.img.srcsize.y,
            player.position.x, player.position.y,
            player.size.x, player.size.y
        )
        //physics
        player.position.x += player.velocity.x
        player.position.y += player.velocity.y
        player.velocity.y += player.gravity
        //controller
        if(userInput.up && player.other.isGrounded && player.other.jumpCooldown == 0)
        {
            player.velocity.y = -16
            player.other.isGrounded = false
            player.other.jumpCooldown = 5
        }
        //acceleration
        if (userInput.left) {
            if (player.velocity.x > -10) player.velocity.x -= 2
            if (player.velocity.x <= 4) player.other.frameState = 0
        }
        if (userInput.right) {
            if (player.velocity.x < 10) player.velocity.x += 2
            if (player.velocity.x >= -4) player.other.frameState = 1
        }
        if(userInput.left && userInput.right) player.velocity.x = 0
        if(!userInput.left && !userInput.right) {
            if(player.velocity.x > 0) player.velocity.x--
            if(player.velocity.x < 0) player.velocity.x++
        }
        //animation frame control
        if(player.other.frame >= 2) player.other.frameProgressive = false
        else if(player.other.frame <= 0) player.other.frameProgressive = true
        if(player.velocity.x === 0) {
            player.other.frameSpan = 0
            player.other.frame = 1
        }
        else {
            if (player.other.frameSpan == 8)
            if (player.other.frameProgressive) player.other.frame++
            else player.other.frame--
            if(player.other.frameSpan++ >= 8) player.other.frameSpan = 0
            if(player.other.frameSpan == 8) console.log(player.other.frameSpan)
        }
        if(!player.other.isGrounded) player.other.frame = 3
        ctx.translate(lvlLoad.camera.x, lvlLoad.camera.y)
    },
    //environment camera default behaviour
    'camera_default': () => {
        const lvl = lvlLoad
        if (lvl.player.position.x + lvl.player.size.x / 2 < 400)
            lvl.camera.x = 0
        else if (lvl.player.position.x + lvl.player.size.x / 2 > lvl.gameBorder.x - 400)
            lvl.camera.x = lvl.gameBorder.x - 800
        else
            lvl.camera.x += (lvl.player.position.x + lvl.player.size.x / 2 - 400 - lvl.camera.x) / 2
    },
    //plain object (entity) behaviour
    'object_plain': (i) => {
        const obj = lvlLoad.entities[i]
        ctx.translate(-lvlLoad.camera.x, -lvlLoad.camera.y)
        ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, this.position.x, this.position.y, this.imgsize.x, this.imgsize.y)
        ctx.translate(lvlLoad.camera.x, lvlLoad.camera.y)
    }
}

class Player {
    constructor({position, size, velocity, gravity, src, srcsize, other, update})
    {
        this.position = position
        this.size = size
        this.velocity = velocity

        this.gravity = gravity

        this.img = new Image()
        this.img.src = src
        this.img.srcsize = srcsize

        this.other = other

        this.update = update
    }
}
class Enemy_SideScroll
{
    constructor({size, position, velocity, gravity, src, srcsize, faceright, isGrounded, update})
    {
        this.size = size
        this.position = position
        this.velocity = velocity
        this.gravity = gravity
        faceright != undefined ? this.faceright = faceright : this.faceright = false
        this.isGrounded = isGrounded

        this.img = new Image()
        this.img.src = src
        this.imgsize = srcsize

        this.frame = 1
        this.frameState = 0
        this.framePerState = 4
        this.frameSpan = 10
        this.frameSpanLimit = 10
        this.frameCountIsProgressive = true

        this.update = update
    }
}
class Obj_Plain
{
    constructor({position, size, velocity, src, srcsize, other, update})
    {
        if(position != undefined) this.position = position
        else this.position = { x: 0, y: 0}
        if(size != undefined) this.size = size
        else this.size = { x: 800, y: 600 } //default value: the whole screen
        if(velocity != undefined) this.velocity = velocity
        else this.velocity = { x: 0, y: 0}

        this.img = new Image()
        if(src != undefined) this.img.src = src
        else this.img.src = 'sprites/entities/dan/model/dan_down_0.png'
        if(srcsize != undefined) this.imgsize = srcsize
        else this.imgsize = { x: 800, y: 600} //default value: the whole screen

        this.other = other

        this.update = update
    }
}