import latinize from 'latinize';

export const createSlug = (str) => {
    return latinize(str).toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000000)
}