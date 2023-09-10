import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseUrlToDomain(url: string) {
  const urlObj = new URL(url)
  return urlObj.hostname.replace('www.','')
}
