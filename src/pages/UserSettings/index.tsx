import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HR } from "flowbite-react";
import MyAlert from "../../components/MyAlert";
import UserInformationSection from "./UserInformationSection";
import AvatarSection from "./AvatarSection";
import ChangePassword from "./ChangePasswordSection";

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
