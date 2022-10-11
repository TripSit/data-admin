import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
  FC,
} from 'react';
import styled from 'styled-components';
import { Toast } from 'react-bootstrap';

type ToastType = 'success' | 'info' | 'error';
type Dispatcher = (content: string, type?: ToastType) => void;

const ToastContext = createContext<Dispatcher>(() => null);

export function useToast() {
  const toast = useContext(ToastContext);
  if (!toast) throw new Error('Missing <ToastProvider />');
  return toast;
}

const ToastList = styled.ul`
  display: block;
  list-style: none;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;

  > li:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

interface Message {
  content: string;
  type: ToastType;
  close(): void;
}

interface Props {
  children: ReactNode;
}

const ToastProvider: FC<Props> = function ToastProvider({ children }) {
  const [messages, setMessages] = useState<Message[]>([]);

  function close(content: string) {
    setMessages((prev) => prev.filter((message) => message.content !== content));
  }

  const dispatchToast: Dispatcher = useCallback((content, type = 'info') => {
    if (!messages.some((message) => message.content === content)) {
      const closeTimeout = setTimeout(() => close(content), 8000);
      setMessages((prev) => prev.concat({
        content,
        type,
        close() {
          clearTimeout(closeTimeout);
          close(content);
        },
      }));
    }
  }, []);

  return (
    <ToastContext.Provider value={dispatchToast}>
      {children}
      <ToastList>
        {messages.map((message) => (
          <Toast key={message.content} as="li" onClose={message.close}>
            <Toast.Header closeButton />
            <Toast.Body>
              {message.content}
            </Toast.Body>
          </Toast>
        ))}
      </ToastList>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
