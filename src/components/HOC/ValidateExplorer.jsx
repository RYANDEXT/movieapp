import { useParams } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage';
import validExplores from '../../constants/validRoutes';

const ValidateExplore = ({ children }) => {
    const { explore } = useParams();

    if (!validExplores.includes(explore)) {
        return <NotFoundPage />;
    }

    return <>{children}</>;
};

export default ValidateExplore;
