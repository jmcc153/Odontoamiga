import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { InfoSimulationProvider } from "./contexts/infoSimulationContext.jsx";
import { RedirectOnLoad } from "./utils/redirect.js";
import { LoadingProvider } from "./contexts/loadingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*<BrowserRouter basename={'/Credixpress_Odontoamiga_Front/'}>*/}
    <BrowserRouter /* basename={'credixpress_odontoamiga'} */>
      <LoadingProvider>
        <InfoSimulationProvider>
          <RedirectOnLoad />
          <App />
        </InfoSimulationProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
