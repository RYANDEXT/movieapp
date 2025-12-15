import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBanerData, setImageURL } from './store/movlixSlice';
import './App.css';

function App() {
    const dispatch = useDispatch();

    const fetchTrendingData = async () => {
        try {
            const response = await axios.get('/trending/all/week');
            dispatch(setBanerData(response.data.results));
        } catch (error) {
            console.log('Failed to fetch trending data', error);
        }
    };

    const fetchConfiguration = async () => {
        try {
            const response = await axios.get('/configuration');
            dispatch(setImageURL(response.data.images.secure_base_url + 'original'));
        } catch (error) {
            console.log('Failed fetching configuration', error);
        }
    };

    useEffect(() => {
        fetchTrendingData();
        fetchConfiguration();
    }, []);
    return (
        <main className="pb-14 lg:pb-0">
            <Header />
            <div className="min-h-[92vh]">
                <Outlet />
            </div>
            <Footer />
            <MobileNavigation />
        </main>
    );
}

export default App;
