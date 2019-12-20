import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialColor = {
  color: '',
  code: { hex: '' },
}

const ColorList = ({ colors, updateColors }) => {
  console.log(colors)
  const [editing, setEditing] = useState(false)
  const [colorToEdit, setColorToEdit] = useState(initialColor)
  const [newColor, setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true)
    setColorToEdit(color)
  }

  useEffect(() => {
    console.log(editing, colorToEdit, newColor)
  }, [editing, colorToEdit, newColor])

  const saveEdit = async e => {
    e.preventDefault()
    await axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res =>
        updateColors(
          colors.map(color =>
            color.id === res.data.id ? (color = res.data) : color
          )
        )
      )
      .catch(err => console.log(err))
    setEditing(false)
  }

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => updateColors(colors.filter(color => color.id !== res.data)))
      .catch(err => console.log(err))
  }

  const addNew = async e => {
    e.preventDefault()
    await axiosWithAuth()
      .post('/colors', newColor)
      .then(res => updateColors(res.data))
      .catch(err => console.log(err))
    setNewColor(initialColor)
  }

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={e => {
                  e.stopPropagation()
                  deleteColor(color)
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addNew}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={e => setNewColor({ ...newColor, color: e.target.value })}
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setNewColor({
                ...newColor,
                code: { hex: e.target.value },
              })
            }
            value={newColor.code.hex}
          />
        </label>
        <div className='button-row'>
          <button type='submit'>save</button>
          <button type='reset' onClick={() => setNewColor(initialColor)}>cancel</button>
        </div>
      </form>
      <div className='spacer' />
    </div>
  )
}

export default ColorList
