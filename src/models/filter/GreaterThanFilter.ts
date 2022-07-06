import { Filter } from "./Filter";
import { IMeteor } from "../../types/IMeteor";

export class GreaterThanFilter extends Filter<IMeteor> {
    public isMatchesValue(meteor: IMeteor): boolean {
        const inputValue: number = this.valueConverter(this.value);
        
        if (isNaN(inputValue)) return false;

        return this.valueConverter(meteor[this.fieldName]) > inputValue;
    }
}