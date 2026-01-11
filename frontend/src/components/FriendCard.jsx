import { Link } from "react-router-dom";

// Helper function for flags
export const getLanguageFlag = (language) => {
  if (!language) return "🏳️";
  const lang = language.toLowerCase();
  
  const flags = {
    english: "🇬🇧", spanish: "🇪🇸", french: "🇫🇷", german: "🇩🇪",
    italian: "🇮🇹", portuguese: "🇵🇹", russian: "🇷🇺", japanese: "🇯🇵",
    chinese: "🇨🇳", korean: "🇰🇷", hindi: "🇮🇳", arabic: "🇸🇦",
    turkish: "🇹🇷", dutch: "🇳🇱",
  };
  return flags[lang] || "🏳️";
};

const FriendCard = ({ friend }) => {
  return (
    /* 👇 CRITICAL: 'overflow-hidden' keeps the avatar inside the card boundaries */
    <div className="bg-base-100 shadow-xl rounded-2xl p-4 flex flex-col items-center text-center border border-base-300 hover:scale-[1.02] transition-transform duration-200 overflow-hidden w-full">
      
      {/* 1. Avatar */}
      <div className="avatar mb-3">
        <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img 
            src={friend.profilePic || `https://ui-avatars.com/api/?name=${friend.fullName}&background=random`} 
            alt={friend.fullName} 
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* 2. Name & Location */}
      <h2 className="text-lg font-bold text-base-content mb-1 truncate w-full px-2">
        {friend.fullName}
      </h2>
      <p className="text-sm text-base-content/60 flex items-center justify-center gap-1 mb-3">
        {/* 👇 FIX: Changed "Earth" to "Unknown" */}
        📍 {friend.location || "Unknown"}
      </p>

      {/* 3. Language Badges */}
      <div className="flex flex-wrap gap-2 justify-center w-full mb-4 px-2">
        {friend.nativeLanguage && (
          <span className="badge badge-neutral text-xs py-3 h-auto">
            {getLanguageFlag(friend.nativeLanguage)} {friend.nativeLanguage}
          </span>
        )}
      </div>

      {/* 4. Message Button */}
      <div className="w-full mt-auto px-2">
        <Link 
          to={`/chat/${friend._id}`} 
          className="btn btn-primary btn-sm w-full rounded-lg text-sm"
        >
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;