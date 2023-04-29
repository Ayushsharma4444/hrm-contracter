import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "../../axios";
import { useState } from "react";
import { useEffect } from "react";

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

const Leaves = () => {
  const navigate = useNavigate();
  const currentYear = new Date(Date.now()).getFullYear();
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [leaveDays, setLeaveDays] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leavesData, setLeavesData] = useState([]);

  // useEffect(() => {
  //   setInterval(() => {
  //     fetch('https://dummyjson.com/products/1')
  //     .then(res => res.json())
  //     .then(json => console.log(json))
  //     .then(console.log('k'))
  //   }, 10000);
  // }, [])
 
   useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    }
  }, []);

   let token = localStorage.getItem("Token");

   const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: "/employeeleave",
        data: {
          leaveType: leaveType,
          from: leaveFrom,
          to: leaveTo,
          noOfDays: leaveDays,
          reason: leaveReason,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      if (response) {
        setLoading(false);
        setLeaveType(null);
        setLeaveFrom(null);
        setLeaveTo(null);
        setLeaveDays(null);
        setLeaveReason(null);
        toast(response.data.message, succesOption);
      }
    } catch (error) {
      setLoading(false);
      setLeaveType(null);
      setLeaveFrom(null);
      setLeaveTo(null);
      setLeaveDays(null);
      setLeaveReason(null);
      if (error.response.data.message === "Please filled required fields properly") {
        toast(error.response.data.message, warningOption);
      } else {
        toast(error.response.data.message, errorOption);
      }
    }
  };

  // useEffect(() => {
  //   try {
  //     let isMounted = true;

  //     axios({
  //       method: "get",
  //       url: `/getLeaves`,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => {
  //         setLeavesData(response.data.savedleaves);
  //       })
  //       .catch((err) => {
  //         console.log(err.response);
  //         toast(err.response.data.message, errorOption);
  //       });

  //     return () => {
  //       isMounted = false;
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     toast(error.response.data.message, errorOption);
  //   }
  // }, [loading]);

  useEffect(() => {
    try {
      let isMounted = true;

      axios({
        method: "get",
        url: `/currentuserleave`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLeavesData(response.data.leaves);
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

  console.log(leavesData[0])

  return (
    <div className="Holiday-section">
    <ToastContainer />
    <Popup
        className="my-popup"
        trigger={(open) => (
          <div className="popup-header-div">
            <button className="employee-button-popup">Add Leave</button>
          </div>
        )}
        position="center"
        closeOnDocumentClick
      >
        <h2 className="holiday-popup-heading">Add Leave</h2>
        <form onSubmit={handleLeaveSubmit}>
          <div className="holiday-popup-main-div">
            <label className="addholiday-label" for="Holiday-Name">
              Leave Type
            </label>
            <input
              className="addholiday-input"
              id="Holiday-Name"
              name="Holiday-Name"
              type="text"
              onChange={(e) => {
                setLeaveType(e.target.value);
              }}
            />
            <label className="addholiday-label" for="Holiday-Date">
              Leave From
            </label>
            <input
              className="addholiday-input"
              id="Holiday-Date"
              name="Holiday-Date"
              type="text"
              onChange={(e) => {
                setLeaveFrom(e.target.value);
              }}
            />
            <label className="addholiday-label" for="Holiday-day">
              Leave To
            </label>
            <input
              className="addholiday-input"
              id="Holiday-day"
              name="Holiday-day"
              type="text"
              onChange={(e) => {
                setLeaveTo(e.target.value);
              }}
            />
            <label className="addholiday-label" for="Holiday-day">
              Number of days
            </label>
            <input
              className="addholiday-input"
              id="Holiday-day"
              name="Holiday-day"
              type="text"
              onChange={(e) => {
                setLeaveDays(e.target.value);
              }}
            />
            <label className="addholiday-label" for="Holiday-day">
              Leave Reason
            </label>
            <input
              className="addholiday-input"
              id="Holiday-day"
              name="Holiday-day"
              type="text"
              onChange={(e) => {
                setLeaveReason(e.target.value);
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
      </Popup>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Leaves" subtitle="Leaves section" />
      </Box>
      <div>
        <div className="">
          <table>
            <thead>
            
              <tr>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>No of Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Leave added by</th>
              </tr>
            </thead>
            <tbody>
            { !leavesData ? "Loading" :
              leavesData.map((val) => {
              return (<tr>
                <td data-column="First Name">{val.LeaveType}</td>
                <td data-column="Last Name">{val.From}</td>
                <td data-column="Job Title">{val.To}</td>
                <td data-column="Twitter">{val.NoOfDays}</td>
                <td data-column="Twitter">{val.Reason}</td>
                <td data-column="Twitter">{val.Status}</td>
                <td data-column="Twitter">{val.EmployeeName.Name}</td>
              </tr>)
})}   
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
