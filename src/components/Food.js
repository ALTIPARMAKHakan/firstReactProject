import React, { useEffect, useState } from 'react'
import '../App.css'
import { motion, useAnimation } from 'framer-motion'

function Food ({ stiller }) {
  // console.log(stiller)

  const CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/categories.php'
  const MEALS_IN_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
  const SEARCH_BY_MEAL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

  const [isOpen, setIsOpen] = useState(undefined)
  const [categoryData, setCategoryData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Beef')
  const [mealsFromCategory, setMealsFromCategory] = useState(null)
  const [openFoodDetails, setOpenFoodDetails] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [mealImageURL, setMealImageURL] = useState(null)

  const animation = useAnimation()
  const opacityAnimation = useAnimation()

  useEffect(() => {
    if (selectedMeal !== null) setMealImageURL(selectedMeal.meals[0].strMealThumb)
  }, [selectedMeal])

  useEffect(() => {
    async function fetchData () {
      await fetch(`${MEALS_IN_CATEGORY}${selectedCategory}`)
        .then(response => response.json())
        .then(data => setMealsFromCategory(data))
    }
    if (selectedCategory !== null) fetchData()
  }, [selectedCategory])

  useEffect(() => {
    async function fetchData () {
      await fetch(CATEGORY_URL)
        .then(response => response.json())
        .then(data => setCategoryData(data))
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (isOpen !== undefined) isOpen ? openSequence() : closeSequence()
  }, [isOpen])

  function handleOpenFoodDetails (mealName) {
    setOpenFoodDetails(true)

    async function fetchData () {
      await fetch(`${SEARCH_BY_MEAL_NAME}${mealName}`)
        .then(response => response.json())
        .then(data => setSelectedMeal(data))
    }
    fetchData()
  }

  async function openSequence () {
    await animation.start({ width: '100vw', borderRadius: '35px' })
    await animation.start({ margin: 'auto' })
    await animation.start({ width: '90%' })
    await animation.start({ height: '500px' })
    await opacityAnimation.start({ opacity: 0.85, borderRadius: '20px' })
  }

  async function closeSequence () {
    await opacityAnimation.start({ opacity: 0 })
    await animation.start({ height: '150px' })
    await animation.start({ width: '100vw', borderRadius: '5px' })
    await animation.start({ margin: '1px' })
    await animation.start({ width: '50px' })
    await animation.start({ align: 'left' })
  }

  function openFoodComponent () { setIsOpen(!isOpen) }

  return (
    <motion.div
      className='food-main-container'
      style={{ backgroundColor: stiller.background }}
      animate={animation}
      transition={{ duration: 0.3 }}>
      <button
        id='food-button'
        onClick={() => openFoodComponent()}>
        Food
      </button>
      <motion.div
        className='food-inside-container'
        animate={opacityAnimation}
        transition={{ duration: 0.5 }}
      >
        <label htmlFor="meal-category">Choose a Category</label>

        {/* KATEGORİ SEÇME */}
        <select
          name="meal-category"
          id="meal-category"
          onChange={(e) => { setSelectedCategory(e.target.value); setOpenFoodDetails(false) }}
        >
          {categoryData !== null
            ? categoryData.categories.map((obj, index) => {
              return (
                <option
                  key={index}
                  value={obj.strCategory}
                >
                  {obj.strCategory}
                </option>)
            })
            : null}
        </select>

        {/* KATEGORİDEN GELEN YEMEK LİSTESİ */}
        {categoryData !== null &&
          mealsFromCategory !== null &&
          !openFoodDetails
          ? <div
            style={{
              overflowY: 'scroll',
              padding: '10px',
              display: 'flex',
              flexDirection: 'row'
            }}>
            <div>
              {mealsFromCategory.meals.map((item, index) => {
                return (
                  <p
                    key={index}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleOpenFoodDetails(item.strMeal)}>
                    <span style={{ fontWeight: '800' }}>
                      {item.strMeal}
                    </span>
                  </p>
                )
              })}
            </div>
          </div>
          : null
        }
        {/* YEMEĞE TIKLAYINCA AÇILACAK DETAY SAYFASI */}
        {categoryData !== null &&
          mealsFromCategory !== null &&
          selectedMeal !== null &&
          openFoodDetails

          ? <div style={{
            overflowY: 'scroll',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div>
                <img width={'200px'} src={`${mealImageURL}`} alt={`${mealImageURL}`} />
            </div>
            <div>
            {selectedMeal.meals.map((item) => {
              const ingredientData = []
              console.log(ingredientData)

              Object.entries(item).forEach((key, index) => {
                if (key[1] !== ' ' && key[1] !== '' && key[1] !== null) {
                  if (
                    key[0] !== 'idMeal' &&
                    key[0] !== 'strCategory' &&
                    key[0] !== 'strMealThumb' &&
                    key[0] !== 'strYoutube' &&
                    key[0] !== 'strSource'
                  ) { ingredientData.push(key) }
                }
              })

              return ingredientData.map((item, index) => {
                return (
                  <p key={index} >
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

          </div>
          : null}
          { openFoodDetails && <button id='food-close-meal-button' onClick={() => { setOpenFoodDetails(false) }}>Close</button> }
      </motion.div>
    </motion.div>
  )
}

export default Food
