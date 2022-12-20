import { useContext } from "react"
import { AppContext } from "../store/AppContext"

import './blockfullinfo.css'


const BlockFullInfo = () => {

  const { state: { activeBlock }, alchemy } = useContext(AppContext);

  const onTxClick = async(tx) => {

    const receipt = await alchemy.core.getTransactionReceipt( tx );

    console.log(receipt);
  }

  return (
    <div className="blockfullinfo">
      {
        activeBlock 
          ?(
            <ul className="blockfullinfo__list">
              {
                Object.keys( activeBlock ).map( (key, index) => {
                  const objects = ['gasLimit', 'gasUsed', '_difficulty']
                  if( key === 'transactions' ) return <></>
                  if( objects.includes(key) ){
                    return (
                      <li key={ index }>
                        <span>{ key.toUpperCase() }</span>: { activeBlock[key]._hex }
                      </li>
                    )
                  }

                  return (
                    <li key={ key}>
                      <span>{ key.toUpperCase() }</span>:  { activeBlock[key] }
                    </li>
                  )
                })
              }
               <li>
                <span>TRANSACTIONS: </span>  
                { 
                  activeBlock.transactions.length === 0 
                  ? 0
                  : (
                    <ul>
                     {
                      activeBlock.transactions.map((tx, index) => (
                        <li 
                          key={tx}
                          onClick={ () => onTxClick( tx ) }
                        >{ tx }</li>
                      ))
                     }
                    </ul>
                  )
                }
              </li>
            </ul>
          )
          : <></>
      }
      
    </div>
  )
}

export default BlockFullInfo