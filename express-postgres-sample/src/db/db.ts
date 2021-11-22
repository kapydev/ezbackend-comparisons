import {Client} from 'pg'

const client = new Client()

client.connect()

export default client