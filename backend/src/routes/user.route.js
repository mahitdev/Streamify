import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import{
    acceptFriendRequest,
    getMyFriends,
    getRecommendedUsers,
    sendFriendRequest,
    getFriendRequest,          
    getOutgoingFriendRequests
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);

router.get("/friends",  getMyFriends);
router.post("/friend-request/:Id", sendFriendRequest);
router.put("/friend-request/:Id/accept",acceptFriendRequest);
router.get("/friend-requests",getFriendRequest);
router.get("/outgoing-friend-requests",getOutgoingFriendRequests);

export default router;
