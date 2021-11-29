import { EzBackend, EzModel, Type } from '@ezbackend/common'
import { EzOpenAPI } from "@ezbackend/openapi";
import { EzDbUI } from "@ezbackend/db-ui";
import { EzCors } from "@ezbackend/cors";
import { EzAuth, EzUser } from "@ezbackend/auth";

const app = new EzBackend()

//---Plugins---
//Everything is an ezapp in ezbackend
app.addApp(new EzOpenAPI())
app.addApp(new EzDbUI())
app.addApp(new EzCors())
app.addApp(new EzAuth())
//---Plugins---

const posts = new EzModel('Post', {
  summary: Type.VARCHAR,
  description: Type.VARCHAR
})

const user = new EzUser("User", ["google"])

app.addApp(posts, { prefix: 'posts' })
app.addApp(user, { prefix: 'users' })

app.start({
  server: {
    logger:false
  },
  orm: {
    type: "postgres",
    host: process.env.POSTGRES_HOST!,
    port: process.env.POSTGRES_PORT!,
    username: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DATABASE!,
    synchronize: true
  }
})