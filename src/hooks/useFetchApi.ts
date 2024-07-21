import { useEffect, useState } from "react";
import { axiosInstanceWithHeaders } from "../axiosConfig/axiosInstance";

const useFetchApi = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get(url);
      const data = response.data.data;
      setData(data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      getData();
    }
  }, [url]);

  return { data, loading, error, getData };
};

export default useFetchApi;
