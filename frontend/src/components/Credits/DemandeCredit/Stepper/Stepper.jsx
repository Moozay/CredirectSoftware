import React, { useEffect, useState, useRef } from "react";
import "./stepper.css";
import { Flex, Box,Text , TagLabel,Heading, Divider, IconButton, AlertTitle, useColorMode,Button } from "@chakra-ui/react";
import { SiSnowflake } from "react-icons/si";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { AiOutlineFileDone } from "react-icons/ai";
import { StepperContext } from "context/StepperContext";

const Stepper = ({ steps, currentStep, handleClick, displayStep, handleSubmit }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();
  const {colorMode} = useColorMode()

  const validateFormData = (e) =>{
    e.preventDefault()
    console.log(e);
    currentStep > steps.length - 1 ? handleSubmit(e) : handleClick("next")
  }
  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];

    let count = 0;
    while (count < newSteps.length) {
      // current Steps

      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: false,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const stepState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step.label,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepRef.current = stepState;

    const current = updateStep(currentStep - 1, stepRef.current);

    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <Flex
        key={index}
        w={index !== newStep.length - 1 ? "full" : ""}
        alignItems="center"
        pt={5}
      >
        <Flex position="relative" justifyItems={"center"}>
          <Box
            rounded="100%"
            h={"30px"}
            w={"30px"}
            textAlign="center"
            fontSize={"14px"}
            bgColor={step.completed ? (colorMode=="light"?"#ff7f00":"#2b2645"): ""}
            borderColor={step.completed ? (colorMode=="light"?"#ff7f00":"#2b2645"):""}
            className={`font-bold leading-[1.8rem] transition duration-500 ease-out md:ease-in${
              step.selected
                ? " bg-white text-black border border-white  "
                : " border border-gray-300"
            }`}
          >
            {step.completed ? (
              <span className="text-white font-bold text-md">&#10003;</span>
            ) : (
              <span className={`${!step.selected ? "text-gray-400": ""}`}>{index + 1}</span>
            )}
          </Box>
          {/* Display description */}
          <Box
            position={"absolute"}
            top={0}
            textAlign="center"
            w="8rem"
            left={"-50px"}
            mt={9}
            right="-15px"
            fontSize={"13px"}
            className={`${step.highlighted ? "" : "text-gray-400"} `}
          >
            {step.description}
          </Box>
        </Flex>
        <Box
          flex={"auto"}
          
          borderColor={step.completed ? (colorMode=="light"?"#ff7f00":"#2b2645") : "gray-400"}
          className={`transition duration-500 ease-out md:ease-in border-t-2 ${step.completed ? "   border-green-600":"  border-gray-300" }`}
        ></Box>
      </Flex>
    );
  });

  return (
    <>
    <form onSubmit={validateFormData} >
    <Flex
        flexDir={"column"}
        borderRadius={"15px"}
        h={"91vh"}
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 15%)"
        justifyContent={"space-around"}
      >
        {/* Stepper */}
        <Flex bgColor={colorMode=="light"?"#fff5ef":"#07041d"} borderTopRadius={"15px"} flexDir={"column"} px={60}>
          <Flex justifyContent={"space-between"} alignItems="center">
            {displaySteps}
          </Flex>
          <Divider mt={8} w="97.3 %" mx="auto" color="gray.400"/>
        </Flex>
        
        {/* Display Components */}
        <Flex
          flexDir={"column"}
          height="100%"
          px={4}
          pt="1"
          
          overflowY={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "black",
              borderRadius: "24px",
            },
          }}
        >
          <StepperContext.Provider value={{}}>
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </Flex>

        <Flex flexDir={"column"} px={16} pb={2} borderBottomRadius={"15px"}>
          <Divider />
          {/* Navigation controls */}
          <Flex justifyContent={"space-around"}  alignContent="center"p={1} mt={1}>
            {/* Back button */}
            <IconButton
             
              bgColor={colorMode=="light"?"#ffad5c":"#07041d"}
              variant={"outline"}
              onClick={() => handleClick("back")}
              
              rounded="50%"
              size="md"
              icon={<AiFillCaretLeft />}
              disabled={currentStep === 1 ? true : false}
            />
            {/* Next button */}
            
            <Heading size={"sm"} textAlign="center" my="auto"  w="20%">{steps[currentStep-1].label}</Heading>
              
          
      

            <IconButton
              // colorScheme={currentStep > steps.length -1 ? "green" : "blue"}
              icon={
                currentStep > steps.length - 1 ? (
                  <Button m={2} size="md" variant="unstyled" >Soumettre</Button>
                ) : (
                  <AiFillCaretRight />
                )
              }
              
              bgColor={colorMode=="light"?"#ffad5c":"#07041d"}
              variant={"outline"}
              rounded={currentStep > steps.length - 1 ? "20%" : "50%" }
              type='submit'
              size="md"
            />
          </Flex>
        </Flex>
      </Flex>
    </form>
    </>
  );
};

export default Stepper;
