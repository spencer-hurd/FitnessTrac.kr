import { useRef, useState } from "react";
import { registerUser, logInUser } from "../api/auth";
import { useUser } from "../state/context";
import { useNavigate } from "react-router-dom";

const AuthForm = ({closeModal}) => {
  const [isLogin, setIsLogin] = useState(0)
  const [rememberMe, setRememberMe] = useState(false)
  const {setToken, setUser} = useUser()
  let usernameRef = useRef()
  let passwordRef = useRef()
  let confirmRef = useRef()
  const navigate = useNavigate()

  //login - [0], reg - [1]
  const authPageData = {
    headerStr: ['No account? Click here to create one', 'Already have an account? Log in here'],
    headerBtn: ['Register', 'Sign in'],
    authPrompt: ['Login here bud','Register for our site here'],
    submitBtn: ['Log in', 'Sign up'],
    authFuncs: [logInUser, registerUser]
  }

  //toggles between reg and login screens
  const toggleAuthPage = () => {
    isLogin ? setIsLogin(0) : setIsLogin(1)
  }

  const comparePasswords = () => {
    return confirmRef.current.value === passwordRef.current.value
  }

  return (
    <div>
      <p>{authPageData.headerStr[isLogin]}</p>
      <button className="header-button" onClick={toggleAuthPage}>{authPageData.headerBtn[isLogin]}</button>
      <h2>{authPageData.authPrompt[isLogin]}</h2>
			<form
        className="auth-form"
				onSubmit={async (e) => {
					e.preventDefault();

          try {
            if(!isLogin || comparePasswords()) {
              const result = await authPageData.authFuncs[isLogin](usernameRef.current.value, passwordRef.current.value);
              setToken(result.token)
              setUser(result.user)
              //set localStorage on check box
              rememberMe ? localStorage.setItem('token', result.token) : null;
              rememberMe ? localStorage.setItem('user', JSON.stringify(result.user)) : null;
              closeModal()
              //bugged due to new react router features. setToken and setUser are not updated in time.
              //navigate('my-routines')
              navigate('welcome')
            } else {
              //make nicer
              alert('Passwords must match')
            }
          } catch (err) {
            throw err
          }
          
      }}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            ref={usernameRef}
            minLength={1}
            required={true}
            placeholder='username'
            />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            ref={passwordRef}
            minLength={8}
            required={true}
            placeholder='password'
            />
        </div>
        <div>{ isLogin===1 && (
          <>
            <label htmlFor="password">Confirm Password: </label>
            <input
              type="password"
              ref={confirmRef}
              minLength={8}
              required={true}
              placeholder='password'
              />
          </>
        )}</div>
        <input type='submit' value={authPageData.submitBtn[isLogin]} />
        <label htmlFor="remember">Remember Me</label>
        <input type="checkbox" onChange={() => { setRememberMe(!rememberMe) }}/>
      </form>
    </div>
  )
}

export default AuthForm