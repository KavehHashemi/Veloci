// export type UseWebSocket = {
//   url: string | (() => Promise<string>);
//   options: {
//     fromSocketIO?: boolean;
//     queryParams?: { [field: string]: any };
//     protocols?: string | string[];
//     share?: boolean;
//     onOpen: (event: WebSocketEventMap["open"]) => void;
//     onClose: (event: WebSocketEventMap["close"]) => void;
//     onMessage: (event: WebSocketEventMap["message"]) => void;
//     onError: (event: WebSocketEventMap["error"]) => void;
//     onReconnectStop?: (numAttempts: number) => void;
//     shouldReconnect?: (event: WebSocketEventMap["close"]) => boolean;
//     reconnectInterval?: number | ((lastAttemptNumber: number) => number);
//     reconnectAttempts?: number;
//     filter?: (message: WebSocketEventMap["message"]) => boolean;
//     retryOnError?: boolean;
//     eventSourceOptions?: EventSourceInit;
//   };
//   shouldConnect: boolean;
// };
