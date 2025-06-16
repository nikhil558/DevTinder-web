import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BACKEND_URL } from "../Utills/constants";
import { connectSocketClient } from "../Utills/socket";
import { useSelector } from "react-redux";
import { useRef } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const [contact, setContact] = useState(null);
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessage]);

  useEffect(() => {
    if (!userId) {
      console.log("User ID is not available");
      return;
    }
    const socket = connectSocketClient();
    socket.emit("jointChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      setNewMessage((prevMessages) => [
        ...prevMessages,
        { senderId: data.senderId, text: data.text },
      ]);
    });

    getContactInfo();
    getNewMessages();

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const getNewMessages = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      console.log("New messages:", res.data);
      setNewMessage(res.data.chat.message);
    } catch (err) {
      console.error("Error fetching new messages:", err);
    }
  };

  const getContactInfo = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/user/" + targetUserId, {
        withCredentials: true,
      });
      console.log(res.data);
      setContact(res.data);
    } catch (err) {
      console.error("Error fetching contact info:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const onSend = () => {
    if (message.trim()) {
      // Logic to send the message
      console.log(`Sending message to ${targetUserId}: ${message}`);
      const socket = connectSocketClient();
      socket.emit("sendMessage", {
        firstName: user.firstName,
        text: message,
        targetUserId,
        userId,
      });

      setMessage(""); // Clear the input after sending
    }
  };

  if (!user) {
    return;
  }

  if (!contact) {
    return;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={contact.profileUrl}
              alt={contact.firstName}
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* {contact.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )} */}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {contact.firstName + " " + contact.lastName}
            </h2>
            {/* <p className="text-sm text-gray-500">
              {contact.online ? "Online" : "Last seen recently"}
            </p> */}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {newMessage.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {newMessage.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.senderId === user?._id
                    ? "justify-end"
                    : "justify-start"
                } animate-fade-in`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.senderId === user?._id
                      ? "bg-blue-500 text-white rounded-br-sm"
                      : "bg-white text-gray-900 rounded-bl-sm border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {/* <div
                    className={`flex items-center justify-end space-x-1 mt-1 ${
                      message.firstName=== user.firstName ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                  </div> */}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu6JFosVqtgK3CUP_FligiP2bnWVRvBOpfGg&s"
                  alt="chat"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to Chat
              </h2>
              <p className="text-gray-600">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white border-t border-gray-200 p-4 mb-18">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full text-black resize-none rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32"
              style={{ minHeight: "40px" }}
            />
          </div>

          <button
            onClick={onSend}
            disabled={!message.trim()}
            className={`p-2 mb-2 rounded-full transition-all duration-200 ${
              message.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white hover-scale"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu6JFosVqtgK3CUP_FligiP2bnWVRvBOpfGg&s"
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
