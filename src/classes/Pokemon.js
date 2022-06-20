export class Pokemon {
    #name;
    #hp;

    constructor(name, hp) {
        this.#name = name;
        this.#hp = hp;
    }

    getName() {
        return this.#name
    }

    getHp() {
        return this.#hp
    }

    setName(newName) {
        this.#name = newName
    }

    setHp(newHp)
    {
        this.#hp = newHp
    }

    asObject()
    {
        return {
            name: this.#name,
            hp: this.#hp
        }
    }

    playSound()
    {
        return "fabio"
    }

    attack()
    {
        if(this.getHp() <= 0)
        {   
            throw new Error("Pokemon is dead")
        }

        for(let i=0; i<5; i++)
        {
            this.playSound()
        }
    }
}