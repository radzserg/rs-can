import Ability from "./Ability";
import {CheckCondition, Type} from "./types";
import Abilities from "./Abilities";

export interface IAccessControl {
    can: (performer: any, action: string, target: any, options?: any) => boolean;
}

export default class AccessControl implements IAccessControl {
    private abilities: Abilities;

    constructor() {
        this.abilities = new Abilities([]);
    }

    /**
     * Check if the object of performer can make "action" on target
     */
    can(performer: any, action: string, target?: any, options?: any): boolean {
        return this.abilities.filterByPerformer(performer)
            .filterByTarget(target)
            .filterByAction(action)
            .filterByCondition(performer, target, options)
            .length() > 0;
    }

    /**
     * Allows to perform "action" for "performer" on "target"
     * i.e. allow(User, "manage", Post)
     * If condition callback is provided, it will be used during "can" resolving
     */
    allow(
        performer: Type<any>,
        action: string,
        target?: Type<any>,
        condition?: CheckCondition
    ) {
        this.abilities.add(new Ability(performer, action, target, condition));
    }
}
