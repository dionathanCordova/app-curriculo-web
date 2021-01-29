import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { IconBaseProps } from "react-icons/lib";
import { useField } from "@unform/core";
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error, Label } from "./styles";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   type?: string;
   placeholder?: string;
   icon?: React.ComponentType<IconBaseProps>;
   name: string;
   containerStyle?: object;
   label?: string;
   isHidden?: boolean;
}

const Input: React.FC<InputProps> = ({ icon: Icon, containerStyle, label, isHidden, name, ...rest }) => {
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
      <>
         {label && <Label htmlFor={name}>{label}</Label>}

         <Container style={containerStyle} isHidden={!!isHidden} isErrored={!!error} isFocus={isFocus} isFilled={isFilled}> 
            {Icon && <Icon size={20} />}

            <input 
               defaultValue={defaultValue} 
               ref={inputRef} {...rest} 
               onFocus={() => setIsFocus(true)}
               onBlur={handleOnBlur}
               name={name}
            />

            {error && 
               <Error title={error}>
                  <FiAlertCircle color="#c53030" size={20}/>
               </Error>
            }
         </Container>
      </>
   );
};

export default Input;
