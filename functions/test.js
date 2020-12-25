const faunadb = require("faunadb")
require('dotenv').config()
const q = faunadb.query

var client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })

async function run() {
    const results = await client.query(
        q.Paginate(q.Match(q.Index("all_todos")))
        // q.Create(q.Collection("todos"), {
        //     data: {
        //         text: "Wow",
        //         done: false
        //     }
        // })
    )
    console.log(results.data[0])
}

run()
