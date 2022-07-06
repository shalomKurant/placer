import { FC, useContext } from 'react';
import { IMeteor } from '../../types/IMeteor';
import { getYearFromDateValue } from '../../utils/ValueConverter';
import Autocomplete from '../Autocomplete/Autocomplete';
import FreeTextInput from '../FreeTextInput/FreeTextInput';
import { MeteorListContext } from '../SearchableMeteors/SearchableMeteors';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  inputValueAutocomplete?: string;
}

const getUniqueYearList = (meteorList: Array<IMeteor>): Array<string> => {
  return [...new Set(meteorList.map(meteorInfo => getYearFromDateValue(meteorInfo.year)))];
}

const SearchBar: FC<SearchBarProps> = ({inputValueAutocomplete}) => {
  const meteorList = useContext(MeteorListContext);
    
  return (
  <div className={styles.SearchBar}>
    <div className={styles.Title}>Filters</div>
    <FreeTextInput fieldName="mass"/>
    <Autocomplete 
      suggestions={getUniqueYearList(meteorList)} 
      inputValue={inputValueAutocomplete}
      fieldName="year"/>
  </div>
)};

export default SearchBar;
