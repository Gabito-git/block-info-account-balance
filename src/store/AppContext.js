import { createContext, useReducer } from "react"
import { Alchemy, Network } from 'alchemy-sdk';
import appReducer from './appRedcuer'

export const initState = {
  blocks: [],
  activeBlock: null
}

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings)

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(appReducer, initState);

  return (
    <AppContext.Provider value={{ state, dispatch, alchemy }}>
      { children }
    </AppContext.Provider>
  )

}