import React from 'react'
import '../App.css'

export default function ChooseAlcohol ({ setAlcoholChosen }) {
  return (
    <div className='choose-alcohol-main-container'>
      <button className='alcohol-button'
        onClick={() => { setAlcoholChosen('Alcoholic') }}
      >Alcoholic</button>

      <button className='alcohol-button'
        onClick={() => { setAlcoholChosen('Non_Alcoholic') }}
      >Non-alcoholic</button>
    </div>
  )
}
