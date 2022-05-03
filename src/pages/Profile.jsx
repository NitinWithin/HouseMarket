import { getAuth, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Profile() {
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)

  const [formdata, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email } = formdata

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async () => {

    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name // Same as name: name 

        })
      }
    } catch (error) {
      toast.error("Could not save the changes. Please try later")
    }
  }

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  return <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">My Profile</p>
      <button type='button' className='logout' onClick={onLogout}></button>
    </header>

    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p className="changePersonalDetails" onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => !prevState)
        }}>
          {changeDetails ? 'save' : 'change'}
        </p>
      </div>
      <div className="profileCard">
        <form>
          <input
            type="text"
            id='name'
            className={!changeDetails ? 'profileName' : 'profileNameActive'}
            disbled={!changeDetails}
            value={name}
            onChange={onChange} />

          <input
            type="text"
            id='email'
            className='profileEmail'
            disbled={true}
            value={email}
            onChange={onChange} />
        </form>
      </div>
    </main>
  </div>
}

export default Profile