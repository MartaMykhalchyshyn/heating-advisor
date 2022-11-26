import React, { useState, useEffect } from "react";

import { DebounceInput } from "react-debounce-input";

import "./search.sass";

const search = ({ setCityName, selectedCityId }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    selectedCityId && setInputValue("");
  }, [selectedCityId]);

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
    setCityName(event.target.value);
  };

  return (
    <div className="search">
      <div>
        <DebounceInput
          type="text"
          className="search-input"
          minLength={3}
          debounceTimeout={300}
          onChange={onChangeHandler}
          onKeyDown={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name"
          value={inputValue}
        />
      </div>
    </div>
  );
};

export default search;
