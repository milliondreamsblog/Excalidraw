import express from "express"
import jwt  from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config"
import {signUpSchema} from "@repo/common/types"
import {signInSchema} from "@repo/common/types"
const app = express();
const router = express.Router()

router.post("/signUp" , async (req,res)=>{
    const parsed = signUpSchema.safeParse(req.body);
    if(!parsed.success){
        res.status(411).json({
            message : "inviald input"
        })
    }

    const existingUser = await userModel.findOne({
        username : req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message : "Username already exist"
        })
    }

    const user = await userModel.create(
        {
            username : req.body.username,
            firstname :  req.body.firstname,
            email : req.body.email
        }
    )

    const token = jwt.sign({
        user
    },JWT_SECRET)

    res.json({
        message : "New user signIn has happened",
        token :  token
    })

})

// const signInSchema = z.object({
//     username : z.string,
//     password : z.string
// })
router.post("/signIn" , async (req ,res)=>{

    const parsed = signInSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(411).json({
            message: "Invaild credential"
        })
    }

    const findUser = await userModel.find({
        username
    })

    if(!username){
        return res.status(411).json({
            message : "user dose'nt exits"
        })
    }

    let token;
    if(user.password === password) {
        const token = jwt.sign({
            userId : user._id , username : req.username
        })

    }else{
        res.status(411).json({
            message : "invaild Credential"
        })
    }



} )

router.post("/create-room" , async (req ,res)=>{
    //db call

    res.json({
        roomId : 123
    })
} )
