import { nanoid } from "nanoid";

export function generateCode() {
  return nanoid(6);  // 6–8 chars allowed
}
