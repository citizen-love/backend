import * as functions from 'firebase-functions';


export default ({ database }) => functions.https.onRequest(async (req, res) => {
    const name = "CONTACT-INFORMATION: CREATE"
    console.log(name)
    res.status(200).send(name)
})