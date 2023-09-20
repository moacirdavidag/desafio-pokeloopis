export const saveRecord = (points) => {
    return points > localStorage.getItem('recorde') ? localStorage.setItem('recorde', points) : localStorage.getItem('recorde');
}