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
import VideoPage from "../src/pages/VideoPage";
import videoGandalf from '../assets/video.mp4';
import videoCowboy from '../assets/video2.mp4';

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

    //inizialmente deve esserci il caricamento
    expect(screen.getByText("Caricamento...")).toBeInTheDocument();

    // quando la pagina viene caricata dopo il useEffect
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

    screen.debug();

    // test sui gif element
    // all'ingresso della pagina non devono essere gifElement
    expect(screen.queryAllByTestId("gifElement")).toHaveLength(0);

    // attendo che vengano renderizzati
    // gli elementi devono essere 50 (da limit)
    await waitFor(() => expect(screen.queryAllByTestId("gifElement")).toHaveLength(50))
   expect(screen.queryAllByTestId("gifElement")).toHaveLength(50)

    // elementi di interazione
    expect(screen.getByTestId("keywordInput")).toBeInTheDocument();
    expect(
      screen.getByTestId("keywordInput")
    ).toBeRequired(); //required

    expect(screen.getByTestId("limitInput")).toBeInTheDocument();

    expect(screen.getByTestId("searchButton")).toBeInTheDocument();

    // form
    expect(screen.getByTestId("gifPageForm")).toBeInTheDocument();

    // click a vuoto
    // non deve essere richiamata la funzione di submit
    const oldSubmitFunction = screen.getByTestId("gifPageForm").onsubmit
    const mockedSubmitFunction = jest.fn(oldSubmitFunction);
    screen.getByTestId("gifPageForm").onsubmit = mockedSubmitFunction;

    // click a vuoto
    fireEvent.click(screen.getByTestId("searchButton"));
    expect(mockedSubmitFunction).toHaveBeenCalledTimes(0);


    // inseriamo una keyword e un limite invalido
    await userEvent.type(screen.getByTestId("keywordInput"),"ciao")
    await userEvent.type(screen.getByTestId("limitInput"),"-1")

    expect(screen.getByTestId("keywordInput")).toHaveValue("ciao")
    expect(screen.getByTestId("limitInput")).toHaveValue(-1)

    fireEvent.click(screen.getByTestId("searchButton"));
    expect(mockedSubmitFunction).toHaveBeenCalledTimes(0);

    // inseriamo una keyword e un limite invalido
    await userEvent.clear(screen.getByTestId("keywordInput"))
    await userEvent.clear(screen.getByTestId("limitInput"))

    await userEvent.type(screen.getByTestId("keywordInput"),"ciao")
    await userEvent.type(screen.getByTestId("limitInput"),"51")

    expect(screen.getByTestId("keywordInput")).toHaveValue("ciao")
    expect(screen.getByTestId("limitInput")).toHaveValue(51)

    fireEvent.click(screen.getByTestId("searchButton"));
    expect(mockedSubmitFunction).toHaveBeenCalledTimes(0);

    // inseriamo una keyword e un limite valido
    await userEvent.clear(screen.getByTestId("keywordInput"))
    await userEvent.clear(screen.getByTestId("limitInput"))

    await userEvent.type(screen.getByTestId("keywordInput"),"ciao")
    await userEvent.type(screen.getByTestId("limitInput"),"10")

    expect(screen.getByTestId("keywordInput")).toHaveValue("ciao")
    expect(screen.getByTestId("limitInput")).toHaveValue(10)

    await userEvent.click(screen.getByTestId("searchButton"));
  
    //screen.debug();
    expect(mockedSubmitFunction).toHaveBeenCalledTimes(1);

    // controllo che gli elementi siano 25
    // non possono fare il giochino che avevo fatto prima !!!
    //await screen.findAllByTestId("gifElement");
    // gli elementi devono essere 50 (da limit)
    //expect(screen.queryAllByTestId("gifElement")).toHaveLength(50);

    await waitFor(() => expect(screen.queryAllByTestId("gifElement")).toHaveLength(10))
  });

  test("VidePage Test", async  () => {
    render(<VideoPage />);

    // screen.debug();

    // controllo presenza container video
    const videoContainer = screen.getByTestId("videoContainer");
    expect(videoContainer).toBeInTheDocument();

    // controllo presenza pulsanti
    const changeVideoButton = screen.getByRole("changeVideoButton")
    expect(changeVideoButton).toBeInTheDocument();

    const playPauseButton = screen.getByRole("playPauseButton")
    expect(playPauseButton).toBeInTheDocument();

    const muteButton = screen.getByRole("muteButton");
    expect(muteButton).toBeInTheDocument();

    const restartButton = screen.getByRole("restartButton");
    expect(restartButton).toBeInTheDocument();

    // controllo che il video inizialmente non abbia src
    expect(videoContainer).toHaveAttribute("src", undefined)

    // video src a gandalf
    await waitFor(() => expect(videoContainer).toHaveAttribute("src", videoGandalf))
    expect(videoContainer).toHaveAttribute("src", videoGandalf)

    // click sul pulsante di cambio video
    fireEvent.click(changeVideoButton);

    // video src a gandalf
    await waitFor(() => expect(videoContainer).toHaveAttribute("src", videoCowboy))
    expect(videoContainer).toHaveAttribute("src", videoCowboy)

    // click sul pulsante di cambio video
    fireEvent.click(changeVideoButton);

    // video src a gandalf
    await waitFor(() => expect(videoContainer).toHaveAttribute("src", videoGandalf))
    expect(videoContainer).toHaveAttribute("src", videoGandalf)
  })

  test("PokemonCard Test Callbacks", () => {
    // predisposizione mocked function
    const mockedCallback = jest.fn();

    render(<PokemonCard name={"nome"} number={1234} onClick={mockedCallback} />);
    screen.debug();
    
    // cerco l'elemento con test-id pokemon card
    const pokemonCardElement = screen.getByTestId("pokemonCard")
    expect(pokemonCardElement).toBeInTheDocument();

    // prima del click non deve essere chiamata
    expect(mockedCallback).toHaveBeenCalledTimes(0);

    // eseguo il click
    fireEvent.click(pokemonCardElement)

    // dopo il click la funzione deve essere stata chiamata una volta
    expect(mockedCallback).toHaveBeenCalledTimes(1);

     // altro modo per vedere chiamata a funzione
     console.log("mockedCallback.mock.calls.length: ",mockedCallback.mock.calls.length)
  });
});
