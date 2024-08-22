import { FaEdit } from "react-icons/fa";

const Title = (props: any) => {
  return (
    <div className="flex justify-between items-center pr-2">
      <h2 className="text-xl font-bold">{props.title}</h2>
      <FaEdit onClick={() => props.setOpenModal(true)} className="myPointer" />
    </div>
  );
};

export default Title;
