import Layaout from '@/components/Layaout'
import { DefaultDataSettings } from '@/components/MainComponents/settings/DefaultDataSettings'
import React from 'react'

const DefaultDataPage = () => {
  return (
    <Layaout textpage='Predeterminar datos'><DefaultDataSettings/></Layaout>
  )
}

export default DefaultDataPage