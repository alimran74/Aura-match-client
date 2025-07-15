import axios from 'axios';
import { getAuth } from "firebase/auth";
import { useEffect } from 'react';

const axiosSecure = axios.create({ baseURL: 'http://localhost:5000' });

const useAxiosSecure = () => {
  useEffect(() => {
    const reqInt = axiosSecure.interceptors.request.use(async config => {
      const token = await getAuth().currentUser?.getIdToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => axiosSecure.interceptors.request.eject(reqInt);
  }, []);
  return axiosSecure;
};

export default useAxiosSecure;
