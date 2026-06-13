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

| Page         | URL                              |
|--------------|----------------------------------|
| Home (empty) | `http://localhost:4200`          |
| Register     | `http://localhost:4200/register` |

## Links

- [Back-end README](back-end/README.md)
- [Front-end README](front-end/README.md)
