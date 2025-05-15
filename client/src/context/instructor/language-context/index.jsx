import { fetchLanguageService } from "@/service/instructor/language";
import { createContext, useState } from "react";

export const LanguageContext = createContext(null);

function LanguageContextProvider({ children }) {
  const [languageList, setLanguageList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await fetchLanguageService();
    setLanguageList([...response.data]);
    setLoading(false);
  }

  return (
    <LanguageContext.Provider value={{ languageList, loading, fetchData }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContextProvider;
