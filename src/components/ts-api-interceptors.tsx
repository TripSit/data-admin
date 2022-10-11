import { useEffect, FC } from 'react';
import { useHistory } from 'react-router-dom';
import tsApi from '../ts-api';
import { useToast } from '../providers/toast';

const TsApiInterceptors: FC = function TsApiInterceptors() {
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    const reqId = tsApi.interceptors.request.use(undefined, (error) => {
      toast('Unable to connect to server.', 'error');
      return Promise.reject(error);
    });

    const resId = tsApi.interceptors.response.use((res) => res.data, (error) => {
      if (error.response.status === 401) {
        history.push('/login');
        return toast('Your session has expired.', 'error');
      }
      return Promise.reject(error);
    });

    return () => {
      tsApi.interceptors.request.eject(reqId);
      tsApi.interceptors.response.eject(resId);
    };
  }, []);

  return null;
};

export default TsApiInterceptors;
