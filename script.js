const mongoose = require('mongoose')
const Note = require('./Note')

if (process.argv.length != 5)
{
    console.log("Give password of database as an argument1, name to store in phonebook as an argument2 and phone number associated with name as an argument3.")
    process.exit(1)
}

const password = process.argv[2]

let name_arg = process.argv[3]

let number_arg = process.argv[4]

const url = `mongodb+srv://pravash:${password}@cluster0.qggazwp.mongodb.net/?retryWrites=true&w=majority`


const mongo = async () => {

    try
    {
        mongoose.set('strictQuery', false)

        await mongoose.connect(url)

        const note = await new Note({
                                    name: name_arg,
                                    number: number_arg
                                    })

        const save = await note.save()
        
        console.log(`Added ${save.name} number ${save.number} to phonebook.`)
        console.log("-----------------------------")
        
        const all = await Note.find({})
        
        console.log("Phonebook list:")

        all.forEach(element => {
            console.log(element.name + " " + element.number)
        });
        mongoose.connection.close()
    }
    catch(error)
    {
        console.log(error.name,": ", error.message)
        mongoose.connection.close()
    }

}

mongo()

