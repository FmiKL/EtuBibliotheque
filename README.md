# EtuBibliothèque

Student library management app.

## Stack

- **Back-end:** Java / Spring Boot
- **Front-end:** Angular 19
- **Database:** MySQL (Docker)

## Getting started

### Prerequisites

- Java 21+
- Node.js 18+ / npm
- Docker

### Database

```bash
cd back-end
docker compose up -d
```

### Back-end

```bash
cd back-end
./mvnw spring-boot:run
```

### Front-end

```bash
cd front-end
npm install
npm start
```

The app runs at `http://localhost:4200`.

| Page           | URL                                       | Access        |
|----------------|-------------------------------------------|---------------|
| Home (empty)   | `http://localhost:4200`                   | Public        |
| Register       | `http://localhost:4200/register`          | Public        |
| Login          | `http://localhost:4200/login`             | Public        |
| Students       | `http://localhost:4200/students`          | Authenticated |
| Create student | `http://localhost:4200/students/new`      | Authenticated |
| Student detail | `http://localhost:4200/students/:id`      | Authenticated |
| Edit student   | `http://localhost:4200/students/:id/edit` | Authenticated |

### API

| Method   | URL                 | Access        |
|----------|---------------------|---------------|
| `POST`   | `/api/register`     | Public        |
| `POST`   | `/api/login`        | Public        |
| `GET`    | `/api/students`     | Authenticated |
| `POST`   | `/api/students`     | Authenticated |
| `GET`    | `/api/students/:id` | Authenticated |
| `PUT`    | `/api/students/:id` | Authenticated |
| `DELETE` | `/api/students/:id` | Authenticated |

## Tests

### Back-end

```bash
cd back-end
./mvnw verify
```

JaCoCo report: `back-end/target/site/jacoco/index.html`.

### Front-end

```bash
cd front-end
npm test -- --runInBand
```

Jest report: `front-end/coverage/index.html`.

### E2E

```bash
cd front-end
npx ng run etudiant-frontend:serve-e2e
```

```bash
npx cypress run
```

Cypress report: `front-end/cypress-coverage/lcov-report/index.html`.

## Links

- [Back-end README](back-end/README.md)
- [Front-end README](front-end/README.md)
