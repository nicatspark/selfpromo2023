---
layout: '../../layouts/SnippetPost.astro'
title: 'Regex patterns'
description: ''
pubDate: 'Jan 7 2023'
---

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

```javascript
html.replace(/<[^>]+>/gi, '')
```
