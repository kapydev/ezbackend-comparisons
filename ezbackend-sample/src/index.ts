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
  description: Type.VARCHAR,
  creator: {
    type: Type.MANY_TO_ONE,
    target: "User",
    inverseSide: "posts"
  }
})

const user = new EzUser("User", ["google"], {
  posts: {
    type: Type.ONE_TO_MANY,
    target: "Post",
    inverseSide: "creator",
    nullable: true
  }
})

app.addApp(posts, { prefix: 'posts' })
app.addApp(user, { prefix: 'user' })

app.start({
  server: {
    logger:false
  }
})