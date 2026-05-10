import React, { useContext } from 'react'
import book from '../assets/book.jpg';
import { Link, useLocation} from 'react-router-dom';
import useTheme from '../hooks/useTheme.js';
import { useEffect,useState } from 'react';
import trash from '../assets/delete.svg';
import edit from '../assets/edit.svg';
import useFirestore from '../hooks/useFirestore.js';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { field } from 'firebase/firestore/pipelines';

export default function BookList() {

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let search = params.get('search')

    let{getCollection,deleteDocument}=useFirestore();
    let{user}=useContext(AuthContext);
    let{error,loading,data:books}=getCollection('books',['uid','==',user.uid],{
        field:'title',
        value:search
    });

    let deleteBook = async (e,id) => {//so in this functionn should be async 
        e.preventDefault();
        await deleteDocument('books',id);
    }
    //let { data: books, loading, error } = useFetch(`http://localhost:3000/books${search ? `?q=${search}` : ''}`);

    if (error) {
        return <p>{error}</p>
    }
    let {isDark} = useTheme();
    return (
        <div>
            {loading && <p>loading ... </p>}
            {/* book list */}
            {!!books && (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 my-3'>
                    {books.map((b) => (
                        <Link to={`/books/${b.id}`} key={b.id}>
                            <div className={`p-4 border border-1 min-h-[420px] rounded-lg ${isDark ? 'bg-dcard text-white border-violet-900' : 'bg-white'}`}>
                                <img src={book} alt="" />
                                <div className='text-center space-y-2 mt-3'>
                                    <h1>{b.title}</h1>
                                    <p>{b.description}</p>
                                    {/* genres */}
                                    <div className='flex flex-wrap justify-between'>
                                        <div>{b.categories.map(c => (
                                            <span key={c} className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-violet-800'> {c}</span>
                                        ))}
                                        </div>

                                        <div className='flex gap-2'>
                                            <Link to={`/edit/${b.id}`}><img src={edit}/></Link>
                                             <img src={trash} onClick={(e)=>deleteBook(e,b.id)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
             {books &&!books.length && <p className='text-center text-2xl text-gray-500'>No books found.</p> }
        </div>
    )
}

