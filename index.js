const url = 'https://pokeapi.co/api/v2/pokemon'
const urlParams = new URLSearchParams(window.location.search)
const getAllPokemon = async () => {
    try{
        const response = await fetch(`${url}?limit=151`)
        const data = await response.json()
        removeView()
        document.querySelector('#home #loading').classList.add('hide')

        data.results.map((pokemon, indice) => {
            const div = document.createElement('div')
            const name = document.createElement('h2')
            const numero = document.createElement('p')
            const img = document.createElement('img')
            const link = document.createElement('a')

            name.innerText = `${pokemon.name}`
            numero.innerText = `N: ${++indice}º`
            link.setAttribute('href', `pokedex.html?name=${pokemon.name}`)
        
            returnImg(pokemon.name).then((linkImg ) => { 
                    img.setAttribute('src', linkImg )
                }
            )

            div.appendChild(img)
            div.appendChild(numero)
            div.appendChild(name)
            //div.appendChild(link)
            link.appendChild(div)
            document.querySelector('#content').appendChild(link)
        })
    }catch(e){
        console.log(e.message)
    }

}

async function pokedex(){
    try{
        const response = await fetch(`${url}/${urlParams.get('name')}/`) 
        const data = await response.json()
        //console.log(data)
        removeView()

        const div = document.createElement('div')
        const name = document.createElement('h2')
        name.innerText = `${(data.name).toUpperCase()}`
        const number = document.createElement('p')
        const type = document.createElement('p')
        const peso = document.createElement('p')
        const altura = document.createElement('p')
        const att = document.createElement('div')

        number.innerText = ` N: ${data.order} º `

        let types = ''
        data.types.map((type) =>{
            types += `<span class='${type.type.name}'>${type.type.name}</span> `
        })
        type.innerHTML += `Tipo: ${types}`

        peso.innerText += `Peso: ${(data.weight/10).toFixed(1)} kg`
        altura.innerText += `Altura: ${ (data.height/10) < 1 ? `${(data.height) * 10}  cm` : `${(data.height/10).toFixed(2)}  m`}`

        const img = document.createElement('img')
        img.setAttribute('src', data.sprites.front_default) 

        let moves = ''
        data.moves.map((move) =>{
            moves += `<span>${move.move.name}</span> `
        })
        att.innerHTML = `<p class='attack'>Attacks:</p> ${moves}`

        div.appendChild(name)
        div.appendChild(img)
        div.appendChild(number)
        div.appendChild(type)
        div.appendChild(peso)
        div.appendChild(altura)
        div.appendChild(att)
        document.querySelector('#content').appendChild(div)
        document.querySelector('#content').classList.add(`${data.types[0].type.name}`)

    }catch(e){
        console.log(e.message)
    }
}

const returnImg = async (name) => {
    try{
        const response = await fetch(`${url}/${name}/`) 
        const data = await response.json()
        return data.sprites.front_default
        
    }catch(e){
        console.log(e.message)
    }
}

function removeView(){
    document.getElementById('loading').classList.add('hide')
    document.querySelector('#content').classList.remove('hide')
}



!urlParams.get('name') ? getAllPokemon() : pokedex()