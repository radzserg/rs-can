import { CheckCondition, Type } from "./types";

export default class Ability {
    public readonly performerClass: Type<any>;
    public readonly targetClass: Type<any> | undefined;
    public readonly action: string;
    private readonly condition: CheckCondition;

    constructor(
        performerClass: Type<any>,
        action: string,
        targetClass?: Type<any>,
        condition?: CheckCondition
    ) {
        this.performerClass = performerClass;
        this.action = action;
        this.targetClass = targetClass;
        this.condition = condition;
    }

    can(performer?: any, target?: any, options?: any) {
        if (this.condition === undefined) {
            return true;
        }
        return this.condition(performer, target, options);
    }
}
