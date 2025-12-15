import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

const Home = () => {
    const trendingData = useSelector((state) => state.movlixData.bannerData);
    const { data: nowPlayingData } = useFetch('/movie/now_playing');
    const { data: topRatedData } = useFetch('/movie/top_rated');
    const { data: popularTvShowData } = useFetch('/tv/popular');
    const { data: onAirShowData } = useFetch('/tv/on_the_air');
    const loading = useSelector((state) => state.movlixData.loading);

    return (
        <div>
            {loading ? (
                <div className="w-full h-screen flex justify-around items-center">
                    <h2 className="text-3xl font-semibold">Loading ...</h2>
                </div>
            ) : (
                <div>
                    <BannerHome />
                    <HorizontalScrollCard data={trendingData} heading="Trending" trending={true} />
                    <HorizontalScrollCard data={nowPlayingData} heading="Now Playing" media_type={'movie'} />
                    <HorizontalScrollCard data={topRatedData} heading="Top Rated Movies" media_type={'movie'} />
                    <HorizontalScrollCard data={popularTvShowData} heading="Popular TV Show" media_type={'tv'} />
                    <HorizontalScrollCard data={onAirShowData} heading="On The Air" media_type={'tv'} />
                </div>
            )}
        </div>
    );
};

export default Home;
