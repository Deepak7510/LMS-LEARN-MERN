import { fetchCategoryService } from "@/service/instructor/category";
import { createContext, useState } from "react";

export const CategoryContext = createContext(null);

function CategoryContextProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await fetchCategoryService();
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
