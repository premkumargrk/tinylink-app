// import * as yup from "yup";

// export const createLinkSchema = yup.object({
//   url: yup.string().url().required(),
//   code: yup
//     .string()
//     .matches(/^[A-Za-z0-9]+$/, "Code must be alphanumeric")
//     .min(6)
//     .max(8)
//     .optional()
// });


const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

const validateCode = (code) => {
    return CODE_REGEX.test(code);
};

const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    for (let i = 0; i < 6; i++) {
        shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return shortCode;
};

module.exports = { validateCode, generateCode };