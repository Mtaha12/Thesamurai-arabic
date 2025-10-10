'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatWidget() {
  const t = useTranslations('Chat');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(t('welcomeMessage'));
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Simulate bot response
  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('مرحبا')) {
      return t('responses.greeting');
    } else if (lowerMessage.includes('help') || lowerMessage.includes('مساعدة')) {
      return t('responses.help');
    } else if (lowerMessage.includes('service') || lowerMessage.includes('خدمة')) {
      return t('responses.services');
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('سعر')) {
      return t('responses.pricing');
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('اتصال')) {
      return t('responses.contact');
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('شكرا')) {
      return t('responses.thanks');
    } else {
      return t('responses.default');
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    addUserMessage(inputValue);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      setIsTyping(false);
      const response = generateBotResponse(inputValue);
      addBotMessage(response);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chat-button"
          style={{
            position: 'fixed',
            bottom: 'clamp(1rem, 3vw, 2rem)',
            right: 'clamp(1rem, 3vw, 2rem)',
            width: 'clamp(50px, 12vw, 60px)',
            height: 'clamp(50px, 12vw, 60px)',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00bcd4 0%, #0a0e3d 100%)',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,188,212,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
            transition: 'all 0.3s',
            zIndex: 1000,
            animation: 'pulse 2s infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label={t('openChat')}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window" style={{
          position: 'fixed',
          bottom: 'clamp(1rem, 3vw, 2rem)',
          right: 'clamp(1rem, 3vw, 2rem)',
          width: 'min(400px, calc(100vw - 2rem))',
          height: 'min(600px, calc(100vh - 4rem))',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 100%)',
            padding: '1.25rem',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#00bcd4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🤖
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>
                  {t('title')}
                </h3>
                <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>
                  {t('status')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.25rem',
                lineHeight: 1
              }}
              aria-label={t('closeChat')}
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            background: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'slideIn 0.3s ease-out'
                }}
              >
                <div style={{
                  maxWidth: '75%',
                  padding: '0.75rem 1rem',
                  borderRadius: message.sender === 'user' 
                    ? '16px 16px 4px 16px' 
                    : '16px 16px 16px 4px',
                  background: message.sender === 'user' 
                    ? 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)'
                    : '#fff',
                  color: message.sender === 'user' ? '#fff' : '#333',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  wordWrap: 'break-word'
                }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {message.text}
                  </p>
                  <span style={{
                    display: 'block',
                    marginTop: '0.25rem',
                    fontSize: '0.7rem',
                    opacity: 0.7,
                    textAlign: 'right'
                  }}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start'
              }}>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '16px 16px 16px 4px',
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '0.25rem',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#666',
                      animation: 'bounce 1.4s infinite ease-in-out both',
                      animationDelay: '0s'
                    }} />
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#666',
                      animation: 'bounce 1.4s infinite ease-in-out both',
                      animationDelay: '0.2s'
                    }} />
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#666',
                      animation: 'bounce 1.4s infinite ease-in-out both',
                      animationDelay: '0.4s'
                    }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '1rem',
            background: '#fff',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: '0.75rem'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('inputPlaceholder')}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '24px',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00bcd4'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: inputValue.trim() ? '#00bcd4' : '#ccc',
                border: 'none',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.background = '#0097a7';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.background = '#00bcd4';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              aria-label={t('sendMessage')}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(0,188,212,0.4);
          }
          50% {
            box-shadow: 0 4px 30px rgba(0,188,212,0.7);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .chat-button {
            bottom: 1rem !important;
            right: 1rem !important;
            width: 50px !important;
            height: 50px !important;
            font-size: 1.4rem !important;
          }
          
          .chat-window {
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100vh !important;
            border-radius: 0 !important;
            max-height: 100vh !important;
          }
        }
      `}</style>
    </>
  );
}
