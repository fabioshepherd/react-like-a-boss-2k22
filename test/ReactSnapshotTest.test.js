import renderer from "react-test-renderer";
import PageTitle from "../src/components/common/PageTitle";
import PokemonCard from "../src/components/Pokemon/PokemonCard";
import PokemonDetailPage from "../src/pages/PokemonDetailPage";
import { setTimeout } from "timers/promises";
import VideoPage from "../src/pages/VideoPage";

describe("Snapshot Tests", () => {

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

  test("PokemonPage Test", () => {
    //const history = createMemoryHistory();
    //const component = renderer.create(<Router location={history.location} navigator={history}><PokemonPage /></Router>);

    const component = renderer.create(<PokemonPage />);
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
