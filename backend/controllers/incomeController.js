import IncomeModel from "../models/incomeSchema.js";

const addIncome = async (req, res) => {
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

    const newIncome = new IncomeModel({
      userId,
      title,
      amount,
      date,
      category,
      description,
    });

    await newIncome.save();
    res
      .status(200)
      .json({ success: true, message: "Income Added", data: newIncome });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteIncome = await IncomeModel.findByIdAndDelete(id);
    if (!deleteIncome) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Income deleted", deleteIncome });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { title, amount, date, category, description } = req.body;

  try {
    const incomeUpdate = await IncomeModel.findById(id);
    if (!incomeUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found to update" });
    }

    incomeUpdate.title = title || incomeUpdate.title;
    incomeUpdate.amount = amount || incomeUpdate.amount;
    incomeUpdate.date = date || incomeUpdate.date;
    incomeUpdate.category = category || incomeUpdate.category;
    incomeUpdate.description = description || incomeUpdate.description;

    await incomeUpdate.save();

    res
      .status(200)
      .json({ success: true, message: "Income updated", data: incomeUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getIncome = async (req, res) => {
  try {
    const userId = req.user?.id;
    const getIncome = await IncomeModel.find({ userId: userId });

    if (!getIncome) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Income found", data: getIncome });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addIncome, deleteIncome, updateIncome, getIncome };
