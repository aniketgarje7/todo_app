import React from "react";
import { FaPlus } from "react-icons/fa6";

const CreateListCard = ({ setShow }) => {
  return (
    <div className="create_list_card">
      <div className="list_card_header">Create New List</div>
      <div className="plus_icon_div">
        <FaPlus className="plus_icon" onClick={() => setShow(true)} />
      </div>
    </div>
  );
};

export default CreateListCard;
