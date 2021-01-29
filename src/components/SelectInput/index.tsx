/* eslint-disable array-callback-return */
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { IconBaseProps } from "react-icons/lib";
import { useField } from "@unform/core";
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from "./styles";

interface JobProps {
   id: string;
   name: string;
   icon_path: string;
}
interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
   name: string;
   icon?: React.ComponentType<IconBaseProps>;
   jobsData: JobProps[];
   isHidden?: boolean;
}

const SelectInput: React.FC<InputProps> = ({ icon: Icon, name, isHidden, jobsData, ...rest }) => {
   const [ isFocus, setIsFocus ] = useState(false);
   const [ isFilled, setIsFilled ] = useState(false);

   const inputRef = useRef<HTMLSelectElement>(null);
   const { fieldName, defaultValue, error, registerField } = useField(name);
   
   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value'
      })

      // console.log(jobsData);
   }, [fieldName, registerField, jobsData]);

   const handleOnBlur = useCallback(() => {
      setIsFocus(false);

      setIsFilled(!!inputRef.current?.value);   
   }, [])
   
   return (
      <Container isHidden={!!isHidden} isErrored={!!error} isFocus={isFocus} isFilled={isFilled}> 
         {Icon && <Icon size={20} />}

         <select 
            ref={inputRef} {...rest} 
            defaultValue={defaultValue} 
            onFocus={() => setIsFocus(true)}
            onBlur={handleOnBlur}
            name={name}>

            {jobsData && jobsData.map((job) => {
               return (
                  <option key={job.id} value={job.id}>{job.name}</option>
               )
            })}
         </select>

         {error && 
            <Error title={error}>
               <FiAlertCircle color="#c53030" size={20}/>
            </Error>
         }
      </Container>
   );
};

export default SelectInput;
