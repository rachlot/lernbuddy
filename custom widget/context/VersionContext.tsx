import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

type VersionContextType = {
  version: string;
  setVersion: (version: string) => void;
};

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export const VersionProvider = ({ children }: { children: ReactNode }) => {
  const [version, setVersion] = useState<string>("v2");

  useEffect(() => {
    const storedVersion = localStorage.getItem("version") || "v2"; // Standardwert "v2"
    setVersion(storedVersion);
  }, []);

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = (): VersionContextType => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error("useVersion must be used within a VersionProvider");
  }
  return context;
};
