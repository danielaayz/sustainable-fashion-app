import { Plus, Shirt, User } from "lucide-react";

const profile_grid_items = [
   {
      name: "Add Items",
      detail: "Add new clothing items to your wardrobe",
      icon: <Plus className="w-12 h-12 text-[#3a5246]" />,
      cta_button: "Add New Item",
   },
   {
      name: "View Wardrobe",
      detail: "Explore your sustainable wardrobe collection",
      icon: <Shirt className="w-12 h-12 text-[#3a5246]" />,
      cta_button: "Open Wardrobe",
   },
   {
      name: "Your Profile",
      detail: "Manage your account and view stats",
      icon: <User className="w-12 h-12 text-[#3a5246]" />,
      cta_button: "View Profile",
   },
];

export default function Profile() {
   return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <article className="profile-title-heading mt-4 mb-4 text-left heading-wrapper bg-white">
            <h2 className="text-4xl p-2">Sustainable Fashion App</h2>
            <h3 className="text-lg p-2">
               Track and manage your sustainable wardrobe
            </h3>
         </article>
         <h1 className="text-5xl text-left mb-4">Hi, user.username!</h1>
         <h3 className="text-left mb-8">
            Welcome to your sustainable wardrobe manager. What would you like to
            do today?
         </h3>
         <div className="mx-auto">
            <ul
               role="list"
               className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
               {profile_grid_items.map((item) => (
                  <li
                     key={item.detail}
                     className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow w-full max-w-xs">
                     <div className="flex flex-1 flex-col p-8">
                        {/* Add flex, items-center, and justify-center */}
                        <div className="mx-auto size-32 shrink-0 rounded-full flex items-center justify-center">
                           {item.icon}
                        </div>
                        <h3 className="mt-6 text-m font-medium text-gray-900">
                           {item.name}
                        </h3>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                           <dd className="mt-3">
                              <span className="inline-flex items-center bg-green-50 px-2 py-1 text-sm font-medium text-green-700">
                                 {item.detail}
                              </span>
                           </dd>
                        </dl>
                     </div>
                     <div className="flex divide-x divide-gray-200">
                        <button className="text-linen flex w-full items-center justify-center rounded-bl-lg rounded-br-lg bg-mossy-green p-4 font-semibold">
                           {item.cta_button}
                        </button>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
}