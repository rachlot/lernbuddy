import { createContext, useContext, useState, ReactNode } from "react";

type LevelContextType = {
    level: number;
    setLevel: (value: number) => void;
};

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider = ({ children }: { children: ReactNode }) => {
    const [level, setLevelState] = useState<number>(() => {
        const saved = localStorage.getItem("level");
        return saved ? parseInt(saved) : 1;
    });

    const setLevel = (value: number) => {
        setLevelState(value);
        localStorage.setItem("level", value.toString());
    };

    return (
        <LevelContext.Provider value={{ level, setLevel }}>
            {children}
        </LevelContext.Provider>
    );
};

export const useLevel = (): LevelContextType => {
    const context = useContext(LevelContext);
    if (!context) throw new Error("useLevel must be used within LevelProvider");
    return context;
};

/*import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type LevelContextType = {
    level: number;
    setLevel: (value: number) => void;
};

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider = ({ children }: { children: ReactNode }) => {
    const [level, setLevelState] = useState<number>(() => {
        const saved = localStorage.getItem("level");
        return saved ? parseInt(saved) : 1;
    });

    const setLevel = (value: number) => {
        setLevelState(value);
        localStorage.setItem("level", value.toString());
    };

    return (
        <LevelContext.Provider value={{ level, setLevel }}>
            {children}
        </LevelContext.Provider>
    );
};

export const useLevel = (): LevelContextType => {
    const context = useContext(LevelContext);
    if (!context) throw new Error("useDailyGoal must be used within DailyGoalProvider");
    return context;
};*/
