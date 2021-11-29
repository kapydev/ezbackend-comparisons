# Ezbackend Comparisons

Comparisons and Benchmarks of EzBackend against other popular solutions

## Sample requirements

All benchmark cases must have the following functionality:

1. A user model with CRUD routes
2. A post model with CRUD routes
3. User authentication with Google OAuth2

The micro implementation details are optional, the results returned do not need to match any API specification.

Code written should be explicit and easily understandable.

## Method

1. Warmup - 10,000 createOne requests (All request bodies are the same currently)
2. Seeding Database - Insert one post
3. Create test - 10,000 createOne requests (All request bodies are the same currently)
4. Read test - 10,000 readOne requests (All reads are performed on same object currently)

PRs to improve the testing method to be more diverse are welcome

## Benchmark caveats

### Possible deviations with Project complexity

Depending on how complex your project is, your actual results may defer. If performance or reducing engineering workload is important to you you should run your own benchmarks.

### Lack of optimisation

The `express-postgres` sample uses `Sequelize` instead of `node-postgres`. Using `node-postgres` would probably lower the overhead and improve performance, although this remains a hypothesis to be tested, especially since the performance boost is unlikely to be significant for simple queries.

### Lack of Functionality

It would make alot more sense if:

1. All users can read posts
2. Only logged in users can write posts
3. Only post creators can update and delete their own posts
4. User data should not be accessible
5. Users and Posts had a one-to-many relation

## Rant

While these implementing this in EzBackend is trivial and would take (~20 mins) to implement, I have already spent 2 days on the other samples.

It could be that I'm more familiar with EzBackend as compared to the other frameworks, but I'm running a startup and `every second I'm spending wasting time on these other frameworks making some boilerplate code that 10 million other developers before me have made` is another second I could be spending actually contributing to my startup.

Or maybe I just suck at coding who knows ¯\\_(ツ)_/¯

If there are any contributors willing to improve on the express-postgres-sample and express-mongo-sample, it will be greatly appreciated, PRs are welcome. In that case I am more than happy to update the EzBackend sample.

## Running Benchmarks

Run `yarn && yarn build` in each repository

Run `yarn start` in `benchmarks`

## TODO

[] Implement versioning depending on framework version

# Benchmarks
  * __Machine:__ win32 x64 | 12 vCPUs | 23.8GB Mem
  * __Node:__ `v14.17.4`
  * __Run:__ Mon Nov 29 2021 15:02:50 GMT+0800 (Singapore Standard Time)
  
  ## Reads

  |                                | Requests/s | Latency | Throughput/Mb |
| :--                            | :-:        | --:     | --:           |
| read-ezbackend-postgres-sample | 2500.0     | 2.97    | 0.73          |
| read-express-postgres-sample   | 1428.6     | 6.26    | 0.54          |
| read-express-mongo-sample      | 1250.0     | 7.44    | 0.42          |

  ## Writes

  |                                 | Requests/s | Latency | Throughput/Mb |
| :--                             | :-:        | --:     | --:           |
| write-ezbackend-postgres-sample | 1667.2     | 4.52    | 0.55          |
| write-express-postgres-sample   | 1111.1     | 7.68    | 0.46          |
| write-express-mongo-sample      | 909.1      | 10.08   | 0.33          |

  ## Lines of Code

  |                                     | Number of Files | blankLines | Comments | Code |
| :--                                 | :-:             | :-:        | :-:      | :-:  |
| lineCount-ezbackend-postgres-sample | 1               | 6          | 3        | 31   |
| lineCount-express-mongo-sample      | 9               | 46         | 12       | 147  |
| lineCount-express-postgres-sample   | 11              | 43         | 13       | 179  |

  