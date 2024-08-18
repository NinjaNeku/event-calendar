import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getMonth } from '../util'
import GlobalContext from '../context/GlobalContext'

export default function SmallCalendar() {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())
  
    useEffect(() => {
      setCurrentMonth(getMonth(currentMonthIdx))
    }, [currentMonthIdx])

    const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } = useContext(GlobalContext)

    useEffect(() => {
        setCurrentMonthIdx(monthIndex)
    }, [monthIndex])

    const handlePrevMonth = () => {
        setCurrentMonthIdx(currentMonthIdx - 1)
      }
    
    const handleNextMonth = () => {
      setCurrentMonthIdx(currentMonthIdx + 1)
    }

    const getDayClass = (day) => {
        const format = "DD-MM-YY"
        const nowDay = dayjs().format(format)
        const currDay = day.format(format)
        const slcDay = daySelected && daySelected.format(format)
        if( nowDay === currDay ) {
            return 'bg-blue-500 rounded-full text-white'
        } else if(slcDay === currDay) {
            return 'bg-blue-100 rounded-full text-blue-600 font-bold'
        } else {
            return "";
        } 
    }

    return (
        <div className='mt-9'>
            <header className='flex justify-between'>
                <p className='text-gray-500 font-bold w-[130px]'>
                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
                </p>
                <button>
                    <span onClick={handlePrevMonth} className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                        chevron_left
                    </span>
                </button>
                <button>
                    <span onClick={handleNextMonth} className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                        chevron_right
                    </span>
                </button>
            </header>
            <div className='grid grid-cols-7 grid-rows-6'>
                {currentMonth[0].map((day, i)=>(
                    <span key={i} className='text-sm py-1 text-center'>
                        {day.format('dd').charAt(0)} 
                    </span>
                ))}
                {currentMonth.map((row, index)=>(
                    <React.Fragment key={index}>
                        {row.map((day, idx)=>(
                            <button 
                            key={idx} 
                            onClick={()=>{
                                setSmallCalendarMonth(currentMonthIdx)
                                setDaySelected(day)
                            }} 
                            className={`py-1 w-full ${getDayClass(day)}`}
                            >
                                <span className='text-sm'>
                                    {day.format('D')}
                                </span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
