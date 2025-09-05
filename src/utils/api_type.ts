export type ApiInputType = {
  setIsLoading?: (loading: boolean) => void;
  setError?: (error: string | null) => void;
  setResult?: (result?: string) => void;
};
