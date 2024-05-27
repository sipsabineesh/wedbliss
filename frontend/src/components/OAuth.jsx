import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useGoogleAuthMutation } from '../redux/user/userApiSlice'
import {useDispatch} from 'react-redux'
import { loginSuccess} from '../redux/user/userSlice'


export default function OAuth() {
    const [googleAuth] = useGoogleAuthMutation();
    const dispatch = useDispatch()
     
    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            const res = await googleAuth({username:result.user.displayName,email:result.user.email,profilePhoto:result.user.photoURL})
            dispatch(loginSuccess( res.data))
        } catch (error) {
            console.log("could not sign in with Google  ",error)   
        }
    }
  return (
   <> 
    <button type="button" onClick={handleGoogleClick} className="btns mb-4 w-100">Continue with Google</button>
   </>
  )
}
