import { FC, createContext, useState, useEffect } from 'react';
import { Filter } from '../../models/filter/Filter';
import { IMeteor } from '../../types/IMeteor';
import { getMeteors } from '../../utils/DataFetcher';
import { getYearFromDateValue } from '../../utils/ValueConverter';
import MeteorResults from '../MeteorResults/MeteorResults';
import SearchBar from '../SearchBar/SearchBar';
import styles from './SearchableMeteors.module.css';

interface SearchableMeteorsProps {}

export const MeteorListContext = createContext<Array<IMeteor>>([]);
export const ApplayFilterContext = createContext<(filter: Filter<IMeteor>, shouldSetInputValue?: boolean) => void>(null as any);
export const ActiveFiltersContext = createContext<Array<Filter<IMeteor>>>([]);

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

const SearchableMeteors: FC<SearchableMeteorsProps> = () => {
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
    <MeteorListContext.Provider value={meteorList}>
      <ApplayFilterContext.Provider value={applayFilter}>
        <ActiveFiltersContext.Provider value={activeFilters}>
          <div className={styles.SearchableMeteors}>
            <SearchBar 
              inputValueAutocomplete={autocompleteInputValue}/>
            <MeteorResults 
              filters={activeFilters} 
              isLoading={isLoading}/>
          </div>
        </ActiveFiltersContext.Provider>
      </ApplayFilterContext.Provider>
    </MeteorListContext.Provider>
  )};

export default SearchableMeteors;
