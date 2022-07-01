const TransactionController = require('../controller/transaction.controller');

module.exports = (app) => {
    app.get('/api/transactions', TransactionController.getAllTransactions);
    app.get('/api/transactions/:id', TransactionController.getOneTransaction);
    app.post('/api/transactions', TransactionController.createTransaction);
    app.put('/api/transactions/:id', TransactionController.updateTransaction);
    app.delete('/api/transactions/:id', TransactionController.deleteTransaction);
    app.get('/api/transactionsbyuser/:id', TransactionController.getAllTransactionsByUser);
}