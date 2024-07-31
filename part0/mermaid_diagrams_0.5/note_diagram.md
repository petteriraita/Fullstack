```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser,server: User writes a new note and clicks save

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    Server responds with accepting bytes
    server-->>browser: {"accepting bytes"}
    deactivate server
    
    Note right of browser: Browser processes the response and updates the UI without a full page reload

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server   

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that includes adding the new note to the page.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ..., { "content": "New note", "date": "2023-1-2" }]
    deactivate server

    Note right of browser: The browser executes the callback function that renders all the notes including the new one.
```
