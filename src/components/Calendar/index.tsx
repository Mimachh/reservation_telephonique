"use client"
import { FC } from 'react'
import ReactCalendar from 'react-calendar'
import { useState, useEffect } from 'react'
import { format } from "date-fns"
import frLocale from 'date-fns/locale/fr';



import { INTERVAL, STORE_ClOSING_HOUR_AM_TIME, STORE_ClOSING_HOUR_PM_TIME, STORE_ClOSING_MINUTE_AM_TIME, STORE_ClOSING_MINUTE_PM_TIME, STORE_OPENING_AM_HOUR_TIME, STORE_OPENING_AM_MINUTE_TIME, STORE_OPENING_PM_HOUR_TIME, STORE_OPENING_PM_MINUTE_TIME } from '@/constants/config';

import { AiFillCheckCircle } from 'react-icons/ai';

import InfoPageContent from "./InfoPage"
import InfoPageContent2 from "./InfoPage2"
import SuccessPage from "./SuccessPage"
import { getTimes, tileDisabled } from '@/constants/formFunctions';
import DateInfo from './Creneaux';
import { api } from '@/utils/api';
import { sendEmail } from '@/constants/email';


interface indexProps {}
interface DateType {
    justDate: Date | null
    dateTime: Date | null
}


type Input = {
    nom: string,
    prenom: string,
    date: Date | null,
    mail: string,
    telephone: string | null,
    object: string,
    moyenCommunication: string,
    terms: boolean | false
}

const initialInput = {
    nom: "",
    prenom: "",
    date: null,
    mail: "",
    telephone: null,
    object: "",
    moyenCommunication: "",
    terms: false
}


