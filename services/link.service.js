import { generateCode } from "../utils/codeGenerator.js";
import { findByCode, createLink } from "../models/link.model.js";

export async function createShortLinkService({ url, code }) {

  // If user didn't provide a code → generate one
  if (!code) {
    code = generateCode();
  }

  // Check duplicates
  const existing = await findByCode(code);
  if (existing) {
    throw {
      status: 409,
      message: "Short code already exists"
    };
  }

  // Create link
  return await createLink({ code, url });
}
