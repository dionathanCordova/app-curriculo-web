import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface UserProps {
   id: string;
   name: string;
   email: string;
   avatar: string;
   whatsapp: string;
   idade: string;
   genero: string;
   bio: string;
   midias: string;
   cidade: string;
   estado: string;
   bairro: string;
   password: string;
   // profissoes: ProfissaoProps[];
}

// interface ProfissaoProps {
   // id: string;
   // name: string;
   // icon_path: string;
// }

interface ResponseSigin {
   user: UserProps;
   token: string;
   statusCode?: number | boolean;
}

interface SignedResult {
   status: boolean;
}

interface AuthContextData {
   signed: boolean;
   user: UserProps;
   SignIn(
      email: string,
      senha: string
   ): Promise<{status: boolean}>;
   SignOut: any;
   UpdateUser(user: UserProps): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [ user, setUser ] = useState<UserProps>({} as UserProps);
   const [ signed, setSigned ] = useState(false);

   const [ data, setData ] = useState<ResponseSigin>(() => {
      const storageUser    = localStorage.getItem('@Curriculo:user');
      const storageToken   = localStorage.getItem('@Curriculo:token');

      if(storageUser && storageToken) {
         return { user: JSON.parse(storageUser), token: storageToken};
      }

      return {} as ResponseSigin;
   })

   async function SignIn(email: string, password: string):Promise<SignedResult> {
      try {
         const response = await api.post<ResponseSigin>('auth', {
            email, 
            password
         })
         const { user, token, statusCode } = response.data;
         
         if(statusCode === 200) {
            localStorage.setItem("@Curriculo:user", JSON.stringify(user));
            localStorage.setItem("@Curriculo:token", token);
            
            setUser(user);
            setSigned(true);
            setData({user, token});
            
            return { status : true}
         }
         
         setSigned(false);
         setUser({} as UserProps);
         setData({} as ResponseSigin);
   
         return { status: false};
      } catch (error) {
         return { status: false};     
      }
   }

   async function SignOut() {
      localStorage.removeItem('@Curriculo:user');
      localStorage.removeItem('@Curriculo:token');

      setUser({} as UserProps);
      setSigned(false);
      setData({} as ResponseSigin);

      return { signed: false};
   }

   const UpdateUser = useCallback((user: UserProps) => {
      localStorage.setItem("@Curriculo:user", JSON.stringify(user));
      
      setData({
         token: data.token,
         user,
      });

   }, [data.token])

   return (
      <AuthContext.Provider value={{ 
         user: data.user,
         signed: !!data.user,
         SignIn,
         SignOut,
         UpdateUser
      }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext;