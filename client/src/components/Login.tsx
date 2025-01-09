import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'


function Login() {
  const navigate = useNavigate()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const location = useLocation()
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState<string | null>(null)

  useEffect(() => {
    if (location.state?.showSuccess) {
      setShowSuccessMessage(true)
      const timer = setTimeout(() => setShowSuccessMessage(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [location])

  const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors(null)

    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: loginInfo.username,
          password: loginInfo.password
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/profile')
      } else {
        setErrors(data.message)
      }
    } catch (error) {
      setErrors('Failed to connect to server')
    }
  }

  return (
    <div>
      <div className="mx-auto my-8 grid grid-cols-3 gap-6 lg:pr-3 md:pr-3 grow-0 w-8/12 rounded-lg border-4 border-solid border-orchid-500 bg-orchid-50 shadow">
        <div className="relative h-full flex-1 hidden lg:block md:block md:col-span-1 lg:col-span-2">
          <img
            className="inset-0 h-full w-full rounded-bl-sm rounded-tl-sm object-cover"
            src="../assets/images/hills.png"
            alt=""
          />
        </div>

        <div className="flex flex-1 flex-col justify-center px-4 py-12 lg:flex-none col-span-3 lg:col-span-1 md:col-span-2">
          <div className="mx-auto w-full max-w-sm">
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>

            {showSuccessMessage && (
              <div className="mt-4 text-green-600">
                Registration successful! Please log in.
              </div>
            )}

            {errors && (
              <div className="mt-4 text-red-600">
                {errors}
              </div>
            )}

            <div className="mt-10">
              <form onSubmit={handleLogin} method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >Username:</label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={loginInfo.username}
                      onChange={handleLoginData}
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >Password:</label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleLoginData}
                      value={loginInfo.password}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="text-purpleheart-600 h-4 w-4 rounded border-gray-300 focus:ring-orchid-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm leading-6 text-gray-700">
                      Remember me
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-gunmetalgray px-3 py-1.5 
                    text-sm font-bold leading-7 text-black 
                    shadow-lg hover:shadow-xl hover:bg-gray-700 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    focus-visible:outline-gunmetalgray border border-charcoal 
                    transform hover:-translate-y-0.5 transition-all duration-200"
       >
                     Sign in
                  </button>
                </div>
              </form>

              <div className="mt-10">
                <div className="relative">
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900">Not registered yet?</span>
                  </div>
                </div>

               <Link to="/register"
            className="flex w-full justify-center rounded-md bg-lightgray px-3 py-1.5 
            text-sm font-semibold leading-6 text-black 
            shadow-lg hover:shadow-xl hover:bg-gray-700 
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-lightgray border-2 border-gunmetalgray 
            transform hover:-translate-y-0.5 transition-all duration-200"
>                            Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login