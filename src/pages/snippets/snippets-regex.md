---
layout: '../../layouts/SnippetPost.astro'
title: 'Regex patterns'
description: ''
pubDate: 'Jan 7 2023'
---

Regex are extremly poweful but there is some truth to the old saying: You had one problem and found out you could solve it with regex and now you have two problems.

##### Lookahead assertion

User want to escape ':' and '.' in
[ab:1.2:ef]='12.3' => [ab\:1\.2\:ef]='12.3'

```javascript
result = subject.replace(/([:.])(?=[^[\]]*\])/g, '\\$1')
```

```text

([:.])      Match and remember a dot/colon,
(?=         only if it is followed by:
[^[\]]\*    any number of characters excluding brackets,
\]          followed by a closing bracket.
)           End of lookahead assertion.
```

##### Replace tags

Very useful when you modify this depending on your needs.

```javascript
html.replace(/<[^>]+>/gi, '')
```

##### Email regex

Probably the most googled regex. No one knows what the ultimate regex for email is. But here are some.
Just make sure users ae not stuck if you use a loose one.

The long one (not the longest by far):

```text
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

The short one:

`/^\S+@\S+\.\S+$/`

Somewhere inbetween:

`^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`
or
^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)_@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)_$
etc...

##### Target a tag with a attribute as backreference

```regex
(<svg[^>]+(xmlns="[^"]*")[^>]*>)
```

...or if double or single qoutes are optional:

```regex
(<svg[^>]+(xmlns=["'][^("|')]*["'])[^>]*>)
```
