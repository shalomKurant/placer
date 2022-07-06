import { FC } from 'react';
import { EqualFilter } from "../../models/filter/EqualFilter";
import { Filter } from "../../models/filter/Filter";
import { IMeteor } from '../../types/IMeteor';
import { getYearFromDateValue } from '../../utils/ValueConverter';
import styles from './EmptyResult.module.css';

interface EmptyResultProps {
  meteorList: Array<IMeteor>;
  filters: Array<Filter<IMeteor>>;
  applayFilter: (filter: Filter<IMeteor>, shouldSetInputValue?: boolean) => void;
}

const getSuggestionMeteor = (meteorList: Array<IMeteor>, filters: Array<Filter<IMeteor>>): IMeteor | undefined => {
  const sortedList: Array<IMeteor> = meteorList.sort((a: IMeteor, b: IMeteor) => new Date(a.year).valueOf() - new Date(b.year).valueOf())
  const filtersWithoutYear: Array<Filter<IMeteor>> = filters.filter(filter => filter.fieldName !== "year");
  return sortedList.find(meteor => filtersWithoutYear.every(filter => filter.isMatchesValue(meteor)));
}

const EmptyResult: FC<EmptyResultProps> = ({meteorList, filters, applayFilter}) => {
  const suggestionMeteor = getSuggestionMeteor(meteorList, filters);

  return (
  <>
    <div>Result not found
      {suggestionMeteor ? 
        <div className={styles.JumpToYearButton} 
          onClick={() => applayFilter(new EqualFilter("year", suggestionMeteor!.year, getYearFromDateValue), true)}>
          Jump to <span className={styles.YearText}>{getYearFromDateValue(suggestionMeteor?.year)}</span> to find result
        </div> : <></>}
    </div>
    {suggestionMeteor?.name}
  </>
)};

export default EmptyResult;
