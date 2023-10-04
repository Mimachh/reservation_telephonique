import { FC } from 'react'
import { Input, Radio } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from 'react-icons/ai'

interface infoPageProps {
  moyenCommunication: string;
  setMoyenCommunication: (value: string) => void;
  setNom: (value: string) => void;
  setPrenom: (value: string) => void;
  setMail: (value: string) => void;
  setTelephone: (value: string) => void;

  nom: string,
  prenom: string,
  mail: string,
  telephone: string,
  setCurrentPage: (value: number) => void;
  currentPage: number;
}



const index: FC<infoPageProps> = ({
  setMoyenCommunication,
  setNom,
  setMail,
  setPrenom,
  setTelephone,
  nom,
  prenom,
  mail,
  telephone,
  moyenCommunication,
  setCurrentPage,
  currentPage,
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
           ><AiOutlineArrowLeft className='w-4 h-4' /></button>
              <h3 className='text-lg font-bold'>Merci d'indiquer des informations permettant de vous contacter</h3>
                  <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                      <Input variant="standard" label="Nom" crossOrigin="anonymous" required onChange={(e) => setNom(e.target.value)} value={nom}/>
                      <Input variant="standard" label="Prénom" crossOrigin="anonymous" required onChange={(e) => setPrenom(e.target.value)} value={prenom}/>
                  </div>

                  {/* Mail required*/}
                  <div>
                      <Input variant="standard" label="Mail" type='email' crossOrigin="anonymous" required onChange={(e) => setMail(e.target.value)} value={mail} />

                  </div>
                  
                  {/* Checkbox téléphone ou google meet */}
                  {/* Numéro */}
                
                  <div>
                    <label htmlFor="moyen_communication" className='text-md font-normal'>Par quel moyen souhaitez-vous être contacté?*</label>
                    <div className="w-full flex justify-start gap-3">
                      <Radio
                        name="moyen_communication"
                        label="Téléphone"
                        ripple={true}
                        crossOrigin="anonymous"
                        checked={moyenCommunication === 'telephone'} // Vérifie si "Téléphone" est sélectionné
                        onChange={() => setMoyenCommunication('telephone')} // Met à jour l'état lorsque "Téléphone" est sélectionné
                      />
                      <Radio
                        name="moyen_communication"
                        label="Google Meet"
                        ripple={true}
                        crossOrigin="anonymous"
                        checked={moyenCommunication === 'googleMeet'} // Vérifie si "Google Meet" est sélectionné
                        onChange={() => setMoyenCommunication('googleMeet')} // Met à jour l'état lorsque "Google Meet" est sélectionné
                      />
                    </div>

                    {/* Affiche l'Input si "Téléphone" est sélectionné */}
                    {moyenCommunication === 'telephone' && (
                      <div className='w-1/2'>
                        <Input variant="standard" label="Téléphone" type='tel' crossOrigin="anonymous"  onChange={(e) => setTelephone(e.target.value)} value={telephone}/>
                      </div>
                    )}
                  </div>      
              </div>
             <div>
                <div className='w-full flex mb-4'>
                  <button onClick={() => setCurrentPage(4)} className='w-2/3 mx-auto py-3 rounded-xl bg-gradient-to-t 
                  from-indigo-300 to-indigo-600 text-white font-semibold
                  hover:opacity-80 transition-all duration-150 ease-in
                  '>Suivant</button>
                </div>   
             </div>       
        </div>
    )
}

export default index;