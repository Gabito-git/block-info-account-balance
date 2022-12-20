import { useContext, useState } from "react"
import { AppContext } from "../store/AppContext"

import BlockInitInfo from "./BlockInitInfo";

import './getblock.css';



const GetBlock = () => {

  const [blockNumber, setBlockNumber] = useState('');
  const [account, setAccount] = useState('');
  const [accountBalance, setAccountBalance] = useState('No info');
  const { state, dispatch, alchemy } = useContext(AppContext);

  const handleClick = async(e) => {
    e.preventDefault();
    if(blockNumber === '') return;
    const block = await alchemy.core.getBlock(+blockNumber);

    dispatch({type: 'ADD_BLOCK', payload: block});
    setBlockNumber('');
  }

  const handleGetBalance = async(e) => {
    e.preventDefault();
    const balance = await alchemy.core.getBalance(account, 'latest');
    setAccountBalance(balance._hex);
    setAccount('')
  }


  const renderBlocks = () => {
    return(
      state.blocks.length === 0
        ? <div className="getblock__empty">No hay nada para mostrar</div>
        : state.blocks.map( block => (
          <BlockInitInfo
            key={ block.hash } 
            block={ block }
          />
        ))
    )
  }

  return (
    <div className="getblock">

      <form 
        className="getblock__input-zone"
        onSubmit={ handleClick }
      >
        <input 
          placeholder="Introduce un numero de bloque" 
          value={ blockNumber }
          onChange={ (e) => setBlockNumber(e.target.value) }
        />
        <button>Enviar</button>
      </form>

      <div className="getblock__block-list">
        { renderBlocks() }
      </div>

      <div className="getblock__account-zone">
        <form 
          className="getblock__input-zone"
          onSubmit={ handleGetBalance }
        >
          <input 
            placeholder="Introduce un numero de cuenta (HEX)" 
            value={ account }
            onChange={ (e) => setAccount(e.target.value) }
          />
          <button>Enviar</button>
        </form>

        <div>
          <p>Account balance: { accountBalance }</p>
        </div>

      </div>
     
    </div>
  )
}

export default GetBlock