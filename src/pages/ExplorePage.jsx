import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../components/Card';

const ExplorePage = () => {
    const params = useParams();
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);
    const [totalPageNumber, setTotalPageNumber] = useState(0);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setPageNumber((prev) => prev + 1);
        }
    };
    console.log(document.body.offsetHeight);
    const fetchData = async () => {
        try {
            const response = await axios.get(`/discover/${params.explore}`, {
                params: {
                    page: pageNumber,
                },
            });
            setData((prevData) => {
                return [...prevData, ...response.data.results];
            });
            setTotalPageNumber(response.data.total_page);
        } catch (error) {
            console.log('Failed fetching explore page data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    useEffect(() => {
        setPageNumber(1);
        setData([]);
        fetchData();
    }, [params.explore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);
    return (
        <div className="pt-16">
            <div className="container mx-auto">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">Popular {params.explore} Show</h3>

                <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6">
                    {data.map((exploreData, index) => (
                        <Card
                            data={exploreData}
                            key={exploreData.id + 'exploreSection' + index}
                            media_type={params.explore}></Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
