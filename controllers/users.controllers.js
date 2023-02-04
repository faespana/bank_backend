const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.findUserHistoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    const transactions = await Transfer.findAll({
      where: {
        senderUserId: id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'The historial was fount successfully',
      user,
      transactions:
        transactions === null
          ? res.status.json({ message: 'The user didnt make any transaction' })
          : transactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.createUserAccount = async (req, res) => {
  const { name, password } = req.body;

  const amount = 1000;
  console.log(typeof amount);
  const newAccount = await User.create({
    accountNumber: Math.round(1000000 * Math.random()),
    amount,
    name,
    password,
  });
  console.log(typeof newAccount.amount);
  res.status(201).json({
    status: 'success',
    message: "The user's account  was created successfully",
    newAccount,
  });
};

exports.createUserLogin = async (req, res) => {
  const { password, accountNumber } = req.body;

  const user = await User.findOne({
    where: {
      status: true,
      accountNumber,
      password,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not found',
    });
  }

  res.status(201).json({
    status: 'success',
    message: 'The user was logged successfully',
    user,
  });
};
