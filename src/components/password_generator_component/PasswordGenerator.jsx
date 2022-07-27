import React, { useState, useEffect } from 'react'
import './password_generator.css'
import { useSnackbar } from 'react-simple-snackbar'

const PasswordGenerator = () => {
  const [previousCharacter, setPreviousCharacter] = useState('')
  const [currentTitleIndex, setCurrentTitleIndex] = useState(4)
  const [password, setPassword] = useState(null)
  const [useSpecialCharacters, setUseSpecialCharacters] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [title, setTitle] = useState('Password generator')
  const [passwordLength, setPasswordLength] = useState(8)
  const [openSnackbar, closeSnackbar] = useSnackbar()

  const templateSpecialCharacters = ':;<=>?@!#$%&()*+/[]^_{|}'
  const templateNumbers = '0123456789'
  const templateAlphabets =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  const animateTitle = () => {
    // animate text by replacing each character with a different one every frame until the end of the string
    const titleArray = title.split('')
    const newTitle = titleArray
      .map((character, index) => {
        if (index === currentTitleIndex) {
          return template[Math.floor(Math.random() * template.length)]
        } else {
          return character
        }
      })
      .join('')
    setTitle(newTitle)
    setCurrentTitleIndex(currentTitleIndex + 1)
    if (currentTitleIndex === titleArray.length) {
      setCurrentTitleIndex(0)
    }
  }

  useEffect(() => {
    generatePassword()
    // setInterval(() => {
    //   animateTitle()
    // }, 500)
    // animateTitle2()
  }, [])

  const generatePassword = () => {
    var template = ''
    if(useSpecialCharacters) template += templateSpecialCharacters;
    if(useNumbers) template += templateNumbers;
    template += templateAlphabets;
    var password = ''
    for (let index = 0; index < passwordLength; index++) {
      var random = Math.round(Math.random() * (template.length - 1))
      console.log(random)
      password += template[random]
    }
    setPassword(password)
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    openSnackbar('Your password has been copied !')
  }

  return (
    <div className='parent'>
      <h1>{title}</h1>
      <div className='controls'>
        <div className='control'>
          <label htmlFor='password-length'>
            Password length : {passwordLength}
          </label>
          <input
            type='range'
            id='password-length'
            min={6}
            max={20}
            value={passwordLength}
            onChange={e => setPasswordLength(e.target.value)}
          />
        </div>
        <div className='control'>
          <label htmlFor='use-special-characters'>Special characters</label>
          <input
            type='checkbox'
            id='use-special-characters'
            checked={useSpecialCharacters}
            onChange={e => setUseSpecialCharacters(e.target.checked)}
          />
        </div>
        <div className='control'>
          <label htmlFor='use-numbers'>Numbers</label>
          <input
            type='checkbox'
            id='use-numbers'
            checked={useNumbers}
            onChange={e => setUseNumbers(e.target.checked)}
          />
        </div>
      </div>
      {password && (
        <div>
          <input
            type='text'
            className='input'
            value={password}
            readOnly
            onClick={() => {
              copyPassword()
            }}
          />
        </div>
      )}
      <small>Click on the password to copy it to your clipboard.</small>
      <button
        onClick={() => {
          generatePassword()
        }}
      >
        Generate password
      </button>
    </div>
  )
}

export default PasswordGenerator
