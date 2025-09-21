import { createContext, SetStateAction } from "react";

const AppContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>> | null;
}>({
  loading: false,
  setLoading: null,
});

export default AppContext;
