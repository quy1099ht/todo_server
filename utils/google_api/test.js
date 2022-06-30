const fs = require('fs');
const path = require('path');
const sendMailService = require('./gmail');

const main = async () => {
    // const fileAttachments = [
    //     {
    //         filename: 'attachment1.txt',
    //         content: 'This is a plain text file sent as an attachment',
    //     },
    //     {
    //         path: path.join(__dirname, './attachment2.txt'),
    //     },
    //     {
    //         filename: 'websites.pdf',
    //         path: 'https://www.labnol.org/files/cool-websites.pdf',
    //     },

    //     {
    //         filename: 'image.png',
    //         content: fs.createReadStream(path.join(__dirname, './attach.png')),
    //     },
    // ];

    const options = {
        to: 'quy1099ht@gmail.com',
        replyTo: 'quy1099ht@gmail.com',
        subject: 'Hello Amit 🚀',
        text: 'This email is sent from the command line',
        // html: `<p>🙋🏻‍♀️  &mdash; This is a <b>test email</b> from <a href="https://digitalinspiration.com">Digital Inspiration</a>.</p>`,
        // attachments: fileAttachments,
        // textEncoding: 'base64',
        // headers: [
        //     { key: 'X-Application-Developer', value: 'Amit Agarwal' },
        //     { key: 'X-Application-Version', value: 'v1.0.0.2' },
        // ],
    };

    const messageId = await sendMailService(options);
    return messageId;
};


// main()
//     .then((messageId) => console.log('Message sent successfully:', messageId))
//     .catch((err) => console.error(err));