// import fondamentali
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
// altri import
import PageTitle from "../src/components/common/PageTitle";
import PokemonCard from "../src/components/Pokemon/PokemonCard";
import PokemonPage from "../src/pages/PokemonPage";
import { Route, Router, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";
import PokemonDetailPage from "../src/pages/PokemonDetailPage";
import GifPage from "../src/pages/GifPage";

describe("RTL TEST", () => {
  test("PageTitle Test", () => {
    render(<PageTitle title={"titolo pagina"} />);

    //screen.debug();

    expect(screen.getByText("titolo pagina")).toBeInTheDocument();
  });

  test("PokemonCard Test", () => {
    render(<PokemonCard name={"nome"} number={1234} onClick={() => {}} />);

    //  screen.debug();

    expect(screen.getByText("nome")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  // spiegazione slide !!

  test("PokemonPage Test", async () => {
    // render(<PokemonPage  />);

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <PokemonPage />
      </Router>
    );

    //screen.debug();

    expect(screen.getByText("Pokemon!")).toBeInTheDocument();
    //expect(screen.getByText("Bulbasaur")).not.toBeInTheDocument(); // far vedere
    expect(screen.queryByText("Bulbasaur")).toBeNull();

    // aggiungere  data-testid={"pokemonCard"} a Pokemoncard.js

    expect(screen.queryByTestId("pokemonCard")).toBeNull();

    // attendo che vengano renderizzate le 400 card
    // await screen.findByTestId("pokemonCard");
    await screen.findAllByTestId("pokemonCard");

    //screen.debug();

    expect(screen.getAllByTestId("pokemonCard").length).toBe(400);

    // oppure
    expect(screen.getAllByTestId("pokemonCard")).toHaveLength(400);

    // o in alternativa

    for (let i = 1; i <= 400; i++) {
      expect(screen.getByText(`${i}`)).toBeInTheDocument();
    }
  });

  test("PokemonDetailPage Test", async () => {
    const history = createMemoryHistory({ initialEntries: ["/pokemon/1"] });
    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/pokemon/:number" element={ <PokemonDetailPage />}>
          </Route>
        </Routes>
      </Router>
    );

    screen.debug();

    expect(screen.getByText("Caricamento...")).toBeInTheDocument();

    await screen.findByTestId("pokemonDetailPageImage");

    screen.debug();

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getAllByTestId("frontBackPokemonImg")).toHaveLength(2)

    //expect(document.querySelector("[data-testid='pokemonDetailPageImage']")).toBeInTheDocument();
  });

  test("FrontBackPokemonImg Test",() => {
    // TODO
    // BASED ON
    expect(el).toHaveAttribute("src","src_a");

  })


  test("GifPage Test",async () => {
    render(<GifPage />) 

    screen.debug();

    expect(screen.queryAllByTestId("gifElement")).toHaveLength(0);

    await screen.findAllByTestId("gifElement")

    expect(screen.queryAllByTestId("gifElement")).toHaveLength(50);

    //TODO test inserimento dati dall'utnete e comparsa messaggi
    // e
    expect(aaa).toBeRequired();
  })
});
