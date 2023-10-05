"use client"
import { FC } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { generateGoogleCalendarLink } from '@/constants/formFunctions';

interface successPageProps {
    nom: string,
    prenom: string,
    mail: string,
    telephone: string,
    object: string,
    moyenCommunication: string;
    date: string;
    dateTime: Date | null;
}



const index: FC<successPageProps> = ({
    nom,
    prenom,
    mail,
    telephone,
    object,
    moyenCommunication,
    date,
    dateTime
}) => {
    
    // if(dateTime) {
    //     const googleCalendarLink = generateGoogleCalendarLink(dateTime, moyenCommunication, object);
    // }
   
    return (
        <div className='px-5 h-full flex flex-col justify-between pt-6'>
            <div className='h-full flex flex-col justify-between md:pb-12 space-y-3 md:space-y-0'>
            <div className='space-y-4'>
                <p className='bg-green-400 mb-4 py-2 text-center text-white'>Entretien enregistré avec succès !</p>
                <p className='font-bold text-lg pb-2'>Récapitulatif </p>
                <ul className='space-y-3 md:space-y-0'>
                    <li>Date: {date}</li>
                    <li>Nom: {nom}</li>
                    <li>Prénom: {prenom}</li>
                    <li>Mail: {mail}</li>
                    {telephone && <li>Téléphone: {telephone}</li>}
                    <li>Objet de l'entretien: {object}</li>
                    <li>Canal de communication: {moyenCommunication}</li>
                </ul>
            </div>
            <div className='w-full flex justify-between mb-4'>
                        <a target='_blank' href={generateGoogleCalendarLink(dateTime, moyenCommunication, object)} 
                        className='w-full md:w-2/3 mx-auto py-3 rounded-xl bg-gradient-to-t 
                        from-indigo-300 to-indigo-600 text-white font-semibold
                        hover:opacity-80 transition-all duration-150 ease-in
                        flex items-center gap-2 md:gap-0 justify-center md:justify-between px-3 md:px-6
                        '>
                          <AiFillPlusCircle className='w-5 h-5'/>
                          <span className='text-sm md:text-md'>Ajouter à l'agenda Google</span> 
                        </a>
                    </div> 
            </div>
        </div>
    )
}

export default index;