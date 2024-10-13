import { RiArrowLeftLine, RiMore2Line, RiCheckDoubleLine, RiInformationLine, RiSendPlane2Line } from "react-icons/ri";

interface ChatMessage {
  id: string;
  sender: string; // 'user' or 'receiver'
  message: string;
  time: string;
}

interface ChatInterfaceProps {
  chatId: string;
  chatUserName: string;
  chatMessages: ChatMessage[];
  isRideAvailable: boolean;
}

const ChatInterface = ({ chatId, chatUserName, chatMessages, isRideAvailable }: ChatInterfaceProps) => {
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 flex-none bg-gray-50">
        <RiArrowLeftLine className="text-blue-500 cursor-pointer" />
        <div className="ml-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
        <div className="ml-4">
          <p className="font-semibold">{chatUserName}</p>
        </div>
        <div className="ml-auto">
          <RiMore2Line className="text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* Ride availability notice */}
      {isRideAvailable === false && (
        <div className="p-4 text-center text-sm text-gray-500 border-b border-gray-200 flex-none">
          <RiInformationLine className="inline" /> This ride is no longer available.
        </div>
      )}

      {/* Chat messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`${
                msg.sender === "user" ? "bg-teal-700 text-white" : "bg-gray-100"
              } p-2 rounded-lg max-w-xs`}
            >
              <p>{msg.message}</p>
              <p className="text-xs mt-1 flex items-center text-gray-500">
                {msg.time}
                {msg.sender === "user" && <RiCheckDoubleLine className="ml-1" />}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input box - fixed at the bottom */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center">
        <input
          type="text"
          placeholder="Your message"
          className="flex-grow p-2 border rounded-lg bg-gray-100 mr-2"
        />
        <button className="p-2 bg-blue-500 text-white rounded-full">
          <RiSendPlane2Line />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
