import renderer from "react-test-renderer";
import PageTitle from "../src/components/common/PageTitle";
import PokemonCard from "../src/components/Pokemon/PokemonCard";
import PokemonDetailPage from "../src/pages/PokemonDetailPage";
import { setTimeout } from "timers/promises";
import VideoPage from "../src/pages/VideoPage";
import PokemonPage from "../src/pages/PokemonPage";
import axios from "axios";
import { createMemoryHistory } from "history";

describe("Snapshot Tests", () => {
  test("First Snapshot Test", () => {
    const component = renderer.create(<div> Hello Snapshot </div>);
    const jsonComponent = component.toJSON();

    expect(jsonComponent).toMatchSnapshot();
  });

  // descrive dopo --> all'inizio solo il test
  test("PageTitle Test", () => {
    const component = renderer.create(<PageTitle title={"Titolo pagina"} />);
    let jsonRap = component.toJSON();
    expect(jsonRap).toMatchSnapshot(); // h3 --> h4
  });

  test("PokemonCard Test", () => {
    const component = renderer.create(
      <PokemonCard number={10} name={"bulbasaur"} onClick={() => {}} />
    );
    const jsonRap = component.toJSON();
    expect(jsonRap).toMatchSnapshot();
  });

  test("VideoPage Test", () => {
    // PROBLEMA NON ESEGUE LO USE STATE
    let component;
    component = renderer.create(<VideoPage />);
    //renderer.act(()=>{component  = renderer.create(<VideoPage />);})

    // component  = renderer.create(<VideoPage />);
    const jsonRap = component.toJSON();
    expect(jsonRap).toMatchSnapshot();
  });

  test("PokemonPage Test", async () => {
    //const history = createMemoryHistory();
    //const component = renderer.create(<Router location={history.location} navigator={history}><PokemonPage /></Router>);

    const component = renderer.create(<PokemonPage />);
    expect(component.toJSON()).toMatchSnapshot();

    // problema 1. routing
    // problema 2. non vengono renderizzati i 400 pokemon

    // usare timeout corretto
    // import { setTimeout } from "timers/promises";

    await renderer.act(async () => {
      expect(component.toJSON()).toMatchSnapshot();

      await setTimeout(3000);

      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  test("PokemonDetailPage Test", async () => {
    // 2 problemi:
    // 1. routing, su quale URL viene eseguito il test? quindi qual è il parametro => useParam
    // 2. recupero dati pokemon async

    let root;
    await renderer.act(async () => {
      /*root = renderer.create(
        <MemoryRouter initialEntries={["/pokemon/1"]}>
          <Routes>
            <Route
              path="/pokemon/:number"
              element={<PokemonDetailPage />}
            ></Route>
          </Routes>
        </MemoryRouter>
      );*/
      root = renderer.create(<PokemonDetailPage />);
      expect(root.toJSON()).toMatchSnapshot();

      await setTimeout(1000);

      expect(root.toJSON()).toMatchSnapshot();
    });
  });
});

// jest.setTimeout(100000);
describe("Object structure Tests", () => {
  test("api result structure", async () => {
    const apiCallResult = await axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    console.log(apiCallResult);

    // prima delle struttura, testiamo che sia ok e che ci sia un risultato
    expect(apiCallResult.status).toBe(200);
    expect(apiCallResult.data).not.toBeNull();
    expect(apiCallResult.data).not.toBeUndefined();

    // testiamo la struttura dell'oggetto restituito
    const responseBody = apiCallResult.data;

    // proviamo a salvarlo in uno spapshot
    // il test fallirà sempre!!
    //expect(responseBody).toMatchSnapshot();

    // quindi non ha senso fare un test sui valori
    // ma piu sulla struttura

    const currencyStructure = {
      code: expect.any(String),
      symbol: expect.any(String),
      rate: expect.any(String),
      description: expect.any(String),
      rate_float: expect.any(Number),
      // rate_float_2: expect.any(Number)
    };

    expect(responseBody).toMatchSnapshot({
      time: {
        updated: expect.any(String),
        updatedISO: expect.any(String),
        updateduk: expect.any(String),
      },
      disclaimer: expect.any(String),
      chartName: "Bitcoin",
      //poi
      bpi: {
        USD: currencyStructure,
        GBP: currencyStructure,
        EUR: currencyStructure,
      },
    });
  });
});
