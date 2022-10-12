import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import tsApi from '../ts-api';

interface Options<Payload, Data> extends Omit<AxiosRequestConfig, 'cancelToken'> {
  transform?: ((res: Payload) => Data) | keyof Payload;
}

export default function usePageFetch<Payload, Data = Payload>(
  path: string,
  { transform, ...requestConfig }: Options<Payload, Data> = {},
) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    tsApi.get(path, {
      ...requestConfig,
      cancelToken: source.token,
    })
      .then((res) => {
        if (typeof transform === 'function') setData(transform(res.data));
        else if (typeof transform === 'string') setData(res.data[transform]);
        else setData(res.data);
      })
      .catch((ex) => {
        if (!axios.isCancel(ex)) setError(ex);
      });

    return () => source.cancel();
  }, []);

  return { data, setData, error };
}
