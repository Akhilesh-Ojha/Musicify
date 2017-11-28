module.exports = {
    google : {
        clientID : '364964255074-417gn90l0c4d8bs7m3lfpav06bh540ds.apps.googleusercontent.com',
        clientSecret :'Ryb2MG-eFizzsH6pz5gKxO_b',
        callbackURL : 'http://localhost:3000/auth/google/callback'
    },
    session : {
        cookieKey : "agam"
    },
    crypto: {
        algorithm : 'aes-256-cbc',
        key : 'musicifypass'
    }
};