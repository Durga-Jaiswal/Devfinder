
import { useEffect, useState } from "react"
import { FaLocationDot } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
export default function Card() {
    const [name, setName] = useState('');
    const [data, setData] = useState({
        login: 'octocat',
        followers: "13235",
        following: '9',
        public_repos: '8',
        avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
        bio:"",
        name:'The Octocat',
    })

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleClick = (event) => {
        event.preventDefault()
        setName("")
        console.log('Name entered:', name);

        if (name.trim() !== '') {
            fetch(`https://api.github.com/users/${name}`)
                .then(response => response.json())
                .then(data => { setData(data) })
        }


    };

    //logic to fetch user from github



    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };
    const formattedDate = formatDate(data.created_at);

    return (
        <>
            <div className="max-w-2xl mx-auto my-auto container my-10">
                <div className="text-2xl font-mono my-5 font-bold text-slate-200">devfinder</div>
                <form className="max-w-2xl mx-auto">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none  m-2">
                            <svg className="w-6 h-6 text-slate-200 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-14 text-lg text-slate-200 border border-slate-600 rounded-lg bg-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search UserName..." required value={name} onChange={handleChange} />
                        <button type="submit" className="text-slate-200 absolute end-2.5 bottom-2.5 bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="btn" onClick={handleClick}>Search</button>
                    </div>
                </form>
            </div>


            <div className=" max-w-2xl mx-auto grid grid-cols-3 grid-rows-4 gap-x-5 h-auto grid-cols-auto grid-rows-auto my-5 bg-slate-700 text-slate-200 p-5 border rounded-lg">
                <div className="row-span-4">
                    <img
                        className="p-1 border rounded-full"
                        src={data.avatar_url} />
                </div>
                <div>
                    <h1 className="text-xl font-bold mb-4">{data.name}</h1>
                    <p>@{data.login}</p>
                </div>
                <div>Joined {formattedDate}</div>
                <div className="col-span-2 p-2 text-lg font-medium h-auto auto-cols-max auto-rows-max border-t-4">{data.bio}</div>
                <div className="col-span-2 flex justify-around content-center bg-slate-800 p-5 border rounded-lg">
                    <span className="text-lg">Repos:
                        <div className="flex place-content-center pt-4">{data.public_repos}</div>
                    </span>
                    <span className="text-lg">Followers:
                        <div className="flex place-content-center pt-4">{data.followers}</div>
                    </span>
                    <span className="text-lg">Following:
                        <div className="flex place-content-center pt-4">{data.following}</div>
                    </span>
                </div>
                {/* <div className="col-span-2 flex flex-col justify-evenly">
                <div>
                    <FaLocationDot className="size-7 inline-block mr-4"/>{data.location}
                </div>
                <div>
                    <LuLink className="size-7 inline-block mr-4"/>{data.blog}
                </div>
            </div> */}

            </div>
        </>
    )

}