const index: FC<indexProps> = ({}) => {
    const [resaArray, setResaArray] = useState<Date[]>([]);

    const getAllResaToDisabled = api.reservation.getAll.useQuery();
    getAllResaToDisabled.data?.forEach((inputDate: any) => {
        // console.log(new Date(inputDate.date ? inputDate.date : ""))
        const dateResa = new Date(inputDate.date ? inputDate.date : "");
        // console.log(dateResa);
        resaArray.push(dateResa);
    });

   

    const [isClient, setIsClient] = useState(false)
    const [date, setDate] = useState<DateType>({
        justDate: null,
        dateTime: null,
    });
    const [moyenCommunication, setMoyenCommunication] = useState('googleMeet');
    const [disabledTimes, setDisabledTimes] = useState<Date[]>([]);
    const [infoPage, setInfoPage] = useState(false)
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [mail, setMail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [object, setObject] = useState("");
    const [accepteConditions, setAccepteConditions] = useState(false);
    

    const [currentPage, setCurrentPage] = useState(1);

    // const d = [
    //     new Date('Tue Oct 24 2023 09:00:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 09:30:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 10:00:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 10:30:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 11:00:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 11:30:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 12:00:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 12:30:00 GMT+0200 (heure d’été d’Europe centrale)'),

    //     new Date('Tue Oct 24 2023 13:30:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 14:00:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 14:30:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 15:00:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 15:30:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 16:00:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Tue Oct 24 2023 16:30:00 GMT+0200 (heure d’été d’Europe centrale)'),
    //     new Date('Wed Oct 25 2023 14:30:00 GMT+0200 (heure d’été d’Europe centrale)'),
    // ]

  
    const times = getTimes(
        date.justDate,
        INTERVAL,
        STORE_OPENING_AM_HOUR_TIME,
        STORE_OPENING_AM_MINUTE_TIME,
        STORE_ClOSING_HOUR_AM_TIME,
        STORE_ClOSING_MINUTE_AM_TIME,
        STORE_OPENING_PM_HOUR_TIME,
        STORE_OPENING_PM_MINUTE_TIME,
        STORE_ClOSING_HOUR_PM_TIME,
        STORE_ClOSING_MINUTE_PM_TIME
    );

    
    const [dataToSave, setDataToSave] = useState<Input>(initialInput);

  


    const { mutateAsync: addResa, error } = api.reservation.addReservation.useMutation();
 
    const saveData = async () => {

        try {
          await addResa({
            nom,
            prenom,
            date: date.dateTime? date.dateTime : null,
            mail,
            object,
            moyenCommunication,
            terms: accepteConditions
          });
          setCurrentPage(5);

          sendEmail(
            nom,
            prenom,
            date.dateTime ? format(date.dateTime, "kk'h'mm 'le' dd/MM/yyyy", { locale: frLocale }) : "",
            mail,
            object,
            moyenCommunication,
            telephone,
          );
          // Réussi
          console.log("La réservation a été ajoutée avec succès");
        } catch (error: any) {
            console.log("err", error)

        }
      };


    if(currentPage === 1 ) {
        date.dateTime = null;
        date.justDate = null;
    }
    if(currentPage === 2 ) {
        date.dateTime = null; 
    }



    useEffect(() => {
      setIsClient(true)
      setDisabledTimes(resaArray);
    }, [])
    
    const resetDate = () => {
        // Réinitialise la date en affectant null
        setDate((prev) => ({...prev, justDate: null, dateTime: null}));
    }
    const revenir = () => {
        // Réinitialise la date en affectant null
        setDate((prev) => ({...prev, dateTime: null}));
        setInfoPage(false)
    }  

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      {isClient && (
        <div className='flex flex-col md:flex-row h-fit shadow-sm shadow-gray-200 rounded-2xl bg-white'>
        <div className='md:h-full bg-gray-300 w-full md:w-[300px] rounded-t-2xl md:rounded-l-2xl md:rounded-r-none p-4
        flex flex-col justify-between
        '>
            <div>
                <h1 className='font-bold text-xl pb-4'>Réserver un entretien téléphonique avec Karl</h1>
                {currentPage !== 5 ? (
                    <>
                    <p className='flex items-center gap-2'>
                        {date.justDate &&  <AiFillCheckCircle className='text-green-400 w-6 h-6' />  }
                        <span className={`${date.justDate ? "text-line-through" : ""}`}>Veuillez sélectionner un jour</span>
                    
                    </p>
                    {date.justDate &&   <span>Date sélectionnée : {format(date.justDate, 'dd/MM/yyyy', { locale: frLocale })}</span>  }

                    {date.justDate && 
                        <div>
                            <p className='flex items-center gap-2'>
                                {date.dateTime && <AiFillCheckCircle className='text-green-400 w-6 h-6' /> }
                                <span className={`${date.dateTime ? "text-line-through" : ""}`}>Veuillez sélectionner un horaire</span>
                            </p>
                            {date.dateTime && <span> {format(date.dateTime, "kk'h'mm", { locale: frLocale })}</span> }
                        </div>                
                    }
                    {date.dateTime &&
                        <div>
                            <p className='flex items-center gap-2'>
                            {/* <AiFillCheckCircle className='text-green-400 w-6 h-6' /> */}
                            <span>Saisir vos informations personnelles</span>
                            </p>
                        </div>
                    }
                    <div className=''>
                        {error && error.data?.zodError?.fieldErrors && (
                        <ul className='flex flex-col gap-2'>
                            {Object.keys(error.data.zodError.fieldErrors).map((fieldName) => (
                            <li key={fieldName} className=" text-red-600">
                                {error?.data?.zodError?.fieldErrors[fieldName]}
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>  
                    </>
                ): (
                <>
                </>
                )}
            </div>
                {(date.justDate && !date.dateTime) ? (
                    <div className='bg-green-400 text-white rounded-md py-3 text-center font-bold'>
                    <p className='flex flex-col'><span>Date sélectionnée :</span> <span>{format(date.justDate, 'dd/MM/yyyy', { locale: frLocale })}</span></p>
                    </div>
                ) : null}
                {(date.dateTime && date.justDate) ? (
                    <div className='bg-green-400 text-white rounded-md py-3 text-center font-bold'>
                    <p className='flex flex-col'><span>Date et heure sélectionnées : </span><span>{format(date.dateTime, "kk'h'mm 'le' dd/MM/yyyy", { locale: frLocale })}</span></p>
                    </div>
                ) : null} 
        </div>
        <div className='h-[500px] max-w-[100%] w-[450px] border rounded-b-2xl md:rounded-r-2xl md:rounded-l-none'>
        
            {currentPage === 1 && (
                <ReactCalendar
                minDate={new Date()}
                className="p-2 REACT-CALENDAR rounded-b-2xl md:rounded-r-2xl md:rounded-l-none"
                view='month'
                locale='fr-FR'
                onClickDay={(date) => {
                    setDate((prev) => ({...prev, justDate: date}));
                    setCurrentPage(2);
                }}  
                />
            )}

            {currentPage === 2 && (
                <DateInfo 
                date={date.justDate} 
                dateTime={date.dateTime} 
                times={times} 
                disabledTimes={disabledTimes}
                setInfoPage={setInfoPage}
                setDate={setDate}
                resetDate={resetDate}
                setCurrentPage={setCurrentPage}
                />
            )}

            {currentPage === 3 && (
                <InfoPageContent
                moyenCommunication={moyenCommunication}
                setMoyenCommunication={setMoyenCommunication}
                setNom={setNom}
                setPrenom={setPrenom}
                setMail={setMail}
                setTelephone={setTelephone}
                nom={nom}
                prenom={prenom}
                mail={mail}
                telephone={telephone}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                />
            )}

            {currentPage === 4 && (
                <InfoPageContent2 
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                saveData={saveData}
                setAccepteConditions={setAccepteConditions}
                accepteConditions={accepteConditions}
                setObject={setObject}
                object={object}
                />
            )}

            {currentPage === 5 && (
                <SuccessPage 
                dateTime={date.dateTime} 
                date={date.dateTime ? format(date.dateTime, "kk'h'mm 'le' dd/MM/yyyy", { locale: frLocale }) : ''}
                nom={nom}
                prenom={prenom}
                mail={mail}
                telephone={telephone}
                object={object}
                moyenCommunication={moyenCommunication}
                />
            )}
        </div>
        </div>
      )}
    </div>
  )
}


export default index;