/**
 * checks if the param is a null representation or empty,
 * and returns the String "Unknown" if it is.
 * 
 * @param {String} word 
 * @returns {String}
 */
export const returnWord = (word) => isWord(word) ? word : "Unknown"

/**
 * checks if the param is a null representation,
 * and returns an empty String if it is.
 * 
 * @param {String} word 
 * @returns {String}
 */
export const returnString = (word) => isWord(word) ? word : ""

/**
 * Complexity- Time: O(1); Space: O(1)
 * 
 * @param {String} word
 * @returns {Boolean} {false} if the param is a null representation, or empty.
 */
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
