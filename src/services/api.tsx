export const fetchPokemons = async (limit: number, offset: number): Promise<Array<{ name: string, image: string, info: string }>> => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const pokemonList = data.results;
  
      const pokemonDetailsPromises = pokemonList.map((pokemon: { name: string, url: string }) => fetch(pokemon.url));
      const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
      const pokemonDetails = await Promise.all(pokemonDetailsResponses.map(res => res.json()));
  
      const pokemonsWithDetails = pokemonDetails.map((pokemon: {
            name: string, 
            sprites: { front_default: string },
            species: { url: string }
        }) => ({
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        info: pokemon.species.url,
      }));
  
      return pokemonsWithDetails;
    } catch (error) {
      console.error('Ошибка при получении покемонов:', error);
      return [];
    }
};
