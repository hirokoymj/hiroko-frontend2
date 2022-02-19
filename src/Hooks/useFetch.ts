import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = <R extends any = any>({ method, url }: any) => {
  const [data, setData] = useState<R | null>(null); // set `R` as returned type
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios({ url, method })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, method]);

  const refetch = () => {
    setLoading(true);
    axios({ url, method })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
};
