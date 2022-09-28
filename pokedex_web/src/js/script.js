//Variáveis e funções da pokédex.
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const pokemonStates = document.querySelector('.status');
const pokemonAttack = document.querySelector('.attack');
const pokemonDefense = document.querySelector('.defense');
const pokemonSpAttack = document.querySelector('.special_attack');
const pokemonSpDefense = document.querySelector('.special_defense');
const pokemonTipo1 = document.querySelector('.tipo1');
const pokemonTipo2 = document.querySelector('.tipo2');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading....';
    pokemonNumber.innerHTML = '';
    pokemonTipo1.innerHTML = '';
    pokemonTipo2.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonStates.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonAttack.innerHTML = data['stats']['1']['base_stat'];
        pokemonDefense.innerHTML = data['stats']['2']['base_stat'];
        pokemonSpAttack.innerHTML = data['stats']['3']['base_stat'];
        pokemonSpDefense.innerHTML = data['stats']['4']['base_stat'];
        pokemonTipo1.innerHTML = data['types']['0']['type']['name'];
        pokemonTipo2.innerHTML = data['types']['1']['type']['name'];
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonStates.style.display = 'none';
        pokemonName.innerHTML = 'Pokémon não encontrado :(';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', (event) => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});


btnNext.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
