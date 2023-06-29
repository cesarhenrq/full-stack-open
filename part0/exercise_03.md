# New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of the browser: The browser sends the note to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    deactivate server
```
