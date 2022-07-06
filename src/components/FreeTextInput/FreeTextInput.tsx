import { FC, useState } from 'react';
import { GreaterThanFilter } from "../../models/filter/GreaterThanFilter";
import { Filter } from "../../models/filter/Filter";
import { IMeteor } from '../../types/IMeteor';
import styles from './FreeTextInput.module.css';

interface FreeTextInputProps {
  applayFilter(filter: Filter<IMeteor>, shouldSetInputValue?: boolean): void;
  fieldName: keyof IMeteor;
}

const FreeTextInput: FC<FreeTextInputProps> = ({applayFilter, fieldName}) => {
  const [input, setInput] = useState("");

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
