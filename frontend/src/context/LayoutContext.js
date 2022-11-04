import React, { useEffect } from "react";

import { useMediaQuery } from "@chakra-ui/media-query";

export const LayoutContext = React.createContext();

export const LayoutProvider = (props) => {
  const [isMobile] = useMediaQuery("(max-width:566px)");

  useEffect(() => {}, [isMobile]);

  return (
    <LayoutContext.Provider value={{ isMobile }}>
      {props.children}
    </LayoutContext.Provider>
  );
};
