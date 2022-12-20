import { useContext } from 'react';
import { AppContext } from '../store/AppContext';
import './blockinitinfo.css'

const BlockInitInfo = ({ block }) => {

  const { nonce, hash } = block;
  const { dispatch } = useContext(AppContext);

  const handleClick = () => {
    dispatch({type: 'SET_ACTIVE_BLOCK', payload: block})
  }

  return (
    <div 
      className='blockinitinfo'
      onClick={  handleClick }
    >
      <p>Nonce: { nonce }</p>
      <p>Hash: { hash.slice(0, hash.length/2) }...</p>
    </div>

  )
}

export default BlockInitInfo