export class Pokemon {
    #name;
    #hp;

    // 1
    constructor(name, hp) {
        this.#name = name;
        this.#hp = hp;
    }

    // 2
    getName()
    {
        return this.#name;
    }

    // 2
    getHp()
    {
        return this.#hp;
    }

    // 3
    setName(newName)
    {
        this.#name = newName
    }

    // 3
    setHp(newHp)
    {
        this.#hp = newHp;
    }

    // 4
    asObject()
    {
        return {
            name: this.#name,
            hp: this.#hp
        }
    }

    // 5
    playSound()
    {
        return "roar"
    }

    // 5 // 6
    attack()
    {
        // 6
        if(this.getHp() <= 0)
        {
            throw new Error("Pokemon is dead");
        }

        // playSound 5 volte
        for(let i = 0; i <= 5; i++)
        {
            this.playSound()
        }
    }
}