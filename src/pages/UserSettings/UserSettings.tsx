import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { concatFirstAndLastName } from "../../utils/functions";
import { Avatar, HR, Label, TextInput } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
// import { PiPassword } from "react-icons/pi";
import { HiMail, HiUserCircle } from "react-icons/hi";
import { LuPencilLine } from "react-icons/lu";
import {
  updateUserAvatar,
  updateUserWithProfile,
} from "../../utils/modifyUser/updateUserWithProfile";
import MyAlert from "../../components/MyAlert";
import MyModal from "../../components/MyModal";
import FileUploadComponent from "../../components/FileUpload";
import { updatePassword } from "../../utils/modifyUser/updatePassword";

const Title = (props: any) => {
  return (
    <div className="flex justify-between items-center pr-2">
      <h2 className="text-xl font-bold">{props.title}</h2>
      <FaEdit
        onClick={() => props.setOpenModal(true)}
        className="myPointer"
      />
    </div>
  );
};

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

const AvatarSection = ({
  avatarUrl,
  dispatch,
  setShowAlert,
  setAlertContent,
}: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file as any);
      console.log(objectUrl);
    }
  }, [file]);

  const handleUpdate = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await updateUserAvatar(formData, dispatch);
        setAlertContent({
          color: "success",
          content: "Avatar updated successfully",
          onDismiss: () => setShowAlert(false),
        });
        setShowAlert(true);
      } catch (error) {
        console.error(error);
        setAlertContent({
          color: "failure",
          content: "Failed to update avatar",
          onDismiss: () => setShowAlert(false),
        });
        setFile(null);
        setShowAlert(true);
      }
    }
  };

  return (
    <div className="px-3">
      <Title title="Avatar" setOpenModal={setOpenModal} />
      <Avatar img={avatarUrl ?? ""} size="xl" />
      <MyModal
        header="Change avatar"
        body={
          <FileUploadComponent
            handleFileChange={handleFileChange}
            fileType="Image file"
            file={file}
          />
        }
        handleChange={handleUpdate}
        handleDecline={() => setFile(null)}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

const ChangePassword = ({ setAlertContent, setShowAlert }: any) => {
  const [openModal, setOpenModal] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const declineUpdate = () => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleUpdate = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setAlertContent({
          color: "failure",
          content: "Password does not match",
          onDismiss: () => setShowAlert(false),
        });
        setShowAlert(true);
        return;
      }

      await updatePassword(password, newPassword);

      setAlertContent({
        color: "success",
        content: "Password updated successfully",
        onDismiss: () => setShowAlert(false),
      });
      declineUpdate();
      setShowAlert(true);
    } catch (error: any) {
      console.error(error);
      setAlertContent({
        color: "failure",
        content: error.response.data.message,
        onDismiss: () => setShowAlert(false),
      });
      setShowAlert(true);
      declineUpdate();
    }
  };

  const form = () => {
    return (
      <form className="w-full" method="POST">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            name="password"
            placeholder="********"
            onChange={(event: any) => setPassword(event.target.value)}
            value={password}
            required
            shadow
          />
        </div>
        <div>
          <div className="my-2 block">
            <Label htmlFor="newPassword" value="New password" />
          </div>
          <TextInput
            id="newPassword"
            type="password"
            name="newPassword"
            placeholder="********"
            onChange={(event: any) => setNewPassword(event.target.value)}
            value={newPassword}
            required
            shadow
          />
        </div>
        <div>
          <div className="my-2 block">
            <Label htmlFor="confirmPassword" value="Confirm password" />
          </div>
          <TextInput
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={(event: any) => setConfirmPassword(event.target.value)}
            value={confirmPassword}
            placeholder="********"
            required
            shadow
          />
        </div>
      </form>
    );
  };

  return (
    <div className="px-3">
      <Title title="Change password" setOpenModal={setOpenModal} />
      <MyModal
        header="Change password"
        body={form()}
        handleChange={handleUpdate}
        handleDecline={declineUpdate}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

const UserSettings: React.FC = () => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    color: "success",
    content: "",
    onDismiss: () => setShowAlert(false),
  });

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }, [showAlert]);
  const user = useSelector((state: any) => state.userRole.value.user);
  return (
    <div>
      <UserInformationSection
        user={user}
        dispatch={dispatch}
        setShowAlert={setShowAlert}
        setAlertContent={setAlertContent}
      />
      <HR className="my-3" />
      <AvatarSection
        avatarUrl={user.profile?.avatarUrl}
        dispatch={dispatch}
        setShowAlert={setShowAlert}
        setAlertContent={setAlertContent}
      />
      <HR className="my-3" />
      <ChangePassword
        setShowAlert={setShowAlert}
        setAlertContent={setAlertContent}
      />
      <MyAlert {...alertContent} isShow={showAlert} />
    </div>
  );
};

export default UserSettings;
