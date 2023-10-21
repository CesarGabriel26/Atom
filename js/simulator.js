var ctx = canvas.getContext('2d')
var particles = {}

const draw = (x,y,c,s) => {
    ctx.fillStyle = c
    ctx.fillRect(x,y,s,s)
}

const particle = (x,y,c) => {
    return {
        "x" : x,
        "y" : y,
        "vx" : 0,
        "vy": 0,
        "color" : c
    }
}

const random = () => {
    var x = Math.random() * canvas.width - 50
    var y = Math.random() * canvas.height - 50
    return {
        "x": (x <= 0)? 50 : x,
        "y": (y <= 0)? 50 : y
    }
}

const create = (name,number,color) => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    group = []

    for (let i = 0; i < number; i++) {
        group.push(particle(random().x,random().y,color))
    }
    particles[name] = group

    return group
}

const rule = (particles1,particles2,g) => {
    for (let i = 0; i < particles1.length; i++) {
        fx = 0
        fy = 0
        for (let j = 0; j < particles2.length; j++) {
            a = particles1[i]
            b = particles2[j]

            dx = a.x - b.x
            dy = a.y - b.y

            d = Math.sqrt(dx*dx + dy*dy)

            if (d > 0 && d < 80) {
                F = g * 1/d
                fx += (F * dx)
                fy += (F * dy)
            }
        }

        a.vx = (a.vx + fx) * 0.5
        a.vy = (a.vy + fy) * 0.5
        a.x += a.vx 
        a.y += a.vy

        if (a.x <= 20 || a.x >= canvas.width - 20) {a.vx *= -1}
        if (a.y <= 20 || a.y >= canvas.height - 20) {a.vy *= -1}

    }
}


const update = () => {
    if (Playing) {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        
        Interagir()
        Mover()

        requestAnimationFrame(update)
    }
}

async function Interagir() {
    for (var a = 0; a < Object.keys(Interacoes).length; a++) {
        var RuleData = Interacoes[a]
        rule(Atoms[RuleData[0]],Atoms[RuleData[1]],RuleData[2])
    }
}

async function Mover() {
    for (let a = 0; a < Object.keys(particles).length; a++) {
        var grup = particles[a]
        for (var i = 0; i < grup.length; i++) {
            draw(grup[i].x,grup[i].y,grup[i].color, 5)
        }
    }
}
