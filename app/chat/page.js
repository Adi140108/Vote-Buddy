"use client"

import { useState, useRef, useEffect } from 'react'
import styles from './page.module.css'
import { Send, Bot, User, Sparkles } from 'lucide-react'

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! I'm your VoteBuddy assistant. How can I help you with the election process today?",
      options: [
        "How do I register to vote?",
        "What documents are required?",
        "Where is my polling booth?"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return

    // Add user message
    const newUserMsg = { id: Date.now(), sender: 'user', text }
    setMessages(prev => [...prev, newUserMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response (Mock logic for now)
    setTimeout(() => {
      let botResponse = "I'm a demo assistant, so I can only answer a few specific questions right now. Please try asking about registration, documents, or polling booths!"
      
      const lowerText = text.toLowerCase()
      if (lowerText.includes('register')) {
        botResponse = "To register to vote, you need to fill out Form 6. You can do this online at the Election Commission website (voters.eci.gov.in) or offline at your local Electoral Registration Office. You must be 18 years old."
      } else if (lowerText.includes('document')) {
        botResponse = "When you go to vote, you need to carry your Voter ID slip AND a valid photo ID. Accepted IDs include: Aadhaar Card, PAN Card, Driving License, Indian Passport, or Bank Passbook with a photograph."
      } else if (lowerText.includes('booth') || lowerText.includes('where')) {
        botResponse = "You can find your polling booth on your Voter Information Slip, by searching your name on the ECI Electoral Search portal, or by using the 'Booth Locator' feature in this app!"
      }

      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'bot',
        text: botResponse
      }])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className={`container ${styles.chatContainer}`}>
      <div className={styles.header}>
        <h1>AI Assistant</h1>
        <p>Ask me anything about voting</p>
      </div>

      <div className={`card ${styles.chatWindow}`}>
        <div className={styles.messagesArea}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`${styles.messageWrapper} ${styles[msg.sender]}`}
            >
              <div className={styles.avatar}>
                {msg.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={styles.messageContent}>
                <div className={styles.messageBubble}>
                  {msg.text}
                </div>
                {msg.options && (
                  <div className={styles.optionsList}>
                    {msg.options.map((opt, idx) => (
                      <button 
                        key={idx} 
                        className={styles.optionBtn}
                        onClick={() => handleSend(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className={`${styles.messageWrapper} ${styles.bot}`}>
              <div className={styles.avatar}>
                <Bot size={20} />
              </div>
              <div className={styles.messageContent}>
                <div className={styles.typingIndicator}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <Sparkles className={styles.sparkleIcon} size={20} />
            <input 
              type="text" 
              placeholder="Type your question here..."
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              className={styles.sendBtn}
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
