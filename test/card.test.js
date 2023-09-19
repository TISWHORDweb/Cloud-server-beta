const {pay, main} = require("../core/core.card");
let data = {cardNumber: '5078729046329652', cardCvv: '154', cardExpiryMonth: '03', cardExpiryYear: '28', amount: 100, email: 'jaysage73@gmail.com', cardName: 'Favour Akachukwu James'}

pay(data.cardNumber,data.cardCvv,data.cardExpiryMonth,data.cardExpiryYear,data.amount,data.email,data.cardName)

// main()