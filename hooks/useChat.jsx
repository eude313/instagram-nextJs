import { useState, useEffect, useCallback, useRef } from 'react';
import ApiService from '@/lib/ApiService';

export const useChat = (chatId) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const webSocket = useRef(null);

    // Load initial messages
    useEffect(() => {
        const loadMessages = async () => {
            try {
                setLoading(true);
                const data = await ApiService.getMessages(chatId);
                setMessages(data.messages || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (chatId) {
            loadMessages();
        }
    }, [chatId]);

    // Initialize WebSocket connection
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !chatId) return;

        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${wsProtocol}//${window.location.host}/ws/chat/?token=${token}`;

        webSocket.current = new WebSocket(wsUrl);

        webSocket.current.onopen = () => {
            console.log('WebSocket Connected');
        };

        webSocket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'chat.message') {
                setMessages(prev => [...prev, data.message]);
            }
        };

        webSocket.current.onerror = (error) => {
            console.error('WebSocket Error:', error);
            setError('Failed to connect to chat service');
        };

        return () => {
            if (webSocket.current) {
                webSocket.current.close();
            }
        };
    }, [chatId]);

    // Send message function
    const sendMessage = useCallback((content, mediaType = 'text', fileUrl = null) => {
        if (!webSocket.current || webSocket.current.readyState !== WebSocket.OPEN) {
            setError('Not connected to chat service');
            return;
        }

        const messageData = {
            type: 'message',
            recipient_id: chatId,
            content,
            media_type: mediaType,
            file_url: fileUrl
        };

        webSocket.current.send(JSON.stringify(messageData));
    }, [chatId]);

    // Mark message as read
    const markAsRead = useCallback((messageId) => {
        if (!webSocket.current || webSocket.current.readyState !== WebSocket.OPEN) return;

        const readData = {
            type: 'read',
            message_id: messageId
        };

        webSocket.current.send(JSON.stringify(readData));
    }, []);

    return {
        messages,
        loading,
        error,
        sendMessage,
        markAsRead
    };
};