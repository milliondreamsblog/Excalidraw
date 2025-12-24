import express from "express"
import jwt  from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config"
import {createRoom, signUpSchema} from "@repo/common/types"
import {signInSchema} from "@repo/common/types"
import {prismaClient} from "@repo/backend-database/db"
import { authMiddleware } from "../src/middleware";
const app = express();
const router = express.Router()

router.post("/signUp", async (req, res) => {
  const parsed = signUpSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(411).json({
      message: "Invalid input",
    });
  }

  const { name, email, password, photo } = parsed.data;

  const existingUser = await prismaClient.user.findMany({
    where: { name },
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Username already exists",
    });
  }

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      password,
      photo,
    },
  });

  const token = jwt.sign(
    {
      userId: user.id,
      name: user.name,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return res.json({
    message: "New user signup successful",
    token,
  });
});


// const signInSchema = z.object({
//     username : z.string,
//     password : z.string
// })
router.post("/signIn", async (req, res) => {
  const parsed = signInSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(411).json({
      message: "Invalid credentials",
    });
  }

  const { name, password } = parsed.data;

  const user = await prismaClient.user.findMany({
    where: { name },
  });

  if (!user) {
    return res.status(411).json({
      message: "User doesn't exist",
    });
  }

  let token;

  if (user.password === password) {
    token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
  } else {
    return res.status(411).json({
      message: "Invalid credentials",
    });
  }

  return res.json({
    token,
  });
});


router.post("/create-room" , authMiddleware  , async (req ,res)=>{
    //db call
    const parsed = createRoom.safeParse(req.body);

    if(!parsed.success){
      res.status(411).json({
        message : "Invild roomID"
      })
    }

    const { name, password } = parsed.data; 
    
    const userId = req.userId;

    await prismaClient.room.create({
      data: {
        slug : name,
        adminId : userId
      }
    })

    res.json({
        roomId : 123
    })
} )

export default router;