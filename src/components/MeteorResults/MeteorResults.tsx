import React, { FC, useEffect, useState } from 'react';
import { Filter } from "../../models/filter/Filter";
import { IMeteor } from '../../types/IMeteor';
import EmptyResult from '../EmptyResult/EmptyResult';
import MeteorInfo from '../MeteorInfo/MeteorInfo';
import styles from './MeteorResults.module.css';

interface MeteorResultsProps {
  meteorList: Array<IMeteor>;
  filters: Array<Filter<IMeteor>>;
  isLoading: boolean;
  applayFilter: (filter: Filter<IMeteor>, shouldSetInputValue?: boolean) => void; 
}

const shouldShowMeteorInfo = (meteor: IMeteor, filters: Array<Filter<IMeteor>>): boolean => {
  return filters.every(f => f.isMatchesValue(meteor));
}

const MeteorResults: FC<MeteorResultsProps> = ({meteorList, filters, isLoading, applayFilter}) => {
  const [listToDisplay, setListToDIsplay] = useState(meteorList);
  useEffect(() => {
    const listToDIsplay: Array<IMeteor> = meteorList.filter(m => shouldShowMeteorInfo(m, filters));
    setListToDIsplay(listToDIsplay);
  }, [meteorList, filters])
  
  return (
  <div className={styles.MeteorResults}>
    {isLoading ? <div className={styles.Loading}>Loading Meteors...</div> : <></>}
    {!listToDisplay.length && !isLoading ? 
      <EmptyResult 
        meteorList={meteorList} 
        filters={filters} 
        applayFilter={applayFilter}/> : <></>}

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
