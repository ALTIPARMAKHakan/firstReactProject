
import React, { useState } from 'react'

const LoginSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [wrongUsernameOrPass, setWrongUsernameOrPass] = useState(false)
  const [isRegisterPageShown, setIsRegisterPageShown] = useState(false)

  function LoginPage () {
    const [userData, setUserData] = useState({
      name: '',
      surname: '',
      username: '',
      password: ''
    })

    function login () {
      let gelenData
      if (userData.username !== '' && userData.password !== '') {
        gelenData = JSON.parse(localStorage.getItem(`${userData.username}`))
        if (gelenData.username === userData.username && gelenData.password === userData.password) {
          setIsLoggedIn(true)
          setWrongUsernameOrPass(false)
        } else {
          setIsLoggedIn(false)
          setWrongUsernameOrPass(true)
        }
      }
    }

    return (
      <>
        <input
          onChange={(e) => {
            setUserData({
              ...userData,
              username: e.target.value
            })
          }}
          placeholder='Username'>
        </input>
        <input
          onChange={(e) => {
            setUserData({
              ...userData,
              password: e.target.value
            })
          }}
          placeholder='Password'>
        </input>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <button
            id='login-button'
            onClick={() => login()}
          >Login</button>
          <button
            id='register-button'
            onClick={() => {
              setIsRegisterPageShown(true)
            }}
          >Register</button>
        </div>
        {isLoggedIn &&
          <span
            style={{
              fontSize: '12px',
              color: 'red'
            }}>You logged in!</span>}
        {wrongUsernameOrPass &&
          <span
            style={{
              fontSize: '12px',
              color: 'red'
            }}>Wrong username or pw</span>}
      </>
    )
  }

  function RegisterPage () {
    const [userData, setUserData] = useState({
      name: '',
      surname: '',
      username: '',
      password: ''
    })

    function registerUser () {
      if (userData.username !== '') localStorage.setItem(`${userData.username}`, JSON.stringify(userData))
      setIsRegisterPageShown(false)
    }

    return (
      <>
        <input
          onChange={(e) => {
            setUserData({
              ...userData,
              name: e.target.value
            })
          }}
          value={userData.name}
          placeholder='Name'>
        </input>
        <input
          onChange={(e) => {
            setUserData({
              ...userData,
              surname: e.target.value
            })
          }}
          placeholder='Surname'>
        </input>
        <input
          onChange={(e) => {
            setUserData({
              ...userData,
              username: e.target.value
            })
          }}
          placeholder='Username'>
        </input>
        <input
          onChange={(e) => {
            setUserData({
              ...userData,
              password: e.target.value
            })
          }}
          placeholder='Password'>
        </input>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => registerUser()} id='register-button'>Register</button>
          <button onClick={() => setIsRegisterPageShown(false)} id='register-button'>Back</button>
        </div>
      </>
    )
  }

  return isRegisterPageShown ? <RegisterPage /> : <LoginPage />
}

export default LoginSection
