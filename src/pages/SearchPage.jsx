import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import useFetchByCondition from '../hooks/useFetchByCondition';
import { useDebounce } from '../hooks/useDebounce';

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(1);
    const [searchQuery, setSearchQuery] = useState(location?.search?.slice(3) || '');
    const debouncedQuery = useDebounce(searchQuery, 500);

    let { data } = useFetchByCondition({
        endpoint: '/search/multi',
        page: pageNumber,
        query: debouncedQuery,
    });

    useEffect(() => {
        const query = location?.search?.slice(3) || '';
        setSearchQuery(query);
    }, [location?.search]);

    useEffect(() => {
        setPageNumber(1);
    }, [debouncedQuery]);

    useEffect(() => {
        if (debouncedQuery) {
            navigate(`/search?q=${debouncedQuery}`);
        }
    }, [debouncedQuery, navigate]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setPageNumber((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className="py-16">
            <div className="lg:hidden my-2 mx-1 sticky top-17.5 z-30">
                <input
                    type="text"
                    placeholder="Search here ..."
                    onChange={(e) => navigate(`/search?q=${e.target.value}`)}
                    className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
                />
            </div>

            <div className="container mx-auto">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">Search Result</h3>
                {data.length > 0 && (
                    <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center">
                        {data.map((searchData, index) => (
                            <Card
                                data={searchData}
                                key={searchData.id + 'Search Data' + index}
                                media_type={searchData.media_type}></Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
