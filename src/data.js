export const API_Key = 'AIzaSyAb5iB4xkAsVjP8VI1-kSqt75guD61K3uk';

export const value_converter = (value) => {
    if (value >= 1000000000) {
        return Math.floor(value / 1000000000) + "B"; 
    } else if (value >= 1000000) {
        return Math.floor(value / 1000000) + "M";
    } else if (value >= 1000) {
        return Math.floor(value / 1000) + "K";
    } else {
        return value; 
    }
};