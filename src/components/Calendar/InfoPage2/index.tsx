"use client"
import { FC } from 'react'
import { Checkbox, Typography, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { boolean } from 'zod';

interface infoPage2Props {
    setObject: (value: string) => void;
    saveData: () => void;
    setAccepteConditions: (value: boolean) => void;
    accepteConditions: boolean;
    object: string,
    setCurrentPage: (value: number) => void;
    currentPage: number;
    openTerms: boolean;
    setOpenTerms: (value: boolean) => void;
}



const index: FC<infoPage2Props> = ({
    setObject,
    saveData,
    setAccepteConditions,
    accepteConditions,
    object,
    setCurrentPage,
    currentPage,
    openTerms,
    setOpenTerms
}) => {


    return (
        <div className='px-5 h-full flex flex-col justify-between pt-6'>
            <div className='h-full flex flex-col justify-between md:pb-12 '>
                <button 
                    onClick={() => {
                        if(currentPage === 3) {
                        setCurrentPage(2)
                        } else {
                        setCurrentPage(3)
                        }
                    }} 
                    className='bg-red-800 text-white inline-block w-max px-4 rounded-sm py-1'
                    ><AiOutlineArrowLeft className='w-4 h-4' />
                </button>

                <h3 className='text-lg font-bold'>Merci d'indiquer des informations permettant de vous contacter</h3>
                <div className="flex w-full md:w-96 flex-col gap-3">
                    {/* <Textarea size="md" label="Sujet du rendez-vous"  onChange={(e) => setObject(e.target.value)} value={object}/> */}
                    <label className='font-medium' htmlFor="object">Sujet de l'entretien</label>
                    <textarea name="object" id="object"
                    className='border rounded-md h-36 resize-none'
                    onChange={(e) => setObject(e.target.value)}
                    >{object}</textarea>
                </div>
                        {/* CGU / Politiques */}
                        {/* <Checkbox
                          label={
                            <Typography color="blue-gray" className="flex font-medium">
                              J'accepte les 
                              <Typography
                                as="a"
                                href="#"
                                color="blue"
                                className="font-medium transition-colors hover:text-blue-700"
                              >
                                &nbsp;conditions d'utilisation
                              </Typography>
                              .*
                            </Typography>
                          }
                          crossOrigin="anonymous"
                          onChange={() => setAccepteConditions(!accepteConditions)}
                        /> */}
                        <div className='space-x-3 my-2 md:my-0'>
                          <input 
                          type="checkbox" 
                          className=''
                          id='terms'
                          name='terms'
                          onChange={() => setAccepteConditions(!accepteConditions)}
                          checked={accepteConditions}
                          />
                          <label htmlFor="terms" className='text-sm md:text-medium font-tight'>J'accepte les 
                          <button onClick={() => setOpenTerms(true) } className="text-sm md:text-medium transition-colors text-blue-300 hover:text-blue-700 underline" 
                          >&nbsp;conditions d'utilisation</button>*.</label>
                        </div>

                <div className='w-full flex mb-4'>
                          <button className='w-2/3 mx-auto py-3 rounded-xl bg-gradient-to-t 
                          from-indigo-300 to-indigo-600 text-white font-semibold
                          hover:opacity-80 transition-all duration-150 ease-in
                          '
                          onClick={()=> {
                            saveData();
                          }}
                          >Réserver</button>
                    </div>
            </div>
        </div>
    )
}

export default index;