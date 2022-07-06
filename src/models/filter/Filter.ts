export abstract class Filter<T> {
    constructor(public fieldName: keyof T,
                public value: string | number,
                public valueConverter = (value: any) => value) { }

    public abstract isMatchesValue(meteor: T): boolean;
}
