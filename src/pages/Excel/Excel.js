import React from "react";

const Excel = ({invoiceData}) => {
  console.log(invoiceData)
  function dateConverter(val){
    let x = val.toLocaleDateString()
    return x
  }
  function sliceDate(val){
      let dat = val.slice(0,10)
      return dat
    }
    const handleTotal = (newArr) =>{
      var total = 0
      for (var i = 0; i < newArr.length; i++){
        total += Number(newArr[i].Amount)
      }
      // console.log(total)
      return total
    }
  return (
    <table
      id="table-to-xls"
      style={{ fontFamily: "Calibri", border: "1px solid", display: "none" }}
    >
      <tr style={{ textAlign: "center" }}>
        <th></th>
        <th></th>
        <th style={{ fontSize: "30px" }}>BILL OF SUPPLY</th>
      </tr>
      <tr>
        <th style={{ borderBottom: "1px solid" }}></th>
        <th style={{ borderBottom: "1px solid" }}></th>
        <th style={{ borderBottom: "1px solid" }}>Original For</th>
        <th style={{ borderBottom: "1px solid" }}></th>
        <th style={{ borderBottom: "1px solid" }}></th>
      </tr>
      <tr></tr>
      <tr>
        <td style={{ fontStyle: "italic" }}>Invoice Number:</td>
        <td>{invoiceData.InvoiceNo}</td>
        <td></td>
        <td style={{ fontStyle: "italic" }}>Service Number:</td>
        <td>{invoiceData.ServiceNo}</td>
      </tr>
      <tr></tr>
      <tr></tr>
      <tr>
        <td style={{ fontStyle: "italic" }}>Invoice Date:</td>
        <td>{sliceDate(invoiceData.InvoiceDate)}</td>
        <td></td>
        <td style={{ fontStyle: "italic" }}>Service Period:</td>
        <td>{sliceDate(invoiceData.DateFrom)} - {sliceDate(invoiceData.DateTo)}</td>
      </tr>
      <tr></tr>
      <tr></tr>
      <tr>
        <td style={{ fontStyle: "italic" }}>Supplier:</td>
        <td></td>
        <td></td>
        <td style={{ fontStyle: "italic" }}>Buyer:</td>
        <td></td>
      </tr>
      <tr>
        <td>Name:</td>
        <td>{invoiceData.Name}</td>
        <td></td>
        <td style={{ fontSize: "18px", fontWeight: "600" }}>
          AJILEDONE TECHNOLOGIES PVT. LTD.
        </td>
        <td></td>
      </tr>
      <tr>
        <td>Address:</td>
        <td>{invoiceData.Address}</td>
        <td></td>
        <td>P-31 Second Floor, Gurubagh Colony</td>
        <td></td>
      </tr>
      <tr>
        <td>Pan:</td>
        <td>{invoiceData.Pan}</td>
        <td></td>
        <td>Chandigarh Road, Ludhiana-141010</td>
        <td></td>
      </tr>
      <tr>
        <td>Aadhar:</td>
        <td>{invoiceData.Aadhar}</td>
        <td></td>
        <td>Supplier State Code : 03 - Punjab</td>
        <td></td>
      </tr>
      <tr>
        <td>Phone:</td>
        <td>{invoiceData.Phone}</td>
        <td></td>
        <td>CIN : U72900PB2021PTC053634</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>URN : UDYAM-PB-12-0039948</td>
        <td></td>
      </tr>
      <tr></tr>
      <tr></tr>
      <tr>
        <td style={{ border: "1px solid" }}>S.NO.</td>
        <td style={{ border: "1px solid" }}>PARTICULARS</td>
        <td style={{ border: "1px solid" }}>REMARKS</td>
        <td style={{ border: "1px solid" }}>AMOUNT</td>
      </tr>
      {invoiceData.Table.map((val, index) => {
            return (
              <tr className="invoice-head table-data-space">
                <td style={{ border: "1px solid" }}>{index + 1}</td>
                <td style={{ border: "1px solid" }}>{val.Particular}</td>
                <td style={{ border: "1px solid" }}>{val.Remark}</td>
                <td style={{ border: "1px solid" }}>{val.Amount}</td>
              </tr>
            );
          })}

      <tr>
        <td style={{ border: "1px solid" }}></td>
        <td style={{ border: "1px solid" }}></td>
        <td style={{ border: "1px solid" }}></td>
        <td style={{ border: "1px solid" }}></td>
      </tr>
      <tr>
        <td style={{ border: "1px solid" }}></td>
        <td style={{ border: "1px solid" }}></td>
        <td style={{ border: "1px solid" }}>Total</td>
        <td style={{ border: "1px solid" }}>{handleTotal(invoiceData.Table)}</td>
      </tr>
      <tr></tr>
      <tr></tr>
      <tr>
        <td>Amount In Words</td>
        <td>{invoiceData.AmountInWord}</td>
      </tr>
      <tr></tr>
      <tr>
        <td>Bank Details</td>
      </tr>
      <tr>
        <td>Bank Name:</td>
        <td>{invoiceData.BankName}</td>
      </tr>
      <tr>
        <td>Account No:</td>
        <td>{invoiceData.AccountNumber}</td>
      </tr>
      <tr>
        <td>Branch and IFSC code:</td>
        <td>{invoiceData.IFSC}</td>
      </tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr>
        <td></td>
        <td></td>
        <td style={{ fontSize: "20px", fontWeight: "600" }}>
          This Is a computer generated invoice
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td>JURISDICTION COMES UNDER MSME SUBJECT TO LUDHIANA JURISDICTION</td>
      </tr>
    </table>
  );
};

export default Excel;
