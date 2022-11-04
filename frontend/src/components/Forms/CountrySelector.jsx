import React, {useState, useMemo, useEffect}  from 'react'
import {Select} from '@chakra-ui/react'
import countryList from "react-select-country-list";
import {AiFillCaretDown} from 'react-icons/ai'


  export  const CountrySelector = () => {
    const [val, setVal] = useState('')
  const options = useMemo(() => countryList().getData(), [])

    const changeHandler = valu => {
        setVal(valu);
      };
      useEffect(()=>{
        console.log(options)
      },[])
    return (
        <Select  
            size='sm' 
            name="country"
            onChange={changeHandler}
            icon={<AiFillCaretDown/>}
            w="100%"
            >
                <option></option>
                {
                    options.map( country => {
                        
                    return  (
                        
                        <option value={country.label} css={{"width":"100%"}} >{country.label}</option>
                     )
                    })
                }
                            
        </Select>
    )
  }



