import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
   const navigate = useNavigate();
   const [signupInfo, setSignupInfo] = useState({
      name: "",  // Change from username to name
      email: "",
      password1: "",
      password2: "",
   });

   const [errors, setErrors] = useState<string | null>(null);

   const handleSignupData = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignupInfo({
         ...signupInfo,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('hjjkk');
      e.preventDefault();

      if (signupInfo.password1 !== signupInfo.password2) {
         setErrors('Passwords do not match');
         return;
      }

      try {
         const response = await fetch('http://localhost:3001/api/users/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               name: signupInfo.name,  // Send name, not username
               email: signupInfo.email,
               password: signupInfo.password1,
            }),
         });

         const data = await response.json();
         
         if (response.ok) {
            // If successful, navigate to the login page
            navigate('/login');
         } else {
            // Display error message from the server
            setErrors(data.message || 'Something went wrong. Please try again.');
         }
      } catch (error) {
         console.error('Error:', error);
         setErrors('Failed to connect to server');
      }
   };

   return (
    <>
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
                No account? No problem!
             </h2>
             <p className="py-2">Just sign up below:</p>

      <form onSubmit={handleSubmit} method="POST" className="space-y-6">
         <div>
            <label
               htmlFor="email"
               className="block text-sm font-medium leading-6 text-gray-900"
            >
               Email:
            </label>
            <div className="mt-2">
               <input
                  id="email"
                  name="email"
                  type="email"
                  value={signupInfo.email}
                  onChange={handleSignupData}
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
            </div>
         </div>
         <div>
            <label
               htmlFor="name"
               className="block text-sm font-medium leading-6 text-gray-900"
            >
               Name:
            </label>
            <div className="mt-2">
               <input
                  id="name"
                  name="name"  // Changed to name
                  type="text"
                  value={signupInfo.name}  // Changed to name
                  onChange={handleSignupData}
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
            </div>
         </div>
         <div>
            <label
               htmlFor="password1"
               className="block text-sm font-medium leading-6 text-gray-900"
            >
               Password:
            </label>
            <div className="mt-2">
               <input
                  id="password1"
                  name="password1"
                  type="password"
                  value={signupInfo.password1}
                  onChange={handleSignupData}
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
            </div>
         </div>
         <div>
            <label
               htmlFor="password2"
               className="block text-sm font-medium leading-6 text-gray-900"
            >
               Confirm your password:
            </label>
            <div className="mt-2">
               <input
                  id="password2"
                  name="password2"
                  type="password"
                  value={signupInfo.password2}
                  onChange={handleSignupData}
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
            </div>
         </div>

         {errors && (
   <div className="text-red-500 text-sm">{errors}</div>  // Display error message
)}
         <div>
         <button
              className="flex w-full justify-center rounded-md bg-gunmetalgray px-3 py-1.5 
                    text-sm font-bold leading-7 text-black 
                    shadow-lg hover:shadow-xl hover:bg-gray-700 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    focus-visible:outline-gunmetalgray border border-charcoal 
                    transform hover:-translate-y-0.5 transition-all duration-200">

               Sign up
            </button>
         </div>
      </form>
      <div className="mt-10">
                     <div className="relative">
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                              Already registered?
                        </div>
                     </div>

                     <a
                        href="login"
                           className="flex w-full justify-center rounded-md bg-lightgray px-3 py-1.5 
                                 text-sm font-semibold leading-6 text-black 
                                 shadow-lg hover:shadow-xl hover:bg-gray-700 
                                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                                 focus-visible:outline-lightgray border-2 border-gunmetalgray 
                                 transform hover:-translate-y-0.5 transition-all duration-200"
>                
                        Sign in
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}