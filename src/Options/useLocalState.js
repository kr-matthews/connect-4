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
  return [value, setLocalValue];
}

export { useLocalState };
