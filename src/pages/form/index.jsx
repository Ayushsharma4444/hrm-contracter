import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../axios";

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

const Form = () => {
  const [panImage, setPanImage] = useState(null);
  const [imageUrlPan, setImageUrlPan] = useState(null);
  useEffect(() => {
    if (panImage) {
      setImageUrlPan(URL.createObjectURL(panImage));
    }
  }, [panImage]);

  const [adharImage, setAdharImage] = useState(null);
  const [imageUrlAdhar, setImageUrlAdhar] = useState(null);
  useEffect(() => {
    if (adharImage) {
      setImageUrlAdhar(URL.createObjectURL(adharImage));
    }
  }, [adharImage]);

  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [contractorName, setcontractorName] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  // const [wifeIfscNumber, setWifeIfscNumber] = useState('');
  const [joiningDate, setJoiningDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [role, setRole] = useState("");
  const [birthday, setBirthday] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [bank, setBank] = useState("");
  const [accHolderName, setAccHolderName] = useState("");
  const [account, setAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [reportTo, setReportTo] = useState("");
  const [nationality, setNationality] = useState("");
  const [religion, setReligion] = useState("");
  const [team, setTeam] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    }
  }, []);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  // console.log(adharImage)
  // console.log(panImage)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append('Panimage', panImage)
    formData.append('Adharimage', adharImage)
    formData.append('contractorName', contractorName)
    formData.append('contractorEmail', email)
    formData.append('companyName', companyName)
    formData.append('beneficiaryName', beneficiary)
    formData.append('role', role)
    formData.append('team', team)
    formData.append('birthday', birthday)
    formData.append('address', address1)
    formData.append('gender', gender)
    formData.append('reportTo', reportTo)
    formData.append('idNo', aadhar)
    formData.append('nationality', nationality)
    formData.append('religion', religion)
    formData.append('martialStatus', maritalStatus)
    formData.append('emergencyContactName', emergencyContactName)
    formData.append('emergencyContactRelation', emergencyContactRelation)
    formData.append('emergencyContactNumber', emergencyContactNumber)
    formData.append('bankName', bank)
    formData.append('bankAccNo', account)
    formData.append('isfcCode', ifsc)
    formData.append('panNo', pan)
    formData.append('joinDate', joiningDate)


    try {
      const registeredRes = await axios({
        method: "post",
        url: "/addcontractorprofile",
        data: formData,
        headers:{
          'Content-type': 'multipart/form-data'
        }
        // {
        //   contractorName: contractorName,
        //   contractorEmail: email,
        //   companyName: companyName,
        //   joinDate: joiningDate,
        //   beneficiaryName: beneficiary,
        //   role: role,
        //   team: team,
        //   birthday: birthday,
        //   address: address1,
        //   gender: gender,
        //   reportTo: reportTo,
        //   idNo: aadhar,
        //   nationality: nationality,
        //   religion: religion,
        //   martialStatus: maritalStatus,
        //   emergencyContactName: emergencyContactName,
        //   emergencyContactRelation: emergencyContactRelation,
        //   emergencyContactNumber: emergencyContactNumber,
        //   bankName: bank,
        //   bankAccNo: account,
        //   isfcCode: ifsc,
        //   panNo: pan,
        // },
      });
      if (registeredRes.data.status) {
        setLoading(false);
        toast(registeredRes.data.message, succesOption);
        setTimeout(() => {
          navigate("/profile");
        }, 3000);      
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
      toast(error.response.data.message, warningOption);
    }
  };

  return (
    <Box m="20px">
    <ToastContainer />
      <Header title="PROFILE FORM" subtitle="Upload Profile Details" />

      <Formik>
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Contractor Name"
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setcontractorName(result);
              }}
              value={contractorName}
              name="Employee Name"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Company Name"
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setCompanyName(result);
              }}
              value={companyName}
              name="Company Name"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              label="Joining Date"
              onChange={(e) => {
                setJoiningDate(e.target.value);
              }}
              value={joiningDate}
              name="Joining Date"
              defaultValue="Default Value"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Beneficiary Name"
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setBeneficiary(result);
              }}
              value={beneficiary}
              name="Beneficiary Name"
              sx={{ gridColumn: "span 4" }}
            />
            
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Marital Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={maritalStatus}
                  label="Marital Status"
                  onChange={(e) => {
                    setMaritalStatus(e.target.value);
                  }}
                >
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Unmarried">Unmarried</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              variant="filled"
              type="email"
              label="E-Mail Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              name="Email"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 1"
              onChange={(e) => {
                setAddress1(e.target.value);
              }}
              value={address1}
              name="address1"
              sx={{ gridColumn: "span 4" }}
            />
           
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Role"
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setRole(result);
              }}
              value={role}
              name="role"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Team"
              // onBlur={handleBlur}
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setTeam(result);
              }}
              value={team}
              name="team"
              sx={{ gridColumn: "span 4" }}
            />
             {/* coded by durgesh */}
            <TextField
              fullWidth
              variant="filled"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              label="Birthday"
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
              value={birthday}
              name="birthday"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Aadhar number"
              // onBlur={handleBlur}
              onChange={(e) => {
                setAadhar(e.target.value);
              }}
              value={aadhar}
              name="aadhar"
              // error={!!touched.aadhar && !!errors.aadhar}
              // helperText={touched.aadhar && errors.aadhar}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Pan number"
              // onBlur={handleBlur}
              onChange={(e) => {
                setPan(e.target.value);
              }}
              value={pan}
              name="pan"
              // error={!!touched.pan && !!errors.pan}
              // helperText={touched.pan && errors.pan}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Bank Name"
              // onBlur={handleBlur}
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setBank(result);
              }}
              value={bank}
              name="bank"
              // error={!!touched.bank && !!errors.bank}
              // helperText={touched.bank && errors.bank}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Bank Holder Name"
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setAccHolderName(result);
              }}
              value={accHolderName}
              name="accHolderName"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Bank Account Number"
              // onBlur={handleBlur}
              onChange={(e) => {
                setAccount(e.target.value);
              }}
              value={account}
              name="account"
              // error={!!touched.accNo && !!errors.accNo}
              // helperText={touched.accNo && errors.accNo}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="IFSC Code"
              // onBlur={handleBlur}
              onChange={(e) => {
                setIfsc(e.target.value);
              }}
              value={ifsc}
              name="ifsc"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Report To"
              // onBlur={handleBlur}
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setReportTo(result);
              }}
              value={reportTo}
              name="reportTo"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Nationality"
              // onBlur={handleBlur}
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setNationality(result);
              }}
              value={nationality}
              name="nationality"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Religion"
              // onBlur={handleBlur}
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setReligion(result);
              }}
              value={religion}
              name="religion"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Emergency Contact Name"
              // onBlur={handleBlur}
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setEmergencyContactName(result);
              }}
              value={emergencyContactName}
              name="emergencyContactName"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Emergency Contact Number"
              // onBlur={handleBlur}
              onChange={(e) => {
                setEmergencyContactNumber(e.target.value);
              }}
              value={emergencyContactNumber}
              name="emergencyContactNumber"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Emergency Contact Relation"
              // onBlur={handleBlur}
              onChange={(e) => {
                let result = e.target.value.replace(/[^a-z\s]/gi, "");
                setEmergencyContactRelation(result);
              }}
              value={emergencyContactRelation}
              name="emergencyContactRelation"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <span>
            {imageUrlPan && panImage && (
              <Box mt={2} textAlign="center">
                <div>Pan Preview:</div>
                <img
                  src={imageUrlPan}
                  alt={panImage.name}
                  height="50px"
                  width="160px"
                />
              </Box>
            )}
            <h5>
              Beneficiary Pan Card Image
              <input
                type="file"
                id="pan-image"
                style={{ display: "none" }}
                onChange={(e) => setPanImage(e.target.files[0])}
              />
              <label htmlFor="pan-image">
                <Button variant="contained" color="primary" component="span">
                  Upload Image
                </Button>
              </label>
            </h5>
          </span>
          <span>
            {imageUrlAdhar && adharImage && (
              <Box mt={2} textAlign="center">
                <div>Aadhar Preview:</div>
                <img
                  src={imageUrlAdhar}
                  alt={adharImage.name}
                  height="50px"
                  width="160px"
                />
              </Box>
            )}
            <h5>
              Beneficiary Aadhar Card Image
              <input
                type="file"
                id="adhar-image"
                style={{ display: "none" }}
                onChange={(e) => {
                  setAdharImage(e.target.files[0]);
                }}
              />
              <label htmlFor="adhar-image">
                <Button variant="contained" color="primary" component="span">
                  Upload Image
                </Button>
              </label>
            </h5>
          </span>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Upload Details
            </Button>
          </Box>
        </form>
        {/* )} */}
      </Formik>
    </Box>
  );
};

export default Form;
