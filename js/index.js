let canvas = document.querySelector('canvas')

canvas.width = document.body.clientWidth - 5
canvas.height = document.body.clientHeight - 5

let Collapses = document.querySelectorAll('[data-bs-toggle="collapse"]')

Collapses.forEach(item => {
	item.addEventListener('click',()=>{
		var Indicator = item.querySelector('i')

		Indicator.classList.toggle("Open")

	})
})

// Particle list
let ParticlesList = document.querySelector('.ParticlesList')
let InteracoesList = document.querySelector('.InteracoesList')
var Atoms = {}
var AtomsCreated = {}
var Interacoes = {}
var cards = []

var Playing = false

const Card = (P_id) => `
	<div class="Particle mb-3 " id="particle${P_id}">
		<div class="input-group">
			<div class="input-group-text p-0 m-0">
				<input onchange = "Atualize(${P_id})" type="color" class="form-control form-control-color rounded-0" id="" value="#563d7c" >
			</div>
		  	<input onchange = "Atualize(${P_id})" type="text" class="form-control name" value = "Particola ${P_id}"  placeholder="name">
		  	<input onchange = "Atualize(${P_id})" type="number" min= "10" max= "1000" value = 50 class="form-control number me-2"  placeholder="number">
		</div>
		<button onclick = "DeletParticle('${P_id}')" class="btn fs-5 text-danger"><i class="bi bi-trash3"></i></button>
	</div>
`

const CardInteracao = (P_id) => `
	<div class="Interacao mb-3 " id="Interacao${P_id}">
		<div class="input-group">
		  	<select onchange = "AtualizeInteracoes(${P_id})" class="form-control sele1 m-0"  placeholder="number"> 
		  		${AddOption()}
		  	</select>
		  	<select onchange = "AtualizeInteracoes(${P_id})" class="form-control sele2 m-0"  placeholder="number"> 
		  		${AddOption()}
		  	</select>
		  	<input onchange = "AtualizeInteracoes(${P_id})" value = 0.1 type="number" class="form-control force m-0"  placeholder="force">
		</div>
		<button onclick = "DeletInteracoes('${P_id}')" class="btn fs-5 text-danger"><i class="bi bi-trash3"></i></button>
	</div>
`

document.getElementById('PlayBtn').addEventListener('click',()=>{
	if (Playing) {
		document.getElementById('PlayBtn').innerHTML = `<i class="text-success bi bi-play"></i>`
	}else{
		document.getElementById('PlayBtn').innerHTML = `<i class="text-danger bi bi-pause"></i>`
	}

	Playing = !Playing
	update()
})

function AddOption() {
	var keys = Object.keys(Atoms)
	var options = ""
	for (var i = 0; i < keys.length; i++) {
		options += `<option value="${keys[i]}"> ${ParticlesList.querySelector(`#particle${keys[i]}`).querySelector('.name').value } </option>`
	}
	
	return options
}

function AddParticle() {
	cards = ParticlesList.querySelectorAll('.Particle')
	ParticlesList.innerHTML += Card(cards.length)
	Atualize(cards.length)
	cards = ParticlesList.querySelectorAll('.Particle')
	

	cards.forEach((item,i) =>{
		var color = item.querySelector('.form-control-color')
		var name = item.querySelector('.name')
		var number = item.querySelector('.number')
		
		name.value = AtomsCreated[i][0]
		number.value = AtomsCreated[i][1]
		color.value = AtomsCreated[i][2]

		console.log(name.value)
		console.log(number.value)
		console.log(color.value)

	})
}

function DeletParticle(id) {
	var element = ParticlesList.querySelector(`#particle${id}`)
	var name = element.querySelector('.name').value

	delete Atoms[name]
	delete particles[id]
	delete AtomsCreated[id]

	ParticlesList.querySelector(`#particle${id}`).remove()
	cards = ParticlesList.querySelectorAll('.Particle')
	UpdateInteractions()
	update()
}

function Atualize(id) {
	var element = ParticlesList.querySelector(`#particle${id}`)
	var color = element.querySelector('.form-control-color').value
	var name = element.querySelector('.name').value
	var number = element.querySelector('.number').value

	if (number > 500) {
		number = 500
		element.querySelector('.number').value = number
	}

	delete particles[id]
	
	Atoms[id] = create(id,number,color)
	AtomsCreated[id] = [name,number,color]

	UpdateInteractions()
	update()
}

function UpdateInteractions(){
	var Before = InteracoesList.querySelectorAll('.Interacao')

	Before.forEach(item =>{
		var select1 = item.querySelector('.sele1')
		var select1_val = select1.value
		var select2 = item.querySelector('.sele2')
		var select2_val = select2.value

		select1.innerHTML = " "
		select2.innerHTML = " "

		select1.innerHTML = AddOption()
		select1.value = select1_val
		select2.innerHTML = AddOption()
		select2.value = select2_val

	})
}

function AddInteracoes() {
	cards = InteracoesList.querySelectorAll('.Interacao')
	InteracoesList.innerHTML += CardInteracao(cards.length)
	AtualizeInteracoes(cards.length)
	cards = InteracoesList.querySelectorAll('.Interacao')


	cards.forEach((item,i) =>{
		var select1 = item.querySelector('.sele1')
		var select2 = item.querySelector('.sele2')
		var force = item.querySelector('.force')
		

		select1.value = Interacoes[i][0]
		select2.value = Interacoes[i][1]
		force.value = Interacoes[i][2]

	})
}

function DeletInteracoes(id) {
	var element = InteracoesList.querySelector(`#Interacao${id}`)
	delete Interacoes[id]
	element.remove()
	update()
}

function AtualizeInteracoes(id) {
	var element = InteracoesList.querySelector(`#Interacao${id}`)

	var select1 = element.querySelector('.sele1').value
	var select2 = element.querySelector('.sele2').value
	var force = element.querySelector('.force').value

	if (force > 1) {
		force = 1
		element.querySelector('.force').value = force
	}

	if (force < -1) {
		force = -1
		element.querySelector('.force').value = force
	}

	Interacoes[id] = [select1,select2,force]
	update()
}