module.exports = {
    mongoURL: process.env.MONGO_URL,
    secretOrKey: process.env.SECRET_OR_KEY,
    whitelistedEmails: process.env.WHITELISTED_EMAILS.split(",")
};