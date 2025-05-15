import { fetchLevelService } from "@/service/instructor/level";
import { createContext, useEffect, useState } from "react";

export const LevelContext = createContext(null);
function LevelContextProvider({ children }) {
  const [levelList, setLevelList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await fetchLevelService();
    setLevelList([...response.data]);
    setLoading(false);
  }

  return (
    <LevelContext.Provider value={{ levelList, loading, fetchData }}>
      {children}
    </LevelContext.Provider>
  );
}

export default LevelContextProvider;
