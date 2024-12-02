import React from "react";
import { themeContext } from "./ThemeStore";
import { useContext, useState , useRef} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser, deleteUser } from "../Store/UserSlice";
import { updateUrl, baseUrl, deleteUrl } from "../Utility/constant";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { Theme} = useContext(themeContext);
  let userData = useSelector((store) => store.user.items);

  console.log(userData);
  

  let dispatch = useDispatch()
  let navigate = useNavigate()

  let phNumberRef = useRef("")
  let usernameRef = useRef("")

  
  let handleEdit = async () => {
    let updatedName = usernameRef.current.value;
    let updatedPhoneNumber = phNumberRef.current.value;
    try {
      let res = await axios.patch(baseUrl+updateUrl, {username: updatedName ,phNumber: updatedPhoneNumber}, {withCredentials: true});
      let resData = res?.data;

      if(resData?.result == true){
        dispatch(addUser(resData.data))
      }

    } catch (error) {
      console.log(error.message);
      
    }
  }


  const handleDelete = async () => {
    try {
      let res = await axios.delete(baseUrl+deleteUrl, {withCredentials: true}, {data: userData?._id})
      let resData = res?.data;

      console.log(resData, "deleyte");
      

      if(resData?.result == true){
        dispatch(deleteUser())
        navigate("/login")
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }
  


  return (
    <>
      <div
        className={
          Theme == "light"
            ? "min-h-screen bg-gray-100 flex flex-col items-center py-8"
            : "min-h-screen bg-dark flex flex-col items-center py-8"
        }
      >
        <div
          className={
            Theme == "light"
              ? "bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-black"
              : "bg-slate-700 text-white rounded-lg shadow-lg p-6 w-full max-w-md"
          }
        >
          <h2 className="text-2xl font-semibold text-center mb-2 capitalize">{userData?.username}</h2>
          <div className="text-center">
            <label htmlFor="my_modal_6" className="btn btn-outline text-screenColor hover:bg-hoverColor hover:text-white">
              Edit Profile
            </label>
            <button className="btn btn-outline btn-error text-screenColor ml-3 hover:bg-hoverColor hover:text-white" onClick={handleDelete}>
              Delete Account
            </button>
            <input type="checkbox" id="my_modal_6" className={Theme == "light" ? "modal-toggle bg-gray-100" : "modal-toggle bg-gray-800"} />
            <div className={Theme == 'light' ?  "modal bg-gray-100" : "modal bg-gray-800"} role="dialog">
              <div className={Theme == 'light' ?  "modal-box text-black bg-gray-100" : "modal-box text-white bg-gray-700"}>
              <div className="join flex-col">
                  <input className={Theme == "light" ? "input input-bordered join-item bg-white mb-3" : "input input-bordered join-item bg-gray-500 text-white mb-3"} placeholder="username" ref={usernameRef} />
                  <input className={Theme == "light" ? "input input-bordered join-item bg-white mb-3" : "input input-bordered join-item bg-gray-500 text-white mb-3"}  placeholder="Phone Number" ref={phNumberRef} />
              </div>
                <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn btn-outline text-screenColor hover:bg-hoverColor hover:text-white" onClick={handleEdit}>
                    Confirm Changes
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2 capitalize">UserName</h3>
            <p className={Theme == "light" ? "text-gray-600 capitalize" : "text-gray-200 capitalize"}>
              {userData?.username}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Email Address</h3>
            <p className={Theme == "light" ? "text-gray-600" : "text-gray-200"}>
              {userData?.email}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Phone No</h3>
            <p className={Theme == "light" ? "text-gray-600" : "text-gray-200"}>
              {userData?.phNumber}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
