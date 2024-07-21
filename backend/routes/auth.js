const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middlewares/authMiddleware");

//here we will get all the request as /api/auth/signup or /api/auth/signin


const authSignUpSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string(),
    lastName: zod.string()
})


router.post("/signup", async (req, res) => {
    const body = req.body;

    //{success} returns an object or we can do obj.success
    const {success} = authSignUpSchema.safeParse(body);

    if(!success){
        res.status(401).json({
            message: "Email already taken/ Incorrect inputs"
        })
        return;
    }

    //checking if Database already containing another user with same email id
    const existingUser = await User.findOne({
        email : body.email
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    //putting in mongoDb if the inputs are correct
    const dbUser = await User.create(body);

    const userId = dbUser._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);  

    res.json({
        message: "User created successfully",
        token: token
    })

});

const authSignInSchema = zod.object({
    email: zod.string().email(),
    password : zod.string().min(8)
});

router.post("/signin", authMiddleware, async (req, res) => {
    const body = req.body;

    const { success } = authSignInSchema.safeParse(body);
    if(!success){
        res.status(411).json({
            message:"Incorrect Inputs"
        })
        return;
    }
    const dbUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    
    if(dbUser){
        const token = jwt.sign({
            userId: dbUser._id
        }, JWT_SECRET)
        res.json({
            message: "Loged in successfully",
            token: token
        })
    return;
    }

    res.status(411).json({
        message:"Error while logging in"
    })
});



module.exports = router;