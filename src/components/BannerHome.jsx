import { useSelector } from 'react-redux';
import { FaStar, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BannerHome = () => {
    const bannerData = useSelector((state) => state.movlixData.bannerData);
    const imageURL = useSelector((state) => state.movlixData.imageURL);
    const [currentImage, setCurrentImage] = useState(0);
    const [isReverse, setIsReverse] = useState(false);

    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage((prev) => prev + 1);
        }
        if (currentImage === bannerData.length - 2) {
            setIsReverse(true);
        }
    };

    const handlePrevious = () => {
        if (currentImage > 0) {
            setCurrentImage((prev) => prev - 1);
        }
        if (currentImage === 1) {
            setIsReverse(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImage === 1) {
                setIsReverse(false);
            } else if (currentImage === bannerData.length - 2) {
                setIsReverse(true);
            }

            if (bannerData && bannerData.length > 1) {
                setCurrentImage((prev) => {
                    return isReverse ? prev - 1 : prev + 1;
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [bannerData, currentImage, isReverse]);

    return (
        <section className="w-full h-full">
            <div className="flex min-h-fit max-h-[95vh] overflow-hidden">
                {bannerData && bannerData.length > 0 ? (
                    bannerData?.map((data, index) => (
                        <div
                            key={data?.id + 'bannerHome' + index}
                            className="min-w-full min-h-112.5 lg:min-h-full overflow-hidden relative group transition-all duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <div className="w-full h-full">
                                {imageURL && data?.backdrop_path && (
                                    <img
                                        src={imageURL + data?.backdrop_path}
                                        alt="Movie Image"
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>

                            {/* button next and previous image */}
                            <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
                                <button
                                    onClick={handlePrevious}
                                    className="bg-white p-1 rounded-full text-xl z-10 text-black cursor-pointer">
                                    <FaAngleLeft />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="bg-white p-1 rounded-full text-xl z-10 text-black">
                                    <FaAngleRight />
                                </button>
                            </div>

                            <div className="absolute top-0 w-full h-full bg-linear-to-t from-neutral-900 to-transparent"></div>

                            <div className="container mx-auto">
                                <div className="container mx-auto w-full absolute bottom-0 max-w-md px-3">
                                    <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                                        {data?.title || data?.name}
                                    </h2>
                                    <p className="text-ellipsis line-clamp-3 my-2">{data?.overview}</p>
                                    <div className="flex items-center gap-4">
                                        <p>
                                            Rating: {Number(data?.vote_average).toFixed(1)}{' '}
                                            <FaStar className="inline" />
                                        </p>
                                        <span>|</span>
                                        <p>Views : {Number(data?.popularity).toFixed(0)}</p>
                                    </div>
                                    <Link
                                        to={`/${data?.media_type}/${data?.id}`}
                                        className="inline-block px-4 py-2 text-black font-bold rounded mt-4 bg-white hover:bg-linear-to-l from-blue-700 to-red-700 shadow-md transition-all hover:scale-105">
                                        Watch Trailer
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Loading Banner...</h1>
                )}
            </div>
        </section>
    );
};

export default BannerHome;
