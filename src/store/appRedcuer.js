


const appRedcuer = (state, action) => {

  switch (action.type) {
    case 'ADD_BLOCK':
      return {
        ...state,
        blocks: [...state.blocks, action.payload]
      }
    
    case 'SET_ACTIVE_BLOCK':
      return{
        ...state,
        activeBlock: action.payload
      }
      
    default:
      return state;
  }


}

export default appRedcuer