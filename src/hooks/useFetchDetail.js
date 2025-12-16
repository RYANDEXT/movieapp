import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchDetail = (endpoint) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(endpoint);
                setData(response.data);
            } catch (error) {
                console.log('Failed fetching ', endpoint, error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [endpoint]);

    return { data, loading };
};

export default useFetchDetail;
