const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// Add expense and split equally
router.post("/add", auth, async (req, res) => {
  const { description, amount, users } = req.body;
  const splitAmount = amount / users.length;

  const expense = new Expense({
    description,
    amount,
    users,
    splitAmount
  });

  await expense.save();
  res.json(expense);
});

router.get("/", auth, async (req, res) => {
  const data = await Expense.find();
  res.json(data);
});

module.exports = router;
