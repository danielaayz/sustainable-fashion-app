import { useState } from 'react'
import { Field, Label, Switch } from '@headlessui/react'

export default function Example() {
    const [agreed, setAgreed] = useState(false)

    return (
        <div className="bg-linen px-6 py-8 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">Get in touch!</h2>
                <p className="mt-2 text-lg/8 text-gray-600">Do you have any questions or suggestions about our features? We'd love to hear from you!</p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-6 max-w-xl">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6">
                    <div>
                        <label htmlFor="first-name" className="block text-sm/6 font-semibold text-black">
                            Name/Alias
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-dark-clay"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-black">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-dark-clay"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm/6 font-semibold text-black">
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-dark-clay"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 bg-dark-clay px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-mossy-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mossy-green"
                    >
                        Let's talk
                    </button>
                </div>
            </form>
        </div>
    )
};
