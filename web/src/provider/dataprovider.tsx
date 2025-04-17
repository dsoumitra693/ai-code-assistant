import React, { useEffect, useCallback, createContext, useContext, useMemo, useRef } from "react";

declare global {
  interface Window {
    __vscodeAPI__?: ReturnType<typeof window.acquireVsCodeApi>;
  }
}

export type ChatKey = string;
export interface ChatMessage {
  content: string;
  timestamp: number;
}

interface ILocalStore {
  chatHistory: ChatKey[];
  individualChat: Record<ChatKey, ChatMessage[]>;
}

interface DataContextType {
  data: ILocalStore;
  error: string | null;
  clearData: () => void;
  createNewChat: (key: ChatKey) => void;
  addMessage: (key: ChatKey, message: string) => void;
  closeTab: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

const emptyLocalStore: ILocalStore = {
  chatHistory: [],
  individualChat: {}
};

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const vscodeRef = useRef<ReturnType<typeof window.acquireVsCodeApi> | null>(null);
  if (typeof window !== 'undefined' && !vscodeRef.current) {
    vscodeRef.current = window.__vscodeAPI__ || window.acquireVsCodeApi?.();
    if (vscodeRef.current) {
      window.__vscodeAPI__ = vscodeRef.current;
    }
  }
  const vscode = vscodeRef.current;
  const [localStore, setLocalStore] = React.useState<ILocalStore>(emptyLocalStore);
  const [error, setError] = React.useState<string | null>(null);
  const messageQueue = useRef<(() => void)[]>([]);

  const processMessageQueue = useCallback(() => {
    if (vscode && messageQueue.current.length > 0) {
      messageQueue.current.forEach(fn => fn());
      messageQueue.current = [];
    }
  }, [vscode]);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      if (event.data.type.startsWith('get-data:')) {
        const key = event.data.type.split(':')[1] as keyof ILocalStore;
        const value = event.data.payload?.value;

        if (value === undefined) {
          throw new Error(`Invalid payload for ${key}`);
        }

        setLocalStore(prev => ({
          ...prev,
          [key]: Array.isArray(value) ? [...value] : { ...value }
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid data format');
      console.log(error)
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    const fetchInitialData = () => {
      vscode?.postMessage({ type: 'data-get:chatHistory' });
      vscode?.postMessage({ type: 'data-get:individualChat' });
    };

    if (vscode) {
      processMessageQueue();
      fetchInitialData();
    } else {
      messageQueue.current.push(fetchInitialData);
    }
  }, [vscode, processMessageQueue]);

  const clearData = useCallback(() => {
    setLocalStore(emptyLocalStore);
    vscode?.postMessage({ type: 'clear-data' });
    setError(null);
  }, [vscode]);

  const createNewChat = useCallback((key: ChatKey) => {
    setLocalStore(prev => {
      const newChat = {
        ...prev.individualChat,
        [key]: []
      };

      vscode?.postMessage({
        type: 'data-update:individualChat',
        payload: { value: newChat }
      });

      vscode?.postMessage({
        type: 'data-update:chatHistory',
        payload: { value: key }
      });

      return {
        chatHistory: [...prev.chatHistory, key],
        individualChat: newChat
      };
    });
  }, [vscode]);

  const addMessage = useCallback((key: ChatKey, content: string) => {
    setLocalStore(prev => {
      const newMessage: ChatMessage = {
        content,
        timestamp: Date.now()
      };

      const updatedChat = [
        ...(prev.individualChat[key] || []),
        newMessage
      ];

      vscode?.postMessage({
        type: 'data-update:individualChat',
        payload: {
          value: {
            ...prev.individualChat,
            [key]: updatedChat
          }
        }
      });

      return {
        ...prev,
        individualChat: {
          ...prev.individualChat,
          [key]: updatedChat
        }
      };
    });
  }, [vscode]);

  const closeTab = useCallback(() => {
    if (!vscode) return;
    vscode.postMessage({
      type: 'close',
    });
  }, [vscode]);

  const contextValue = useMemo(() => ({
    data: localStore,
    error,
    clearData,
    createNewChat,
    addMessage,
    closeTab
  }), [localStore, error, clearData, createNewChat, addMessage]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}
