import React, { useEffect, useState } from "react";
import ListCard from "./ListCard";
import CreateListCard from "./CreateListCard";
import CreateListModel from "./Model/CreateListModel";
import { toast } from "react-toastify";
import { authApiCall } from "../lib/apiCall";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
  borderWidth: "5px",
};
const color = "black";

const ListBar = ({ user }) => {
  const [listData, setListData] = useState([]);
  const [show, setShow] = useState(false);
  const [isfetchList, setIsFetchList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragTaskId, setDragTaskId] = useState();

  const fetchListData = async () => {
    const API = process.env.REACT_APP_API;
    const url = `${API}list/fetch`;
    const method = "GET";
    const data = {};
    setIsLoading(true);
    const response = await authApiCall(url, method);
    if (!response?.data) {
      console.log(response, "error");
      toast.error(response.message);
      return;
    }
    setListData(response.data);
    setIsLoading(false);
  };
  
  useEffect(() => {
    if (!user) {
      return;
    }
    fetchListData();
  }, [user, isfetchList]);
  return (
    <div className="list_bar">
      {listData.map((list, key) => (
        <div key={key}>
          <ListCard list={list} id={key} setIsFetchList={setIsFetchList} dragTaskId={dragTaskId} setDragTaskId={setDragTaskId} />
        </div>
      ))}
      <div className="create_list_div">
        <CreateListCard setShow={setShow} />
      </div>
      {show && <CreateListModel setShow={setShow} setIsFetchList={setIsFetchList} />}
      <div className="clip_loader">
        <ClipLoader color={color} loading={isLoading} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    </div>
  );
};

export default ListBar;
