import React, { useState, useEffect } from 'react'
import Bubbles from './Bubbles'
import ColorList from './ColorList'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'

const BubblePage = () => {
  const history = useHistory()
  const [colorList, setColorList] = useState([])
  useEffect(() => {
    axiosWithAuth()
    .get('/colors')
    .then(res => setColorList(res.data))
    .catch(err => console.log(err))
  }, [])
  const handleSignOut = () => {
    localStorage.removeItem('token')
    history.push('/')
  }
  return (
    <>
      <button type='button' className='signOut' onClick={handleSignOut}>Sign Out</button>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  )
}

export default BubblePage
