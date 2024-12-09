import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  message ? <p className="text-red-600 text-sm font-medium">{message}</p> : null
);