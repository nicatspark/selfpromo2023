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
