import jwt from 'jsonwebtoken'
import Patient from '../models/patient.model.js';

const protectPatientRoutes = async (req,res,next) => {

    try {

        const token = await req.body.token;
        // const token = await req.cookies.jwt;
        // console.log(token)
        if(!token){
            return res.status(201).json({
                msg: "Unauthorized - No Token Provided"
            })
        }
        
        const {userId} = await jwt.verify(token,process.env.JWT_TOKEN);
        if(!userId){
            return res.status(201).json({
                msg: "Unauthorized - No Token Provided"
            })
        }

        const user = await Patient.findOne({
            _id: userId
        })
        
        if(!user){
            return res.status(201).json({
                msg: "You Can't Access that file!"
            })
        }

        // res.status(200).json({
        //     msg: "User identify"
        // })

        next();

    } catch (error) {
        // res.status(401).json({
        //     msg: "invalid signature"
        // })
        console.log("Error occure in the protectRoutes.js ====> " + error.message)
    }
}

export default protectPatientRoutes
