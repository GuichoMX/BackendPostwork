--------------------------------------------------------- BOOKS ---------------------------------------------------------
### Insertar libro
```
mutation {
  insertBook(asin: "ASIN00001", title: "BackendAdvanced", author: "Luis", pages: 360) {
    asin, author, pages, title
  }
}

```

### Obtener todos los libros
```
query {
  getAllBooks {
    asin, author, pages, title
  }
}
```

### Obtener un libro
```
query {
  getBook(asin: "B0001244HBM") {
    asin, author, pages, title
  }
}
```

### Actualizar libro
``` 
mutation {
  updateBook(asin: "B0001244HBM", title: "typeScript") {
    title
  }
}

mutation {
  updateBook(asin: "ASIN00001", author: "LuisE") {
    author
  }
}
```

--------------------------------------------------------- LIVES ---------------------------------------------------------
### Insertar Live
```
mutation {
  insertLive(liveId: "00001", title: "PlayingWarzone", author: "Luis Escobedo", category: "Games") {
    liveId, title, author, category
  }
}

```

### Obtener todos los Lives
```
query {
  getAllLives {
    liveId, title, author, category
  }
}
```

### Obtener un Live
```
query {
  getLive(liveId: "00001") {
    liveId, title, author, category
  }
}
```

### Actualizar Live
``` 
mutation {
  updateLive(liveId: "00001", title: "newTitle") {
    title
  }
}

mutation {
  updateLive(liveId: "00001", author: "Luis") {
    author
  }
}
```

--------------------------------------------------------- USERS ---------------------------------------------------------

### Crear usuario
```
mutation {
  signUp(
    input: {
      name: "Beto"
      lastname: "Bedu"
      email: "beto@bedu.org"
      password: "b3T0P4$$w0rD"
      isAdmin: true
    }
  ) {
    id
    name
    email
  }
}
```

### Iniciar sesión
```
mutation {
  signIn(email: "escobedotrenado@gmail.com", password:"myPa$$w0rd")
}
```