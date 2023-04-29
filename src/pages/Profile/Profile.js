import { Box } from "@mui/material";
import axios from "../../axios";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { EmailContext } from "../../Context/Context";
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

const Profile = () => {
  const [processing, setProcessing] = useState("Loading");
  const { contractorName, setContractorName, setEmail } = useContext(EmailContext);
  
  const [profileData, setProfileData] = useState("");
  const token = localStorage.getItem("Token");

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      axios({
        method: "get",
        url: "/currentcontractorprofile",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setProfileData(res.data.savedContractorProfile);
          setContractorName(res.data.savedContractorProfile.ContractorName);
          setEmail(res.data.savedContractorProfile.ContractorEmail);
          sessionStorage.setItem("name", res.data.savedContractorProfile.ContractorName)
          sessionStorage.setItem("id", res.data.savedContractorProfile._id)
          setProcessing("Loading")
        })
        .catch((err) => {
          console.log(err);
          toast(err.response.data.message, errorOption);
          setProcessing(err.response.data.message)
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);
  console.log(profileData)

  return (
    <>
      <ToastContainer />
    {profileData ? 
    (<div>
      <Box display="flex" justifyContent="space-between" alignItems="center" style={{paddingLeft:'20px'}}>
        <Header title="Profile" subtitle=" Welcome To Your Profile section" />
      </Box>
      <div className="employee-main-div">
        <div className="employee-profile-div">
          <img className="employee-profile-pic" src="" alt="Profile"></img>
          <div>
            <h3>{profileData.ContractorName}</h3>
            <p>{profileData.Role}</p>
            <p>Team: {profileData.Team}</p>
            <p>Date of Joining: {profileData.JoinDate}</p>
            <p>{profileData.CompanyName}</p>
          </div>
        </div>
        <div className="employee-information-div">
          {/* <p>Phone: {profileData.EmployeeId.MobileNo}</p> */}
          <p>Email: {profileData.ContractorEmail}</p>
          <p>Birthday: {profileData.Birthday}</p>
          <p>Address: {profileData.Address}</p>
          <p>Beneficiary Name: {profileData.EmergencyContactName}</p>
          <p>Gender: {profileData.Gender}</p>
          <p>Aadhar No: {profileData.IdNo}</p>
          <p>Report to: {profileData.ReportTo}</p>
        </div>
      </div>
      <div className="extra-information-div">
        <div className="personal-information-main-div">
          <h5>Personal information</h5>
          <div className="personal-information-div">
            <div>
              <p>Nationality:</p>
              <p>Religion:</p>
              <p>Marital Status:</p>
            </div>
            <div className="personal-information-nested-div">
              <p>{profileData.Nationality}</p>
              <p>{profileData.Religion}</p>
              <p>{profileData.MartialStatus}</p>
            </div>
          </div>
        </div>
        <div className="personal-information-main-div">
          <h5>Emergency Contacts</h5>
          <div className="personal-information-div">
            <div>
              <p>Name</p>
              <p>Relationship</p>
              <p>Phone</p>
            </div>
            <div className="personal-information-nested-div">
              <p>{profileData.EmergencyContactName}</p>
              <p>{profileData.EmergencyContactRelationship}</p>
              <p>{profileData.EmergencyContactNumber}</p>
            </div>
          </div>
        </div>
        <div className="personal-information-main-div">
          <h5>Bank information</h5>
          <div className="personal-information-div">
            <div>
              <p>Account Holder Name</p>
              <p>Bank Account No</p>
              <p>IFSC Code</p>
              <p>Pan Number</p>
            </div>
            <div className="personal-information-nested-div">
              <p>{profileData.BankName}</p>
              <p>{profileData.BankAccNo}</p>
              <p>{profileData.IFSCcode}</p>
              <p>{profileData.PanNo}</p>
            </div>
          </div>
        </div>
      </div>
      </div> )
      : processing}
      </>
  );
};

export default Profile;
