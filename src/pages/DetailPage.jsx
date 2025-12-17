import { useParams } from 'react-router-dom';
import useFetchDetail from '../hooks/useFetchDetail';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import { useState } from 'react';
import VideoPlay from '../components/VideoPlay';

const DetailPage = () => {
    const params = useParams();
    const imageURL = useSelector((state) => state.movlixData.imageURL);
    const { data, loading } = useFetchDetail(`/${params.explore}/${params.id}`);
    const { data: castData } = useFetchDetail(`/${params?.explore}/${params?.id}/credits`);
    const { data: similarMovies } = useFetch(`/${params?.explore}/${params?.id}/similar`);
    const { data: recommendationMovies } = useFetch(`/${params?.explore}/${params?.id}/recommendations`);
    const [playVideo, setPlayVideo] = useState(false);
    const [playVideoId, setPlayVideoId] = useState('');

    const handlePlayVideo = (data) => {
        setPlayVideoId(data?.id);
        setPlayVideo(true);
    };

    const writers = [
        ...new Set(castData?.crew.filter((el) => el.known_for_department === 'Writing').map((el) => el.name)),
    ];

    return (
        <>
            {loading || data.length === 0 ? (
                <div className="w-full h-screen flex justify-center items-center">
                    <h2 className="text-4xl font-bold">Loading...</h2>
                </div>
            ) : (
                <div className="mt-10 lg:mt-0">
                    <div className="w-full h-70 relative hidden lg:block">
                        <div className="w-ful h-full">
                            <img
                                src={imageURL + data?.backdrop_path}
                                alt="Banner Movie"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="absolute h-full w-full top-0 bg-linear-to-t from-neutral-900 to-transparent"></div>
                    </div>

                    <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
                        {/* MOVIE CARD */}
                        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit">
                            <img
                                src={imageURL + data?.poster_path}
                                alt="Banner Movie"
                                className="h-80 w-60 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => handlePlayVideo(data)}
                                className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-linear-to-l from-blue-700 to-red-700 hover:scale-105 transition-all">
                                Watch Trailer
                            </button>
                        </div>

                        {/* TITLE */}
                        <div className="w-full ">
                            <div className="w-full flex flex-col items-center lg:items-start my-3">
                                <h2 className="text-4xl text-white font-bold">{data?.title || data?.name}</h2>
                                <p className="text-neutral-300">{data?.tagline}</p>
                            </div>

                            <Divider />

                            {/* INFO */}
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <p className="text-neutral-400 text-center">
                                    Rating: {Number(data?.vote_average).toFixed(1)}+
                                </p>
                                <span>|</span>
                                <p className="text-neutral-400 text-center">Vote: {Number(data?.vote_count)}</p>
                                <span>|</span>
                                <p className="text-neutral-400 text-center">
                                    Duration: {Number(data?.runtime)} Minutes
                                </p>
                            </div>

                            <Divider />

                            {/* OVEVIEW & INFO 2 */}
                            {castData && castData.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
                                    <p className="text-justify">{data?.overview}</p>
                                    <Divider />
                                    <div className="lg:flex items-center gap-3 my-3ß">
                                        <p>Status: {data?.status}</p>
                                        <span className="hidden lg:block">|</span>
                                        <p>Release Date: {moment(data?.releaste_date).format('MMM Do YYYY')}</p>
                                        <span className="hidden lg:block">|</span>
                                        <p>
                                            Genre :{' '}
                                            {data?.genres.map((genre) => (
                                                <span key={genre.id} className="inline">
                                                    {genre.name},{' '}
                                                </span>
                                            ))}
                                        </p>
                                    </div>

                                    <Divider />

                                    {/* INFO 3 */}
                                    <div>
                                        <p>
                                            <span className="text-white">Director</span> : {castData?.crew[0]?.name}
                                        </p>
                                        <p>
                                            <span className="text-white">Writer: </span>
                                            {writers.map((writer) => (
                                                <span key={writer}>{writer}, </span>
                                            ))}
                                        </p>
                                    </div>

                                    {/* Cast */}
                                    <div>
                                        <h2 className="font-bold text-lg">Cast :</h2>
                                        <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
                                            {castData?.cast
                                                .filter((el) => el.profile_path)
                                                .map((starCast, index) => (
                                                    <div key={starCast.id + 'starCaster' + index}>
                                                        <div>
                                                            <img
                                                                src={imageURL + starCast?.profile_path}
                                                                alt={starCast?.name}
                                                                className="w-24 h-24 object-cover rounded-full"
                                                            />
                                                        </div>
                                                        <p className="font-bold text-center text-sm text-neutral-400">
                                                            {starCast?.name}
                                                        </p>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {similarMovies.length > 0 && recommendationMovies.length > 0 && (
                        <div>
                            <HorizontalScrollCard
                                data={similarMovies}
                                heading={`Similar ${params.explore}`}
                                media_type={params.explore}
                            />
                            <HorizontalScrollCard
                                data={recommendationMovies}
                                heading={`Recomendation ${params.explore}`}
                                media_type={params.explore}
                            />
                        </div>
                    )}

                    {playVideo && playVideoId && (
                        <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params.explore} />
                    )}
                </div>
            )}
        </>
    );
};

export default DetailPage;
