import emailjs from "@emailjs/browser";
import { env } from "@/env.mjs";
export const sendEmail = (
    nom: string, 
    prenom: string, 
    dateTomail: any,  // Correction : Passer la date en troisième position
    mail: string,    // Correction : Passer le mail en quatrième position
    object: string, 
    moyenCommunication: string,
    telephone: string,
    ) => {
    emailjs.send(
        "service_lv9nhmr",
        "template_sj1e3oc",
        {
            from_name: [nom, prenom],
            to_name: "Karl",
            from_email: mail,
            to_email: "mimach.dev@gmail.com",
            message: [object, String(dateTomail), moyenCommunication, telephone],
        },
        "Xcr7qRSkyJZ0L5BJM"
    ).then((result) => {
        console.log(result.text)
    }, (error) => {
        console.log(error)
    })
}