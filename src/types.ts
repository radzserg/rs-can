export interface Type<T> extends Function {
    new (...args: any[]): T;
}
export type CheckCondition = (
    performer: any,
    target: any,
    options?: any
) => boolean;
