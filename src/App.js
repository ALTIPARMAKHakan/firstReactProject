import './App.css'
import Food from './components/Food.js'
import Cocktail from './components/Cocktail.js'
import Gluck from './components/Gluck.js'
import React, { useState, useRef, useEffect } from 'react'
import LoginSection from './components/LoginSection'
// import { pexelsFetchVideoURL } from './pexels/pexelsFetchVideoURL.js'

function App () {
  const videoLinks = {
    yilbasi: 'https://player.vimeo.com/external/492844763.hd.mp4?s=86e5a718169086ccfb237c1e51ed27d4c9715b36&profile_id=174&oauth2_token_id=57447761',
    renkler: 'https://player.vimeo.com/external/469190407.hd.mp4?s=beb98d009af48c83b6f417404baa28cdc3349c85&profile_id=175&oauth2_token_id=57447761',
    daktilo: 'https://player.vimeo.com/external/351743915.hd.mp4?s=bc71d51e20a7b1bcffd9c27dee5a13115c66f414&profile_id=172&oauth2_token_id=57447761'
  }

  const [showOverlay, setShowOverlay] = useState(true)
  const [shakeCSS, setShakeCSS] = useState('none')
  const [video, setVideo] = useState(null)
  const [showPiano, setShowPiano] = useState(false)
  const [menuStyles, setMenuStyles] = useState({
    background: 'rgb(2, 180, 250)'
  })

  const videoRef = useRef()

  useEffect(() => { videoRef.current?.load() }, [video])

  function selectMood (mood) {
    if (mood === 'coder') {
      setVideo(videoLinks.daktilo)
      setMenuStyles('rgb(255,0,0)')
    }
    if (mood === 'creative') {
      setVideo(videoLinks.renkler)
      setMenuStyles({ ...menuStyles, background: 'rgb(1,255,0)' })
    }
    if (mood === 'happy') {
      setVideo(videoLinks.yilbasi)
      setMenuStyles({ ...menuStyles, background: 'rgb(255,0,0)' })
    }
    setShowOverlay(false)
  }

  function overlayClick (event) {
    if (event.target.className === 'overlay') setShakeCSS('shake')
    setTimeout(() => { setShakeCSS('none') }, 500)
  }

  return (

    <div className="App">
      <div id='login-container'>
        <LoginSection />
      </div>

      <button className='pianoButton' onClick={() => setShowPiano(!showPiano)}>
        {showPiano ? 'Hide Piano' : 'Show Piano'}
      </button>
      <button className='themaButton' onClick={() => setShowOverlay(true)}>
        Thema Wechseln
      </button>

      {showOverlay && <div className='overlay' onClick={(event) => { overlayClick(event) }}>
        <div className={`overlay-center-div-${shakeCSS}`}>

          <button
            className='mood-button'
            onClick={() => { selectMood('coder') }}
          >🧐</button>
          <button
            className='mood-button'
            onClick={() => { selectMood('creative') }}
          >🛹</button>
          <button
            className='mood-button'
            onClick={() => { selectMood('happy') }}
          >🎅</button>

        </div>
      </div>
            }

      {<div className={`header-${showPiano ? 'show' : 'hide'}`}>
        <div className='white'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='white'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='white'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='white'></div>
        <div className='black'></div>
        <div className='white'></div>
      </div>}
      <div className="main-container">
        {video != null
          ? <video ref={videoRef} autoPlay muted loop>
            <source src={video} />
          </video>
          : null}

        <Food stiller={menuStyles} />
        <Cocktail stiller={menuStyles} />
        <Gluck stiller ={menuStyles} />
      </div>
    </div>
  )
}

export default App
