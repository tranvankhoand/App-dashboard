import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import './App.css';
import { Navbar, Footer, Sidebar, ThemeSetting } from './components/index'
import { Ecommerce, Orders, Calendar, Employees, Stacked, Line, Pyramid, Customers, Kanban, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages/index'
import { useStateContext } from './contexts/ContextProvider'

function App() {
  const { activeMenu,themeSetting,setThemeSetting,currentColor,
    setCurrentMode,currentMode,setCurrentColor } = useStateContext()
  
    useEffect(() =>{
      const currentThemeColor = localStorage.getItem('colorMode')
      const currentThemeMode = localStorage.getItem('themeMode')
      if (currentThemeColor && currentThemeMode) {
        setCurrentColor(currentThemeColor)
        setCurrentMode(currentThemeMode)
      }
    })

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
    <BrowserRouter>
      <div className="flex relative dark:bg-main-dark-bg"
      style={{backgroundColor:'rgba(228,231,232,1)'}}>
        <div className='fixed right-4 bottom-4' style={{ zIndex: '1'}}>
          <TooltipComponent content='Setting' position='top'>
            <button type='button' 
            style={{ background: currentColor, borderRadius: '50%' }} 
            onClick={() => setThemeSetting(true)}
            className='text-3xl p-3 hover:drop-shadow-xl hover:bg-white-gray text-white'>
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'><Sidebar /></div>
        ) : (
          <div className='w-0 dark:bg-secondary-dark-bg'>
            <Sidebar />
          </div>
        )}
        <div className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full
        ${activeMenu ? 'md:ml-72' : 'flex-2'}`
        }>
          <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
            <Navbar />
          </div>

          <div>
            {themeSetting && <ThemeSetting />}
            <Routes>
              {/* Dashboard */}
              <Route path='/' element={<Ecommerce />} />
              <Route path='/ecommerce' element={<Ecommerce />} />
              {/* Pages */}
              <Route path='/orders' element={<Orders />} />
              <Route path='/employees' element={<Employees />} />
              <Route path='/customers' element={<Customers />} />
              {/* App */}
              <Route path='/kanban' element={<Kanban />} />
              <Route path='/editor' element={<Editor />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/color-picker' element={<ColorPicker />} />
              {/* Charts */}
              <Route path='/line' element={<Line />} />
              <Route path='/area' element={<Area />} />
              <Route path='/bar' element={<Bar />} />
              <Route path='/pie' element={<Pie />} />
              <Route path='/financial' element={<Financial />} />
              <Route path='/colorMapping' element={<ColorMapping />} />
              <Route path='/pyramid' element={<Pyramid />} />
              <Route path='/stacked' element={<Stacked />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
