import oo,{ MemoryRouter, Route, Routes } from "react-router-dom";
import ReactRouter  from "react-router";
import renderer from "react-test-renderer";
import PageTitle from "../src/components/common/PageTitle";
import PokemonCard from "../src/components/Pokemon/PokemonCard";
import PokemonDetailPage from "../src/pages/PokemonDetailPage";
import PokemonPage from "../src/pages/PokemonPage";
import { screen } from "@testing-library/react";
import { Timeline } from "@mui/icons-material";
import { setTimeout } from "timers/promises"

afterEach(() => {
  
 // jest.clearesetAllMocks();
})

beforeEach(() => {
  jest.mock("react-router-dom",() => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
      number: "1"
    }),
    useRouteMatch: () => ({ url: '/pokemon/1' }),
  }))
})


describe("Snapshot Tests", () => { // descrive dopo --> all'inizio solo il test
  test("PageTitle Test", () => {
    const component = renderer.create(<PageTitle title={"Titolo pagina"} />);
    let jsonRap = component.toJSON();
    expect(jsonRap).toMatchSnapshot(); // h3 --> h4
  });

  test("PokemonCard Test", () => {
    const component = renderer.create(<PokemonCard number={10} name={"bulbasaur"} onClick={() => {}} />)
    const jsonRap = component.toJSON();
    expect(jsonRap).toMatchSnapshot();
  })

  test("PokemonPage Test", () => {
    //const history = createMemoryHistory();
    //const component = renderer.create(<Router location={history.location} navigator={history}><PokemonPage /></Router>);

    const component = renderer.create(<PokemonPage />);
    const jsonRap = component.toJSON();
    expect(jsonRap).toMatchSnapshot();
  })

  test("PokemonDetailPage Test", async () => {

   
    //jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ number: '1' });
    //console.log("useParams()");
   // console.log(oo.useParams());



    //let component = renderer.create(<MemoryRouter initialEntries={['/pokemon/1']}><Routes><Route path="/pokemon/:number" element={<PokemonDetailPage />}></Route></Routes></MemoryRouter>)
   // const jsonRap = component.toJSON();
    //expect(jsonRap).toMatchSnapshot(); // problema, quello che è stato messo nello snapshot
                                        // 2 problema, non ho un indirizzo
   
  // await 
   
  // await renderer.act(()=> component = renderer.create(<MemoryRouter initialEntries={['/pokemon/1']}><Routes><Route path="/pokemon/:number" element={<PokemonDetailPage />}></Route></Routes></MemoryRouter>) )
  //  const jsonActRap = component.toJSON();
  //  expect(jsonActRap).toMatchSnapshot(); // problema, quello che è stato messo nello snapshot

   // await renderer.act(()=> component.update(<MemoryRouter initialEntries={['/pokemon/1']}><Routes><Route path="/pokemon/:number" element={<PokemonDetailPage />}></Route></Routes></MemoryRouter>) )
   // const jsonUpdRap = component.toJSON();
   // expect(jsonUpdRap).toMatchSnapshot(); // problema, quello che è stato messo nello snapshot*/
 
   let root; 
   await renderer.act(async () => {
     root = renderer.create(<MemoryRouter initialEntries={['/pokemon/1']}><Routes><Route path="/pokemon/:number" element={<PokemonDetailPage />}></Route></Routes></MemoryRouter>)
     expect(root.toJSON()).toMatchSnapshot();

    await setTimeout(1000)

      expect(root.toJSON()).toMatchSnapshot();
    });

  
/*
   await renderer.act(() => {
    root.update(<MemoryRouter initialEntries={['/pokemon/1']}><Routes><Route path="/pokemon/:number" element={<PokemonDetailPage />}></Route></Routes></MemoryRouter>);
  })
  
  // asserzioni sulla root
  expect(root.toJSON()).toMatchSnapshot();*/
})
});
