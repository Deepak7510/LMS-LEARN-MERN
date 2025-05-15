import { instructorFetchMessageService } from "@/service/instructor/message";
import { createContext, useState } from "react";
export const InstructorMessageContext = createContext(null);

function InstructorMessageContextProvider({ children }) {
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMessageList() {
    setLoading(true);
    const result = await instructorFetchMessageService();
    if (result.success) {
      setMessageList(result.data);
      setLoading(false);
    } else {
      setMessageList([]);
      setLoading(false);
    }
  }

  return (
    <InstructorMessageContext.Provider
      value={{ messageList, loading, fetchMessageList }}
    >
      {children}
    </InstructorMessageContext.Provider>
  );
}

export default InstructorMessageContextProvider;
