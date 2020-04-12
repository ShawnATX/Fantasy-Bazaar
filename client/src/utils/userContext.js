import React from 'react'

const UserContext = React.createContext({
    isAuthenticated: false,
    user:{},
    userHasAuthenticated: () => undefined
});
  
export default UserContext;