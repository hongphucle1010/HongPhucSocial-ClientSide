import { Avatar } from "flowbite-react";
import FileUploadComponent from "../../components/FileUpload";
import MyModal from "../../components/MyModal";
import Title from "./UserSettingsTitle";
import { updateUserAvatar } from "../../utils/modifyUser/updateUserWithProfile";
import { useEffect, useState } from "react";

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

export default AvatarSection;
