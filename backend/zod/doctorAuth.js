import zod from "zod";

const doctorAuth = zod.object({
  name: zod.string().nonempty("Required"),
  gmail: zod.string().email().nonempty("Required"),
  phone: zod.number(),
  age: zod.number(),
  experience: zod.number(),
  qualification: zod.string(),
  licence: zod.string().nonempty("Required"),
  fee: zod.number(),
  password: zod.string(),
  specilization: zod.enum([
    "Dermatology",
    "Neurology",
    "Gastroenterology",
    "Immunology",
    "Pulmonology",
    "Orthopedics",
    "Endocrinology",
    "Hepatology",
    "Infectious Disease",
    "Urology",
    "Cardiology",
    "General Medicine",
    "Rheumatology",
    "Toxicology",
    "Vascular Surgery",
  ]),
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

export default doctorAuth;
