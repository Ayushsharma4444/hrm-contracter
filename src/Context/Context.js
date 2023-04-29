import { createContext, useState } from "react";

export const EmailContext = createContext();

const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [queryId, setQueryId] = useState("");



  return (
    <EmailContext.Provider value={{ email, setEmail, contractorName, setContractorName, queryId, setQueryId }}>
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
