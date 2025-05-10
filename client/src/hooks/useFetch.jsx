import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";

function useFetch(url, dependences = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axiosInstance.get(url);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setData(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, dependences);

  return { data, loading, fetchData };
}

export default useFetch;
