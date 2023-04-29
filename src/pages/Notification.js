import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import socket from "../Socket";
import { useContext } from "react";
import axios from "../axios";
import { EmailContext } from "../Context/Context";
import { toast } from "react-toastify";

const succesOption = {
  position: "bottom-right",
  type: "success",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const warningOption = {
  position: "bottom-right",
  type: "warning",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const errorOption = {
  position: "bottom-right",
  type: "error",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const Notification = ({ joinDate }) => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { email } = useContext(EmailContext);
  const token = localStorage.getItem("Token");
  const [update, setUpdate] = useState(false);

  const deleteNotification = async (id) => {
    try {
      setUpdate(false);

      const deletedResponse = await axios({
        method: "delete",
        url: `deletenotificationforcontractor?notificationID=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(deletedResponse.data.status){
        toast(deletedResponse.data.message, succesOption);
        setUpdate(true);
      }
    } catch (error) {
      console.log(error);
      setUpdate(true);
      toast(error.data.message, errorOption);
    }
  };

  useEffect(() => {
    let mounted = true;

    axios({
      method: "get",
      url: `getnotificationforcontractor?userEmail=${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setNotifications(res.data.savedNotificationOfUser);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      mounted = false;
    };
  }, [email, update]);

  socket.on("timesheet-approved-notified", (data) => {
    setNotifications([...notifications, data]);
  });

 

  return (
    <>
      <Popup
        className="notification-popup"
        trigger={(open) => <span>{notifications.length}</span>}
        position="center"
        closeOnDocumentClick
      >
        <h2 className="holiday-popup-heading">Notification</h2>
        {notifications.map((notification) => {
          return (
            <li key={notification.id} className="addholiday-label">
              {notification.NotificationMessage}
              <p>{new Date(notification.createdAt).toLocaleDateString()}</p>
              <button
                className="btn btn-danger mgy"
                onClick={() => {
                  deleteNotification(notification._id);
                }}
              >
                Remove
              </button>
            </li>
          );
        })}
      </Popup>

      {/* <div>
        <div
          className="notification-icon"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="badge">{notifications.length}</span>
          <i className="fas fa-bell"></i>
        </div>
        {showDropdown && (
          <div className="notification-dropdown">
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>
                  {notification.message}
                  <button
                    className="remove-button"
                    // onClick={() => removeNotification(notification.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div> */}
    </>
  );
};

export default Notification;
