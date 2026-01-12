import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ✅ Matches the naming used in your controller logic
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  // ✅ Enables createdAt and updatedAt for "Newest First" sorting
  { timestamps: true } 
);

// ✅ Performance Optimization: Faster searching for requests by user
friendRequestSchema.index({ sender: 1, status: 1 });
friendRequestSchema.index({ recipient: 1, status: 1 });

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;