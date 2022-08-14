import bcrypt from "bcrypt";

export const hashOrComparePassword = async (password, hash = '') => {
    if (!hash) {
        return await bcrypt.hash(password, 10);
    }
    return await bcrypt.compare(password, hash);
}