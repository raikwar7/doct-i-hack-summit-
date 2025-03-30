import { Router } from "express"
import {doctorLogin, doctorRegister, searchDoctor} from "../controllers/doctor.controller.js"
import { logout, patientLogin, patientRegister, setRating } from "../controllers/patient.controller.js"
import isLoggedIn from "../controllers/isLoggedIn.controller.js"

const router = Router()

router.post("/doctorRegister", doctorRegister)
router.post("/doctorLogin", doctorLogin)
router.post("/patientRegister", patientRegister)
router.post("/patientLogin", patientLogin)
router.post("/searchDoctor", searchDoctor)
router.post("/isLoggedIn", isLoggedIn)
router.post("/rating", setRating)
router.get("/logout",logout)

export default router
