import RoundedButton from "./RoundedButton.tsx";
import { Link } from "react-router-dom";

export default function Homepage() {
   return (
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
         <div
            aria-hidden="true"
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
         />
         <div className="mx-auto max-w-7xl px-6 py-32 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
               <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
                  Sustainable Fashion Choices
               </h1>
               <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                  <p className="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                     Welcome to the school project made by students from Sundsgården Folkhögskola. 4 ladies have set about trying to bring more awareness around the sustainability of our fashion choices by providing information about the material make-up of our clothes. Come with us on our journey to grow our knowledge base and help shape the future of eco-aware fashion!
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                     <Link to="/login">
                        <RoundedButton>Let's go!</RoundedButton>
                     </Link>
                  </div>
               </div>
               <img
                  alt=""
                  src="/assets/images/logo.jpg"
                  className="mt-0 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover lg:max-w-none xl:row-span-2 xl:row-end-2"
               />
            </div>
         </div>
         <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
   );
}
