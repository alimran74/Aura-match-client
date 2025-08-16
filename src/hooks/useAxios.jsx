import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://aura-match-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance
};

export default useAxios;

