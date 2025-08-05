import Expensemodel from "../models/expenseSchema.js";

const addExpense = async (req, res) => {
  const userId = req.user?.id;

  const { title, amount, date, category, description } = req.body;

  const parsedAmount = Number(amount);

  try {
    if (!title || !amount || !date || !category || !description) {
      return res.status(400).json({ message: "All fields are necessary" });
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a positive integer" });
    }

    const newExpense = new Expensemodel({
      userId,
      title,
      amount,
      date,
      category,
      description,
    });

    await newExpense.save();
    res
      .status(200)
      .json({ success: true, message: "Expense Added", data: newExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteExpense = await Expensemodel.findByIdAndDelete(id);
    if (!deleteExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Expense deleted", deleteExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, date, category, description } = req.body;

  try {
    const expenseUpdate = await Expensemodel.findById(id);
    if (!expenseUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found to update" });
    }

    expenseUpdate.title = title || expenseUpdate.title;
    expenseUpdate.amount = amount || expenseUpdate.amount;
    expenseUpdate.date = date || expenseUpdate.date;
    expenseUpdate.category = category || expenseUpdate.category;
    expenseUpdate.description = description || expenseUpdate.description;

    await expenseUpdate.save();

    res
      .status(200)
      .json({ success: true, message: "Expense updated", data: expenseUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getExpense = async (req, res) => {
  try {
    const userId = req.user?.id;
    const getExpense = await Expensemodel.find({ userId: userId });

    if (!getExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Expense found", data: getExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addExpense, deleteExpense, updateExpense, getExpense };
