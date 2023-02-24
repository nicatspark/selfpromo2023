---
layout: '../../layouts/BlogPost.astro'
title: 'How to send mail with Astrojs'
description: ''
pubDate: 'Feb 23 2023'
#heroImage: '/placeholder-hero.jpg'
---

Or more specifically, how to send mail using nodemailer with a gmail account in a Astrojs project endpoint.

Forst create `HOST`, `EMAIL` and `PASS` environment variables.

```bash
HOST = "smtp.gmail.com"
EMAIL = "nicolas@hervy.se"
PASS = "******"
```

Host will contain `smtp.gmail.com` since we're using gmail. Email/pass contain the email account info you want to use from gmail. You will need to go to [gmail settings](https://www.google.com/settings/security/lesssecureapps) and allow "less secure" email apps to access. (You may wanna add a captcha to the form later after this.) Lets start with the client side contact page.

```html
<!-- pages/contact.astro -->
<form id="form" onsubmit="event => event.preventDefault();return false">
  <div class="columns">
    <fieldset>
      <label for="name">Name<sup>*</sup></label>
      <input type="text" id="name" value="" />
    </fieldset>
    <fieldset>
      <label for="surname">Surname</label>
      <input type="text" id="surname" value="" />
    </fieldset>
  </div>
  <fieldset>
    <label for="email">Email<sup>*</sup></label>
    <input type="email" id="email" value="" />
  </fieldset>
  <fieldset>
    <label for="subject">Subject<sup>*</sup></label>
    <input type="text" id="subject" value="" />
  </fieldset>
  <fieldset>
    <label for="message">Message<sup>*</sup></label>
    <textarea id="message"></textarea>
  </fieldset>
  <fieldset>
    <label for="tel">Phone number</label>
    <input type="tel" id="tel" value="" />
  </fieldset>
  <button type="submit">Submit</button>
</form>
```

On the same page withing `script` tags with is:inline as attribute `<script is:inline> ... </script>` for it to be available on the client side add this script _below_ the form. (Below because I could not get `window.onload` to kick things of for some reason)

```javascript
const get = (id) => document.getElementById(id) || { value: '' }

const submitForm = () => {
  saveInput()
  sendmail()
}

// save and retrieve generic formdata from localstorage
const getFormData = () => {
  const store = Object.create(null)
  store.name = get('name')?.value
  store.surname = get('surname')?.value
  store.email = get('email')?.value
  store.tel = get('tel')?.value
  store.subject = get('subject')?.value
  store.message = get('message')?.value
  return store
}

const saveInput = () => {
  const { message, subject, ...rest } = getFormData()
  localStorage.setItem('contactinfo', JSON.stringify(rest))
}

const retrieveInfo = () => {
  const store = JSON.parse(localStorage.getItem('contactinfo') || '{}')
  get('name').value = store.name || ''
  get('surname').value = store.surname || ''
  get('email').value = store.email || ''
  get('tel').value = store.tel || ''
}
// end: localstorage

// This kicks thing of, should really be on window.onload but...
const submitBtn = document.querySelector('[type="submit"]')
submitBtn?.addEventListener('click', submitForm)
retrieveInfo()
;[...document.querySelectorAll('input')][0]?.focus()
// window.onload = () => {} // don't know why this wont work

const sendmail = async () => {
  const { name, surname, email, tel, message, subject } = getFormData()
  const data = await fetch('/api/sendmail.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, surname, email, tel, message, subject }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .catch((err) => {
      console.log('Error', err)
      throw new Error('Network error.')
    })
  console.log(data) // Here is the response from backend
}
```

Now to create the endpoint add `sendmail.json.ts` to an `api` route in pages. Astro will ditch the ts suffix so you will call sendmail.json with a post request containing the form data serialized.

```typescript
// /pages/api/sendmail.json.ts
import type { APIRoute } from 'astro'
import nodemailer from 'nodemailer'

const emailTo = import.meta.env.EMAIL
const emailToPass = import.meta.env.PASS
const host = import.meta.env.HOST

export const post: APIRoute = async ({ request }) => {
  // console.log('request', request)

  if (request.headers.get('Content-Type') === 'application/json') {
    const formData = await request.json()
    const name = formData.name
    const surname = formData.surname
    const email = formData.email
    const tel = formData.tel
    const subject = formData.subject
    const message = `${formData.message}
    ----------------------------------------------------------------------
    From: ${name} ${surname} • email: ${email} • tel: ${tel}
    `
    const html = `<div style="margin: 20px auto;font-family: Helvetica, Verdana, sans-serif">${message.replace(
      /[\r\n]/g,
      '<br>'
    )}</div>`

    // sendmail
    let mailTransporter = nodemailer.createTransport({
      host,
      port: 587,
      secure: false,
      auth: {
        user: emailTo,
        pass: emailToPass,
      },
    })

    let mailDetails = {
      from: email,
      to: emailTo,
      subject: `${new URL(request.url).hostname}: ${subject}`,
      text: message,
      html,
    }

    let mailresult
    try {
      mailresult = await mailTransporter.sendMail(mailDetails)
    } catch (error) {
      console.log('******* Error: ', error)
    }
    console.log('Message sent: %s', mailresult?.messageId)

    // return endpoint response
    return new Response(JSON.stringify(mailDetails), {
      status: 200,
    })
  }
  return new Response(null, { status: 400 }) // if not a json request
}
```

It took a while until I figured out that it did not work on the Netlify server unless I switched the second argument callback to an await on the last sendmail function, and then error handled with a try catch of course.

[Astrojs documentation on endpoints](https://docs.astro.build/en/core-concepts/endpoints/)
[nodemailer](https://nodemailer.com/usage/using-gmail/)
