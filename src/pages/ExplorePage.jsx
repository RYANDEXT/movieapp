import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import useFetchByCondition from '../hooks/useFetchByCondition';

const ExplorePage = () => {
    const params = useParams();
    const [pageNumber, setPageNumber] = useState(1);
    let { data } = useFetchByCondition({ endpoint: `/discover/${params.explore}`, page: pageNumber });

    useEffect(() => {
        setPageNumber(1);
    }, [params.explore]);

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
            <div className="container mx-auto">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">Popular {params.explore} Show</h3>
                {data && data.length > 0 && (
                    <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center">
                        {data.map((exploreData, index) => (
                            <Card
                                data={exploreData}
                                key={exploreData.id + 'exploreSection' + index}
                                media_type={params.explore}></Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
