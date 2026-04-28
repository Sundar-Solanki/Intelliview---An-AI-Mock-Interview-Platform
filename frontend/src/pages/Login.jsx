import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, googleLogin, reset } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'
const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset())
    }

    if (isSuccess || user) {
      navigate('/');
      dispatch(reset())
    }


  }, [user, isError, isSuccess, message, navigate, dispatch])



  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {

      email,
      password
    }
    dispatch(login(userData))

  }

  const handleGoogleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      dispatch(googleLogin(credentialResponse.credential))
    } else {
      toast.error('Something went wrong. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500'></div>
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='w-full max-w-4xl bg-white sm:rounded-[2rem] shadow-2xl flex overflow-hidden h-full sm:h-auto'>
        
        {/* Left Side - Image/Branding (Hidden on mobile) */}
        <div className='hidden md:flex md:w-1/2 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-12 text-white flex-col justify-between relative overflow-hidden'>
          {/* Background Decorative Elements */}
          <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'></div>
          <div className='absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2'></div>

          <div className='relative z-10'>
            <h2 className='text-xs font-black uppercase tracking-[0.3em] text-pink-200 mb-2'>Intelliview</h2>
            <h1 className='text-4xl font-bold leading-tight mb-6'>Master Your Tech Interviews</h1>
            <p className='text-white/80 text-lg'>
              Join thousands of developers practicing with Intelliview
            </p>
          </div>
          
          <div className='relative z-10'>
            <div className='flex -space-x-4 mb-4'>
              {/* Dummy Avatar Circles */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-xs font-bold`}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className='text-sm text-white/80 font-medium'>Over 10,000+ mock interviews completed this month.</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className='w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center'>
          <div className='max-w-sm mx-auto w-full'>
            <div className='text-center md:text-left mb-8'>
              <h2 className='text-3xl font-black text-gray-900'>Welcome back</h2>
              <p className='text-gray-500 mt-2 text-sm'>Please enter your details to sign in.</p>
            </div>
            <form onSubmit={onSubmit} className='space-y-5'>
              <div className='space-y-1'>
                <label className='text-[10px] font-bold uppercase text-gray-400 ml-1'>Email</label>
                <input type="email" name="email" value={email} className='w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all text-sm' placeholder='sundar@gmail.com' onChange={onChange} required />
              </div>
              <div className='space-y-1'>
                <div className='flex justify-between items-center ml-1'>
                  <label className='text-[10px] font-bold uppercase text-gray-400'>Password</label>
                  <a href="#" className='text-[10px] font-bold text-fuchsia-600 hover:underline'>Forgot Password?</a>
                </div>
                <input type="password" name="password" value={password} className='w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all text-sm' placeholder='••••••••' onChange={onChange} required />
              </div>
              
              <button type="submit" disabled={isLoading} className='w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white p-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-pink-500/30 transition-all shadow-md mt-6 flex justify-center items-center h-12'>
                {isLoading ? (
                  <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white'></div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className='mt-8 mb-6 relative flex items-center justify-center'>
              <div className='border-t border-gray-200 absolute w-full'></div>
              <span className='bg-white px-4 text-xs font-bold text-gray-400 relative uppercase tracking-widest'>Or</span>
            </div>

            <div className="flex justify-center mb-8">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    toast.error('Google Login Failed');
                  }}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  width="100%"
                />
            </div>

            <p className='text-center text-sm text-gray-500'>
              Don't have an account? <Link to="/register" className='text-fuchsia-600 font-bold hover:underline'>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
