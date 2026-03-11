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

