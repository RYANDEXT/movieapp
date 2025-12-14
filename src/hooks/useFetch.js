import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(endpoint);
                setData(response.data.results);
            } catch (error) {
                console.log('Failed fetching ', endpoint, error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { data, loading };
};

export default useFetch;
