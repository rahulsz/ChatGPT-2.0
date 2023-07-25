import { useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ChatBody = ({ chat }) => {
  const aiStyle = "bg-white bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto";

  const parent = useRef(null);
  const bottomRef = useRef(null);

  // Only for auto animations
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  // For scrolling to the bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex flex-col gap-4" ref={parent}>
      {chat.map((message, i) => {
        return (
          <div
            key={i}
            className={`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${
              message.sender === "ai" && aiStyle
            }`}
          >
            <pre className="whitespace-pre-wrap">
              <span>{message.message}</span>
            </pre>
          </div>
        );
      })}

      <div ref={bottomRef} className="h-3"></div>
    </div>
  );
};

// Prop type validation for the "chat" prop
ChatBody.propTypes = {
  chat: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      // Add more specific prop type validation for other properties if needed
    })
  ).isRequired,
};

export default ChatBody;
