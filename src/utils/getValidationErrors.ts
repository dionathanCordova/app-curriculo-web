import { ValidationError } from 'yup';

interface ErrorResponse {
   [key: string] : string;
}

export default function getValidationErrors(err: string): any {
   const er = JSON.parse(err);
   const validation: ErrorResponse = {};

   er.map((erro:ErrorResponse) => {
      validation[erro.path] = erro.message;
   })

   return validation;
}