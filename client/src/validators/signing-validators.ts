import z, { regex } from "zod";

export const SignInSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required!")
    .min(5, "Username must contain atleast 5 characters")
    .max(30, "Username must not contain more than 30 characters")
    .regex(/^[a-zA-Z0-9_\.]{3,20}$/,"The username is invalid!"),
  password: z
    .string()
    .nonempty("Password is required!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must atleast 1 uppercase 1 lowercase and 1 digit and it should be 8 characters long!"
    ),
});

export const SignUpSchema = z.object({
       avatar: z
    .any()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files instanceof FileList,
      "Invalid file input"
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        files[0]?.size <= 2 * 1024 * 1024,
      "Max file size is 2MB"
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/jpeg", "image/png","image/jpeg", "image/webp"].includes(files[0]?.type),
      "Only JPG, PNG, or WEBP images are allowed"
    ),
  name: z
    .string()
    .nonempty("Full name is required!")
    .min(3, "The name must be atleast 3 characters long")
    .max(30, "The name must be less than 30 characters long"),
  username: z
    .string()
    .nonempty("Username is required!")
    .min(5, "Username must contain atleast 5 characters")
    .max(30, "Username must not contain more than 30 characteers")
    .regex(/^[a-zA-Z0-9_\.]{3,20}$/,"The username is invalid."),
  bio: z.string().optional(),
  password: z
    .string()
    .nonempty("Password is required!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must atleast 1 uppercase 1 lowercase and 1 digit and it should be 8 characters long!"
    ),
 
});
