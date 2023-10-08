import { createContext, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider({children}){

    const [userToken ,setUserToken] = useState(null);
    const [userData ,setUserData] = useState(null);

    return (
        <userContext.Provider value={{userToken , setUserToken , setUserData , userData}}>
            {children}
        </userContext.Provider>
    )
}