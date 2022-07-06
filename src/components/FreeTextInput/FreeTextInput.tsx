import { FC, useContext, useState } from 'react';
import { GreaterThanFilter } from "../../models/filter/GreaterThanFilter";
import { Filter } from "../../models/filter/Filter";
import { IMeteor } from '../../types/IMeteor';
import styles from './FreeTextInput.module.css';
import { ApplayFilterContext } from '../SearchableMeteors/SearchableMeteors';

interface FreeTextInputProps {
  fieldName: keyof IMeteor;
}

const FreeTextInput: FC<FreeTextInputProps> = ({fieldName}) => {
  const [input, setInput] = useState("");
  const applayFilter = useContext(ApplayFilterContext);

  const onChange = (e: any): void => {
    const userInput: string = e.target.value;
    applayFilter(new GreaterThanFilter(fieldName, userInput, (value: string) => Number(value)));
    setInput(userInput);
  };

  return (
  <div className={styles.FreeTextInput}>
    <label>{`Search ${fieldName}:`}</label>
    <input 
      type="text"
      onChange={onChange}
      value={input}/>
  </div>
)};

export default FreeTextInput;
