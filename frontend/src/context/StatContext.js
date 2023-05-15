import { useEffect, useState, createContext, useRef } from "react";
import axiosInstance from "services/axios";

export const StatContext = createContext([]);

export const StatProvider = (props) => {
  /* eslint sort-keys: 0 */
  const [commissionData, setCommissionData] = useState({
    comission_id: "0",
    objectif_honoraire: "0",
    objectif_deblocage: "0",
    taux_objectif: "0",
    date_modified: new Date().toLocaleDateString(),
  });
  const [reloadStat, setReloadStat] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (reloadStat) {
      isMounted.current = false;
    }
    if (isMounted.current == true) return
    const initialize = async () => {
      const request = await axiosInstance.get("/commissions/single");
      const d = new Date(request.data["date_modified"]);
      const newCommissionData = {
        ...commissionData,
        ...request.data,
        date_modified: d.toLocaleDateString(),
      };
      setCommissionData(newCommissionData);
    };
    initialize();
    isMounted.current = true
 
  }, [reloadStat]);

  return (
    <StatContext.Provider
      value={{
        commissionData,
        setCommissionData,
        reloadStat,
        setReloadStat,
      }}
    >
      {props.children}
    </StatContext.Provider>
  );
};
