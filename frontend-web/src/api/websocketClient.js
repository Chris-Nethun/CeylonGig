import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function createWebsocketClient({ onConnect, onMessage, onError } = {}) {
  const endpoint = import.meta.env.VITE_WS_BASE_URL || 'http://localhost:8080/ws';
  const client = new Client({
    webSocketFactory: () => new SockJS(endpoint),
    connectHeaders: localStorage.getItem('ceylongig_token')
      ? { Authorization: `Bearer ${localStorage.getItem('ceylongig_token')}` }
      : {},
    reconnectDelay: 5000,
    onConnect: (frame) => onConnect?.(client, frame),
    onStompError: (frame) => onError?.(frame),
    onWebSocketError: (event) => onError?.(event)
  });
  if (onMessage) client.onConnect = (frame) => {
    onConnect?.(client, frame);
    client.subscribe('/user/queue/messages', onMessage);
  };
  return client;
}
