const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonName = document.querySelector('.pokemonName');
const pokemonIMG = document.querySelector('.pokemonIMG');
const pokemonAbilities = document.querySelector('.pokemonAbilities');
const pokemonAbilities2 = document.querySelector('.pokemonAbilities2');
const pokemonAbilities3 = document.querySelector('.pokemonAbilities3');
const pokemonTypes = document.querySelector('.pokemonTypes')

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const pokemonAudio = document.querySelector('.pokemonAudio')
const playButton = document.querySelector('.playButton');
const pauseButton = document.querySelector('.pauseButton');
const volumeSlider = document.querySelector('.volumeSlider');
let searchPokemon = 1;


pokemonAudio.src = 'imagens/Audios/videoplayback (1).mp3';


let isMusicPlaying = true;

playButton.addEventListener('click', () => {
  pokemonAudio.play();
});

pauseButton.addEventListener('click', () => {
  pokemonAudio.pause();
});
volumeSlider.addEventListener('input', () => {
  pokemonAudio.volume = volumeSlider.value;
});


const toggleMusic = () => {
  if (isMusicPlaying) {
    pokemonAudio.pause(pauseButton);
  } else {
    pokemonAudio.play(playButton);
  }
  isMusicPlaying = !isMusicPlaying;
};
const fetchPokemon = async (pokemon) => {
  
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status == 200 ){
    const data = await APIResponse.json();
    
    return(data); 
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = " ";
    const data = await fetchPokemon(pokemon);
    

    

if(data){
    

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonIMG.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;

    if (data.abilities.length >= 1) {
        pokemonAbilities.innerHTML = data.abilities[0].ability.name;
      } else {
        pokemonAbilities.innerHTML = '';
      }
  
      if (data.abilities.length >= 2) {
        pokemonAbilities2.innerHTML = data.abilities[1].ability.name;
      } else {
        pokemonAbilities2.innerHTML = '';
      }
  
      if (data.abilities.length >= 3) {
        pokemonAbilities3.innerHTML = data.abilities[2].ability.name;
      } else {
        pokemonAbilities3.innerHTML = '';
      }
  
      const types = data.types.map((type) => type.type.name);
      pokemonTypes.innerHTML = types.join(', ');
      searchPokemon = data.id;
    } else{
      pokemonIMG.style.display = 'none'
        pokemonName.innerHTML = "Not Found :c";
        pokemonNumber.innerHTML = " ";
        pokemonAbilities.innerHTML = " ";
        pokemonAbilities2.innerHTML = " ";
        pokemonAbilities3.innerHTML = " ";
        pokemonTypes.innerHTML = " ";
    }


};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase())
    input.value = ''
  });

  buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1 ){
      searchPokemon -= 1;
    renderPokemon(searchPokemon)
    }
  
  });
  buttonNext.addEventListener('click', () => {
     searchPokemon += 1;
     renderPokemon(searchPokemon);
    });
  

  renderPokemon(searchPokemon);