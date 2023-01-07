import React, { useEffect, useState } from 'react'
import '../App.css'
import { motion, useAnimation } from 'framer-motion'
import ChooseAlcohol from './ChooseAlcohol'

function Cocktail ({ stiller }) {
  const INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
  const ISALCOHOLIC = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a='

  const [isOpen, setIsOpen] = useState(undefined)
  const [alcoholChosen, setAlcoholChosen] = useState(null)
  const [data, setData] = useState(null)
  const [drink, setDrink] = useState(null)
  const [ingredient, setIngredient] = useState(null)
  const [drinkImageURL, setDrinkImageURL] = useState(null)

  const animation = useAnimation()
  const opacityAnimation = useAnimation()

  // get image url
  useEffect(() => {
    if (ingredient !== null) setDrinkImageURL(ingredient.drinks[0].strDrinkThumb)
  }, [ingredient])

  // alcohol-non_alcohol data fetching
  useEffect(() => {
    async function fetchData () {
      await fetch(`${ISALCOHOLIC}${alcoholChosen}`)
        .then(response => response.json())
        .then(data => {
          delete data.drinks[0]
          setData(data)
        })
    }
    if (alcoholChosen !== null) fetchData()
  }, [alcoholChosen])

  // get ingredients
  useEffect(() => {
    async function fetchData () {
      await fetch(`${INGREDIENTS}${drink}`)
        .then(response => response.json())
        .then(data => setIngredient(data))
    }
    if (drink !== null) fetchData()
  }, [drink])

  async function openSequence () {
    await animation.start({ width: '100vw', borderRadius: '35px' })
    await animation.start({ margin: 'auto' })
    await animation.start({ width: '90%' })
    await animation.start({ height: '500px' })
    await animation.start({ marginTop: '10px' })
    await opacityAnimation.start({ opacity: 0.85, borderRadius: '20px' })
  }

  async function closeSequence () {
    await opacityAnimation.start({ opacity: 0 })
    await animation.start({ marginTop: '0' })
    await animation.start({ height: '150px' })
    await animation.start({ width: '100vw', borderRadius: '5px' })
    await animation.start({ margin: '1px' })
    await animation.start({ width: '50px' })
    await animation.start({ align: 'left' })
  }

  useEffect(() => {
    if (isOpen !== undefined) isOpen ? openSequence() : closeSequence()
  }, [isOpen])

  function openFoodComponent () {
    setIsOpen(!isOpen)
    setTimeout(() => {
      setAlcoholChosen(null)
    }, 500)
  }

  return (
    <motion.div
      className='food-main-container'
      style={{ backgroundColor: stiller.background }}
      animate={animation}
      transition={{ duration: 0.3 }}>
      <button
        id='food-button'
        onClick={() => openFoodComponent()}>
        Cocktail
      </button>
      <motion.div
        className='food-inside-container'
        animate={opacityAnimation}
        transition={{ duration: 0.5 }}
      >
        {/* alkol null değil ise butonu göster */}
        {alcoholChosen !== null
          ? <button
          style={{
            backgroundColor: 'crimson',
            border: 'none',
            margin: '5px',
            color: 'white',
            borderRadius: '10px',
            width: '100px'
          }}
          onClick={() => {
            setAlcoholChosen(null)
            setIngredient(null)
            setDrinkImageURL(null)
          }}>Choose Alcohol Again</button>
          : null}

        {alcoholChosen == null ? <ChooseAlcohol setAlcoholChosen={setAlcoholChosen} /> : null}

        {/* KOKTEYL SEÇME */}
        {data !== null && alcoholChosen !== null
          ? <>
            <label htmlFor="drinks">Choose a Cocktail</label>
            <select name="drinks" id="drinks" onChange={(e) => setDrink(e.target.value)}>
              {data.drinks.map((obj, index) => {
                return (
                  <option
                    key={index}
                    value={obj.strDrink}
                  >
                    {obj.strDrink}
                  </option>)
              })}
            </select>
          </>
          : null}

        {/* INGREDIENT GÖSTER */}
        {ingredient !== null && alcoholChosen !== null
          ? <>
            <div
              style={{
                overflowY: 'scroll',
                padding: '10px',
                display: 'flex',
                flexDirection: 'row'
              }}>
              <div>
                {ingredient.drinks.map((item) => {
                  const ingredientData = []

                  Object.entries(item).forEach((key, index) => {
                    console.log(key)
                    if (key[1] !== null) {
                      if (
                        key[0] !== 'strInstructionsIT' &&
                        key[0] !== 'strDrinkThumb' &&
                        key[0] !== 'strCreativeCommonsConfirmed' &&
                        key[0] !== 'strInstructionsES' &&
                        key[0] !== 'strInstructions'
                      ) { ingredientData.push(key) }
                    }
                  })

                  ingredientData.shift()
                  ingredientData.pop()

                  return ingredientData.map((item, index) => {
                    return (
                      <p key={index}>
                        <span style={{ fontWeight: '800' }}>
                          {`${item[0].replace('str', '')}: `}
                        </span>
                        {`${item[1]}`}
                      </p>
                    )
                  })
                })
                }
              </div>
              <div>
                <img width={'200px'} src={`${drinkImageURL}`} alt={`${drinkImageURL}`} />
              </div>
            </div>
          </>
          : null}

      </motion.div>

    </motion.div>
  )
}

export default Cocktail
