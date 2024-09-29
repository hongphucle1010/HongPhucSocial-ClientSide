import { useEffect, useState } from "react";
import { getFriendsListApi } from "../../api/friendship/friendship";
import { Avatar, Button } from "flowbite-react";
import { BiMessageRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FriendsListData } from "../../api/friendship/types";
import { concatFirstAndLastName } from "../../utils/functions";

const FriendsList = () => {
  const [friends, setFriends] = useState<FriendsListData[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getFriendsListApi()
      .then((response) => {
        setFriends(response.data.friendsList);
        console.log(response.data.friendsList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="p-3">
      <h1 className="border-b pb-1 font-bold">Friends</h1>
      <div>
        {friends.map((friend: FriendsListData) => {
          return (
            <div
              key={friend.userId}
              className="p-2 active:scale-95 transition-transform myPointer"
              onClick={() => navigate(`/profile/${friend.username}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar img={friend.profile.avatarUrl ?? ""} rounded />
                  <div>
                    <p className="font-bold">{friend.username}</p>
                    <p className="text-xs text-gray-500">
                      {concatFirstAndLastName(
                        friend.profile.firstName ?? "",
                        friend.profile.lastName ?? ""
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  className="p-0"
                  onClick={(event: any) => {
                    event.stopPropagation(); // Prevents the click event from bubbling up
                    navigate(`/message/${friend.userId}`);
                  }}
                >
                  <BiMessageRounded />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsList;
