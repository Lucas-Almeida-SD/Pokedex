const weaknesses = {
  normal: ['fighting'],
  fighting: ['flying', 'psychic', 'fairy'],
  flying: ['rock', 'electric', 'ice'],
  poison: ['ground', 'psychic'],
  ground: ['water', 'grass', 'ice'],
  rock: ['fighting', 'ground', 'steel', 'water', 'grass'],
  bug: ['flying', 'rock', 'fire'],
  ghost: ['ghost', 'dark'],
  steel: ['fighting', 'ground', 'fire'],
  fire: ['ground', 'rock', 'water'],
  water: ['grass', 'electric'],
  grass: ['flying', 'poison', 'bug', 'fire', 'ice'],
  electric: ['ground'],
  psychic: ['bug', 'ghost', 'dark'],
  ice: ['fighting', 'rock', 'steel', 'fire'],
  dragon: ['ice', 'dragon', 'fairy'],
  fairy: ['poison', 'steel'],
  dark: ['fighting', 'bug', 'fairy']
}

const resistances = {
  normal: ['ghost'],
  fighting: ['rock','bug','dark'],
  flying: ['fighting','ground','bug','grass'],
  poison: ['fighting','poison','grass','fairy'],
  ground: ['poison','rock','electric'],
  rock: ['normal','flying','poison','fire'],
  bug: ['fighting','ground','grass'],
  ghost: ['normal','fighting','poison','bug'],
  steel: ['normal','flying','poison','rock','bug','steel','grass','psychic','ice','dragon','fairy'],
  fire: ['bug','steel','fire','grass','ice'],
  water: ['steel','fire','water','ice'],
  grass: ['ground','water','grass','electric'],
  electric: ['flying','steel','electric'],
  psychic: ['fighting','psychic'],
  ice: ['ice'],
  dragon: ['fire','water','grass','electric'],
  fairy: ['fighting','bug','dragon','dark'],
  dark: ['ghost','psychic','dark']
}

const ineffectiveAgainst = {
  normal: ['rock','ghost','steel'],
  fighting: ['flying','poison','psychic','bug','ghost','fairy'],
  flying: ['rock','steel','electric'],
  poison: ['poison','ground','rock','ghost','steel'],
  ground: ['flying','bug','grass'],
  rock: ['fighting','ground','steel'],
  bug: ['fighting','flying','poison','ghost','steel','fire','fairy'],
  ghost: ['normal','dark'],
  steel: ['steel','fire','water','electric'],
  fire: ['rock','fire','water','dragon'],
  water: ['water','grass','dragon'],
  grass: ['flying','poison','bug','steel','fire','grass','dragon'],
  electric: ['ground','grass','electric','dragon'],
  psychic: ['steel','psychic','dark'],
  ice: ['steel','fire','water','ice'],
  dragon: ['steel','fairy'],
  fairy: ['poison','steel','fire'],
  dark: ['fighting','dark','fairy']
}

function removeSameWeaknessesFunction(allWeaknesses) {
  const removeSameWeaknesses = [];
  allWeaknesses.forEach((element) => {
    if(!removeSameWeaknesses.includes(element)) {
      removeSameWeaknesses.push(element);
    }
  });
  return removeSameWeaknesses;
}

function removeIneffectiveFunction(pokemonType, weaknessesArray) {
  const ineffectives = weaknessesArray.map((element) => 
    ineffectiveAgainst[element]);
  const removeIneffectives = weaknessesArray.filter((element, index) =>
    !pokemonType.some((element) => ineffectives[index].includes(element))
  );
  return removeIneffectives;
}

function getWeaknesses(pokemonType) {
  if (pokemonType.length === 1) {
    return weaknesses[pokemonType[0]];
  }
  const weaknessesByType = [];
  const resistanceByType = [];
  pokemonType.forEach((element) => weaknessesByType.push(...weaknesses[element]));
  pokemonType.forEach((element) => resistanceByType.push(...resistances[element]));
  const removeResistance = weaknessesByType.filter((element) => 
    !resistanceByType.includes(element));
  const removeIneffective = removeIneffectiveFunction(pokemonType, removeResistance);
  const removeSameWeaknesses = removeSameWeaknessesFunction(removeIneffective);
  return removeSameWeaknesses;
}
