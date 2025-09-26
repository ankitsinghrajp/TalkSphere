import {body, validationResult, param, query} from "express-validator";

export const validateHandler = (req, res, next)=>{
    const errors = validationResult(req);
    
    const errorMessages = errors.array().map((error)=> error.msg).join(", ");
 

    if(!errors.isEmpty()) return next(new Error(errorMessages));

   return next();
}

export const registerValidator = ()=> [
    body("name","Name is a required field!").notEmpty(),
    body("username","Username is required!").notEmpty(),
    body("bio","Bio is required!").notEmpty().notEmpty(),
    body("password","Password is required!").notEmpty(),
]

export const loginValidator = () =>[
    body("username","Username is required!").notEmpty(),
    body("password","Password is required!").notEmpty()
]

export const newGroupChatValidator = ()=>[
    body("name").notEmpty().withMessage("Name is required!"),
    body("members").notEmpty().withMessage("The members are required!").isArray({min:2,max:100}).withMessage("Members must be 2 - 100!")
]

export const addMemberValidator = ()=>[
    body("chatId","Chat Id is required!").notEmpty(),
    body("members").notEmpty().withMessage("Atleast one member is required").isArray({min:1,max:100}).withMessage("Atleast 1 member should be added!")
]

export const removeMemberValidator = ()=>[
    body("userId","User Id is missing!").notEmpty(),
    body("chatId","Chat Id is missing!").notEmpty(),
]

export const sendAttachementsValidator = ()=>[
    body("chatId","Chat Id is missing!").notEmpty(),
]

export const chatIdValidator = ()=>[
    param("id").notEmpty().withMessage("Chat Id is required!"),
    // query("page").notEmpty()
]

export const sendRequestValidator = ()=>[
    body("userId", "UserId is missing!").notEmpty()
]

export const acceptRequestValidator = ()=>[
    body("requestId","Request Id is missing!").notEmpty(),
    body("accept").notEmpty().withMessage("Accept is missing").isBoolean().withMessage("Accept must be a boolean!")
]

export const adminLoginValidator = ()=>[
    body("secretKey","The secret key is missing!").notEmpty(),
]
