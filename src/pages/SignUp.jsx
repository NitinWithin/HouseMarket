import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formdata, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = formdata

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredentials = await createUserWithEmailAndPassword
        ( auth,
          email,
          password)

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formdata}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', userCredentials.user.uid), formDataCopy)
      navigate('/')

    } catch (error) {
      toast.error("Something went wrong!")
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className="pageHeader">Welcome back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />

          <input
            type="email"
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'current-password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password?
          </Link>

          <div className="signUpBar">
            <p className="signUpText">SIGN UP</p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#fffff' width={'34px'} height='34px' />

            </button>
          </div>
        </form>


        {/* Google Oauth */}

        <Link to={'/sign-in'} className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp