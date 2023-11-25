---
layout: '../../layouts/BlogPost.astro'
title: 'How to send 50000 emails at once in queue node js'
description: ''
pubDate: 'Jan 30 2023'
heroImage: '/assets/blog/massmail.webp'
---

To send a large number of emails at once in Node.js, you can use a library like Nodemailer. Here’s an example of how you might do this:

Install the Nodemailer library using npm:

```js
npm install nodemailer
Import the Nodemailer library into your Node.js script:
const nodemailer = require('nodemailer');
Create a new Nodemailer transporter object that will be used to send the emails:
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 465,
  secure: true,
  auth: {
    user: 'username',
    pass: 'password'
  }
});
```

Create an array of email objects, where each object contains the information for a single email (e.g. recipient, subject, message):

```js
const emails = [
  {
    to: 'recipient1@example.com',
    subject: 'Email 1',
    text: 'This is the message for email 1.',
  },
  {
    to: 'recipient2@example.com',
    subject: 'Email 2',
    text: 'This is the message for email 2.',
  },
  // ...
]
```

Use a loop to send each email in the array using the transporter object:

```js
emails.forEach((email) => {
  transporter.sendMail(email, (error, info) => {
    if (error) {
      // handle error
    } else {
      // email sent successfully
    }
  })
})
```

Keep in mind that sending a large number of emails at once can take a long time, and it may be better to use a queue system to send the emails in smaller batches. You can use a library like [Bull](https://www.npmjs.com/package/bull) to do this.
