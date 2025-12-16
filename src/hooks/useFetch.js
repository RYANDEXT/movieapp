import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setGlobalLoading } from '../store/movlixSlice';

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.movlixData.loading);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setGlobalLoading(true));
            try {
                const response = await axios.get(endpoint);
                setData(response.data.results);
            } catch (error) {
                console.log('Failed fetching ', endpoint, error);
            } finally {
                dispatch(setGlobalLoading(false));
            }
        };
        fetchData();
    }, [endpoint]);

    return { data, loading };
};

export default useFetch;
