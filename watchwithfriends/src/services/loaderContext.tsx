import { ReactNode, createContext, useState } from "react";
import { Loader } from "../components/loader/loader";

export interface LoaderContextType {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextType | null>(null);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && <Loader />}
            {children}
        </LoaderContext.Provider>
    );
};