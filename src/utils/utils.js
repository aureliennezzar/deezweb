export const secToDigit = (time) => {
    return `${('0' + ((time - (time % 60)) / 60)).slice(-2)}:${('0' + (time % 60)).slice(-2)}`
}