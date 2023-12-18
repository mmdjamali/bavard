import { twMerge, type ClassNameValue } from "tailwind-merge"
import { clsx } from "clsx"

export const cn = (...inputs: ClassNameValue[]) => clsx(twMerge(inputs))