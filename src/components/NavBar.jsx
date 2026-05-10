import React, { useContext, useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import useTheme from '../hooks/useTheme';
import lightIcon from '../assets/light.svg';
import darkIcon from '../assets/dark.svg';
import useSignout from '../hooks/useSignout';
import Register from './../pages/Register';
import { AuthContext } from '../contexts/AuthContext';


export default function NavBar() {
    let [search, setSearch] = React.useState('');
    let navigate = useNavigate();
    let { user } = useContext(AuthContext);
    let handleSearch = (e) => {
        navigate('/?search=' + search);
    };
    let { logout } = useSignout();

    let signOutUser = async () => {
        await logout()
        navigate('/login');
    }
    let {changeTheme,isDark } = useTheme();
   
  return (
        <nav className={`py-3 border border-b-1'} ${isDark ? 'bg-dbg text-white border-violet-900' : 'bg-white'}`}>
            <ul className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
                <li className='flex items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='search books...' className='outline-none px-2 py-1 rounded-md' />
                    <button onClick={handleSearch} className='text-white bg-gradient-to-r from-slate-600 via-purple-900 to-slate-600 px-3 py-1 rounded-2xl flex items-center gap-1'>
                     <span className="hidden md:block">Search</span>
                    </button>
                </li>
                <Link to="/" className='flex items-center gap-3 md:-ml-32 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>

                    <span className='text-2xl font-bold text-violet-500 hidden md:block'>
                        Book Store
                    </span>
                </Link>
                <li className='flex gap-3 items-center'>
                    {/* create book */}
                    <Link to='/create' className='text-white bg-gradient-to-r from-slate-600 via-purple-900 to-slate-600 px-3 py-2 rounded-2xl flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span className="hidden md:block">Create book</span>
                    </Link>
                    {/* profile image */}
                    <div className='w-11 h-11'>
                        <img src="https://i.pinimg.com/236x/1e/36/29/1e362984abab52b4cf9aca681ab6155c.jpg" alt="" className='w-full h-full rounded-full' />
                    </div>
                   <div className='cursor-pointer'>
  {isDark ? (
    <svg
      onClick={() => changeTheme('light')}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1.5M12 19.5V21M4.5 12H3m18 0h-1.5M5.636 5.636l-1.06-1.06m14.849 14.849l-1.06-1.06M5.636 18.364l-1.06 1.06m14.849-14.849l-1.06 1.06M12 7.5A4.5 4.5 0 1112 16.5 4.5 4.5 0 0112 7.5z"
      />
    </svg>
  ) : (
    <svg
      onClick={() => changeTheme('dark')}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-gray-800"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  )}
</div>
  <div className='space-x-3'>
        {!user &&
        <>
        <Link to={`/login`} className='border-2 border-violet-800 rounded-lg px-2 py-2 text-sm'>Login</Link>
        <Link to={`/register`} className='bg-violet-800 text-white rounded-lg px-2 py-2 text-sm'>Register</Link>
        </>
        }
        {!!user &&<button onClick={signOutUser} className='bg-red-800 text-white rounded-lg px-2 py-2 text-sm'>Logout</button>}
  </div>
                </li>
            </ul>
        </nav>

  
  )
}
