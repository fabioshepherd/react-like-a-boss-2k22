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
    //console.log(bulbasaur.asObject())
    expect(bulbasaur.asObject()).toBe({ name: "bulbasaur", hp: 100 }); // toBe --> toEqual
  });

  // 5
  // attack function calls playSound 5 times
  test("attack function", () => {
    // function spy
    const playSoundMocked = jest.spyOn(bulbasaur, "playSound");

    // function execution
    bulbasaur.attack();

    // assertion
    expect(playSoundMocked).toHaveBeenCalledTimes(5);
  });

  // 6
  // problema getHp ritorna 100 ==> mockiamo il valore restituito
  test("attack function for dead pokemon", () => {
    // function spy
    const getHpMocked = jest.spyOn(bulbasaur, "getHp");
    getHpMocked.mockReturnValue(0);

    console.log("bulbasaur.getHp(): ", bulbasaur.getHp());

    // assertion
    expect(bulbasaur.attack).toThrow();
  });
});
