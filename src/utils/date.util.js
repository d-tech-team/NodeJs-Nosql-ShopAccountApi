import moment from 'moment';

export const currentDate = () => {
    return moment().format('YYYY-MM-DD');
}

export const currentTime = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}
