import { getPokemonList } from "../src/services/pokemonService";

it("Rest Test", () => {
    getPokemonList().then((result) => {
        console.log(result)
    })
});