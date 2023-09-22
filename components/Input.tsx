import React from 'react'

const Input = ({data,setData}:any) => {

    const handlerChangeData = (e:any) => {
        setData(e.target.value)
    }
  return (
    <input type="text" value={data} onChange={handlerChangeData} className='input w-full bg-gray2'/>
    )
}

export default Input