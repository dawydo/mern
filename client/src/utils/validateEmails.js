// Validate emails by find invalid emails
// Split emails by "," and delete empty spaces fith trim()

// emailregex.com to check for invalid emails
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => re.test(email) === false)

    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails} `
    }

    return; //If no invalid emails return nothing
}