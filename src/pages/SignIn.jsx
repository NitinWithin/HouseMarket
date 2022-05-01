import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formdata, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formdata

  const navigate = useNavigate();

  const onChange = (e) => { 
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className="pageHeader">Welcome back!</p>
        </header>
        <form>
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

          <div className="signInBar">
            <p className="signInText">SIGN IN</p>
            <button className="signInButton">
              <ArrowRightIcon fill='#fffff' width={'34px'} height='34px' />

            </button>
          </div>
        </form>


        {/* Google Oauth */}

        <Link to={'/sign-up'} className='registerLink'>
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn