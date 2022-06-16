const mongoose = require('mongoose');
const dbname = "finances-db"

mongoose.connect(`mongodb+srv://root:root@mern-march-db.fqptc.mongodb.net/${dbname}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));