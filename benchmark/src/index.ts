import autocannon from 'autocannon'

autocannon({
    url: 'http://localhost:8000/user'
}, console.log)