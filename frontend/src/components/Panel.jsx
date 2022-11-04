import React from 'react'
import {
     Flex,
     StatGroup,
     StatLabel,
     StatNumber,
     StatHelpText,
     StatArrow,
     Stat,
     useColorMode
} from '@chakra-ui/react'
const Panel = () => {
    const {colorMode} = useColorMode()
  return (
    <Flex 
        flexDir="column" 
        
    >
        <StatGroup justifyContent={"space-between"}>
            <Stat 
                p={2} 
                borderRadius="10px"
                m="2"
                bgColor={colorMode=="light" ?"orange.100":"#ffffff"}
                color="black"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)"
            >
                <StatLabel>Open Contracts</StatLabel>
                <StatNumber>345,6</StatNumber>
                <StatHelpText>
                <StatArrow type='increase' />
                23.36%
                </StatHelpText>
            </Stat>

            <Stat 
                p={2} 
                borderRadius="10px"
                m="2"
                bgColor={colorMode=="light" ?"orange.100":"#ffffff"}
                color="black"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)">
                <StatLabel>Prospects</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                <StatArrow type='decrease' />
                7.05%
                </StatHelpText>
            </Stat>
            <Stat 
                p={2} 
                borderRadius="10px"
                m="2"
                bgColor={colorMode=="light" ?"orange.100":"#ffffff"}
                color="black"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)">
                <StatLabel>Clients</StatLabel>
                <StatNumber>21</StatNumber>
                <StatHelpText>
                <StatArrow type='increase' />
                9.05%
                </StatHelpText>
            </Stat>
            <Stat 
                p={2} 
                borderRadius="10px"
                m="2"
                bgColor={colorMode=="light" ?"orange.100":"#ffffff"}
                color="black"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)">
                <StatLabel>Closed Contracts</StatLabel>
                <StatNumber>60</StatNumber>
                <StatHelpText>
                <StatArrow type='decrease' />
                10.09%
                </StatHelpText>
            </Stat>
        </StatGroup>
    </Flex>
  )
}

export default Panel