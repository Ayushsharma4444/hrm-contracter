import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "../../axios";
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



const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [tamt, setTamt] = useState(0);
  const [invoiceData, setInvoiceData] = useState();


  const handleTotal = (newArr) =>{
    var total = 0
    for (var i = 0; i < newArr.length; i++){
      total += Number(newArr[i].Amount)
    }
    console.log(total)
    return total
  }

  useEffect(() => {
    try {
      let isMounted = true;

      axios({
        method: "get",
        url: `/getinvoiceofemployee?startDate=02-03-2023&endDate=31-03-2023&employeeId=641e9dd7701e76e609b4c79d`,
      })
        .then((response) => {
          setInvoiceData(response.data.savedInvoice);
          setTamt(handleTotal(response.data.savedInvoice.Table))
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
  }, []);

 console.log()


  return (
    <>
  { invoiceData ? <div className="invoice-index">
  <ToastContainer/>
    <div className="sabnav">
      <button className="send-invoice">
        <a href="mail to:pandeyvikas224705@gmail.com">Send Mail</a>
      </button>
    </div>
    <div className="invoice-heading">
      <h1>Bill of Supply</h1>
      <p>Original For</p>
    </div>
    <div className="invoice-body">
      <div className="invoice-data">
        <div className="invoice-row">
          <h3>Invoice Number:</h3>
          <span>{invoiceData.InvoiceNo}</span>
        </div>
        <div className="invoice-row">
          <h3>Service Number:</h3>
          <span>{invoiceData.ServiceNo}</span>
        </div>
      </div>

      <div className="invoice-data">
        <div className="invoice-row">
          <h3>Invoice Date:</h3>
          <span>{invoiceData.InvoiceDate}</span>
        </div>
        <div className="invoice-row">
          <h3>Service Period:</h3>
          <span>
            {invoiceData.DateFrom} - {invoiceData.DateTo}
          </span>
        </div>
      </div>
      <div className="invoice-info">
        <div className="buy-sell">
          <h3>Employee</h3>
          {/* <h3 style={{ paddingRight: "330px" }}>Buyer:</h3> */}
        </div>
        <div className="buy-sell">
          <div className="invoice-row">
            <h3>Name:</h3>
            <div className="form__group field">
              <span>{invoiceData.Name}</span>
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
            <span>{invoiceData.Address}</span>
          </div>
          <div className="invoice-row">
            <h3>Company Address:</h3>
            <address>
              P-31 Second Floor, Gurubagh Colony <br /> Chandigarh Road,
              Ludhiana-141010 <br />
              Supplier State Code : 03 - Punjab
            </address>
          </div>
        </div>
        <div className="buy-sell">
          <div className="invoice-row">
            <h3>Aadhaar:</h3>
            <span>{invoiceData.Aadhar}</span>
          </div>

          <div className="invoice-row">
            <h3>CIN:</h3>
            <span>U72900PB2021PTC053634</span>
          </div>
        </div>
        <div className="buy-sell">
          <div className="invoice-row">
            <h3>Pan Number:</h3>
            <span>{invoiceData.Pan}</span>
          </div>
          <div className="invoice-row">
            <h3>URN:</h3>
            <span>UDYAM-PB-12-0039948</span>
          </div>
        </div>
        <div className="buy-sell">
          <div className="invoice-row">
            <h3>Phone:</h3>
            <span>{invoiceData.Phone}</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
        <table className="invoice-headings">
          <th className="invoice-head">
            <td>S.NO.</td>
            <td>PARTICULARS</td>
            <td>REMARKS</td>
            <td>AMOUNT</td>
          </th>
          {invoiceData.Table.map((val, index) => {
            return (
              <tr className="invoice-head table-data-space">
                <td>{index + 1}</td>
                <td>{val.Particular}</td>
                <td>{val.Remark}</td>
                <td>{val.Amount}</td>
              </tr>
            );
          })}

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
            <span>{invoiceData.AmountInWord}</span>
          </div>
        </div>
        <div className="buy-sell">
          <h3>Bank Details:-</h3>
        </div>
        <div className="buy-sell">
          <div className="invoice-row">
            <h3>Bank Name:</h3>
            <span>{invoiceData.BankName}</span>
          </div>
        </div>
        <div className="buy-sell">
          <div className="invoice-row">
            <h3>A/c No.:</h3>
            <span>{invoiceData.AccountNumber}</span>
          </div>
        </div>
        <div className="buy-sell">
          <div className="invoice-row">
            <h3>Branch & IFSC code:</h3>
            <span>{invoiceData.IFSC}</span>
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
                {/* <Button variant="contained" color="primary" component="span">
                  Upload Image
                </Button> */}
              </label>
            </h3>
          </span>
        </div>
      </div>
    </div>
    <div className="invoice-heading">
      <h1>This is a computer generated invoice</h1>
      <p>JURISDICTION COMES UNDER MSME SUBJECT TO LUDHIANA JURISDICTION</p>
    </div>
  </div> : <div>Loading</div>}
  </>
  );
};

export default Index;
