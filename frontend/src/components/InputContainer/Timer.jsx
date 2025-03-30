import React, { useEffect, useState } from 'react'

const Timer = () => {
    const [remMin, setRemMin] = useState(4);
    const [remSec, setRemSec] = useState(59);
    let intervelId;
    useEffect(()=>{
        intervelId = setInterval(()=>{
            setRemSec((curr)=>{
                return curr-1;
            });
            if(remSec <= 0 && remMin > 0){
                setRemMin(remMin -1);
                setRemSec(59)
            }
        },1000)
        
        
        if(remMin == 0 && remSec == 0){
            clearInterval(intervelId)
        }
        return ()=>clearInterval(intervelId);
    })
    
  return (
    <div>
      {
        remMin==0&&remSec==0 ? <div>OTP Expired</div> : <div>{remMin<10 ? "0"+remMin : remMin} : {remSec<10 ? "0"+remSec : remSec}</div>
      }
    </div>
  )
}

export default Timer
