import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, { message: "Název musí mít alespoň 3 znaky" }).max(100),
  platform: z.string().min(1, { message: "Platforma je povinná" }),
  instructor: z.string().optional(),
  totalHours: z.number().min(1, { message: "Počet hodin musí být alespoň 1" }),
  spentHours: z.number().default(0),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  deadline: z.string().datetime().optional().nullable(), // Expect ISO string from JSON
  description: z.string().min(10, { message: "Popis musí mít alespoň 10 znaků" }),
  tags: z.string().optional().default("[]"), // Validating as string because DB stores JSON string
  resources: z.string().optional().default("[]"),
  notes: z.string().optional().default(""),
  category: z.string().optional(),
});

export type CourseInput = z.infer<typeof courseSchema>;
