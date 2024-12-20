const pokemonInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const weightBox = document.getElementById("weight");
const heightBox = document.getElementById("height");
const typesBox = document.getElementById("types");
const hpBox = document.getElementById("hp");
const attackBox = document.getElementById("attack");
const defenseBox = document.getElementById("defense");
const specialAttackBox = document.getElementById("special-attack");
const specialDefenseBox = document.getElementById("special-defense");
const speedBox = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");





let allPokemon = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon'

const parseEntry = (string) => {
  return string.toLowerCase()}


const print = (obj) => {
  const {id, name, height, stats, weight, sprites, types} = obj;
  const {front_default} = sprites;
  pokeName.textContent = name.toUpperCase();
  pokeId.textContent = "#" + id;
  weightBox.textContent = "Weight: " + weight;
  heightBox.textContent = "Height: " + height;
  const baseStats = stats.reduce((acc, stat) => {
    acc[stat.stat.name] = stat.base_stat;
    return acc;}, {});
  
  const typeMap = types.reduce((acc, typeEntry) => {
    acc[`type${typeEntry.slot}`] = typeEntry.type.name;
    return acc;}, {});

  const { type1, type2 } = typeMap;

  const { hp, attack, defense, "special-attack": specialAttack, "special-defense": specialDefense, speed } = baseStats;

  hpBox.innerHTML = `<p>${hp}</p>`
  attackBox.innerHTML = `<p>${attack}</p>`
  defenseBox.innerHTML = `<p>${defense}</p>`
  specialAttackBox.innerHTML = `<p>${specialAttack}</p>`
  specialDefenseBox.innerHTML = `<p>${specialDefense}</p>`
  speedBox.innerHTML = `<p>${speed}</p>`
  spriteContainer.innerHTML = `<img id="sprite" src="${front_default}"></img>`
  if (type2 === undefined) {
    typesBox.innerHTML += `<span class="type ${type1}">${type1.toUpperCase()}</span>`
  } else {
  typesBox.innerHTML += `<span class="type ${type1}">${type1.toUpperCase()}</span><span class="type ${type2}">${type2.toUpperCase()}</span>`}
}

const searchPokemon = async () => {
  clear();
  let input = parseEntry(pokemonInput.value);
  let url = allPokemon + `/${input}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    print(data)
  } catch (err) {
    console.log(err);
    alert("Pokémon not found")
  }
}

const clear = () => {
  pokeName.textContent = "";
  pokeId.textContent = "";
  weightBox.textContent = "";
  heightBox.textContent = "";
  hpBox.innerHTML += ""
  attackBox.innerHTML = ""
  defenseBox.innerHTML = ""
  specialAttackBox.innerHTML = ""
  specialDefenseBox.innerHTML = ""
  speedBox.innerHTML = ""
  spriteContainer.innerHTML = ""
  typesBox.innerHTML = ""
}

console.log(allPokemon)

searchBtn.addEventListener("click", searchPokemon)