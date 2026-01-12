import User from "../models/User.model.js";
import FriendRequest from "../models/FriendRequest.js";

// ================= GET RECOMMENDATIONS (Newest First) =================
export const getRecommendedUsers = async (req, res) => {
  try {
    // 1. Get the current user's friends list first
    const currentUser = await User.findById(req.user._id);
    const myFriends = currentUser.friends || []; //

    // 2. Find users who are NOT me AND NOT in my friends list
    const users = await User.find({
      _id: { 
        $ne: req.user._id,      // Not me
        $nin: myFriends          // Not my friends ($nin = Not In)
      },
      isOnboarded: true 
    })
    .select("-password")
    .sort({ createdAt: -1 }); // ✅ NEW: Newest members appear at the top

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getRecommendedUsers: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ================= GET MY FRIENDS =================
export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate("friends", "fullName profilePic nativeLanguage learningLanguage"); //
    
    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ================= SEND FRIEND REQUEST =================
export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user._id;
    
    // Safety check for BOTH spellings in URL parameters
    const { id, Id } = req.params;
    const recipientId = id || Id; 

    if (!recipientId) {
      return res.status(400).json({ message: "Invalid User ID in URL" });
    }

    if (myId.toString() === recipientId.toString()) {
      return res.status(400).json({ message: "You cannot friend yourself." });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient user not found." });
    }

    // Optional chaining to prevent crashes if friends list is missing
    if (recipient.friends?.includes(myId)) {
      return res.status(400).json({ message: "You are already friends." });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already pending." });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json({ message: "Friend request sent successfully!", friendRequest });

  } catch (error) {
    console.error("CRITICAL ERROR in sendFriendRequest:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
}

// ================= ACCEPT FRIEND REQUEST =================
export async function acceptFriendRequest(req, res) {
  try {
    const { Id } = req.params; // Matches route /:Id
    const requestId = Id;      

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Check if current user is the actual recipient
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // Bi-directional friend update
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient }
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender }
    });

    res.status(200).json({ message: "Friend request accepted successfully." });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ================= GET REQUESTS (Incoming & Accepted) =================
export async function getFriendRequest(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending"
    })
    .populate("sender", "fullName profilePic nativeLanguage learningLanguage")
    .sort({ createdAt: -1 }); // ✅ NEW: Most recent incoming requests at top

    const acceptedReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted"
    })
    .populate("recipient", "fullName profilePic")
    .sort({ updatedAt: -1 }); // ✅ NEW: Most recently accepted at top

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ================= GET OUTGOING REQUESTS =================
export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "pending"
    })
    .populate("recipient", "fullName profilePic nativeLanguage learningLanguage")
    .sort({ createdAt: -1 }); // ✅ NEW: Your newest sent requests at top

    res.status(200).json(outgoingReqs);
  } catch (error) {
    console.log("Error in getOutgoingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}