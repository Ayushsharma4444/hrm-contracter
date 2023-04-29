import { Box } from "@mui/material";
import axios from "../../axios";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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

const Holiday = () => {
  const navigate = useNavigate();
  const currentYear = new Date(Date.now()).getFullYear();
  const [loading, setLoading] = useState(false);
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");
  const [holidayDay, setHolidayDay] = useState("");
  const [holidaysData, setHolidaysData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    }
  }, []);

  let token = localStorage.getItem("Token");

  const handleHolidaySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: "/addHoliday",
        data: {
          holidayName: holidayName,
          holidayDate: holidayDate,
          holidayDay: holidayDay,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      if (response) {
        setLoading(false);
        setHolidayName(null);
        setHolidayDate(null);
        setHolidayDay(null);
        toast(response.data.message, succesOption);
      }
    } catch (error) {
      setLoading(false);
      setHolidayName(null);
      setHolidayDate(null);
      setHolidayDay(null);
      if (error.response.data.message === "please filled required details") {
        toast(error.response.data.message, warningOption);
      } else {
        toast(error.response.data.message, errorOption);
      }
    }
  };

  useEffect(() => {
    try {
      let isMounted = true;

      axios({
        method: "get",
        url: `/getHolidays`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setHolidaysData(response.data.savedHolidays);
        })
        .catch((err) => {
          console.log(err.response);
          toast(err.response.data.message, errorOption);
        });

      return () => {
        isMounted = false;
      };
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, errorOption);
    }
  }, [loading]);

  return (
    <div className="Holiday-section">
      <ToastContainer />
      {/* <Popup
        className="my-popup"
        trigger={(open) => (
          <div className="popup-header-div">
            <button className="employee-button-popup">Add Holiday</button>
          </div>
        )}
        position="center"
        closeOnDocumentClick
      >
        <h2 className="holiday-popup-heading">Add Holiday</h2>
        <form onSubmit={handleHolidaySubmit}>
          <div className="holiday-popup-main-div">
            <label className="addholiday-label" for="Holiday-Name">
              Holiday Name
            </label>
            <input
              className="addholiday-input"
              id="Holiday-Name"
              name="Holiday-Name"
              type="text"
              onChange={(e) => {
                setHolidayName(e.target.value);
              }}
            />
            <label className="addholiday-label" for="Holiday-Date">
              Holiday Date
            </label>
            <input
              className="addholiday-input"
              id="Holiday-Date"
              name="Holiday-Date"
              type="text"
              onChange={(e) => {
                setHolidayDate(e.target.value);
              }}
            />
            <label className="addholiday-label" for="Holiday-day">
              Holiday Day
            </label>
            <input
              className="addholiday-input"
              id="Holiday-day"
              name="Holiday-day"
              type="text"
              onChange={(e) => {
                setHolidayDay(e.target.value);
              }}
            />
            {loading ? (
              <div className="loading-div">
                <button className=" loading"></button>
              </div>
            ) : (
              <button className="login-button" type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </Popup> */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Holidays" subtitle={`Holidays of ${currentYear}`} />
      </Box>
      <div className="">
        <table>
          <thead>
            <tr>
              <th>Holiday</th>
              <th>Date</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            {holidaysData.map((currHoliday) => {
              return (<tr>
                <td data-column="Last Name">{currHoliday.HolidayName}</td>
                <td data-column="Job Title">{currHoliday.HolidayDate}</td>
                <td data-column="Twitter">{currHoliday.HolidayDay}</td>
              </tr>);
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holiday;
