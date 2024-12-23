import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
// import Success from "./alerts/Success"
// import { useSetCurrentUser } from "../contexts/CurrentUserContext"
// import ErrorAlert from "./alerts/ErrorAlert"
// import { axiosReq } from "../api/axiosDefaults"

function Login() {

  // const setCurrentUser = useSetCurrentUser()

  // code for successful user creation and redirection
  const navigate = useNavigate()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const location = useLocation()

  // will run whenever the location or navigate dependencies array is updated
  useEffect(() => {
    // checks if there's a success message in the locations state
    if (location.state && location.state.showSuccess) {
      setShowSuccessMessage(true)
    }
  }, [location, navigate])


  // code for logging user in 

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: ""
  })

  // const { username, password } = loginInfo

  const [errors, setErrors] = useState(null)

  return (
    <div>
      <div
        className="mx-auto my-8 grid grid-cols-3 gap-6 lg:pr-3 md:pr-3 grow-0 w-8/12 rounded-lg border-4 border-solid border-orchid-500 bg-orchid-50 shadow"
      >
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

            <div className="mt-10">
              <form
                method="POST"
                // onSubmit={handleLogin}
                className="space-y-6">
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
                      // onChange={handleLoginData}
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
                      // onChange={handleLoginData}
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
                    className="flex w-full justify-center rounded-md bg-orchid-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orchid-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid-600">
                    Sign in
                  </button>
                </div>
              </form>

              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900">Not registered yet?</span>
                  </div>
                </div>

                <a href="signup"
                  className="text-center mt-6 flex w-full justify-center rounded-md border border-purple-600 bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-purple-700 shadow-sm hover:bg-orchid-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid-600">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login