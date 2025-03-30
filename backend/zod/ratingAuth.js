import zod from 'zod'

const ratingAuth = zod.object({
    doctor_id: zod.string().nonempty("Required"),
    patient_id: zod.string().nonempty("Required"),
    rating: zod.number().min(1, "Minimum rating 1").max(5, "Max rating 5"),
    review: zod.string().nonempty("Required")
}).required()

export default ratingAuth;