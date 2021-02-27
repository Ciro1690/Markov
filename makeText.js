/** Command-line tool to generate Markov text. */

const fs = require('fs')
const process = require('process')
const axios = require('axios');
const MarkovMachine = require('./markov')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("error:", err)
            process.exit(1)
        }
        let mm = new MarkovMachine(data)
        console.log(mm.makeText().join(" "))
    })
}

async function webCat(url) {
    try {
        await axios.get(url)
            .then(value => {
                let mm = new MarkovMachine(value.data)
                console.log(mm.makeText().join(" "))
            })
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

let fileType = process.argv[2]
let file = process.argv[3]

if (fileType === 'file') {
    cat(file)
}
if (fileType === 'url') {
    console.log(webCat(file))
}


// mm = new MarkovMachine(eggs)
// console.log(mm)