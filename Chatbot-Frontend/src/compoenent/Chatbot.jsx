"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Plus } from "lucide-react";

const Chatbot = () => {
  const welcomeMessage =
    "Hi! I'm **EduMentor AI** 🤖, your study buddy for Computer Science. Do you have any **doubts in HTML, Java, Python,** or any other topic? Just ask me anything — I'm here to help you learn and solve problems!";

  const [messages, setMessages] = useState([
    { id: 1, text: "", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [username, setUsername] = useState("Student"); // default fallback

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) setUsername(user.name); // set username if available
  }, []);

  const botTypingInterval = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Typing animation for welcome message
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      index++;
      const partialText = welcomeMessage.slice(0, index);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === 1 ? { ...msg, text: partialText } : msg))
      );
      if (index >= welcomeMessage.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 7);
    return () => clearInterval(typingInterval);
  }, []);

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // File handling
  const handleFileUpload = (file) => {
    if (file && file.size <= 10 * 1024 * 1024) {
      setUploadedFile(file);
      setInput(` File attached: ${file.name}`);
    } else {
      alert("File size must be less than 10MB");
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };
  const removeFile = () => {
    setUploadedFile(null);
    setInput("");
  };

  // Stop bot typing
  const handleStop = () => {
    if (botTypingInterval.current) {
      clearInterval(botTypingInterval.current);
      botTypingInterval.current = null;
      setIsTyping(false);
    }
  };

  // Send message
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if ((!input.trim() && !uploadedFile) || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: uploadedFile
        ? `${input}\n\n Attached: ${uploadedFile.name}`
        : input,
      sender: "user",
      hasFile: !!uploadedFile,
    };
    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    const currentFile = uploadedFile;
    setInput("");
    setUploadedFile(null);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append("message", currentInput);
      if (currentFile) formData.append("file", currentFile);

      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Type out bot reply
      setTimeout(() => {
        let index = 0;
        const fullText = data.reply || "";
        const botMessageId = messages.length + 2;

        setMessages((prev) => [
          ...prev,
          { id: botMessageId, text: "", sender: "bot" },
        ]);

        botTypingInterval.current = setInterval(() => {
          index++;
          const partialText = fullText.slice(0, index);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, text: partialText } : msg
            )
          );
          if (index >= fullText.length) {
            clearInterval(botTypingInterval.current);
            botTypingInterval.current = null;
            setIsTyping(false);
          }
        }, 10);
      }, 400);
    } catch (error) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: messages.length + 2,
            text: `❌ Oops! Something went wrong: ${error.message}`,
            sender: "bot",
          },
        ]);
        setIsTyping(false);
      }, 400);
    } finally {
      setIsLoading(false);
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
      <span className="text-sm text-gray-600">EduMentor is thinking...</span>
    </div>
  );

  const MarkdownWithCode = ({ children }) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p({ children }) {
          return <div className="mb-2">{children}</div>;
        },
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const lang = match ? match[1] : "text";
          if (!inline) {
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={lang}
                PreTag="div"
                showLineNumbers={false}
                wrapLongLines={true}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          } else {
            return (
              <code
                className="bg-gray-100 px-1 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }
        },
        a({ href, children, ...props }) {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          );
        },
      }}
    >
      {children || ""}
    </ReactMarkdown>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-screen max-h-screen flex flex-col">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full border border-gray-200">
          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-6 py-4 bg-blue-50 relative"
            style={{ minHeight: 0 }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {messages.length === 1 && (
              <div className="text-center py-12">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <div className="text-2xl">🤖</div>
                  </div>
                </div>
                <h2 className="text-3xl font-light text-gray-800 mb-2">
                  Hi {username}, how are you?
                </h2>
                <p className="text-gray-500 mb-8">How can I help you today?</p>
              </div>
            )}

            <div className="space-y-6">
              {dragOver && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white p-8 rounded-2xl border border-gray-300 text-center shadow-2xl">
                    <div className="text-6xl mb-4">📁</div>
                    <h3 className="text-2xl font-medium text-gray-800 mb-2">
                      Drop your file here
                    </h3>
                    <p className="text-gray-500">
                      Release to upload (Max 10MB)
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 shadow-md">
                      <div className="text-sm">🤖</div>
                    </div>
                  )}
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white ml-12 shadow-md"
                        : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                    }`}
                  >
                    {message.sender === "bot" ? (
                      <div className="prose prose-sm max-w-none">
                        <MarkdownWithCode>{message.text}</MarkdownWithCode>
                      </div>
                    ) : (
                      <div>
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        {message.hasFile && (
                          <div className="mt-2 p-2 bg-blue-100 rounded-lg flex items-center">
                            <span className="text-sm text-blue-600 ml-1">
                              File attached
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center ml-3 mt-1 flex-shrink-0 text-white text-sm font-medium shadow-md">
                      SP
                    </div>
                  )}
                </div>
              ))}

              {isTyping && messages[0].text.length >= welcomeMessage.length && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 shadow-md">
                    <div className="text-sm">🤖</div>
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl max-w-xs shadow-sm">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-6 py-4 bg-white border-t border-gray-200 flex-shrink-0">
            {uploadedFile && (
              <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-800">
                    {uploadedFile.name}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({Math.round(uploadedFile.size / 1024)} KB)
                  </span>
                </div>
                <button
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-600 transition-colors ml-2"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="How can I help you today?"
                  className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-2xl focus:border-blue-400 focus:outline-none transition-all duration-200 text-gray-800 placeholder-blue-400 pr-28"
                  disabled={isLoading}
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {/* File Upload */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                    title="Upload file"
                  >
                    <Plus size={22} />
                  </button>

                  {/* Stop Button */}
                  {messages.length > 1 && isTyping && (
                    <button
                      onClick={handleStop}
                      className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 shadow-md"
                      title="Stop response"
                    >
                      ■
                    </button>
                  )}

                  {/* Send Button */}
                  <button
                    onClick={handleSend}
                    className={`p-2 rounded-full transition-all duration-200 shadow-md ${
                      isLoading || (!input.trim() && !uploadedFile)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    disabled={isLoading || (!input.trim() && !uploadedFile)}
                  >
                    {isLoading ? "..." : "➤"}
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                />
              </div>
            </div>

            {/* Quick action buttons */}
            {messages.length === 1 &&
              messages[0].text.length >= welcomeMessage.length && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { icon: "✍️", label: "Write" },
                    { icon: "🔧", label: "Build" },
                    { icon: "🔍", label: "Research" },
                    { icon: "🎨", label: "Create" },
                    { icon: "💡", label: "Learn" },
                  ].map((btn, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(btn.label)}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      {btn.icon} {btn.label}
                    </button>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
