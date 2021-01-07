import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { IconBaseProps } from "react-icons/lib";
import { useField } from "@unform/core";
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
   name: string;
   icon?: React.ComponentType<IconBaseProps>;
}

const SelectInput: React.FC<InputProps> = ({ icon: Icon, name, ...rest }) => {
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
   }, [fieldName, registerField]);

   const handleOnBlur = useCallback(() => {
      setIsFocus(false);

      setIsFilled(!!inputRef.current?.value);   
   }, [])
   
   return (
      <Container isErrored={!!error} isFocus={isFocus} isFilled={isFilled}> 
         {Icon && <Icon size={20} />}

         <select 
            ref={inputRef} {...rest} 
            defaultValue={defaultValue} 
            onFocus={() => setIsFocus(true)}
            onBlur={handleOnBlur}
            name={name}>
            <option value="1">Programação</option>
            <option value="2">Recepcionista</option>
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
