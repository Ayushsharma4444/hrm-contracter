import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "../../axios";
// import "./invoice.css";
import { toast, ToastContainer } from "react-toastify";
import socket from "../../Socket";
import { useParams } from "react-router-dom";
import { EmailContext } from "../../Context/Context";

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
const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [attend, setAttend] = useState(0);
  const [tamt, setTamt] = useState(0);
  const [bname, setBname] = useState();
  const [name, setName] = useState();
  const [dateFrom, setDateFrom] = useState("dd-mm-yyyy");
  const [dateTo, setDateTo] = useState("dd-mm-yyyy");
  const [address, setAddress] = useState();
  const [aadhar, setAadhar] = useState();
  const [phone, setPhone] = useState();
  const [ano, setAno] = useState();
  const [ifsc, setIfsc] = useState();
  const [invoiceNo, setInvoiceNo] = useState();
  const [serviceNo, setServiceNo] = useState();
  const [addRow, setAddRow] = useState(false);
  const [amt, setAmt] = useState();
  const [pan, setPan] = useState('');
  const [particulars, setParticulars] = useState("Manpower");
  const [remarks, setRemarks] = useState("");
  const [amountInWords, setAmountInWords] = useState("");
  const [profileData, setProfileData] = useState("");
  const [dateFrom2, setDateFrom2] = useState("dd-mm-yyyy");
  const [dateTo2, setDateTo2] = useState("dd-mm-yyyy");
  const [loading, setLoading] = useState('Loading')
  const [salary, setSalary] = useState(0);
  const [calculatedSalary, setCalculatedSalary] = useState(0);

  const [timesheetData, setTimesheetData] = useState([]);

  const [tdata, setTdata] = useState([]);

  const {id} = useParams()

  // const { contractorName } = useContext(EmailContext);
  const contractorName = sessionStorage.getItem('name')

  const date = new Date();

  function reverseDate(val) {
    // var date = "2023-03-26"
    var arr = val.split('-')
    arr.reverse()
    var newDate = arr.join('-')
    return newDate
    }
    function reverseDate2(val) {
      // var date = "2023-03-26"
      var arr = val.split('/')
      var newDate = arr[1]+ '-' + arr[0] + '-' + arr[2]
      console.log(newDate);
      return newDate
      }

  let token = localStorage.getItem("Token");

  useEffect(() => {
    let x = Math.random() * 10 ** 13;
    x = Math.round(x)
    setInvoiceNo(x);
    let y = Math.random() * 10 ** 13;
    y = Math.round(y)
    setServiceNo(y);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  console.log(date)

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      axios({
        method: "get",
        url: `/getemployeeprofilebyid?profileId=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setProfileData(res.data.savedEmployeeProfile);
        
          // setEmail(res.data.res.EmployeeId.Email);
        })
        .catch((err) => {
          console.log(err);
          setLoading(err.response.data.message)
          toast(err.response.data.message, errorOption);
        });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  console.log(profileData)
  const handleDone = () => {
    setTdata((preVal) => {
      return [
        ...preVal,
        { Particular: particulars, Remark: remarks, Amount: amt },
      ];
    })
    var arr = [
      ...tdata,
      { Particular: particulars, Remark: remarks, Amount: amt },
    ]
    setAddRow(false);
    setAmt(null);
    setRemarks("");
    // setParticulars("");
    handleTotal(arr)
  };
// console.log(dateFrom)
  const handleDelete = (id) => {
    const newArr = tdata.filter((val, index) => {
      return index !== id;
    });
    setTdata(newArr);
    // console.log(index)
    setAddRow(false);
    setAmt(null);
    setRemarks("");
    // setParticulars("");
    handleTotal(newArr)
  };

  const handleTotal = (newArr) =>{
    var total = 0
    for (var i = 0; i < newArr.length; i++){
      total += Number(newArr[i].Amount)
    }
    setTamt(total + calculatedSalary)
  }

  useEffect(()=>{
    setAddress(profileData.Address)
    setAadhar(profileData.IdNo)
    setPan(profileData.PanNo)
    setBname(profileData.BankName)
    setAno(profileData.BankAccNo)
    setIfsc(profileData.IFSCcode)
    // setName(profileData.EmployeeId.Name)
    
  },[dateFrom, dateTo, tdata, amountInWords])

console.log(tdata)
  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    
    formData.append('Sign', selectedImage)
    formData.append('from', dateFrom)
    formData.append('to', dateTo)
    formData.append('invoiceNo', invoiceNo)
    formData.append('serviceNo', serviceNo)
    formData.append('invoiceDate', reverseDate2(date.toLocaleDateString()))
    formData.append('supplier', "supplier")
    formData.append('name', profileData.EmployeeId.Name)
    formData.append('address', address)
    formData.append('aadhar', aadhar)
    formData.append('pan', pan)
    formData.append('phone', profileData.EmployeeId.MobileNo)
    formData.append('table', JSON.stringify([
      { Particular: "Manpower", Remark: remarks, Amount: calculatedSalary },
      ...tdata,
    ]))
    formData.append('amountInWord', amountInWords)
    formData.append('Bankname', bname)
    formData.append('AccountNumber', ano)
    formData.append('IFSC', ifsc)

    try {
      const response = await axios({
        method: "post",
        url: "/addinvoiceforemployee",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        },
      });

      console.log(response);
      if (response.data.status) {
        socket.emit("invoice-filled", {
          email: profileData.EmployeeId.Email,
          name: profileData.EmployeeId.Name,
          message: `Contractor just filled ${profileData.EmployeeId.Name} invoice`
          })
        toast(response.data.message, succesOption);
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.message) {
        toast(error.response.data.message, warningOption);
      } else {
        toast(error.response.data.message, errorOption);
      }
    }
  };
  console.log("date",reverseDate2(date.toLocaleDateString()))
  const getTimesheetData = () =>{

    try {
      let isMounted = true;

      axios({
        method: "get",
        url: `/getsortedtimesheet?employeeName=${id}&startDateString=${dateFrom}&endDateString=${dateTo}`,
      })
        .then((response) => {
          console.log(response.data)
          setTimesheetData(response.data.filterSortedData)
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
  }

  const getSalary = () =>{
    let isMounted = true;

    try {
      let isMounted = true;

      axios({
        method: "get",
        url: `/getallemployeesforcontrator?ContractorName=${contractorName}`,
      })
        .then((response) => {
          console.log(response.data.savedEmployeeUnderContractor)
          setSalary(fetchSalary(response.data.savedEmployeeUnderContractor));
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

  }
    
  const getAbsent = (arr)=>{
    var absent = 0;
    for (var i = 0; i < arr.length; i++){
      if (arr[i].Workinghours == '0' ){
        absent += 1
      }
    }
    return absent
  }
  
  const fetchSalary = (arr)=>{
    var salary = 0;
    for (var i = 0; i < arr.length; i++){
      if (arr[i]._id == id ){
        salary = arr[i].Salary
      }
    }
    return salary
  }
  console.log(salary)

  useEffect(() => {
    getSalary()
    
  }, [profileData]);

  useEffect(()=>{
    getTimesheetData()
  },[dateTo, dateFrom])

  useEffect(()=>{
    handleGetAmount()
    // handleTotal(tdata) 
  },[timesheetData])

const handleGetAmount = () =>{
  let absence  = getAbsent(timesheetData)
  let Amount = (salary /22) * (22 - absence)
  Amount = Math.floor(Amount) 
  setCalculatedSalary(Amount)
}


  console.log(timesheetData); 

  return (
    <div className="invoice-index">
    <ToastContainer/>
      <div className="sabnav">
        <div className="date-invoice">
          <h1>From:</h1>
          <input
            type="date"
            name=""
            id=""
            onChange={(e) => {
              let date = reverseDate(e.target.value)
              setDateFrom(date);
              setDateFrom2(e.target.value)
            }}
            value={dateFrom2}
          />
          <h1>To:</h1>
          <input
            type="date"
            name=""
            id=""
            onChange={(e) => {
              let date = reverseDate(e.target.value)
              setDateTo(date);
              setDateTo2(e.target.value)
            }}
            value={dateTo2}
          />
          <button className="date-submit" onClick={formSubmit}>Submit</button>
        </div>
        {/* <button className="send-invoice">
          <a href="mail to:pandeyvikas224705@gmail.com">Send Mail</a>
        </button> */}
      </div>
      <div className="invoice-heading">
        <h1>Bill of Supply</h1>
        <p>Original For</p>
      </div>
      <div className="invoice-body">
        <div className="invoice-data">
          <div className="invoice-row">
            <h3>Invoice Number:</h3>
            <span>{invoiceNo}</span>
          </div>
          <div className="invoice-row">
            <h3>Service Number:</h3>
            <span>{serviceNo}</span>
          </div>
        </div>

        <div className="invoice-data">
          <div className="invoice-row">
            <h3>Invoice Date:</h3>
            <span>{date.toLocaleDateString()}</span>
          </div>
          <div className="invoice-row">
            <h3>Service Period:</h3>
            <span>
              {dateFrom} - {dateTo}
            </span>
          </div>
        </div>
        {profileData && timesheetData ?
        <div className="invoice-info">
          <div className="buy-sell">
            <h3>Employee</h3>
            <h3 style={{ paddingRight: "330px" }}>Buyer:</h3>
          </div>
          <div className="buy-sell">
            <div className="invoice-row">
              <h3>Name:</h3>
              <div className="form__group field">
               
                <span>{profileData.EmployeeId.Name}</span>

              </div>
            </div>
            <div className="invoice-row">
              <h3>Company Name:</h3>
              <span>
                <strong>AJILEDONE TECHNOLOGIES PVT. LTD.</strong>
              </span>
            </div>
          </div>
          <div className="buy-sell">
            <div className="invoice-row">
              <h3>Address:</h3>
              
              <span>{profileData.Address}</span>
            </div>
            <div className="invoice-row">
              <h3>Company Address:</h3>
              <span>
                P-31 Second Floor, Gurubagh Colony <br /> Chandigarh Road,
                Ludhiana-141010 <br />
                Supplier State Code : 03 - Punjab
              </span>
            </div>
          </div>
          <div className="buy-sell">
            <div className="invoice-row">
              <h3>Aadhaar:</h3>
             
              <span>{profileData.IdNo}</span>
            </div>
            <div className="invoice-row">
              <h3>CIN:</h3>
              <span>U72900PB2021PTC053634</span>
            </div>
          </div>
          <div className="buy-sell">
            <div className="invoice-row">
              <h3>Pan Number:</h3>
              
              <span>{profileData.PanNo}</span>
            </div>
            <div className="invoice-row">
              <h3>URN:</h3>
              <span>UDYAM-PB-12-0039948</span>
            </div>
          </div>
          <div className="buy-sell">
            <div className="invoice-row">
            <h3>Phone:</h3>
              
              <h5>{profileData.EmployeeId.MobileNo}</h5>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
          <table className="invoice-headings">
            <th className="invoice-head">
              <td>S.NO.</td>
              <td>PARTICULARS</td>
              {/* <td>REMARKS</td> */}
              <td>AMOUNT</td>
              <button
                className="employee-button-popup"
                onClick={() => {
                  setAddRow(true);
                }}
              >
                Add Row
              </button>
            </th>
            <tr className="invoice-head">
              <td>1</td>
              <td>Manpower</td>
              {/* <td>REMARKS</td> */}
              <td>{calculatedSalary}</td>
              <button
                className="employee-button-popup"
                onClick={()=>{
                  handleTotal(tdata)
                }}
                
              >
                Get Total
              </button>
            </tr>
            {tdata.map((val, index) => {
              return (
                <tr className="invoice-head table-data-space">
                  <td>{index + 2}</td>
                  <td>Manpower</td>
                  {/* <td>{val.Particular}</td> */}
                  {/* <td>{val.Remark}</td> */}
                  <td>{val.Amount}</td>
                  <button
                    className="employee-button-popup"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </tr>
              );
            })}

            {addRow ? (
              <div>
                <tr className="invoice-head table-data-space">
                  <td>Sr. No</td>
                  <td>Manpower</td>
                  {/* <TextField
                    required
                    id="standard-required"
                    // label="Required"
                    value={particulars}
                    type="text"
                    variant="standard"
                    onChange={(e) => {
                      setParticulars(e.target.value);
                    }}
                  /> */}
                  {/* <TextField
                    required
                    id="standard-required"
                    // label="Required"
                    value={remarks}
                    type="text"
                    variant="standard"
                    onChange={(e) => {
                      setRemarks(e.target.value);
                    }}
                  /> */}
                  <TextField
                    required
                    id="standard-required"
                    // label="Required"
                    value={amt}
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      setAmt(e.target.value);
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      className="employee-button-popup"
                      onClick={() => {
                        setAddRow(false);
                        // setParticulars("");
                        setAmt(null);
                        // setRemarks("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="employee-button-popup"
                      onClick={handleDone}
                    >
                      Done
                    </button>
                  </div>
                </tr>
              </div>
            ) : (
              ""
            )}

            <div className="invoice-head table-data-space">
              <h3></h3>
              <h3></h3>
              <h3 style={{ paddingLeft: "25%" }}>Total</h3>
              <TextField
                required
                id="standard-required"
                value={tamt}
                type="number"
                variant="standard"
                onChange={(e) => {
                  setTamt(e.target.value);
                }}
              />
            </div>
          </table>
          <div className="buy-sell">
            <div className="invoice-row">
              <h3>Amount in words:</h3>
              <input
                type="text"
                className="form__field"
                placeholder=""
                name="name"
                id="name"
                required
                onChange={(e) => {
                  let result = e.target.value.replace(/[^a-z\s]/gi, "");
                  setAmountInWords(result);
                }}
                value={amountInWords}
              />
            </div>
          </div>
          <div className="buy-sell">
            <h3>Bank Details:-</h3>
          </div>
          <div className="buy-sell">
            <div className="invoice-row">
              <h3>Bank Name:</h3>
              
              <span>{profileData.BankName}</span>
            </div>
          </div>
          <div className="buy-sell">
            <div className="invoice-row">
              <h3>A/c No.:</h3>
              
              <span>{profileData.BankAccNo}</span>
            </div>
          </div>
          <div className="buy-sell">
            <div className="invoice-row">
              <h3>Branch & IFSC code:</h3>
             
              <span>{profileData.IFSCcode}</span>
            </div>
          </div>
          <div className="buy-sell">
            <h3></h3>
            <span></span>
            <h3>For</h3>
            <span></span>
          </div>

          <div className="buy-sell">
            <h3></h3>
            <span></span>

           
            <span>
              {imageUrl && selectedImage && (
                <Box mt={2} textAlign="center">
                  {/* <div>Image Preview:</div> */}
                  <img
                    src={imageUrl}
                    alt={selectedImage.name}
                    height="50px"
                    width="160px"
                    accept="Image/*"
                  />
                </Box>
              )}
              <h3>
                Authorised Signatory
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <label htmlFor="select-image">
                  <Button variant="contained" color="primary" component="span">
                    Upload Image
                  </Button>
                </label>
              </h3>
            </span>
          </div>
        </div>:<h2 style={{color:'yellow'}}>{loading}</h2>}
      </div>
      <div className="invoice-heading">
        <h1>This s a computer generated invoice</h1>
        <p>JURISDICTION COMES UNDER MSME SUBJECT TO LUDHIANA JURISDICTION</p>
      </div>
    </div>
  );
};

export default Index;
