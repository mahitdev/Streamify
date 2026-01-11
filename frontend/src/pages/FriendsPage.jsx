import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import PageLoader from "../components/PageLoader";

const FriendsPage = () => {
  const { data: friendsData, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const friends = Array.isArray(friendsData) ? friendsData : [];

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-full">
        {/* Sidebar Space is handled by layout grid above */}
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-base-100">
          <h1 className="text-3xl font-bold mb-6">My Friends</h1>

          {friends.length === 0 ? (
            <div className="text-center p-10 bg-base-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No friends yet!</h3>
              <p className="text-gray-500">Go to the Home page to find new people.</p>
            </div>
          ) : (
            /* 👇 SMART GRID FIX: 
               - 'repeat(auto-fill, ...)' puts them side by side automatically.
               - 'minmax(250px, 1fr)' ensures no card is ever smaller than 250px wide. 
            */
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;