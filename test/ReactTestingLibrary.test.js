import { render, screen, fireEvent } from "@testing-library/react"
import PageTitle from "../src/components/common/PageTitle"
import PokemonCard from "../src/components/Pokemon/PokemonCard";
import PokemonPage from "../src/pages/PokemonPage";
import {createMemoryHistory} from 'history'
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import FrontBackPokemonImg from "../src/components/Pokemon/FrontBackPokemonImg";

describe("RTL Test", () => {
    test("PageTitle Test", () => {
        render(<PageTitle title={"titolo di test"}></PageTitle>)

        // screen.debug();

        expect(screen.getByText("titolo di test")).toBeInTheDocument();
    })

    test("PokemonCard", () => {
        render(<PokemonCard name={"bulbasaur"} number={1} onClick={() => {}}></PokemonCard>)

        // screen.debug()

        expect(screen.getByText("bulbasaur")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
    })

    test("PokemonPage Test", async () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <PokemonPage></PokemonPage>
            </Router>
        )

        screen.debug()

        expect(screen.getByText("Pokemon!")).toBeInTheDocument();

        expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();

        expect(screen.queryByTestId("pokemonCard")).toBeNull();


       /// expect(await screen.findAllByTestId("pokemonCard")).toHaveLength(400)

       await screen.findAllByTestId("pokemonCard")

       screen.debug()

       expect(screen.getAllByTestId("pokemonCard")).toHaveLength(400)

    })

    test.only("FrontBackPokemonImg Test", () => {
        render(<FrontBackPokemonImg frontImg={"src_frontImg"} backImg={"src_backImg"}></FrontBackPokemonImg>)

        expect(screen.getByTestId("frontBackPokemonImg")).toBeInTheDocument();
        expect(screen.getByTestId("frontBackPokemonImg")).toHaveAttribute("src","src_frontImg")

        fireEvent.mouseEnter(screen.getByTestId("frontBackPokemonImg"))
        expect(screen.getByTestId("frontBackPokemonImg")).toHaveAttribute("src","src_backImg")

        fireEvent.mouseLeave(screen.getByTestId("frontBackPokemonImg"))
        expect(screen.getByTestId("frontBackPokemonImg")).toHaveAttribute("src","src_frontImg")
    })
})