import { FC, useEffect, useState } from 'react';
import { Filter } from "../../models/filter/Filter";
import { IMeteor } from '../../types/IMeteor';
import { getMeteors } from '../../utils/DataFetcher';
import { getYearFromDateValue } from '../../utils/ValueConverter';
import MeteorResults from '../MeteorResults/MeteorResults';
import SearchBar from '../SearchBar/SearchBar';
import styles from './MeteorsBoard.module.css';

interface MeteorsBoardProps {}

const useGetMeteors = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meteorList, setMeteorList] = useState<Array<IMeteor>>([]);

  useEffect(() => {
    const fetchMeteors = async() => {
      try {
        setIsLoading(true);
        const meteorListResponse: Array<IMeteor> = await getMeteors();
        setMeteorList(meteorListResponse);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    fetchMeteors();
  }, [])
  return {meteorList, isLoading};
}

const MeteorsBoard: FC<MeteorsBoardProps> = () => { 
  const [activeFilters, setActiveFilters] = useState<Array<Filter<IMeteor>>>([]);
  const [autocompleteInputValue, setAutocompleteInputValue] = useState<string>();
  const {meteorList, isLoading} = useGetMeteors();;

  const applayFilter = (filter: Filter<IMeteor>, shouldSetInputValue?: boolean) => {
    const oldFilters: Filter<IMeteor>[] = activeFilters.filter((f: Filter<IMeteor>) => f.fieldName !== filter.fieldName);
    if (!filter.value) {
      setActiveFilters(oldFilters);
      return;
    }
    oldFilters.push(filter);
    setActiveFilters(oldFilters);

    if (shouldSetInputValue) {
      setAutocompleteInputValue(getYearFromDateValue(String(filter.value)));
    }
  }
  
  return (
  <div className={styles.MeteorsBoard}>
    <SearchBar 
      meteorList={meteorList} 
      applayFilter={applayFilter} 
      inputValueAutocomplete={autocompleteInputValue}/>
    <MeteorResults 
      meteorList={meteorList} 
      filters={activeFilters} 
      applayFilter={applayFilter}
      isLoading={isLoading}/>
  </div>
  )};

export default MeteorsBoard;