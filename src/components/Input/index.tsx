import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { IconBaseProps } from "react-icons/lib";
import { useField } from "@unform/core";

import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   type?: string;
   placeholder?: string;
   icon?: React.ComponentType<IconBaseProps>;
   name: string;
}

const Input: React.FC<InputProps> = ({ icon: Icon, name, ...rest }) => {
   const [ isFocus, setIsFocus ] = useState(false);
   const [ isFilled, setIsFilled ] = useState(false);
 
   const inputRef = useRef<HTMLInputElement>(null);
   const { fieldName, defaultValue, error, registerField } = useField(name);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path:'value'
      });
   }, [fieldName, registerField])

   const handleOnBlur = useCallback(() => {
      setIsFocus(false);

      setIsFilled(!!inputRef.current?.value);   
   }, [])

   return (
      <Container isFocus={isFocus} isFilled={isFilled}> 
         {Icon && <Icon size={20} />}
         <input 
            defaultValue={defaultValue} 
            ref={inputRef} {...rest} 
            onFocus={() => setIsFocus(true)}
            onBlur={handleOnBlur}
         />
      </Container>
   );
};

export default Input;
