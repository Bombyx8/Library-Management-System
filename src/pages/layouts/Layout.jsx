import React, { useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../../components/NavBar.jsx'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import './style.css'
import useTheme from '../../hooks/useTheme.js'
import { useEffect } from 'react';

export default function Layout() {
  const location = useLocation()
  const nodeRef = useRef(null)
  let {isDark} = useTheme();
  useEffect(() => {
    let body=document.body;
    if(isDark) {
      //body class='bg-dbg text-white'
      body.classList.add('bg-dbg','text-white');
    }
    else{
      body.classList.remove('bg-dbg','text-white');

    }

  },[])
  return (
    <div className={isDark ? 'bg-dbg text-white min-h-screen' : 'bg-white min-h-screen'}>
      <NavBar />

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname}   // 🔥 required for route change
          timeout={300}
          classNames="fade"
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div ref={nodeRef} className="max-w-6xl mx-auto p-3">
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}