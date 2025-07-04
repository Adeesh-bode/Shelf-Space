import { useState } from 'react';
import { createContext } from 'react'

const AppContext = createContext();

/* 
Define the context and the provider as separate entities. The context (AppContext) is created with createContext(). 
The provider (AppProvider in the corrected example) is a component that uses <AppContext.Provider> to pass down the context to its children.
*/

export function AppProvider({ children }) {
  const [ tabular, setTabular ] = useState(true);  
  const [ showModal, setShowModal ] = useState(false);

  return (
    <AppContext.Provider value={ {tabular , setTabular , showModal, setShowModal } }>
      { children }
    </AppContext.Provider>
  )
}

export default AppContext;