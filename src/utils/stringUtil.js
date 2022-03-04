export const returnWord = (word) => {
    return isWord(word) ? word : "Unknown"
}

export const returnString = (word) => {
    return isWord(word) ? word : ""
}

const isWord = (word) => {
    switch (word) {
        case null:
        case undefined:
        case "null":
        case "":
            return false
        default:
            return true
    }
}

//TODO documentation for this file