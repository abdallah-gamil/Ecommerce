

import { Navigate , useLocation} from "react-router-dom";
import { useDataContext } from "../context/DataContext"



export function RequireUerAuth({children}) {
    const {user} = useDataContext();
    if(user){
        return <Navigate to='/'/>
    }
    return children;
}

export function RequireUerLoginAuth({children}) {
    const token = localStorage.getItem('userToken');
    if(token){
        return <Navigate to='/'/>
    }
    return children;
}


export function RequireProfileAuth({children}) {
    const token = localStorage.getItem('userToken');
  const location = useLocation();
  if(!token){
      return <Navigate to='/login' state={{path : location.pathname}}/>
  }
  return children;
}



