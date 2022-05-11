import renderer from "react-test-renderer";
import PageTitle from "../src/components/common/PageTitle";
it("PageTitle Test", () => {
  const component = renderer.create(<PageTitle title={"Prova"} />);

  let json = component.toJSON();
  expect(json).toMatchSnapshot();
});
