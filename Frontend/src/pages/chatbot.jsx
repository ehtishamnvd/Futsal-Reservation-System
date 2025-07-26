import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "../chatbot.css";
import * as CONSTANT from "../Constant/constant";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you with our Futsal facilities today?", sender: "bot" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const toggleChatbot = () => setIsOpen(!isOpen);
    const handleInputChange = (e) => setInputValue(e.target.value);

    const handleSendMessage = async () => {
        if (inputValue.trim() === "" || isLoading) return;

        const userMessage = { text: inputValue, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const res = await CONSTANT.API.post("/api/chatbot", { prompt: inputValue });
            const botResponse = { text: res.data.response, sender: "bot" };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            const errorResponse = {
                text: "Sorry, I'm having trouble connecting. Please try again later.",
                sender: "bot"
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
            <div className="chatbot-header" onClick={toggleChatbot}>
                <h2>Futsal Assistant</h2>
                <span className="chatbot-toggle-icon">{isOpen ? "▼" : "▲"}</span>
            </div>
            {isOpen && (
                <div className="chatbot-body">
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message-bubble ${message.sender}`}>
                                <ReactMarkdown>
                                    {message.text}
                                </ReactMarkdown>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message-bubble bot">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Ask about grounds, teams..."
                            disabled={isLoading}
                        />
                        <button onClick={handleSendMessage} disabled={isLoading}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;