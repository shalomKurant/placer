import { FC } from 'react';
import { IMeteor } from '../../types/IMeteor';
import './SuggestionsList.module.css';
import styles from './SuggestionsList.module.css';

interface SuggestionsListProps {
  filteredSuggestions: Array<string>;
  fieldName: keyof IMeteor;
  onClick: (event: any) => void;
}

const SuggestionsList: FC<SuggestionsListProps> = ({filteredSuggestions, fieldName, onClick}) => {
  return filteredSuggestions.length ? (
    <ul className={styles.suggestions}>
      {filteredSuggestions.map((suggestion: string) => {
        return (
          <li key={suggestion} onClick={onClick}>
            {suggestion}
          </li>
        );
      })}
    </ul>
  ) : (
    <div className={styles.NoSuggestions}>
      <span>{`${fieldName} not found`}</span>
    </div>
  );
};

export default SuggestionsList;
