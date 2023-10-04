"use client"
import { tileDisabled } from '@/constants/formFunctions';
import { setDate, format } from 'date-fns';
import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import frLocale from 'date-fns/locale/fr';
import { AiOutlineArrowLeft } from 'react-icons/ai'
interface DateType {
    justDate: Date | null
    dateTime: Date | null
}

interface DateInfoProps {
    date: Date | null;
    dateTime: Date | null;
    times?: any;
    setInfoPage: (value: boolean) => void;
    setDate: React.Dispatch<React.SetStateAction<DateType>>; 
    disabledTimes?: any;
    resetDate: () => void;
    setCurrentPage: (value: number) => void;
}

const DateInfo: React.FC<DateInfoProps> = ({ date, dateTime, times, disabledTimes, setInfoPage, setDate, resetDate, setCurrentPage }) => {
    if (!date) {
        return null; // Rien n'est affiché si la date n'est pas sélectionnée
    }

    return (
        <div className='h-full relative flex flex-col pb-12 pt-6 px-5'>
            <button onClick={() => {
                resetDate();
                setCurrentPage(1)
            }} 
           className='bg-red-800 text-white inline-block w-max px-4 rounded-sm py-1'
           ><AiOutlineArrowLeft className='w-4 h-4' /></button>
            <div className='flex flex-wrap gap-2 px-12 items-center justify-center pb-36 pt-8'>
                {times?.map((time: any, i: any) => (
                    <div key={`time-${i}`} className=''>
                        <button 
                            type='button' 
                            onClick={() => {
                                setDate((prev) => ({...prev, dateTime: time}));
                                setInfoPage(true);
                                setCurrentPage(3)
                            }}
                            disabled={tileDisabled(time, disabledTimes)}
                            className='disabled:bg-gray-200 
                                disabled:text-gray-600
                                disabled:cursor-not-allowed 
                                inline-block  rounded-md 
                                font-semibold
                                bg-indigo-300 text-white px-2 py-3
                                hover:bg-indigo-600 transition-colors duration-200 ease-in w-[90px]'
                        >
                            {format(time, 'kk:mm', { locale: frLocale })}
                        </button>
                        
                    </div>
                
                ))}
            
            </div>
            <div className='absolute bottom-0 right-0 p-4'>
                <div className='flex items-center justify-center gap-2'>
                    <div className='h-5 w-5 bg-gray-200 rounded-full'/>
                    <small>Non disponible</small>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 p-4'>
                <div className='flex items-center justify-center gap-2'>
                    <div className='h-5 w-5 bg-indigo-300 rounded-full'/>
                    <small>Disponible</small>
                </div>
            </div>
        </div>
    );
};

export default DateInfo;
