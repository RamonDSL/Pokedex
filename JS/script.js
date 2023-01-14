const pokeImage = document.querySelector('.pokemon_image')
const pokeName = document.querySelector('.pokemon_name')
const pokeNumber = document.querySelector('.pokemon_number')

const form = document.querySelector('form')
const input = document.querySelector('.input_search')
const prev_btn = document.querySelector('.prev-btn')
const next_btn = document.querySelector('.next-btn')
const shiny_btn = document.querySelector('.shiny_mode')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    

    if (response.status === 200) {
        const data = await response.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokeName.innerHTML = "Carregando..."
    pokeNumber.innerHTML = ""
    pokeImage.src = ""

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokeName.innerHTML = data.name
        pokeNumber.innerHTML = `${data.id} - `
        if (!shiny_btn.classList.contains('active')) {
            pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']            
        } else {
            pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
        }
        input.value = ""
        searchPokemon = data.id
    } else {
        pokeName.innerHTML = "Not Found"
    }

}

form.addEventListener('submit', event => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

prev_btn.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--
    }
    renderPokemon(searchPokemon)
})

shiny_btn.addEventListener('click', () => {
    if (pokeName.innerHTML !== "Not Found") {
        shiny_btn.classList.toggle('active')
        renderPokemon(searchPokemon)
    }
})

next_btn.addEventListener('click', () => {
    searchPokemon++
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)