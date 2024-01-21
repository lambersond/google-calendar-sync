# Calendar Sync

[![cov](https://lambersond.github.io/google-calendar-sync/badges/coverage.svg)](https://github.com/lambersond/google-calendar-sync/actions)

This is a simple web app that allows you to sync your Google Calendar with a second Google Calendar. It is built with Next.js and uses the Google Calendar API.

You can view the production version of the app at [https://google-calendar-sync.vercel.app](https://google-calendar-sync.vercel.app). If you want to report a bug or request a feature, please open an issue.

## Local Development

- If you're using VS Code, there is a `.vscode` folder with recommended extensions and settings.
- When committing code, please use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format.

### Prerequisites

- You will need to generate a Google API client ID and client secret. 
  - Go to the [Google API Console](https://console.developers.google.com/apis/dashboard)
  - Create a new project
  - Go to the credentials tab
  - Create an OAuth client ID
  - Select Web Application
  - Add `http://localhost:3000` to the Authorized JavaScript origins
  - Add `http://localhost:3000/api/auth/callback/google` to the Authorized redirect URIs
  - Copy the client ID and client secret

### Setup

- Create a `.env` at the root of the project or copy the `.env.example` file to `.env`
  - Add the client ID and client secret to the `.env` file
  - Add a random string for the `NEXTAUTH_SECRET` variable

### Running the app

- Run `npm install` to install dependencies
- Run `npm run dev` to start the app or if you have bun installed you can run `bun dev` to start the app

Verify the app is running by going to `http://localhost:3000`

### Testing

There is a minimal test coverage set to 80%.

- Run `npm run test` to run the tests