import { createContext, useContext, useState, ReactNode } from "react";

type DailyGoalContextType = {
    dailyGoal: number;
    setDailyGoal: (value: number) => void;
};

const DailyGoalContext = createContext<DailyGoalContextType | undefined>(undefined);

export const DailyGoalProvider = ({ children }: { children: ReactNode }) => {
    // Lade den Wert aus dem localStorage, wenn er vorhanden ist
    const [dailyGoal, setDailyGoalState] = useState<number>(() => {
        const savedGoal = localStorage.getItem("dailyGoal");
        return savedGoal ? parseInt(savedGoal) : 10; // Falls kein Wert vorhanden, Standardwert 10
    });

    const setDailyGoal = (value: number) => {
        setDailyGoalState(value);
        localStorage.setItem("dailyGoal", value.toString()); // Speichern im localStorage
    };

    return (
        <DailyGoalContext.Provider value={{ dailyGoal, setDailyGoal }}>
            {children}
        </DailyGoalContext.Provider>
    );
};

export const useDailyGoal = (): DailyGoalContextType => {
    const context = useContext(DailyGoalContext);
    if (!context) throw new Error("useDailyGoal must be used within DailyGoalProvider");
    return context;
};

/*import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type DailyGoalContextType = {
    dailyGoal: number;
    setDailyGoal: (value: number) => void;
};

const DailyGoalContext = createContext<DailyGoalContextType | undefined>(undefined);

export const DailyGoalProvider = ({ children }: { children: ReactNode }) => {
    const [dailyGoal, setDailyGoalState] = useState<number>(() => {
        const saved = localStorage.getItem("dailyGoal");
        return saved ? parseInt(saved) : 10;
    });

    const setDailyGoal = (value: number) => {
        setDailyGoalState(value);
        localStorage.setItem("dailyGoal", value.toString());
    };

    return (
        <DailyGoalContext.Provider value={{ dailyGoal, setDailyGoal }}>
            {children}
        </DailyGoalContext.Provider>
    );
};

export const useDailyGoal = (): DailyGoalContextType => {
    const context = useContext(DailyGoalContext);
    if (!context) throw new Error("useDailyGoal must be used within DailyGoalProvider");
    return context;
};
*/