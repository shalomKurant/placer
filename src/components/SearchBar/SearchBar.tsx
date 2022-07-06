import { FC } from 'react';
import { Filter } from "../../models/filter/Filter";
import { IMeteor } from '../../types/IMeteor';
import { getYearFromDateValue } from '../../utils/ValueConverter';
import Autocomplete from '../Autocomplete/Autocomplete';
import FreeTextInput from '../FreeTextInput/FreeTextInput';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  meteorList: Array<IMeteor>;
  inputValueAutocomplete?: string;
  applayFilter: (filter: Filter<IMeteor>, shouldSetInputValue?: boolean) => void; 
}

const getUniqueYearList = (meteorList: Array<IMeteor>): Array<string> => {
  return [...new Set(meteorList.map(meteorInfo => getYearFromDateValue(meteorInfo.year)))];
}

const SearchBar: FC<SearchBarProps> = ({meteorList, inputValueAutocomplete, applayFilter}) => {  
  return (
  <div className={styles.SearchBar}>
    <div className={styles.Title}>Filters</div>
    <FreeTextInput applayFilter={applayFilter} fieldName="mass"/>
    <Autocomplete 
      suggestions={getUniqueYearList(meteorList)} 
      applayFilter={applayFilter} 
      inputValue={inputValueAutocomplete}
      fieldName="year"/>
  </div>
)};

export default SearchBar;
