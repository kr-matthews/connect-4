import { useState } from "react";

function useLocalState(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key));
  const [value, setValue] = useState(savedValue || initialValue);
  function setLocalValue(newValue) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }
  return [value, setLocalValue];
}

export { useLocalState };
