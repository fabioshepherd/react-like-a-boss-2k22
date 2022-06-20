import renderer from "react-test-renderer";
import PageTitle from "../src/components/common/PageTitle";
import PokemonPage from "../src/pages/PokemonPage";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { setTimeout } from "timers/promises";
import axios from "axios";

describe("Snapshot Tests", () => {
  test("First Snapshot Test", () => {
        const component = renderer.create(<div> Hello Snapshot </div>)

        expect(component.toJSON()).toMatchSnapshot();
    })

  test("PageTitle Test", () => {
        const component = renderer.create(<PageTitle title={"Titolo pagina"}></PageTitle>)
        expect(component.toJSON()).toMatchSnapshot();
    })

  test("PokemonPage Test", async () => {
    const history = createMemoryHistory();
    const component = renderer.create(
      <Router location={history.location} navigator={history}>
        <PokemonPage />
      </Router>
    );

    await renderer.act(async () => {
      expect(component.toJSON()).toMatchSnapshot();

      await setTimeout(3000);

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});

describe("Object structure test", () => {
    test("api result structure", async () => {
        const apiCallResult = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")

        expect(apiCallResult.status).toBe(200);
        expect(apiCallResult.data).not.toBeNull();
        expect(apiCallResult.data).not.toBeUndefined();

        const responseBody = apiCallResult.data;

        const currecyStructure = {
            code: expect.any(String),
            symbol: expect.any(String),
            rate:  expect.any(String),
            description: expect.any(String),
            rate_float: expect.any(Number)
        }

        expect(responseBody).toMatchSnapshot({
            time: {
                updated: expect.any(String),
                updatedISO: expect.any(String),
                updateduk: expect.any(String),
                updatedit:  expect.any(String)
            },
            disclaimer: expect.any(String),
            chartName: "Bitcoin",
            bpi: {
                USD: currecyStructure,
                GBP: currecyStructure,
                EUR: currecyStructure
            }
        })
    });
})
