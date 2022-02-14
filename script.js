const URL_BASE = `https://pokeapi.co/api/v2/pokemon/`;
const pokemonsList = document.querySelector('#pokemons-list');
const pokemonsSection = document.querySelector('#pokemons-section');
const infoSection = document.querySelector('#info-section');
const pokeSearchBtn = document.querySelector('#poke-search');
const pokeInput = document.querySelector('#poke-input');

function createOptions(pokemonName) {
  const option = document.createElement('option');
  option.value = `${pokemonName[0].toUpperCase()}${pokemonName.slice(1)}`;
  return option;
}

function putPokemonInDataList(pokemons) {
  const orderPokemons = pokemons.map((element) => element.name).sort();
  orderPokemons.forEach((element) => {
    pokemonsList.appendChild(createOptions(element));
  })
}

async function getPokemon(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function createImgPokemon(id, name) {
  let number = id.toString();
  if (number.length === 1) { number = `00${number}`}
  else if (number.length === 2) { number = `0${number}`}
  const src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`;
  const image = document.createElement('img');
  image.src = src;
  image.alt = name;
  return image;
}

function createPokemonNumber(id) {
  let number = id.toString();
  if (number.length === 1) { number = `00${number}`}
  else if (number.length === 2) { number = `0${number}`}
  const pokeNumber = document.createElement('p');
  pokeNumber.className = 'poke-number-card';
  pokeNumber.innerText = `Nº ${number}`;
  return pokeNumber;
}

function createPokemonName(name) {
  const newName = `${name[0].toUpperCase()}${name.slice(1)}`;
  const pokeName = document.createElement('p');
  pokeName.className = 'poke-name-card';
  pokeName.innerText = newName;
  return pokeName;
}

function loadingScreen() {
  const newSection = document.createElement('section');
  newSection.id = 'loadingSection';
  const image = document.createElement('img');;
  image.src = 'img/loading.gif';
  image.alt = 'loading';
  const paragraph = document.createElement('h2');
  paragraph.innerText = 'Loading...';
  newSection.appendChild(image);
  newSection.appendChild(paragraph);
  infoSection.appendChild(newSection);
}

function createImgInfoSection(card) {
  const newSection = document.createElement('section');
  newSection.id = 'img-info-section';
  const image = document.createElement('img');
  image.src = card.children[0].src;
  image.alt = card.children[2].innerText;
  newSection.appendChild(image);
  return newSection;
}

function createNumberNameSection(card) {
  const newSection = document.createElement('section');
  newSection.id = 'number-name-section';
  const pokeNumber = document.createElement('p');
  pokeNumber.id = 'poke-number-info';
  pokeNumber.innerText = card.children[1].innerText;
  const pokeName = document.createElement('p');
  pokeName.id = 'poke-name-info';
  pokeName.innerText = card.children[2].innerText;
  newSection.appendChild(pokeNumber);
  newSection.appendChild(pokeName);
  return newSection;
}

function createTypeSection(arrayTypes) {
  const newSection = document.createElement('section');
  newSection.id = 'type';
  const typeTitle = document.createElement('h2');
  typeTitle.innerText = 'Type';
  newSection.appendChild(typeTitle);
  const newDiv = document.createElement('div');
  arrayTypes.forEach((element) => {
    const newTypeParagraph = document.createElement('p');
    const typeName = element.type.name;
    newTypeParagraph.className = typeName;
    newTypeParagraph.innerText = `${typeName[0].toUpperCase()}${typeName.slice(1)}`;
    newDiv.appendChild(newTypeParagraph);
  });
  newSection.appendChild(newDiv);
  return newSection;
}

function createNameAndTypeSection(card, arrayTypes) {
  const newNameAndTypeSection = document.createElement('section');
  newNameAndTypeSection.id = 'name-and-type';
  newNameAndTypeSection.appendChild(createNumberNameSection(card));
  newNameAndTypeSection.appendChild(createTypeSection(arrayTypes));
  return newNameAndTypeSection;
}

function createPokeCardInfo(card, arrayTypes) {
  const newSection = document.createElement('section');
  newSection.id = 'poke-card-info';
  newSection.appendChild(createImgInfoSection(card));
  newSection.appendChild(createNameAndTypeSection(card, arrayTypes));
  return newSection;
}

function createInfoStats(stats, section) {
  const nameStats = ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'];
  stats.forEach((element, index) => {
    const newDiv = document.createElement('div');
    const newLabel = document.createElement('label');
    newLabel.innerText = `${nameStats[index]}: `;
    const newMeter = document.createElement('meter');
    newMeter.value = element.base_stat;
    newMeter.max = 150;
    if (newMeter.value <= 50) { newMeter.classList.add('low-value'); 
    } else if (newMeter.value <= 100) { newMeter.classList.add('medium-value');
    } else { newMeter.classList.add('high-value') }; 
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newMeter);
    section.appendChild(newDiv);
  });
}

function createStats(stats) {
  const newSection = document.createElement('section');
  newSection.id = 'stats';
  const statsTitle = document.createElement('h2');
  statsTitle.innerText = 'Stats';
  newSection.appendChild(statsTitle);
  createInfoStats(stats, newSection);
  return newSection;
}

function createInfoSection(card, pokemon) {
  infoSection.innerHTML = '';
  const pokeCardInfo = createPokeCardInfo(card, pokemon.types);
  const stats = createStats(pokemon.stats);
  infoSection.appendChild(pokeCardInfo);
  infoSection.appendChild(stats);
}

async function getInfo(event) {
  const selectedCard = event.currentTarget;
  const beforeSelectedCard = selectedCard.parentElement.querySelector('.selected');
  if (beforeSelectedCard) { beforeSelectedCard.classList.remove('selected')}
  selectedCard.classList.add('selected');
  const url = `https://pokeapi.co/api/v2/pokemon/${selectedCard.id}`;
  const pokeInfo = await getPokemon(url);
  loadingScreen();
  createInfoSection(selectedCard, pokeInfo);
}

async function createPokemonCards(allPokemons) {
  for (let index = 0; index < allPokemons.length; index += 1) {
    const pokemon = await getPokemon(allPokemons[index].url);
    const newDiv = document.createElement('div');
    newDiv.className = 'pokemon-card';
    newDiv.id = pokemon.name;
    newDiv.appendChild(createImgPokemon(pokemon.id, pokemon.name));
    newDiv.appendChild(createPokemonNumber(pokemon.id));
    newDiv.appendChild(createPokemonName(pokemon.name))
    pokemonsSection.appendChild(newDiv);
  }
  Array.from(pokemonsSection.children).forEach((element) => {
    element.addEventListener('click', getInfo);
  })
}

function serchPokemon() {
  const input = pokeInput.value.toLowerCase();
  if (input === '') {
    alert('Pokémon not found!');
    return null;
  }
  const getPokeCard = pokemonsSection.querySelector(`#${input}`);
  if (!getPokeCard) {
    alert('Pokémon not found!');
    return null
  }
  pokemonsSection.scroll(0, 0);
  const getPositionCard = getPokeCard.getBoundingClientRect();
  pokemonsSection.scroll(0, getPositionCard.y - 142);
  getPokeCard.click();
  pokeInput.value = '';
}
pokeSearchBtn.addEventListener('click', serchPokemon)

window.onload = async () => {
  loadingScreen();
  const pokemonsResult = await getPokemon(`${URL_BASE}?offset=0&limit=898`);
  putPokemonInDataList(pokemonsResult.results);
  await createPokemonCards(pokemonsResult.results);
  pokeInput.disabled = false;
  pokeSearchBtn.disabled = false;
  pokeSearchBtn.style.backgroundImage = 'url("img/pokebola.png")';
  pokemonsSection.scroll(0, 0);
  document.querySelector('#pokemons-section').children[0].click();
}