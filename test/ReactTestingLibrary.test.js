// import fondamentali
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

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
import FrontBackPokemonImg from "../src/components/Pokemon/FrontBackPokemonImg";

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
          <Route
            path="/pokemon/:number"
            element={<PokemonDetailPage />}
          ></Route>
        </Routes>
      </Router>
    );

    screen.debug();

    expect(screen.getByText("Caricamento...")).toBeInTheDocument();

    await screen.findByTestId("pokemonDetailPageImage");

    screen.debug();

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getAllByTestId("frontBackPokemonImg")).toHaveLength(2);

    //expect(document.querySelector("[data-testid='pokemonDetailPageImage']")).toBeInTheDocument();
  });

  test("FrontBackPokemonImg Test", () => {
    render(
      <FrontBackPokemonImg frontImg={"src_frontImg"} backImg={"src_backImg"} />
    );

    screen.debug();

    // test che elemento sia presente in pagine e che attributo src opportunamente settato
    expect(screen.getByTestId("frontBackPokemonImg")).toBeInTheDocument();
    expect(screen.getByTestId("frontBackPokemonImg")).toHaveAttribute(
      "src",
      "src_frontImg"
    );

    // test che cambi  src all'evento di mouse enter
    // screen.debug prima e dopo
    fireEvent.mouseEnter(screen.getByTestId("frontBackPokemonImg"));
    expect(screen.getByTestId("frontBackPokemonImg")).toHaveAttribute(
      "src",
      "src_backImg"
    );

    // test che cambi src all'evento di mouse leave
    fireEvent.mouseLeave(screen.getByTestId("frontBackPokemonImg"));
    expect(screen.getByTestId("frontBackPokemonImg")).toHaveAttribute(
      "src",
      "src_frontImg"
    );
  });

  test("GifPage Test", async () => {
    render(<GifPage />);

  //  screen.debug();

    // test sui gif element
    // all'ingresso della pagina non devono essere gifElement
    expect(screen.queryAllByTestId("gifElement")).toHaveLength(0);

    // attendo che vengano renderizzati
    await screen.findAllByTestId("gifElement");

    // gli elementi devono essere 50 (da limit)
    expect(screen.queryAllByTestId("gifElement")).toHaveLength(50);

    // elementi di interazione
    expect(screen.getByTestId("keywordInput")).toBeInTheDocument();
    //expect(within(screen.getByTestId("keywordInput")).getByRole('input')).toBeInTheDocument()
    //expect(within(screen.getByTestId("keywordInput")).getByRole('textbox')).toBeInTheDocument()
    expect(
      screen.getByTestId("keywordInput").getElementsByTagName("input")[0]
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("keywordInput").getElementsByTagName("input")[0]
    ).toBeRequired(); //required

    expect(screen.getByTestId("limitInput")).toBeInTheDocument();
    //expect(within(screen.getByTestId("limitInput")).getByRole('input')).toBeInTheDocument()
    //expect(within(screen.getByTestId("limitInput")).getByRole('spinbutton')).toBeInTheDocument()
    expect(
      screen.getByTestId("limitInput").getElementsByTagName("input")[0]
    ).toBeInTheDocument();

    expect(screen.getByTestId("searchButton")).toBeInTheDocument();

    // form
    expect(screen.getByTestId("gifPageForm")).toBeInTheDocument();

    // click a vuoto
    fireEvent.click(screen.getByTestId("searchButton"));
    // non deve essere richiamata la funzione di submit
    const oldSubmitFunction = screen.getByTestId("gifPageForm").onsubmit
    const mockedSubmitFunction = jest.fn(oldSubmitFunction);
    screen.getByTestId("gifPageForm").onsubmit = mockedSubmitFunction;
    expect(mockedSubmitFunction).toHaveBeenCalledTimes(0);


    // inseriamo una keyword e un limite invalido
    await userEvent.type(screen.getByTestId("keywordInput").getElementsByTagName("input")[0],"ciao")
    await userEvent.type(screen.getByTestId("limitInput").getElementsByTagName("input")[0],"-1")
    fireEvent.click(screen.getByTestId("searchButton"));
    expect(mockedSubmitFunction).toHaveBeenCalledTimes(0);

    // inseriamo una keyword e un limite invalido
    await userEvent.clear(screen.getByTestId("keywordInput").getElementsByTagName("input")[0])
    await userEvent.clear(screen.getByTestId("limitInput").getElementsByTagName("input")[0])

    await userEvent.type(screen.getByTestId("keywordInput").getElementsByTagName("input")[0],"ciao")
    await userEvent.type(screen.getByTestId("limitInput").getElementsByTagName("input")[0],"51")
    fireEvent.click(screen.getByTestId("searchButton"));
    expect(mockedSubmitFunction).toHaveBeenCalledTimes(0);

    // inseriamo una keyword e un limite valido
    await userEvent.clear(screen.getByTestId("keywordInput").getElementsByTagName("input")[0])
    await userEvent.clear(screen.getByTestId("limitInput").getElementsByTagName("input")[0])

    await userEvent.type(screen.getByTestId("keywordInput").getElementsByTagName("input")[0],"ciao",{delay: 500})
    await userEvent.type(screen.getByTestId("limitInput").getElementsByTagName("input")[0],"10",{delay: 500})

    await userEvent.click(screen.getByTestId("searchButton"));
  
    //screen.debug();
    expect(mockedSubmitFunction).toHaveBeenCalledTimes(1);

    // controllo che gli elementi siano 25
    // non possono fare il giochino che avevo fatto prima !!!
    //await screen.findAllByTestId("gifElement");
    // gli elementi devono essere 50 (da limit)
    //expect(screen.queryAllByTestId("gifElement")).toHaveLength(50);

    //await waitFor(() => expect(screen.queryAllByTestId("gifElement")).toHaveLength(25))
  });
});
