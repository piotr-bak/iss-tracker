import { ReactNode, createContext, useContext, useState } from "react";
import { LoadingContextType } from "../types/ContextsTypes.ts";

export const LoadingContext = createContext<LoadingContextType>({
    isLoaded: false,
    setIsLoaded: () => {},
});

export const LoadingContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = () => {
    const { isLoaded, setIsLoaded } = useContext(LoadingContext);
    return { isLoaded, setIsLoaded };
};
