import { useState } from "react";
import { concatFirstAndLastName } from "../../utils/functions";
import { updateUserWithProfile } from "../../utils/modifyUser/updateUserWithProfile";
import { Label, TextInput } from "flowbite-react";
import { HiMail, HiUserCircle } from "react-icons/hi";
import { LuPencilLine } from "react-icons/lu";
import Title from "./UserSettingsTitle";
import MyModal from "../../components/MyModal";

const UserInformationSection = ({
  user,
  dispatch,
  setShowAlert,
  setAlertContent,
}: any) => {
  const [openModal, setOpenModal] = useState(false);
  const userInfo = [
    [
      "Name",
      concatFirstAndLastName(
        user.profile.firstName ?? "",
        user.profile.lastName ?? ""
      ),
    ],
    ["Username", user.username],
    ["Email", user.email],
    ["Bio", user.profile?.bio ?? ""],
  ];
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.profile.firstName);
  const [lastName, setLastName] = useState(user.profile.lastName);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.profile?.bio);

  const handleUpdate = async () => {
    // Update user information here
    const userInfo: any = {};
    if (email) userInfo.email = email;
    if (username) userInfo.username = username;

    const profile: any = {};
    if (firstName) profile.firstName = firstName;
    if (lastName) profile.lastName = lastName;
    if (bio) profile.bio = bio;
    userInfo.profile = profile;

    try {
      await updateUserWithProfile(userInfo, dispatch);
      setAlertContent({
        color: "success",
        content: "User information updated successfully",
        onDismiss: () => setShowAlert(false),
      });
      setShowAlert(true);
    } catch (error) {
      console.error(error);
      setAlertContent({
        color: "failure",
        content: "Failed to update user information",
        onDismiss: () => setShowAlert(false),
      });
      declineUpdate();
      setShowAlert(true);
    }
  };

  const declineUpdate = () => {
    setUsername(user.username);
    setFirstName(user.profile.firstName);
    setLastName(user.profile.lastName);
    setEmail(user.email);
    setBio(user.profile?.bio);
  };

  const userForm = () => {
    return (
      <form className="w-full" method="POST">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            name="email"
            placeholder="hongphuc@hongphuc.vn"
            icon={HiMail}
            onChange={(event: any) => setEmail(event.target.value)}
            value={email}
            required
            shadow
          />
        </div>
        <div>
          <div className="my-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
            id="username"
            type="text"
            name="username"
            icon={HiUserCircle}
            onChange={(event: any) => setUsername(event.target.value)}
            value={username}
            placeholder="hongphuc"
            required
            shadow
          />
        </div>
        <div>
          <div className="my-2 block">
            <Label htmlFor="firstName" value="First name" />
          </div>
          <TextInput
            id="firstName"
            type="text"
            name="firstName"
            icon={HiUserCircle}
            value={firstName}
            placeholder="Hong Phuc"
            onChange={(event: any) => setFirstName(event.target.value)}
            required
            shadow
          />
        </div>
        <div>
          <div className="my-2 block">
            <Label htmlFor="lastName" value="Last name" />
          </div>
          <TextInput
            id="lastName"
            type="text"
            name="lastName"
            icon={HiUserCircle}
            onChange={(event: any) => setLastName(event.target.value)}
            value={lastName}
            placeholder="Le"
            required
            shadow
          />
        </div>
        <div>
          <div className="my-2 block">
            <Label htmlFor="bio" value="Bio" />
          </div>
          <TextInput
            id="bio"
            type="text"
            name="bio"
            icon={LuPencilLine}
            onChange={(event: any) => setBio(event.target.value)}
            value={bio}
            placeholder="I am a developer"
            required
            shadow
          />
        </div>
      </form>
    );
  };

  return (
    <div className="p-3">
      <Title title="User information" setOpenModal={setOpenModal} />
      <div className="text-sm lg:text-base pl-2 pt">
        {userInfo.map((info) => (
          <div key={info[0].toLowerCase()} className="">
            <span className="inline-block w-20 lg:w-32">{info[0]}:</span>
            <span className="text-slate-600 dark:text-slate-400">
              {info[1]}
            </span>
          </div>
        ))}
      </div>
      <MyModal
        header="User information"
        body={userForm()}
        handleChange={handleUpdate}
        handleDecline={declineUpdate}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default UserInformationSection;
