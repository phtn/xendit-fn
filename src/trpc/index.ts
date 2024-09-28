// import { createCustomer } from "../sdk";
// import { asyncR } from "../utils/helpers";
// import { procedure, router } from "./init";
//
// const createProc = procedure.input(z.object({name: z.string()}))
//
// const x = router({
//   createCustomer: createProc.mutation(asyncR(createCustomer))
// })
//
// export const appRouter = router({
//   xendit: x
// })
//
// export type AppRouter = typeof appRouter
