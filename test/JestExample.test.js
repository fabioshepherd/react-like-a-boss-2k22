import { Pokemon } from "../src/classes/Pokemon";

let bulbasaur;

beforeEach(() => {
  bulbasaur = new Pokemon("bulbasaur", 100);
});

describe("Pokemon Test", () => {

  // 1
  test("Variable type", () => {
    expect(bulbasaur).toBeInstanceOf(Pokemon);
  });

  // 2
  test("Getters", () => {
    expect(bulbasaur.getHp()).toBe(100);
    expect(bulbasaur.getName()).toBe("bulbasaur");
  });

  // 3
  test("Setters", () => {
    bulbasaur.setHp(1000);
    expect(bulbasaur.getHp()).toBe(1000);

    bulbasaur.setName("BULBASAUR");
    expect(bulbasaur.getName()).toBe("BULBASAUR");
  });

  // 4
  test("asObject function", () => {
      console.log(bulbasaur.asObject())
    expect(bulbasaur.asObject()).toBe({ name: "bulbasaur", hp: 100 }); // toBe --> toEqual
  });
});
