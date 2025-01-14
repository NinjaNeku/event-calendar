import React, { useContext, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../context/GlobalContext'

export default function Day({ day, rowIdx }) {
  
  const [dayEvents, setDayEvents] = useState([])
  const {setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent} = useContext(GlobalContext);

  useEffect(()=>{
    const events = filteredEvents.filter((evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"))
    setDayEvents(events)
  }, [filteredEvents, day])


  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-500 text-white rounded-full w-7 ' : ''
  }

  return (
    <div className='border border-gray-200 flex flex-col'>
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && (
          <p className='text-xs mt-1'>
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div className="flex-1 cursor-pointer" onClick={()=>{
        setDaySelected(day);
        setShowEventModal(true);
      }}>
        {dayEvents.map((evt, idx)=>(
          <div 
            className={`${evt.label} p-1 mr-3 text-white text-sm rounded mb-1 truncate`}
            key={idx}
            onClick={()=>setSelectedEvent(evt)}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  )
}
