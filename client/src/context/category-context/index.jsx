import { fetchCategory } from "@/service/category";
import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext(null);

function CategoryContextProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await fetchCategory();
    setCategoryList([...response.data]);
    setLoading(false);
  }

  return (
    <CategoryContext.Provider value={{ categoryList, loading, fetchData }}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryContextProvider;
