import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchByCondition = ({ endpoint, page, query = '' }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (page === 1) {
            setData([]);
        }

        const params = query ? { page, query } : { page };
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoint, { params });
                setData((prev) => {
                    return [...prev, ...response.data.results];
                });
            } catch (error) {
                console.log('error fetching data by condition', error);
            }
        };

        fetchData();
    }, [endpoint, page, query]);

    return { data };
};

export default useFetchByCondition;
