import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: 'https://staging.mazaady.com/api/v1/',
});

axiosInstance.interceptors.request.use((config) => {
    config.headers['private-key'] = "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16";
    return config;
  });

axiosInstance.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(err) => {
		throw err;
		// Promise.reject(err);
	},
);

export default axiosInstance;
