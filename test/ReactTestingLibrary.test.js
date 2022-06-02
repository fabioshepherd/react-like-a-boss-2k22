// import fondamentali
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
// altri import
import PageTitle from "../src/components/common/PageTitle";
import PokemonCard from "../src/components/Pokemon/PokemonCard";
import PokemonPage from "../src/pages/PokemonPage";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("RTL TESTS", () => {
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

  test("PokemonPage", async () => {
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

    // o in alternativa

    for (let i = 1; i <= 400; i++) {
      expect(screen.getByText(`${i}`)).toBeInTheDocument();
    }
  });
});
