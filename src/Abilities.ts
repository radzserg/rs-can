import Ability from "./Ability";

export default class Abilities {
    private abilities: Ability[] = [];

    constructor(abilities: Ability[] = []) {
        this.abilities = abilities;
    }

    add(ability: Ability) {
        this.abilities.push(ability);
    }

    length(): number {
        return this.abilities.length;
    }

    filterByPerformer(performer: any): Abilities {
        const abilities = this.abilities.filter((ability: Ability) => {
            return performer instanceof ability.performerClass;
        });
        return new Abilities(abilities);
    }

    filterByTarget(target: any): Abilities {
        const abilities = this.abilities.filter((ability: Ability) => {
            return (
                ability.targetClass === undefined ||
                target instanceof ability.targetClass
            );
        });
        return new Abilities(abilities);
    }

    filterByAction(action: string): Abilities {
        const abilities = this.abilities.filter((ability: Ability) => {
            return action === ability.action;
        });
        return new Abilities(abilities);
    }

    filterByCondition(performer: any, target: any, options?: any): Abilities {
        const abilities = this.abilities.filter((ability: Ability) => {
            return ability.can(performer, target, options);
        });
        return new Abilities(abilities);
    }
}
