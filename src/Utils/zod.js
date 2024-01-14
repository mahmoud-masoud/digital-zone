import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title can't be empty"),
  description: z.string().min(1, "Description can't be empty"),
  price: z.number().min(1, "Price can't be empty or zero"),
  category: z.string().min(1, "Not a valid Category"),
  highlights: z.optional(
    z.array(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    ),
  ),
  images: z
    .array(z.string())
    .min(4, "At least 4 images is required for the product."),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export const signupValidationSchema = z.object({
  username: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginValidationSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(8, "Password is required"),
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const shippingInfo = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  address: z.string().min(10, "Address is too short"),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Not a number")
    .refine((value) => value.length === 11, {
      message: "Not a valid number must be 11 digits ",
    }),
  deliveryNotes: z.string().optional(),
});

export const creditCardFormSchema = z.object({
  "cc-number": z.string().refine((value) => /^\d{16}$/.test(value), {
    message: "Please enter a valid card number.",
  }),

  "cc-exp-month": z.number({
    required_error: "required",
    invalid_type_error: "required",
  }),

  "cc-exp-year": z.number({
    required_error: "required",
    invalid_type_error: "required",
  }),

  cvv: z
    .string()
    .min(3, "CVV")
    .max(3, "CVV")
    .refine(
      (value) => {
        if (value.length === 3) {
          const cvvNumber = parseInt(value);
          return !isNaN(cvvNumber);
        }
        return false;
      },
      {
        message: "Enter a 3 digit CVV code refine",
      },
    ),
});
