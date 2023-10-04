import emailjs from "@emailjs/browser";

export const sendEmail = (
    nom: string, 
    prenom: string, 
    dateTomail: any,  // Correction : Passer la date en troisième position
    mail: string,    // Correction : Passer le mail en quatrième position
    object: string, 
    moyenCommunication: string,
    telephone: string
    ) => {
    emailjs.send(
        String(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID),
        String(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID),
        {
            from_name: [nom, prenom],
            to_name: "Karl",
            from_email: mail,
            to_email: "mimach.dev@gmail.com",
            message: [object, String(dateTomail), moyenCommunication, telephone],
        },
        String(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY),
    ).then((result) => {
        console.log(result.text)
    }, (error) => {
        console.log(error)
    })
}