import { useState,useCallback,useEffect,useRef } from 'react'


function App() {

  const [length,setLength]=useState(8)
  const [isNum, setIsNum]=useState(false)
  const [isChar, setIsChar]=useState(false)
  const [password, setPassword]=useState("")

  const passwordRef=useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (isNum) str+="0123456789"
    if(isChar) str+="~`!@#$%^&*(){}][=+-"

    for(let i=1;i<=length;i++){
      let charr=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(charr);
    }
    setPassword(pass)
  },[length,isNum,isChar,setPassword])

  useEffect(()=>{passwordGenerator()},[length,isNum,isChar])

  
  const copyToClip=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])


  return (
    <>
      <h1 className='text-4xl text-center my-5 text-white'>Password generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-40 px-4 py-3 text-orange-500 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>
          <button className='outline-none bg-blue-700 text-white py-0.5 px-3 shrink-0' onClick={copyToClip}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
           <div className="flex items-center gap-x-1">
            <input type="range" 
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setLength(e.target.value)
            }}
             />
             <label >length:{length}</label>
           </div>
           <div className='flex text-sm gap-x-2'>
           <input type="checkbox"  defaultChecked={isNum} onChange={()=>{
            setIsNum((prev)=>!prev)
           }} />
           <label >Number</label>
          </div>
          <div className='flex text-sm gap-x-2'>
           <input type="checkbox"  defaultChecked={isChar} onChange={()=>{
            setIsChar((prev)=>!prev)
           }} />
           <label >Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
