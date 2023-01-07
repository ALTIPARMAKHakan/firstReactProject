import React, { useEffect, useState } from 'react'
import '../App.css'
import { motion, useAnimation } from 'framer-motion'

function Gluck ({ stiller }) {
  const [isOpen, setIsOpen] = useState(undefined)
  const animation = useAnimation()
  const opacityAnimation = useAnimation()
  const [array1, setArray1] = useState([])
  const [array2, setArray2] = useState([])

  useEffect(() => {
    if (isOpen !== undefined) isOpen ? openSequence() : closeSequence()
  }, [isOpen])

  async function openSequence () {
    await opacityAnimation.start({ display: 'flex' })
    await animation.start({ width: '100vw', borderRadius: '35px' })
    await animation.start({ margin: 'auto' })
    await animation.start({ width: '90%' })
    await animation.start({ height: '500px' })
    await opacityAnimation.start({ opacity: 0.85, borderRadius: '20px' })
  }

  async function closeSequence () {
    await opacityAnimation.start({ opacity: 0 })
    await opacityAnimation.start({ display: 'none' })
    await animation.start({ height: '150px' })
    await animation.start({ width: '100vw', borderRadius: '5px' })
    await animation.start({ margin: '1px' })
    await animation.start({ width: '80px' })
    await animation.start({ align: 'right' })
  }
  function eurojackpot () {
    let result = []
    let result2 = []

    while (result.length < 5) {
      const eurojackpot = parseInt(Math.floor(Math.random() * 48) + 1)
      result.push(eurojackpot)
      result = [...new Set(result)]
    }
    while (result2.length < 2) {
      const eurojackpot = parseInt(Math.floor(Math.random() * 9) + 1)
      result2.push(eurojackpot)
      result2 = [...new Set(result2)]
    }
    result.sort(function (a, b) { return a - b })
    result2.sort(function (a, b) { return a - b })
    setArray1(result)
    setArray2(result2)
  };

  return (
  <motion.div
    className='gluck-main-container'
    style={{ backgroundColor: stiller.background }}
    animate={animation}
    transition={{ duration: 0.3 }}>
        <button className="gluck-button"
        onClick={() => (setIsOpen(!isOpen))
        }>🎲<br/>Gluck</button>

    <motion.div
      className='gluck-inside-container'
      animate={opacityAnimation}
      transition={{ duration: 0.5 }}
    >
      <button id="zufallszahlen"
      onClick={() => eurojackpot()}>🎲Zufallszahlen🎲</button>
{
  <p style={{ fontSize: '30px', fontWeight: '600' }}>Eurojackpot Zahlen<hr/>{array1.join(',')} -- {array2.join(',')} </p>

}

    </motion.div>
  </motion.div>
  )
}

export default Gluck
