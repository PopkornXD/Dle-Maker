# DLE MAKER

This is a platform for users to create and distribute "dle"-games easily by merely creating an Excel sheet with the data.

The data from Excel should be on the form:


| Category1 | Category2 | Category3 | Category4 | ... |
| --- | --- | --- | --- | ---|
| entry1 |
| entry2 |
| ... |

The website is hosted on cloudflare using a tunnel directed at docker containers placed inside a virtual machine on Oracle Cloud:

**https://dlemaker.espolin.dev/**


## Features

- **User Authentication**: Registration and login functionality with bcrypt password encryption
- **Create & Distribute**: Functionality to create and distribute your dle-games so that you and others can enjoy it.
- **External Database**: The database is securely kept on a seperate container on a virtual machine for security, no downtime, and scalability.

## Tech Stack

- **Frontend**: SvelteKit, Svelte 5
- **Backend**: SvelteKit server-side routes
- **Database**: MariaDB
- **Authentication**: Custom auth with bcrypt
- **Deployment**: Docker containers, Cloudflare Tunnel with reverse proxy


## Running locally with Docker

Prerequisites:

- Docker

Start by cloning and entering the repository:
```bash
git clone https://github.com/PopkornXD/Dle-Maker.git
cd Dle-Maker
```
Then create the environment files: `.env` and `.env.db`

Fill these out with names and a password of your choosing, or just copy the examples.

Example of `.env`:
```bash
DB_HOST=mariadb
DB_USER=username
DB_PASSWORD=password
DB_NAME=dle_maker
ORIGIN=http://localhost:3000
```
Example of `.env.db`:
```bash
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=dle_maker
MYSQL_USER=username
MYSQL_PASSWORD=password
```

To test locally without tunneling to cloudflare, you also need to create the file: `docker-compose.override.yml`.

Fill that out with this:
```bash
services:
  web:
    ports:
      - "3000:3000"
  cloudflared:
    profiles:
      - production
```

Now you have everything set up and can run:
```bash
docker compose up
```

The website should then run on http://localhost:3000/


