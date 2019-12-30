## About

This Project was inspired by [Slack clone built with Phoenix and React](https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-1-project-setup-3252ae780a1)

This Project is a Slack clone built with Phoenix and VueJS.

![slack clone preview](https://raw.githubusercontent.com/danieldocki/slack-clone-vuejs-elixir-phoenix/master/preview.png)

## Getting started

To run the project locally:

### quick start

bring up the backend then the frontend:

```sh
make up_backend
```

```sh
make up_frontend
```

#### Running the Phoenix app

##### detailed

Download dependencies

```
cd api
mix deps.get
```

Edit the database connection config in `/config/dev.exs` or `config/dev.secret.exs`
with your postgres user info if needed

Create and migrate the database

```
mix ecto.create && mix ecto.migrate
```

Start the server

```
mix phoenix.server
```

#### Running the VueJS app

Install [Yarn](https://github.com/yarnpkg/yarn)

Install dependencies

```
cd web
yarn
```

Start the dev server

```
yarn run dev
```
