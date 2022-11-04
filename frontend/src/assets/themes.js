import {
    extendTheme
  } from "@chakra-ui/react";

const activeLabelStyles = {
    transform: "scale(0.85) translateY(-35px)",
    fontWeight: "medium"
};

const activeDownLabelStyles = {
  transform: "scale(0.85) translateY(29px)",
  fontWeight: "medium"
};

export const theme = extendTheme({
    components: {
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles
                }
              },
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeLabelStyles
              },
              label: {
                top: 0,
                left: 0,
                zIndex: 1,
                position: "absolute",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: "left top",
                
              }
            }
          },
          floatingDown:{
            container: {
              _focusWithin: {
                label: {
                  ...activeDownLabelStyles
                }
              },
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeDownLabelStyles
              },
              label: {
                top: 0,
                left: 0,
                zIndex: 1,
                position: "absolute",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: "left top",
                
              }
            }
          }
        }
      }
    }
  });