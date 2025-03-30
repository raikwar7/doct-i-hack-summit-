import zod from "zod";

const patientAuth = zod.object({
  name: zod.string().nonempty("Required"),
  gmail: zod.string().email().nonempty("Required"),
  phone: zod.number(),
  age: zod.number(),
  disease: zod.string(),
  password: zod.string(),
  gender: zod.enum(["male", "female", "other"]),
  location: zod.enum([
    "Hyderabad",
    "Mumbai",
    "Pune",
    "Bangalore",
    "Kolkata",
    "Jaipur",
    "Chennai",
    "Ahmedabad",
    "Lucknow",
    "Delhi",
  ]),
});

export default patientAuth;
