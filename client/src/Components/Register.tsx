import { useState } from "react"

export default function Signup() {

  // variable signupInfo, function setSignupInfo
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password1: "",
    password2: ""
  });

  return (
    <>
      <div
        className="mx-auto my-8 grid grid-cols-3 gap-6 lg:pr-3 md:pr-3 grow-0 w-8/12 rounded-lg border-4 border-solid border-orchid-500 bg-orchid-50 shadow">
        <div className="relative h-full flex-1 hidden lg:block md:block md:col-span-1 lg:col-span-2">
          <img className="inset-0 h-full w-full rounded-bl-sm rounded-tl-sm object-cover"
            src="../assets/images/group-people-are-standing-circle.jpg"
            alt="" />
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 py-12 lg:flex-none col-span-3 lg:col-span-1 md:col-span-2">
          <div className="mx-auto w-full max-w-sm">
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              No account? No problem!
            </h2>
            <p className="py-2">
              Just sign up below:
            </p>

            <form
              method="POST"
              className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >Password:
                </label>
                <div className="mt-2">
                  <input
                    id="password1"
                    name="password1"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >Confirm your password:
                </label>
                <div className="mt-2">
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orchid-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orchid-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid-600">
                  Sign up
                </button>
              </div>
            </form>

            <div className="mt-10">
              <div className="relative">
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">Already registered?</span>
                </div>
              </div>

              <a href="login"
                className="mt-6 text-center flex w-full justify-center rounded-md border border-purple-600 bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-purple-700 shadow-sm hover:bg-orchid-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid-600">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}