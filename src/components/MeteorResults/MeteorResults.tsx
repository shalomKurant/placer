import { FC, useContext, useLayoutEffect, useState } from 'react';
import { Filter } from "../../models/filter/Filter";
import { IMeteor } from '../../types/IMeteor';
import EmptyResult from '../EmptyResult/EmptyResult';
import MeteorInfo from '../MeteorInfo/MeteorInfo';
import { MeteorListContext } from '../SearchableMeteors/SearchableMeteors';
import styles from './MeteorResults.module.css';

interface MeteorResultsProps {
  filters: Array<Filter<IMeteor>>;
  isLoading: boolean;
}

const shouldShowMeteorInfo = (meteor: IMeteor, filters: Array<Filter<IMeteor>>): boolean => {
  return filters.every(f => f.isMatchesValue(meteor));
}

const useGetListToDisplay = (meteorList: Array<IMeteor>, filters: Array<Filter<IMeteor>>) => {
  const [listToDisplay, setListToDisplay] = useState(meteorList);

  useLayoutEffect(() => {
    const listToDisplay: Array<IMeteor> = meteorList.filter(m => shouldShowMeteorInfo(m, filters));
    setListToDisplay(listToDisplay);
  }, [meteorList, filters]);

  return listToDisplay;
}

const MeteorResults: FC<MeteorResultsProps> = ({filters, isLoading}) => {
  const meteorList: Array<IMeteor> = useContext(MeteorListContext);
  const listToDisplay = useGetListToDisplay(meteorList, filters);

  return (
  <div className={styles.MeteorResults}>
    {isLoading ? <div className={styles.Loading}>Loading Meteors...</div> : <></>}
    {!listToDisplay.length && !isLoading ? 
      <EmptyResult 
        filters={filters}/> : <></>}

     <div className={styles.MeteorList}>
      {listToDisplay.map((meteorInfo: IMeteor) => {
        return (
          <MeteorInfo key={meteorInfo.id} meteorInfo={meteorInfo}/>
        )
      })}
    </div>
  </div>
)};

export default MeteorResults;