import { FC, useContext, useEffect, useState } from 'react';
import { EqualFilter } from "../../models/filter/EqualFilter";
import { IMeteor } from '../../types/IMeteor';
import { getYearFromDateValue } from '../../utils/ValueConverter';
import { ApplayFilterContext } from '../SearchableMeteors/SearchableMeteors';
import SuggestionsList from '../SuggestionsList/SuggestionsList';

interface AutocompleteProps {
  suggestions: Array<string>;
  inputValue?: string;
  fieldName: keyof IMeteor;
}

const Autocomplete: FC<AutocompleteProps> = ({suggestions, inputValue, fieldName}) => { 
  const [filteredSuggestions, setFilteredSuggestions] = useState([""]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const applayFilter = useContext(ApplayFilterContext);

  useEffect(() => {
    if (inputValue)
      setInput(inputValue);
    
  }, [inputValue])

  const onClick = (e: any): void => {
    const inputValue: string = e.target.innerText;
    setFilteredSuggestions([]);
    setInput(inputValue);
    setShowSuggestions(false);
    applayFilter(new EqualFilter(fieldName, inputValue, getYearFromDateValue));
  };

  const onChange = (e: any): void => {
    applayFilter(new EqualFilter(fieldName, ""));
    const userInput: string = e.target.value;
    const suggestionByUserInput: Array<string> = suggestions.filter(
      (suggestion: string) => suggestion.toLowerCase().includes(userInput.toLowerCase()));

    setInput(userInput);
    setFilteredSuggestions(suggestionByUserInput);
    setShowSuggestions(true);
  };

  return (
    <>
      <label>{`Search ${fieldName}:`}</label>
      <input
        type="text"
        onChange={onChange}
        value={input}
      />
      {showSuggestions && input && 
        <SuggestionsList 
          filteredSuggestions={filteredSuggestions} 
          onClick={onClick}
          fieldName={fieldName}/>}
    </>
)};

export default Autocomplete;
