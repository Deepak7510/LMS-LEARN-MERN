import { fetchLevel } from "@/service/level";
import { createContext, useEffect, useState } from "react";

export const LevelContext = createContext(null);
function LevelContextProvider({ children }) {
  const [levelList, setLevelList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await fetchLevel();
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
