import { useNavigate, useRoutes } from 'react-router-dom';
import { ROUTES } from './routes';
import { Simulator } from './pages/simulator/simulator';
import { FormDeudor } from './pages/form/formDeudor';
import { Document } from './pages/document/document';
import { Layout } from './layout/Layout';
import { NotFound } from './pages/notFound/NotFound';
import { useContext, useEffect } from 'react';
import { InfoSimulationContext } from './contexts/infoSimulationContext';
import { ModalsPage } from './pages/modalsPage/modalsPage';
import { FormCodeudor } from './pages/formCodeudor/formCodeudor';
import { InfoNoSignature } from './pages/infoNoSignature/infoNoSignature';

function App() {
  const { info } = useContext(InfoSimulationContext);
  const navigate = useNavigate();
/*   useEffect(() => {
    if (info == null){
      navigate(ROUTES.HOME);
    }
  }
  , []); */

  const element = useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: ROUTES.HOME,
          element: <Simulator />,
        },
        
        {
          path: ROUTES.FORM,
          element: <FormDeudor />,
        },
        {
          path: ROUTES.FORM_CODEBTOR,
          element: <FormCodeudor />,
        },
        {
          path: ROUTES.DOCUMENT,
          element: <Document />,
        },
        {
          path: ROUTES.MODAL,
          element: <ModalsPage />,
        },
        {
          path: ROUTES.INFO_NO_SIGNATURE,
          element: <InfoNoSignature />,
        }
      ],
    },
    {
      path: ROUTES.NOT_FOUND,
      element: <NotFound />,
    },
  ]);
  return element;
}

export default App
