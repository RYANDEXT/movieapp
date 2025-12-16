import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ExplorePage from '../pages/ExplorePage';
import DetailPage from '../pages/DetailPage';
import SearchPage from '../pages/SearchPage';
import ValidateExplorer from '../components/HOC/ValidateExplorer';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: ':explore',
                element: (
                    <ValidateExplorer>
                        <ExplorePage />
                    </ValidateExplorer>
                ),
            },
            {
                path: ':explore/:id',
                element: (
                    <ValidateExplorer>
                        <DetailPage />
                    </ValidateExplorer>
                ),
            },
            {
                path: 'search',
                element: <SearchPage />,
            },
        ],
    },
]);

export default router;
