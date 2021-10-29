import { useState } from "react";

function useLocalState(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key));
  const [value, setValue] = useState(
    savedValue === null ? initialValue : savedValue
  );
  function setLocalValue(newValue) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }
  // if using the initialValue, save it into local storage now
  if (savedValue === null) {
    setLocalValue(value);
  }
  return [value, setLocalValue];
}

export { useLocalState };
