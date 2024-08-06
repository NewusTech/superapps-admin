import z from "zod";

const LoginSchema = z.object({
  email: z
    .string({ message: "Email Tidak Boleh Kosong!" })
    .min(5, { message: "Email harus lebih dari 5 karakter" })
    .email({ message: "Email tidak valid" }),
  password: z
    .string({ message: "Password Tidak Boleh Kosong!" })
    .min(6, { message: "Password harus lebih dari 6 karakter" }),
});
