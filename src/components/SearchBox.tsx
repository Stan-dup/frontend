import { useState, useRef, useEffect } from "react";

import { Input } from "./Input";
import { fetchInstance } from "@/utils/axios_instance";
import styled from "@emotion/styled";

type SearchBoxProps<T extends Record<string, unknown>> = {
  placeholder?: string;
  label?: string;
  mockData?: T[];
  displayKey: string;
  searchUrl: string;
  isRequired?: boolean;
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
    return;
  }
  fetchInstance()
    .post(searchUrl, {
      storeName: query,
    })
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
  isRequired,
  searchUrl,
  mockData,
  displayKey,
  onSelected,
  selected,
}: SearchBoxProps<T>) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<T[]>([]);
  const debounceRef = useRef<number | null>(null);

  const handleSelected = (selected: T) => {
    setResults([]);
    setQuery("");
    onSelected(selected);
  };

  // debounce 적용
  useEffect(() => {
    if (query === "") return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadResult(query, searchUrl, setResults, mockData);
    }, 600);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [mockData, query, searchUrl]);

  return (
    <div>
      <Input
        label={label}
        isRequired={isRequired}
        placeholder={selected ? String(selected[displayKey]) : placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
        icon="search"
      />
      {results.length != 0 ? (
        <ResultWrapper2>
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
        </ResultWrapper2>
      ) : (
        <></>
      )}
      {selected ? (
        <style>{`::placeholder{color: var(--color-black)}`}</style>
      ) : null}
    </div>
  );
};

const ResultWrapper2 = styled.div({
  position: "relative",
});

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
});

const Result = styled.button({
  padding: 12,
  "&:focus, &:hover": {
    background: "var(--color-gray)",
  },
});
