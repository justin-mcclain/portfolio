const Transaction = require("../model/transaction.model");

module.exports.getAllTransactions = (req, res) => {
    Transaction.find()
        .then(allTransactions=>{
            res.json({results: allTransactions})
        })
        .catch(err => res.json({ message: "Something went wrong", error: err}))
}

module.exports.getAllTransactionsByUser = (req, res) => {
    Transaction.find({user_id:req.params.id})
        .then(allTransactions=>{
            res.json({results: allTransactions})
        })
        .catch(err => res.json({ message: "Something went wrong", error: err}))
}


module.exports.getOneTransaction = (req, res) => {
    Transaction.findOne({_id: req.params.id})
        .then(oneTransaction => {
            res.json({results: oneTransaction})
        })
        .catch(err => res.json({ message: "Something went wrong", error: err}))
}

module.exports.createTransaction = (req, res) => {
    Transaction.create(req.body)
        .then(newTransaction => {
            res.json({results: newTransaction})
        })
        .catch(err => res.json({ message: "Something went wrong", error: err}))
}

module.exports.updateTransaction = (req,res) => {
    Transaction.updateOne(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updatedTransaction => {
            res.json({results: updatedTransaction})
        })
        .catch(err => res.json({ message: "Something went wrong", error: err}))
}

module.exports.deleteTransaction = (req,res) => {
    Transaction.deleteOne({_id: req.params.id})
        .then(deletedTransaction => {
            res.json({results: deletedTransaction})
        })
        .catch(err => res.json({ message: "Something went wrong", error: err}))
}