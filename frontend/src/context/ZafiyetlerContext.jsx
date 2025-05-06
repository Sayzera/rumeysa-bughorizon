import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../constant/endpoints";
const ZafiyetContext = createContext();

export const ZafiyetContextProvider = ({ children }) => {
  const [zafiyetler, setZafiyetler] = useState({
    brokenAuth: false,
    sqlInjection: false,
    xss: false,
    securityMisconfig: false,
    csrf: false,
    loggingDeficiencies: false,
    ssrf: false,
    csp: false,
  });

  const [csrfToken, setCsrfToken] = useState();

  const getCSRF = async () => {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + endpoints.getCSRF,
      {
        withCredentials: true
      }
    );

    if('csrfToken' in data) {
        setCsrfToken(data.csrfToken)
    }
  };

  useEffect(() => {
    getCSRF();
  }, []);

  const toggleZafiyet = (zafiyet) => {
    setZafiyetler((prev) => ({
      ...prev,
      [zafiyet]: !prev[zafiyet],
    }));
  };

  return (
    <ZafiyetContext.Provider value={{ zafiyetler, toggleZafiyet,csrfToken }}>
      {children}
    </ZafiyetContext.Provider>
  );
};

export const useContextZafiyetler = () => {
  const context = useContext(ZafiyetContext);

  if (!context) {
    throw new Error("Lütfen ZafiyetContextProvider ile sarmalayın.");
  }

  return context;
};
