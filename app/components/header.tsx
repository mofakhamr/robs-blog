'use client'

import Image from "next/image";
import React from "react";

// Define the Header component
export default function Header() {
  interface menuStateObject {
    mobileNav: boolean,
    [key: string]: boolean;
  }

  // Define the menu items for easier rendering
  const mainMenu = [
    {
      name: "Pages", path: "#", children: [
        { name: "Charts", path: "/charts" },
        { name: "Jupyter Setup", path: "/jupyter-setup" },
      ]
    },
    { name: "Contact", path: "/contact" },
  ]

  // Create an object of type menuState so we can init useState
  const initState:menuStateObject = {mobileNav: false};
  {mainMenu.map((item, i) => {
    initState[i] = false;
  })}

  const [openMenus, toggleMenuOpen] = React.useState(initState);

  function handleMenuItem(menuId: string, arrowId: string) {
    //const currentState:menuStateObject = openMenus;
    const newOpenMenus:menuStateObject = {
      ...openMenus,
      [menuId]: !openMenus[menuId],
    };
    toggleMenuOpen(newOpenMenus);
    const arrowElement = document.getElementById(arrowId);
    if (arrowElement) {
      arrowElement.dataset.state = (openMenus[menuId]) ? 'closed' : 'open';
    }
  }

  return (
    <header className="z-5 sticky top-0 bg-[#4A5D5E] sm:flex sm:justify-between sm:items-center lg:px-32">

      {/*<!-- mobile button and logo -->*/}
      <div className="flex items-center justify-between p-0">

        <div>
          <a href="/" className='text-white'><Image
            className="dark-invert text-white m-2"
            src="/logo.png"
            alt="Main Logo"
            width={256}
            height={66}
            priority
          /></a>
        </div>
        <div className="text-sm relative sm:ml-40 text-white">&nbsp;</div>

        <div className="sm:hidden">
          <button onClick={() => handleMenuItem('mobileNav', 'x')} type="button" className="mr-5 block text-gray-300 focus:text-white focus:outline-none hover:text-white hover:font-bold">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path className={openMenus.mobileNav ? 'block' : 'hidden'} fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              <path className={!openMenus.mobileNav ? 'block' : 'hidden'} fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>

      </div>

      {/*<!-- Main Nav -->*/}
      <div className='text-white sm:text-sm/6 md:text-lg'>
        {/*<!-- Primary Nav -->*/}
        <nav className={`px-2 pt-2 pb-4 sm:mr-2 sm:flex sm:p-0 ${openMenus.mobileNav ? 'block' : 'hidden'}`}>
          <div className="sm:flex">
            <div>
            <a key="nmx" href="/" className='mainmenu sm:mt-16 px-2 py-1'>Home</a>
            </div>

            {mainMenu.map((item, i) => {
              const menuId = i + 1;
              const dataState = (!openMenus[menuId]) ? 'closed' : 'open';
              let hasChildren: JSX.Element | undefined;
              const children = (item.children) && item.children.map((child, si) => {
                hasChildren = <svg id={`arrow-id-${i+si}`} className={`arrow arr${dataState}`} data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" data-state={!dataState} aria-hidden={!openMenus[menuId]}><path fillRule="evenodd" clipRule="evenodd" d="M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z" fill="currentColor"></path></svg>
                return <div key={i + si} className="mainmenu m-1 mt-1 p-1 sm:p-1"><a href={child.path} className=''>{child.name}</a></div>;
              })
              return <div key={i}>
                <a href={item.path}
                  onClick={() => handleMenuItem(menuId.toString(), `arrow-id-${i}`)}
                  className='mainmenu mt-1 sm:mt-16 px-2 py-1 sm:ml-2'>
                  {item.name}
                  {hasChildren && hasChildren}
                </a>
                {hasChildren && <div className={openMenus[menuId] ? 'sm:fixed block bg-[#4A5D5E] ml-0 px-1' : 'hidden'}>{children}</div>}
              </div>;
            })}
          </div>
        </nav>
      </div>

    </header>

  );
}

