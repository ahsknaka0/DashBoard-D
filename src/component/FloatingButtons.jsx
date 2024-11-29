import React, { useState, useRef } from "react";
import { FaRobot, FaBookOpen } from "react-icons/fa";
import { FaTimes, FaMicrophone } from "react-icons/fa"; // Microphone icon

const FloatingButtons = () => {
  const [showFact, setShowFact] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatText, setChatText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false); // State to track voice input status
  const recognitionRef = useRef(null); // Ref for speech recognition instance
  const currentUtteranceRef = useRef(null);

  const facts = [
    "G. L. Bajaj College, established in 2005, is one of the leading educational institutions in India, known for its academic excellence and state-of-the-art infrastructure.",
    "The college offers undergraduate and postgraduate courses in Engineering, Management, and Computer Applications.",
    "G. L. Bajaj is known for its highly experienced faculty members, many of whom have international teaching experience.",
    "The campus is equipped with modern laboratories, libraries, and recreational facilities to support student learning and development.",
    "The college organizes numerous workshops, seminars, and industry collaborations to bridge the gap between academic learning and practical industry needs.",
  ];

  const handleChatClick = () => {
    setShowChat((prev) => !prev);
    if (!showChat) {
      const initialText = "Hi, I am your AI Assistant. Ask me anything regarding G L Bajaj.";
      setChatText(initialText);
      speakText(initialText);
    }
  };

  const handleFactClick = () => {
    setShowFact((prev) => !prev);
  };

  const handleCancelFact = () => {
    setShowFact(false);
    if (currentUtteranceRef.current) {
      speechSynthesis.cancel();
    }
  };

  const handleNextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % facts.length);
  };

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      currentUtteranceRef.current = utterance;
      utterance.onstart = () => {
        console.log("Speech started");
      };
      utterance.onend = () => {
        console.log("Speech ended");
      };
      utterance.onerror = (event) => {
        console.error("SpeechSynthesis error: ", event);
      };
      speechSynthesis.speak(utterance);
    } else {
      console.error("Speech Synthesis is not supported in this browser.");
    }
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserInputSubmit = (e) => {
    e.preventDefault();
    const userQuery = userInput.trim();
    if (userQuery) {
      const extractImportantWords = (query) => {
        const stopWords = [
          "the", "is", "in", "of", "about", "and", "to", "me", "tell", "what", "on", "for", "with", "by",
        ];
        return query
          .split(" ")
          .filter((word) => !stopWords.includes(word.toLowerCase()))
          .join(" ");
      };

      const importantWords = extractImportantWords(userQuery);
      const response = `Here's the information about: ${importantWords}. If you've got more queries, then please let me know!`;
      setChatText(response);
      speakText(response);
      setUserInput("");
    }
  };

  const toggleVoiceInput = () => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        console.log("Voice input started");
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log("Voice input ended");
      };

      recognition.onerror = (event) => {
        console.error("Voice input error: ", event);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("User said: ", transcript);

        // Store the voice input and process it as a question
        const extractImportantWords = (query) => {
          const stopWords = [
            "the", "is", "in", "of", "about", "and", "to", "me", "tell", "what", "on", "for", "with", "by",
          ];
          return query
            .split(" ")
            .filter((word) => !stopWords.includes(word.toLowerCase()))
            .join(" ");
        };

        const importantWords = extractImportantWords(transcript);
        const response = `Here's the information about: ${importantWords}. If you've got more queries, then please let me know!`;
        setChatText(response);
        speakText(response);
      };

      recognitionRef.current = recognition;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };


  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
      <button
        onClick={handleChatClick}
        className="w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex justify-center items-center hover:bg-blue-600 transition duration-200"
        title="Chat/AI Assistant"
      >
        <FaRobot size={24} />
      </button>

      <button
        onClick={handleFactClick}
        className="w-16 h-16 bg-green-500 text-white rounded-full shadow-lg flex justify-center items-center hover:bg-green-600 transition duration-200"
        title="Historical Facts"
      >
        <FaBookOpen size={24} />
      </button>

      {showFact && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
          <div className="border-2 border-lime-800 w-64 bg-slate-400 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Did You Know?</h3>
            <p className="text-sm mt-2">{facts[currentFactIndex]}</p>
            <button
              onClick={handleCancelFact}
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
              title="Close Fact"
            >
              <FaTimes size={16} />
            </button>
            <button
              onClick={handleNextFact}
              className="mt-4 w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-200"
              title="Next Fact"
            >
              Next Fact
            </button>
          </div>
        </div>
      )}

      {showChat && (
        <div className="w-72 bg-white p-4 rounded-lg shadow-lg fixed bottom-20 right-8">
          <div className="flex justify-between">
            <h4 className="font-semibold">AI Assistant</h4>
            <button
              onClick={() => setShowChat(false)}
              className="text-red-500"
              title="Close Chat"
            >
              <FaTimes />
            </button>
          </div>
          <div className="mt-2">
            <p>{chatText}</p>
          </div>
          <form onSubmit={handleUserInputSubmit} className="mt-4">
            <input
              type="text"
              value={userInput}
              onChange={handleUserInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ask me anything..."
            />
            <button
              type="submit"
              className="mt-2 w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-200"
            >
              Ask
            </button>
          </form>
          <button
            onClick={toggleVoiceInput}
            className={`mt-2 w-full flex items-center justify-center bg-gray-800 text-white rounded-lg py-2 hover:bg-gray-700 transition duration-200 ${isListening ? "bg-red-500" : ""
              }`}
            title="Voice Input"
          >
            <FaMicrophone className="mr-2" /> {isListening ? "Listening..." : "Start Voice Input"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingButtons;
