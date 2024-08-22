import { Label, TextInput } from "flowbite-react";
import MyModal from "../../components/MyModal";
import Title from "./UserSettingsTitle";
import { updatePassword } from "../../utils/modifyUser/updatePassword";
import { useState } from "react";

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

export default ChangePassword;
