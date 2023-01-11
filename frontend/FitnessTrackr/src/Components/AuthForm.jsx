import { useRef, useState } from "react";
import { registerUser, logInUser } from "../api/auth";
import { useUser } from "../state/context";

const AuthForm = ({closeModal}) => {
  const [isLogin, setIsLogin] = useState(0)
  const [rememberMe, setRememberMe] = useState(false)
  const {setToken, setUser} = useUser()
  let usernameRef = useRef()
  let passwordRef = useRef()

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

  return (
    <div>
      <p>{authPageData.headerStr[isLogin]}</p>
      <button onClick={toggleAuthPage}>{authPageData.headerBtn[isLogin]}</button>
      <h2>{authPageData.authPrompt[isLogin]}</h2>
			<form 
        className="auth-form"
				onSubmit={async (e) => {
					e.preventDefault();

          try {
            const result = await authPageData.authFuncs[isLogin](usernameRef.current.value, passwordRef.current.value);
            setToken(result.token)
            setUser(result.user)
            //set localStorage on check box
            console.log(rememberMe)
            rememberMe ? localStorage.setItem('token', result.token) : null;
            rememberMe ? localStorage.setItem('user', JSON.stringify(result.user)) : null;
            closeModal()
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
        <input type='submit' value={authPageData.submitBtn[isLogin]} />
        <label htmlFor="remember">Remember Me</label>
        <input type="checkbox" onChange={() => { setRememberMe(!rememberMe) }}/>
      </form>
    </div>
  )
}

export default AuthForm