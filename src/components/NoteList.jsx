import React, { useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { useParams } from 'react-router-dom';
import trash from '../assets/delete.svg';
import edit from  '../assets/edit.svg'
import moment from 'moment';
import NoteForm from './NoteForm';

export default function NoteList() {

    let { id } = useParams();
    let { getCollection, deleteDocument } = useFirestore();
    let { error, data: notes, loading } = getCollection('notes', ['bookUid', '==', id]);
    let [editNote, setEditnote] = useState(null);

    let deleteNote = async (id) => {
        await deleteDocument('notes', id);
    }


    return (
        !!notes.length && (
            notes.map(note => (
                <div key={note.id} className='border-2 shadow-md p-3 my-3' >
                  <div className="flex justify-between items-start">

  {/* Left Side */}
  <div className="flex items-start gap-3">

    <img
      src="https://i.pinimg.com/236x/1e/36/29/1e362984abab52b4cf9aca681ab6155c.jpg"
      alt=""
      className="w-12 h-12 rounded-full object-cover"
    />

    {/* Name + Time + Text */}
    <div>
      <h3 className="font-semibold text-lg">
        Phyo Thinzar Soe
      </h3>

      {/* time below name */}
      <p className="text-gray-400 text-sm">
        {moment(note?.date?.seconds * 1000).fromNow()}
      </p>

      {/* note text */}
      <p className="mt-3 text-gray-700">
        {note?.text}
      </p>
    </div>

  </div>

  {/* Right Icons */}
  <div className="flex flex-col gap-2">
    <img
      src={edit}
      className="cursor-pointer w-5"
      onClick={() => setEditnote(note)}
    />

    <img
      className="cursor-pointer w-5"
      onClick={() => deleteNote(note.id)}
      src={trash}
    />
  </div>

</div>
                    <div className='mt-3 space-x-2'>
                        {editNote?.id !== note.id && note.body}
                        {editNote?.id === note.id && <NoteForm type="update" setEditnote={setEditnote} editNote={editNote} />}
                    </div>
                </div >
            ))
        )
    )
}