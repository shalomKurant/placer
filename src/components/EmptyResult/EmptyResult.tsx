import { FC, useContext } from 'react';
import { EqualFilter } from "../../models/filter/EqualFilter";
import { Filter } from "../../models/filter/Filter";
import { IMeteor } from '../../types/IMeteor';
import { getYearFromDateValue } from '../../utils/ValueConverter';
import { ApplayFilterContext, MeteorListContext } from '../SearchableMeteors/SearchableMeteors';
import styles from './EmptyResult.module.css';

interface EmptyResultProps {
  filters: Array<Filter<IMeteor>>;
}

const getSuggestionMeteor = (meteorList: Array<IMeteor>, filters: Array<Filter<IMeteor>>): IMeteor | undefined => {
  const sortedList: Array<IMeteor> = meteorList.sort((a: IMeteor, b: IMeteor) => new Date(a.year).valueOf() - new Date(b.year).valueOf())
  const filtersWithoutYear: Array<Filter<IMeteor>> = filters.filter(filter => filter.fieldName !== "year");
  return sortedList.find(meteor => filtersWithoutYear.every(filter => filter.isMatchesValue(meteor)));
}

const EmptyResult: FC<EmptyResultProps> = ({filters}) => {
  const meteorList: Array<IMeteor> = useContext(MeteorListContext);
  const applayFilter = useContext(ApplayFilterContext);
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
  </>
)};

export default EmptyResult;
