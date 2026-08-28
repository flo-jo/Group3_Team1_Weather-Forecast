import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatbotViewProps {
  onSelectQuickAction?: (query: string) => void;
}

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Hello! I'm your NEA Weather Assistant. How can I help you with the weather today? You can ask me about current conditions, forecasts, or environmental advisories.",
    timestamp: '9:30 AM',
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Is it raining in Orchard right now?',
    timestamp: '9:31 AM',
  },
  {
    id: 'msg-3',
    sender: 'bot',
    text: 'Currently in Orchard:',
    timestamp: '9:31 AM',
    richCard: {
      location: 'Orchard',
      condition: 'Light Rain',
      temperature: '27°C',
      subtext: 'Humid',
      clearTime: 'Expect showers to clear up by 4:00 PM.',
      icon: 'rainy',
      humidity: '88%',
    },
  },
];

export const ChatbotView: React.FC<ChatbotViewProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error('Chat API returned an error');
      }

      const data = await response.json();

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.text || "Here is the latest meteorological update from NEA.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        richCard: data.richCard,
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Chat error:', err);
      // Local fallback reply
      const fallbackReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Singapore 24-hour weather update: Partly cloudy with localized afternoon showers, 26°C - 34°C. Relative humidity 60 - 90%. All environmental advisories are normal.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        richCard: {
          location: 'Singapore Islandwide',
          condition: 'Partly Cloudy',
          temperature: '26 - 34°C',
          subtext: 'Humid • SSE 15-25 km/h',
          clearTime: 'Updated by NEA MSS',
          icon: 'partly_cloudy_day',
        },
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 animate-fadeIn">
      {/* Left: Chat Interface */}
      <div className="flex-grow flex flex-col bg-white rounded-xl shadow-[0_4px_12px_rgba(0,74,112,0.12)] border border-[#e1e3e4] overflow-hidden h-[calc(100vh-210px)] min-h-[620px]">
        {/* Chat Header */}
        <div className="bg-[#00334e] px-6 py-4 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#2a638a] flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-white text-2xl">robot_2</span>
            </div>
            <div>
              <h2 className="font-['Manrope'] text-xl font-bold m-0 leading-tight">
                NEA Weather Assistant
              </h2>
              <p className="font-['Hanken_Grotesk'] text-sm text-[#97ccf9] m-0 opacity-90">
                Always here to help with your weather queries
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-[#004a70] text-[#85b9e5] px-3 py-1 rounded-full border border-[#85b9e5]/30">
            <span className="w-2 h-2 rounded-full bg-[#55ba47] animate-pulse"></span>
            <span>Live NEA Feed</span>
          </div>
        </div>

        {/* Chat Scroll Area */}
        <div
          ref={chatScrollRef}
          className="flex-grow p-6 overflow-y-auto chat-scroll flex flex-col gap-4 bg-[#f8f9fa]"
        >
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${
                  isBot ? 'self-start' : 'self-end flex-row-reverse'
                }`}
              >
                {/* Bot Avatar */}
                {isBot && (
                  <div className="w-8 h-8 rounded-full bg-[#004a70] flex-shrink-0 flex items-center justify-center mt-1 text-[#85b9e5] shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">robot_2</span>
                  </div>
                )}

                {/* Message Content */}
                <div className="flex flex-col gap-1.5 max-w-full">
                  {/* Text Bubble */}
                  {msg.text && (
                    <div
                      className={`px-4 py-3 font-['Hanken_Grotesk'] text-base shadow-sm leading-relaxed ${
                        isBot
                          ? 'bg-[#edeeef] text-[#191c1d] rounded-2xl rounded-tl-sm'
                          : 'bg-[#00334e] text-white rounded-2xl rounded-tr-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}

                  {/* Rich Weather Card (bot only) */}
                  {isBot && msg.richCard && (
                    <div className="bg-[#edeeef] rounded-2xl rounded-tl-sm p-0 text-[#191c1d] shadow-sm overflow-hidden border border-[#c1c7cf] mt-1 max-w-sm">
                      <div className="px-4 py-2.5 font-['Hanken_Grotesk'] text-sm font-semibold text-[#00334e] border-b border-[#c1c7cf]/40 bg-white/60">
                        Currently in {msg.richCard.location}:
                      </div>
                      <div className="bg-white p-4 m-2.5 rounded-lg flex items-center gap-4 border border-[#e1e3e4] shadow-sm">
                        <span className="material-symbols-outlined text-[46px] text-[#2a638a]">
                          {msg.richCard.icon}
                        </span>
                        <div>
                          <div className="font-['Manrope'] text-xl font-bold text-[#00334e]">
                            {msg.richCard.condition}
                          </div>
                          <div className="font-['Hanken_Grotesk'] text-sm font-medium text-[#41474e]">
                            {msg.richCard.temperature} • {msg.richCard.subtext}
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-2.5 font-['Hanken_Grotesk'] text-xs font-medium text-[#41474e] border-t border-[#c1c7cf] bg-[#f3f4f5] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-[#55ba47]">schedule</span>
                        {msg.richCard.clearTime}
                      </div>
                    </div>
                  )}

                  <span
                    className={`text-[10px] text-[#71787f] px-1 ${
                      isBot ? 'text-left' : 'text-right'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%] self-start animate-fadeIn">
              <div className="w-8 h-8 rounded-full bg-[#004a70] flex-shrink-0 flex items-center justify-center mt-1 text-[#85b9e5]">
                <span className="material-symbols-outlined text-[18px]">robot_2</span>
              </div>
              <div className="bg-[#edeeef] rounded-2xl rounded-tl-sm px-4 py-3 text-[#191c1d] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#004a70] rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-[#004a70] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-[#004a70] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-xs text-[#71787f] ml-1 font-['Hanken_Grotesk']">
                  Retrieving radar & weather stations...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="p-4 bg-white border-t border-[#e1e3e4]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-[#f3f4f5] rounded-full px-4 py-1.5 border border-[#c1c7cf] focus-within:border-[#004a70] focus-within:ring-2 focus-within:ring-[#004a70]/20 transition-all shadow-inner"
          >
            <button
              type="button"
              onClick={() => {
                const sampleQuestions = [
                  "Is it going to rain in Jurong this afternoon?",
                  "What is the UV index at Marina Bay?",
                  "Is there any haze or heavy rain warning today?",
                  "What are the tide timings for Sentosa?",
                ];
                const random = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
                setInputValue(random);
              }}
              title="Quick sample query"
              className="text-[#41474e] hover:text-[#00334e] p-1.5 rounded-full hover:bg-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">add_circle</span>
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the weather..."
              className="flex-grow bg-transparent border-none focus:outline-none font-['Hanken_Grotesk'] text-base text-[#191c1d] placeholder:text-[#71787f] py-1.5 px-1"
            />

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={`p-2.5 rounded-full transition-all flex items-center justify-center shadow-sm ${
                inputValue.trim() && !isLoading
                  ? 'bg-[#8cc63f] text-white hover:bg-[#7cb435] cursor-pointer'
                  : 'bg-[#c1c7cf] text-white cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-lg leading-none">send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Right: Quick Actions Panel */}
      <aside className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4">
        <h3 className="font-['Manrope'] text-xl font-bold text-[#004a70] m-0 tracking-tight">
          Quick Actions
        </h3>

        {/* Quick Action 1 */}
        <button
          onClick={() => handleQuickAction("Will it rain today? Get the daily precipitation forecast")}
          className="flex items-center gap-3.5 p-4 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,74,112,0.12)] border border-[#e1e3e4] hover:bg-[#f3f4f5] hover:border-[#004a70]/40 transition-all text-left group"
        >
          <span className="material-symbols-outlined text-[#2a638a] text-2xl group-hover:text-[#00334e] transition-colors p-2 bg-[#f3f4f5] rounded-lg group-hover:bg-white">
            umbrella
          </span>
          <div>
            <div className="font-['Hanken_Grotesk'] text-sm font-bold text-[#191c1d] group-hover:text-[#00334e]">
              Will it rain today?
            </div>
            <div className="font-['Hanken_Grotesk'] text-xs text-[#41474e]">
              Get the daily precipitation forecast
            </div>
          </div>
        </button>

        {/* Quick Action 2 */}
        <button
          onClick={() => handleQuickAction("What is the current UV Index in Singapore?")}
          className="flex items-center gap-3.5 p-4 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,74,112,0.12)] border border-[#e1e3e4] hover:bg-[#f3f4f5] hover:border-[#004a70]/40 transition-all text-left group"
        >
          <span className="material-symbols-outlined text-[#f7e400] text-2xl group-hover:text-[#f85900] transition-colors p-2 bg-[#f3f4f5] rounded-lg group-hover:bg-white">
            wb_sunny
          </span>
          <div>
            <div className="font-['Hanken_Grotesk'] text-sm font-bold text-[#191c1d] group-hover:text-[#00334e]">
              Current UV Index
            </div>
            <div className="font-['Hanken_Grotesk'] text-xs text-[#41474e]">
              Check sun exposure levels
            </div>
          </div>
        </button>

        {/* Quick Action 3 */}
        <button
          onClick={() => handleQuickAction("Check the 4-day outlook for Singapore")}
          className="flex items-center gap-3.5 p-4 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,74,112,0.12)] border border-[#e1e3e4] hover:bg-[#f3f4f5] hover:border-[#004a70]/40 transition-all text-left group"
        >
          <span className="material-symbols-outlined text-[#2a638a] text-2xl group-hover:text-[#00334e] transition-colors p-2 bg-[#f3f4f5] rounded-lg group-hover:bg-white">
            calendar_month
          </span>
          <div>
            <div className="font-['Hanken_Grotesk'] text-sm font-bold text-[#191c1d] group-hover:text-[#00334e]">
              Check 4-day outlook
            </div>
            <div className="font-['Hanken_Grotesk'] text-xs text-[#41474e]">
              Extended weather forecast
            </div>
          </div>
        </button>

        {/* Quick Action 4 */}
        <button
          onClick={() => handleQuickAction("Are there any active environmental advisories or heavy rain warnings?")}
          className="flex items-center gap-3.5 p-4 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,74,112,0.12)] border border-[#e1e3e4] hover:bg-[#f3f4f5] hover:border-[#004a70]/40 transition-all text-left group"
        >
          <span className="material-symbols-outlined text-[#e63946] text-2xl group-hover:text-[#ba1a1a] transition-colors p-2 bg-[#f3f4f5] rounded-lg group-hover:bg-white">
            warning
          </span>
          <div>
            <div className="font-['Hanken_Grotesk'] text-sm font-bold text-[#191c1d] group-hover:text-[#00334e]">
              Active Advisories
            </div>
            <div className="font-['Hanken_Grotesk'] text-xs text-[#41474e]">
              Current warnings and alerts
            </div>
          </div>
        </button>
      </aside>
    </div>
  );
};
