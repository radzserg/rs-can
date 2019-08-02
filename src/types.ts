export interface Type<T> extends Function {
    new (...args: any[]): T;
}
export type CheckCondition = (
    performer: Type<any>,
    target: Type<any>,
    options?: any
) => boolean;
