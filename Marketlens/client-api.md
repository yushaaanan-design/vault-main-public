---
up: "[[Marketlens]]"
tags: [marketlens]
---
# client/src/api.js
Every call to the server goes through one `request()` wrapper: sends the cookie, adds the `X-Requested-With` header, throws on 4xx/5xx (fetch does not), and tells the app to show Login on a 401.
Endpoints it wraps: [[api-contract]]. Used by [[client-screens]] and [[client-app]]. Why the header: [[security]].
