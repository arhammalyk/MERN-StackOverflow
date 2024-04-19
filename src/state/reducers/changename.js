const changename=(state='user',action)=>{
  if(action.type==='changename')
  {
      state=action.payload
      return state
  }
  else{
      return state;
  }

}
export default changename