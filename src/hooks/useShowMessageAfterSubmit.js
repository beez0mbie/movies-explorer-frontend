import { useState, useEffect } from 'react';

export const useShowMessageAfterSubmit = (movies, wasSubmit) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (wasSubmit && movies && movies.length === 0) {
      setShowMessage(true);
    }
    return () => {
      setShowMessage(false);
    };
  }, [movies, wasSubmit, showMessage]);

  return showMessage;
};
