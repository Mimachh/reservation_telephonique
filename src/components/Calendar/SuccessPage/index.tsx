import { FC, useState, useEffect } from 'react'
import { Input, Radio,  Checkbox, Typography, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft, AiFillPlusCircle } from 'react-icons/ai'

interface successPageProps {
    nom: string,
    prenom: string,
    mail: string,
    telephone: string,
    object: string,
    moyenCommunication: string;
    setCurrentPage: (value: number) => void;
    currentPage: number;
}



const index: FC<successPageProps> = ({
    nom,
    prenom,
    mail,
    telephone,
    object,
    moyenCommunication,
    setCurrentPage,
    currentPage
}) => {


    return (
        <div className='px-5 h-full flex flex-col justify-between pt-6'>
            <div className='h-full flex flex-col justify-between md:pb-12 '>
            <>
                Récapitulatif de votre RDV:
                / {nom} / {prenom} / {mail} / {telephone} / {object} / {moyenCommunication}
                <button className=''>
               
                </button>
            </>
            <div className='w-full flex mb-4'>
                        <button onClick={() => setCurrentPage(4)} className='w-2/3 mx-auto py-3 rounded-xl bg-gradient-to-t 
                        from-indigo-300 to-indigo-600 text-white font-semibold
                        hover:opacity-80 transition-all duration-150 ease-in
                        flex items-center justify-between px-6
                        '>
                          <AiFillPlusCircle className='w-5 h-5'/>
                          <span>Ajouter à l'agenda Google</span> 
                        </button>
                    </div> 
            </div>
        </div>
    )
}

export default index;