import zod from 'zod'

const bookingAuth = zod.object({
    date: zod.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)),
    slot: zod.string().nonempty("Required"),
    doctor_id: zod.string().nonempty("Required"),
    patient_id: zod.string().nonempty("Required"),
    status: zod.enum(["pending", "confirmed", "completed", "cancelled"]).default("pending"),
    reportfile: zod.string(),
}).required()

export default bookingAuth;