import { Avatar, Button, Dropdown, HR } from "flowbite-react";
import { useSelector } from "react-redux";
import { concatFirstAndLastName } from "../../utils/functions";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileByUsernameApi } from "../../api/profile/profile";
import { useEffect, useState } from "react";
import {
  deleteFriendshipRequestApi,
  makeFriendshipRequestApi,
} from "../../api/friendship/friendship";
import { DELETE_FRIENDSHIP_SUCCESS } from "../../config/responseCode";
import QRCodeComponent from "../../components/qrCode";
import { FriendshipStatus } from "../../api/friendship/types";
import { RootState } from "../../lib/redux/store";

const enum Status {
  none = "none",
  pendingToBeAccepted = "pendingToBeAccepted",
  pendingToAccept = "pendingToAccept",
  accepted = "accepted",
  rejected = "rejected",
}

const Profile = () => {
  const currentUser = useSelector(
    (state: RootState) => state.userRole.value.user
  );
  const navigate = useNavigate();
  const { username } = useParams();

  const [user, setUser] = useState(null as any);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [friendStatus, setFriendStatus] = useState<FriendshipStatus>(
    Status.none
  );

  const CurrentUserButton = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
      <>
        <Button
          className="w-5/12 max-w-40"
          gradientMonochrome="purple"
          onClick={() => navigate("/settings")}
        >
          Edit profile
        </Button>
        <Button
          className="w-5/12 max-w-40"
          color="light"
          onClick={() => setOpenModal(true)}
        >
          My QR code
        </Button>
        <QRCodeComponent
          value={currentUser?.username ?? ""}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </>
    );
  };

  const ButtonGroup = ({ first, second, dropdown, userId }: any) => {
    console.log(dropdown);
    return (
      <>
        <Dropdown
          label=""
          inline
          arrowIcon={false}
          renderTrigger={() => (
            <Button className="w-36 sm:w-40" gradientMonochrome="purple">
              {first}
            </Button>
          )}
        >
          {dropdown.map(([label, action]: any) => (
            <Dropdown.Item onClick={action}>{label}</Dropdown.Item>
          ))}
        </Dropdown>

        <Button
          className="w-36 sm:w-40"
          color="light"
          onClick={() => navigate(`/message/${userId}`)}
        >
          {second}
        </Button>
      </>
    );
  };

  const sendFriendRequest = async () => {
    try {
      const response = await makeFriendshipRequestApi(user.profile.userId);
      setFriendStatus(response.data.status as FriendshipStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFriendship = async () => {
    try {
      const response = await deleteFriendshipRequestApi(user.profile.userId);
      if (response.status === DELETE_FRIENDSHIP_SUCCESS)
        setFriendStatus(Status.none);
    } catch (error) {
      console.error(error);
    }
  };

  const buttonGroupAction = {
    none: ["Add friend", [["Send friend request", sendFriendRequest]]],
    pendingToBeAccepted: ["Pending", [["Remove request", deleteFriendship]]],
    pendingToAccept: [
      "Accept",
      [
        ["Reject", deleteFriendship],
        ["Accept", sendFriendRequest],
      ],
    ],
    accepted: ["Friends", [["Remove friend", deleteFriendship]]],
    rejected: ["Add friend", [["Send friend request", sendFriendRequest]]],
  };

  useEffect(() => {
    if (!username) {
      setUser(currentUser);
      setIsCurrentUser(true);
    } else if (username === currentUser?.username) {
      setUser(currentUser);
      setIsCurrentUser(true);
    } else {
      getProfileByUsernameApi(username, currentUser?.id)
        .then((res) => {
          if (!res.data.profile) {
            throw new Error("User not found");
          }
          console.log(res.data);
          setUser(res.data);
          setIsCurrentUser(false);
          setFriendStatus(res.data.friendStatus);
        })
        .catch((e) => {
          console.error(e);
          navigate("/404");
        });
    }
  }, [username]);

  return (
    user && (
      <div>
        <div className="flex p-3 items-center gap-4 sm:pl-8">
          <Avatar
            img={user.profile.avatarUrl}
            rounded
            size="xl"
            bordered
            color="purple"
            className="z-0"
          />
          <div>
            <h1 className="text-xl">
              {concatFirstAndLastName(
                user.profile.firstName || "",
                user.profile.lastName || ""
              )}
            </h1>
            <h2>@{user.username}</h2>
          </div>
        </div>
        <p className="text-center italic text-sm">"{user.profile.bio}"</p>
        <div className="flex justify-around mt-2">
          {isCurrentUser ? (
            <CurrentUserButton />
          ) : (
            <ButtonGroup
              first={buttonGroupAction[friendStatus][0]}
              second="Message"
              dropdown={buttonGroupAction[friendStatus][1]}
              userId={user.profile.userId}
            />
          )}
        </div>
        <HR className="my-4 w-11/12 mx-auto" />
      </div>
    )
  );
};

export default Profile;
