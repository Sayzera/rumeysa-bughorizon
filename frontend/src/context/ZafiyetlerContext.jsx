
import { createContext, useContext, useState } from "react";

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
        csp: false
    })
 

    const toggleZafiyet = (zafiyet) => {
        setZafiyetler((prev) => ({
            ...prev,
            [zafiyet]: !prev[zafiyet]
        }))
    }


    return (
        <ZafiyetContext.Provider value={{ zafiyetler, toggleZafiyet}}>
            {children}
        </ZafiyetContext.Provider>
    )
}

export const useContextZafiyetler = () => {
    const context = useContext(ZafiyetContext)
    
    if(!context) {
        throw new Error("Lütfen ZafiyetContextProvider ile sarmalayın.")
    }

    return context;
}