# Users API

This is a project to build the API for users of the Lab applications, generally school students.

## Diagramas

### POST /users

Sequence diagram of create user process.

```mermaid
sequenceDiagram
    participant Client
    participant Dto
    participant Controller
    participant UseCase
    participant Repository
    participant Database

    Client->>Dto: POST /users (user data) - validates the data
    Dto->>Controller: Valid user data
    Controller->>UseCase: createUser(user data)
    UseCase->>Repository: createUser(user data)
    Repository->>Database: INSERT user data
    Database-->>Repository: Insertion confirmation
    Repository-->>UseCase: User saved (user data)
    UseCase-->>Controller: User created (resposta de sucesso)
    Controller-->>Client: Response 201 Created (user data)
```

### GET /users

Sequence diagram of get all users process.

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant UseCase
    participant Repository
    participant Database

    Client->>Controller: GET /users
    Controller->>UseCase: getUsers()
    UseCase->>Repository: getUser(user data)
    Repository->>Database: QUERY all users
    Database-->>Repository: user list
    Repository-->>UseCase: user list
    UseCase-->>Controller: user list
    Controller-->>Client: Response 200 Success (user list)
```

### DELETE /users

Sequence diagram of delete user process.

```mermaid
sequenceDiagram
    participant Client
    participant Dto
    participant Controller
    participant UseCase
    participant Repository
    participant Database

    Client->>Dto: DELETE /users (user data) - validates the data
    Dto->>Controller: Valid user data
    Controller->>UseCase: deleteUser(user data)
    UseCase->>Repository: deleteUser(user data)
    Repository->>Database: REMOVE user data
    Database-->>Repository: Remove confirmation
    Repository-->>UseCase: User removed
    UseCase-->>Controller: User removed
    Controller-->>Client: Response 204 Removed
```

### UPDATE /users

Sequence diagram of update user process.

```mermaid
sequenceDiagram
    participant Client
    participant Dto
    participant Controller
    participant UseCase
    participant Repository
    participant Database

    Client->>Dto: PATCH /users (user data) - validates the data
    Dto->>Controller: Valid user data
    Controller->>UseCase: updateUser(user data)
    UseCase->>Repository: updateUser(user data)
    Repository->>Database: UPDATE user data
    Database-->>Repository: Update confirmation
    Repository-->>UseCase: User updated
    UseCase-->>Controller: User updated
    Controller-->>Client: Response 200 Success (user data  updated)
```
