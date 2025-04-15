import React, { useEffect, useState, useCallback, createContext, useContext } from "react";

interface DataContextType {
  data: Record<string, string> | null;
  setData: (newData: Record<string, string>) => void;
  updateData: (newData: Record<string, string>) => void;
  clearData: () => void;
  resetData: () => void;
  getDataByKey: (key: string) => string | null;
  setDataByKey: (key: string, value: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Record<string, string> | null>(null);
  const vscode = window.acquireVsCodeApi?.();

  // Message handler
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'data') {
        setData(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Data operations
  const handleDataChange = useCallback((newData: Record<string, string>) => {
    vscode?.postMessage({ type: 'setData', payload: newData });
  }, [vscode]);

  const handleDataUpdate = useCallback((newData: Record<string, string>) => {
    vscode?.postMessage({ type: 'data-update', payload: newData });
  }, [vscode]);

  const clearData = useCallback(() => setData(null), []);
  const resetData = useCallback(() => setData({}), []);

  const getDataByKey = useCallback((key: string) => data?.[key] || null, [data]);

  const setDataByKey = useCallback((key: string, value: string) => {
    const newData = { ...(data || {}), [key]: value };
    setData(newData);
    handleDataChange(newData);
  }, [data, handleDataChange]);

  // Context value
  const contextValue: DataContextType = {
    data,
    setData: handleDataChange,
    updateData: handleDataUpdate,
    clearData,
    resetData,
    getDataByKey,
    setDataByKey
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}
