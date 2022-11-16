///level_construction\\\

//part of rendering levels and huds

//Side / Sidescroll Levels
class Sunset {
    constructor({player, bg, fg, entities}) {
        //player's definition
        this.player = new Player(player)
        //background definition
        if (bg != undefined) this.bg = bg
        else this.bg = [
            new Obj_Plain({
                src: 'sprites/bg/sunset/sunset_1.png',
                srcsize: { x: 800, y: 600 },
                update: function () {
                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, this.position.x, this.position.y, 800, 600)
                    this.span + 1 > 60 ? this.span = 0 : this.span++
                    if (this.span == 60) {
                        this.initialframe + 1 > 3 ? this.initialframe = 1 : this.initialframe++
                        this.img.src = 'sprites/bg/sunset/sunset_' + this.initialframe + '.png'
                    }
                }
            }),
            new Obj_Plain({
                src: 'sprites/bg/sunset/sunset_clouds_1.png',
                srcsize: { x: 800, y: 600 },
                position: {
                    0: { x: 0, y: 0 },
                    1: { x: 0, y: 0 }
                },
                update: function () {
                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, this.position[0].x, this.position[0].y, 800, 600)
                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, this.position[1].x, this.position[1].y, 800, 600)
                    this.span + 1 > 50 ? this.span = 0 : this.span++
                    this.position[0].x + 800 <= 0 ? this.position[0].x = 800 : this.span == 50 ? this.position[0].x -= 2.5 : false
                    this.position[1].x + 800 <= 0 ? this.position[1].x = 800 : this.span == 50 ? this.position[1].x -= 2.5 : false
                }
            }),
            new Obj_Plain({
                src: 'sprites/bg/sunset/sunset_clouds_2.png',
                srcsize: { x: 800, y: 600 },
                position: {
                    0: { x: 0, y: 0 },
                    1: { x: 800, y: 0 }
                },
                update: function () {
                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, this.position[0].x, this.position[0].y, 800, 600)
                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, this.position[1].x, this.position[1].y, 800, 600)
                    this.span + 1 > 40 ? this.span = 0 : this.span++
                    this.position[0].x + 800 <= 0 ? this.position[0].x = 800 : this.span == 40 ? this.position[0].x -= 5 : false
                    this.position[1].x + 800 <= 0 ? this.position[1].x = 800: this.span == 40 ? this.position[1].x -= 5 : false
                }
            })
        ]
        //foreground definition
        if (fg != undefined) this.fg = fg
        this.fg = [
            new Obj_Plain({
                src: 'sprites/bg/sunset/sunset_palm_tree.png',
                srcsize: { x: 800, y: 600 },
                update: function () {
                    ctx.translate(-lvlLoad.camera.x, -lvlLoad.camera.y)
                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, this.position.x, this.position.y, 800, 600)
                    ctx.translate(lvlLoad.camera.x, lvlLoad.camera.y)
                }
            }),
            new Obj_Plain({
                src: 'sprites/bg/sunset/sunset_grass_1.png',
                srcsize: { x: 800, y: 600 },
                position: {x: 800, y: 0},
                update: function () {
                    ctx.translate(-lvlLoad.camera.x, -lvlLoad.camera.y)
                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, this.position.x, this.position.y, this.imgsize.x, this.imgsize.y)
                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, 2*this.position.x, this.position.y, this.imgsize.x, this.imgsize.y)
                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, 3*this.position.x, this.position.y, this.imgsize.x, this.imgsize.y)
                    ctx.translate(lvlLoad.camera.x, lvlLoad.camera.y)
                }
            })
        ]
        //game entities definition
        if (entities != undefined) this.entities = entities
        this.entities = [
            new Obj_Plain({
                src: 'sprites/bg/sunset/hq.png',
                srcsize: { x: 400, y: 264 },
                position: {x: -100, y: 336},
                update: function () {
                    ctx.translate(-lvlLoad.camera.x, -lvlLoad.camera.y)
                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, this.position.x, this.position.y, this.imgsize.x, this.imgsize.y)
                    ctx.translate(lvlLoad.camera.x, lvlLoad.camera.y)
                }
            }),
            new Enemy_SideScroll({
                size: { x: 97, y: 144 },
                position: { x: 800, y: 456 },
                velocity: { x: 0, y: 0 },
                gravity: 1,
                src: 'sprites/entities/dan/dan_side_spritesheet.png',
                srcsize: { x: 97, y: 144 },
                faceright: false,
                isGrounded: true,
                update: function() {
                    ctx.translate(-lvlLoad.camera.x, -lvlLoad.camera.y)

                    ctx.drawImage(this.img, 0, 0, this.imgsize.x, this.imgsize.y, this.position.x, this.position.y, this.size.x, this.size.y)
                    
                    this.position.x += this.velocity.x
                    this.position.y += this.velocity.y

                    this.chase = false

                    if(this.position.x + 250 >= lvlLoad.player.position.x)
                    if(this.position.x - 250 <= lvlLoad.player.position.x)
                    if(this.position.y - 200 <= lvlLoad.player.position.y)
                    if(this.position.y + 200 >= lvlLoad.player.position.y)
                        this.chase = true

                    // if(
                    //     (lvlLoad.player.position.x + lvlLoad.player.velocity.x < this.position.x | lvlLoad.player.position.x + lvlLoad.player.size.x + lvlLoad.player.velocity.x > this.position.x)
                    //     && (lvlLoad.player.position.y + lvlLoad.player.velocity.y < this.position.y | lvlLoad.player.position.y + lvlLoad.player.size.y + lvlLoad.player.velocity.y > this.position.y)
                    // ) console.log('touched')

                    if(this.chase) {
                        if(lvlLoad.player.position.x > this.position.x) this.velocity.x < 8 ? this.velocity.x++ : false
                        else if (lvlLoad.player.position.x < this.position.x) this.velocity.x > -8 ? this.velocity.x-- : false
                        else this.velocity.x = 0 

                        if(Math.abs(lvlLoad.player.position.x - this.position.x) <= 64) this.velocity.x = 0
                    }
                    else {
                        this.velocity.x < 0 ? this.velocity.x++ : false
                        this.velocity.x > 0 ? this.velocity.x-- : false
                    }
                    ctx.translate(lvlLoad.camera.x, lvlLoad.camera.y)
                }
            })
        ]
        //camera definition
        this.camera = { x: 0, y: 0 }
        //level limits
        this.gameBorder = { x: 1600, y: 600 }
        /*
        this.fade = 1 
        this.unload = false
        */
        //behaviour
        this.update = () => {
            //collisions
            if (this.player.position.x + this.player.velocity.x <= 0) {
                this.player.velocity.x = 0
                this.player.position.x = 0
            }
            if (this.player.position.y + this.player.velocity.y >= 600 - this.player.size.y) {
                this.player.velocity.y = 0
                this.player.position.y = 600 - this.player.size.y
                this.player.other.isGrounded = true
                this.player.other.jumpCooldown > 0 ? this.player.other.jumpCooldown-- : false
            }
            if (this.player.position.y + this.player.velocity.y <= 0) {
                this.player.velocity.y = 0
                this.player.position.y = 0
            }
            this.cameraset()
        }
        this.cameraset = _updates['camera_default']
    }
}

//level loading
let lvlLoad = new Sunset({
    player: {
        size: { x: 97, y: 144 },
        position: { x: 200, y: 556 },
        velocity: { x: 0, y: 0 },
        gravity: 1,
        src: 'sprites/entities/dan/dan_side_spritesheet.png',
        srcsize: { x: 97, y: 144 },
        other: {
            faceright: true,
            isGrounded: true,
            frame: 1,
            frameState: 0,
            frameSpan: 10,
            frameProgressive: true
        },
        update: _updates['player_default']
    }
});

gameGeneralFunction()
function gameGeneralFunction() {
    window.requestAnimationFrame(gameGeneralFunction)
    
    //removes the old content from canvas
    ctx.clearRect(0, 0, 800, 600)
    //background computing
    var index = 0
    lvlLoad.bg.forEach(element => element.update(index++))
    //entities computing
    index = 0
    lvlLoad.entities.forEach(element => element.update(index++))
    //player computing
    lvlLoad.player.update()
    //foreground computing
    index = 0
    lvlLoad.fg.forEach(element => element.update(index++))
    //global settings computing
    lvlLoad.update()
}