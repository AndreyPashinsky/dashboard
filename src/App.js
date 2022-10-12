import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Sidebar, ThemeSettings } from './components';
import { Metamask, Nfts, Community, Drops, EventsCalendar, TopCollections, CryptocurrencyRates, Help } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
    const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode, setCurrentColor, setCurrentMode } = useStateContext()

    useEffect(() => {
        const currentThemeMode = localStorage.getItem('themeMode')
        const currentThemeColor = localStorage.getItem('colorMode')
        
        if (currentThemeMode && currentThemeColor) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);
    
    return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000'}}>
                    <TooltipComponent content="Settings" position="Top">
                        <button onClick={() => {setThemeSettings(true)}} type="button" className="text-3xl p-3 hover:drop-shadow-xl hover: bg-light-gray text-white"
                        style={{ background: `${currentColor}`, borderRadius: "50% "}}>
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar />
                    </div>
                )}
                <div className={
                    activeMenu 
                        ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full'
                        : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'
                    }
                >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                        <Navbar />
                    </div>

                    <div>
                    {themeSettings && <ThemeSettings />}

                        <Routes>
                            <Route path="/metamask" element={<Metamask />} />
                            <Route path="/NFTs" element={<Nfts />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/drops" element={<Drops />} />
                            <Route path="/events%20calendar" element={<EventsCalendar />} />
                            <Route path="/top%20collections" element={<TopCollections/>} />
                            <Route path="/cryptocurrency%20rates" element={<CryptocurrencyRates />} />
                            <Route path="/help" element={<Help />} />
                        </Routes>
                    </div>
                </div> 
            </div>
        </BrowserRouter>
    </div>
  )
}

export default App