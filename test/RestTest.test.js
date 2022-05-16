import { getPokemonList } from "../src/services/pokemonService";

it("Rest Test", async () => {
    const pokemonList = await getPokemonList();
    expect(pokemonList).toMatchSnapshot();
});