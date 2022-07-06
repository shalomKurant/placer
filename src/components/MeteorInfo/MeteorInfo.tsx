import { FC } from 'react';
import { IMeteor } from '../../types/IMeteor';
import styles from './MeteorInfo.module.css';
import { googleMapsUrl } from '../../configs/APIConfigs';
import { formatDate } from '../../utils/ValueConverter';

interface IMeteorInfoProps {
  meteorInfo: IMeteor;
}

const openMapWithCoordinate = (coordinates: Array<number>): void => {
  if (!coordinates) return;
  
  window.open(`${googleMapsUrl}${coordinates[0]},${coordinates[1]}`)?.focus();
}

const MeteorInfo: FC<IMeteorInfoProps> = ({meteorInfo}) => { 
  return (
  <div className={styles.MeteorInfo}>
    <div className={styles.Title}>{meteorInfo.name}</div>
    <div>year: {formatDate(meteorInfo.year)}</div>
    <div>mass: {meteorInfo.mass}</div>
    <div className={styles.OpenMapButton} onClick={() => openMapWithCoordinate(meteorInfo?.geolocation?.coordinates)}>Jump to NZ</div>
  </div>
)};

export default MeteorInfo;
