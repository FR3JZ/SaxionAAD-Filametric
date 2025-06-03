import ErrorSnackbar from '@/components/error-handling/ErrorSnackbar';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type SnackbarContextType = {
  showError: (message: string, duration?: number) => void;
};

const ErrorSnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const ErrorSnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [duration, setDuration] = useState(3000);

  const showError = (msg: string, dur = 3000) => {
    setMessage(msg);
    setDuration(dur);
    setVisible(true);
  };

  const hideError = () => setVisible(false);

  return (
    <ErrorSnackbarContext.Provider value={{ showError }}>
      {children}
      <ErrorSnackbar visible={visible} message={message} duration={duration} onDismiss={hideError} />
    </ErrorSnackbarContext.Provider>
  );
};

export const useErrorSnackbar = (): SnackbarContextType => {
  const context = useContext(ErrorSnackbarContext);
  if (!context) {
    throw new Error('useErrorSnackbar must be used within ErrorSnackbarProvider');
  }
  return context;
};