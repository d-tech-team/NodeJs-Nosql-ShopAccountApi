export const createSlug = (str) => {
    return `${str.toLowerCase().replace(/ /g, '-')}-${Math.floor(Math.random() * 100000000)}`;
}