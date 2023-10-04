import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const isValidEmail = (value: string) => {
    // Utilisez une expression régulière pour vérifier l'adresse e-mail
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value);
  };

export const reservationRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
      return ctx.db.reservation.findMany({
        select: {
            date: true,
        }
      });
    }),

    addReservation: publicProcedure
    .input(
        z.object({
            nom: z.string().min(1, { message: "Le nom est obligatoire" }),
            prenom: z.string().min(1, { message: "Le prénom est obligatoire" }),
            date: z.date().nullable(),
            mail: z.string().refine(isValidEmail, {
              message: "Adresse e-mail invalide",
            }),
            object: z.string().min(1, { message: "L'objet de l'entretien est obligatoire" }),
            moyenCommunication: z.string().min(1, { message: "Le moyen de communication est obligatoire" }),
            terms: z.boolean().refine(value => value === true, { message: "Vous devez accepter les termes et conditions" }),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { nom, prenom, date, mail, object, moyenCommunication, terms } = input

        const reservationItem = await ctx.db.reservation.create({
            data: {
                nom,
                date,
                prenom,
                mail,
                object,
                moyenCommunication,
                terms
            }
            // data: input,
        })

        return reservationItem
    }),
  });