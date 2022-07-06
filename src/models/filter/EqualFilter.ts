import { IMeteor } from "../../types/IMeteor";
import { Filter } from "./Filter";


export class EqualFilter extends Filter<IMeteor> {
    public isMatchesValue(meteor: IMeteor): boolean {
        return this.valueConverter(this.value) === this.valueConverter(meteor[this.fieldName]);
    }
}
