const { response } = require('express');
const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.transferUserCash = async (req, res = response) => {
  const { amount, accountNumber, senderUserId } = req.body;

  const userReceiver = await User.findOne({
    where: {
      status: true,
      accountNumber,
    },
  });

  const receiverUserId = userReceiver.id;

  const userMakerTransfer = await User.findOne({
    where: {
      status: true,
      id: senderUserId,
    },
  });

  if (amount > userMakerTransfer.amount) {
    return res.status(404).json({
      status: 'error',
      message: 'The transfer overcome your limit',
    });
  }

  if (receiverUserId === senderUserId) {
    return res.status(404).json({
      status: 'error',
      message: 'You cant send your money to you',
    });
  }

  const newAmountUserMakerTransfer = +userMakerTransfer.amount - amount;

  const newAmountUserReceiverTransfer = +userReceiver.amount + amount;

  console.log('me ejecute', newAmountUserReceiverTransfer);
  console.log('me ejecute2', userReceiver.amount);
  console.log('me ejecute3', amount);

  await userMakerTransfer.update({ amount: newAmountUserMakerTransfer });

  await userReceiver.update({ amount: newAmountUserReceiverTransfer });

  const transfer = await Transfer.create({
    amount,
    senderUserId,
    receiverUserId,
  });

  res.json({
    status: 'success',
    message: 'Transfer successfully',
    transfer,
  });
};
