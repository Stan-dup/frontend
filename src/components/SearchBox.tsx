import { useState } from "react";

import { Input } from "./Input";
import { fetchInstance } from "@/utils/axios_instance";
import styled from "@emotion/styled";

type SearchBoxProps<T extends Record<string, unknown>> = {
  placeholder?: string;
  label?: string;
  mockData?: T[];
  displayKey: string;
  searchUrl: string;
  onSelected: (selected: T) => void;
  selected: T | null;
};

const loadResult = <T,>(
  query: string,
  searchUrl: string,
  setResult: React.Dispatch<React.SetStateAction<T[]>>,
  mockData?: T[]
) => {
  if (query == "") return;
  //TODO: API 연
  if (mockData) {
    setTimeout(() => {
      setResult(mockData);
    }, 3000);
  }
  return;
  fetchInstance()
    .get(`${searchUrl}?q=${query}`)
    .then((response) => {
      setResult(response.data);
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    });
};

export const SearchBox = <T extends Record<string, unknown>>({
  placeholder,
  label,
  searchUrl,
  mockData,
  displayKey,
  onSelected,
  selected,
}: SearchBoxProps<T>) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<T[]>([]);

  const handleSelected = (selected: T) => {
    setResults([]);
    setQuery("");
    onSelected(selected);
  };

  return (
    <div>
      <Input
        label={label}
        placeholder={selected ? String(selected[displayKey]) : placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          loadResult(e.target.value, searchUrl, setResults, mockData);
        }}
        value={query}
        icon="search"
      />
      {results.length != 0 ? (
        <ResultWrapper>
          {...results.map((result) => (
            <Result
              key={String(result[displayKey])}
              onClick={() => handleSelected(result)}
            >
              {String(result[displayKey])}
            </Result>
          ))}
        </ResultWrapper>
      ) : (
        <></>
      )}
      {selected ? (
        <style>{`::placeholder{color: var(--color-black)}`}</style>
      ) : null}
    </div>
  );
};

const ResultWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  zIndex: 1,
  background: "white",
  border: "1px solid var(--color-gray2)",
  borderTop: "none",
  borderRadius: "0 0 8px 8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxHeight: 200,
  overflowY: "auto",
  top: 48,
});

const Result = styled.button({
  padding: 12,
  "&:focus, &:hover": {
    background: "var(--color-gray)",
  },
});
