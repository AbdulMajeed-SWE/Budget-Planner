window.addEventListener("load", () => {
  incomeSource = JSON.parse(localStorage.getItem("incomeSource")) || [];
  newIncomeForm = document.querySelector("#new-income-form");

  expenseSource = JSON.parse(localStorage.getItem("expenseSource")) || [];
  newExpenseForm = document.querySelector("#new-expense-form");

  const savingInput = document.querySelector("#savingRate");

  const savingRate = localStorage.getItem("savingRate") || "";
  savingInput.value = savingRate;
  //   DisplayPieChart();

  savingInput.addEventListener("change", (e) => {
    localStorage.setItem("savingRate", e.target.value);
    DisplayIncome();
    DisplayExpense();
    DisplayPieChart();
  });

  newIncomeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const income = {
      content: e.target.elements.name.value,
      amount: e.target.elements.cash.value,
    };

    incomeSource.push(income);

    localStorage.setItem("incomeSource", JSON.stringify(incomeSource));

    e.target.reset();

    DisplayExpense();
    DisplayIncome();
    DisplayPieChart();
  });

  newExpenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const expense = {
      content: e.target.elements.expensename.value,
      amount: e.target.elements.expensecash.value,
    };

    expenseSource.push(expense);

    localStorage.setItem("expenseSource", JSON.stringify(expenseSource));

    e.target.reset();

    DisplayExpense();
    DisplayIncome();
    DisplayPieChart();
  });

  DisplayExpense();
  DisplayIncome();
  DisplayPieChart();
});

function DisplayIncome() {
  const incomeList = document.querySelector("#income-list");

  incomeList.innerHTML = "";

  updateNumbers();

  //   const balance = document.querySelector("#balance");
  //   balance.innerHTML = `${calcBalance()} <span>&#65020;</span>`;
  //   const savings = document.querySelector("#savings");
  //   savings.innerHTML = `${calcSavings()} <span>&#65020;</span>`;

  incomeSource.forEach((income) => {
    const incomeItem = document.createElement("div");
    incomeItem.classList.add("income-item", "row", "justify-content-start");

    const incomeContent = document.createElement("div");
    incomeContent.classList.add("col-xl-8", "justify-content-start");

    const incomeContentRow = document.createElement("div");
    incomeContentRow.classList.add("row", "mb-1", "justify-content-start");

    const incomeNameCol = document.createElement("div");
    incomeNameCol.classList.add("col-xl-8", "pr-1", "pl-1");
    incomeNameCol.innerHTML = `<input
        type="text"
        class="form-control"
        value="${income.content}"
        readonly
      />`;

    const incomeAmountCol = document.createElement("div");
    incomeAmountCol.classList.add("col-xl-4", "pr-1", "pl-1");
    incomeAmountCol.innerHTML = `<input
      type="number"
      min="0"
      class="form-control"
      value="${income.amount}"
      readonly
    />`;

    const actions = document.createElement("div");
    const edit = document.createElement("button");
    edit.innerHTML = "Edit";
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";

    actions.classList.add("col-xl-4", "mb-3", "px-3");
    const actionsRow = document.createElement("div");
    actionsRow.classList.add("row", "justify-content-end");
    edit.classList.add("btn", "btn-secondary");
    deleteButton.classList.add("btn", "btn-danger", "ml-2");

    incomeContentRow.appendChild(incomeNameCol);
    incomeContentRow.appendChild(incomeAmountCol);
    incomeContent.appendChild(incomeContentRow);
    // actions.appendChild(deleteButton);
    actionsRow.appendChild(edit);
    actionsRow.appendChild(deleteButton);
    actions.appendChild(actionsRow);
    incomeItem.appendChild(incomeContent);
    incomeItem.appendChild(actions);

    incomeList.appendChild(incomeItem);

    edit.addEventListener("click", (e) => {
      const inputName = incomeNameCol.querySelector("input");
      const inputAmount = incomeAmountCol.querySelector("input");

      //   inputName.removeAttribute("readonly");
      //   inputAmount.removeAttribute("readonly");

      //   document.addEventListener("click", function disableInputs(event) {
      //     if (event.target !== inputName && event.target !== inputAmount) {
      //       inputName.setAttribute("readonly", true);
      //       inputAmount.setAttribute("readonly", true);

      //       document.removeEventListener("click", disableInputs);
      //       localStorage.setItem("incomeSource", JSON.stringify(incomeSource));
      //       DisplayIncome();
      //       updateNumbers();
      //     }
      //   });

      inputName.removeAttribute("readonly");
      inputName.focus();
      inputAmount.removeAttribute("readonly");
      inputAmount.focus();
      inputAmount.addEventListener("focus", (e) => {
        inputAmount.removeAttribute("readonly");
      });
      inputName.addEventListener("blur", (e) => {
        inputName.setAttribute("readonly", true);

        income.content = e.target.value;
        income.amount = inputAmount.value;
        localStorage.setItem("incomeSource", JSON.stringify(incomeSource));
        DisplayIncome();
        updateNumbers();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      incomeSource = incomeSource.filter((t) => t != income);
      localStorage.setItem("incomeSource", JSON.stringify(incomeSource));
      DisplayIncome();
      updateNumbers();
    });
  });
}

function DisplayExpense() {
  const expenseList = document.querySelector("#expense-list");
  expenseList.innerHTML = "";

  updateNumbers();

  //   const expenses = document.querySelector("#expenses");
  //   expenses.innerHTML = `${calcExpenses()} <span>&#65020;</span>`;

  expenseSource.forEach((expense) => {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense-item", "row", "justify-content-start");

    const expenseContent = document.createElement("div");
    expenseContent.classList.add("col-xl-8", "justify-content-start");

    const expenseContentRow = document.createElement("div");
    expenseContentRow.classList.add("row", "mb-1", "justify-content-start");

    const expenseNameCol = document.createElement("div");
    expenseNameCol.classList.add("col-xl-8", "pr-1", "pl-1");
    expenseNameCol.innerHTML = `<input
        type="text"
        class="form-control"
        value="${expense.content}"
        readonly
      />`;

    const expenseAmountCol = document.createElement("div");
    expenseAmountCol.classList.add("col-xl-4", "pr-1", "pl-1");
    expenseAmountCol.innerHTML = `<input
      type="number"
      min="0"
      class="form-control"
      value="${expense.amount}"
      readonly
    />`;

    const actions = document.createElement("div");
    const edit = document.createElement("button");
    edit.innerHTML = "Edit";
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";

    actions.classList.add("col-xl-4", "mb-3", "px-3");
    const actionsRow = document.createElement("div");
    actionsRow.classList.add("row", "justify-content-end");
    edit.classList.add("btn", "btn-secondary");
    deleteButton.classList.add("btn", "btn-danger", "ml-2");

    expenseContentRow.appendChild(expenseNameCol);
    expenseContentRow.appendChild(expenseAmountCol);
    expenseContent.appendChild(expenseContentRow);
    // actions.appendChild(deleteButton);
    actionsRow.appendChild(edit);
    actionsRow.appendChild(deleteButton);
    actions.appendChild(actionsRow);
    expenseItem.appendChild(expenseContent);
    expenseItem.appendChild(actions);

    expenseList.appendChild(expenseItem);

    edit.addEventListener("click", (e) => {
      //   Displayexpense();
      const inputName = expenseNameCol.querySelector("input");
      const inputAmount = expenseAmountCol.querySelector("input");

      inputName.removeAttribute("readonly");
      inputName.focus();
      inputAmount.removeAttribute("readonly");
      inputAmount.focus();
      inputAmount.addEventListener("focus", (e) => {
        inputAmount.removeAttribute("readonly");
      });
      inputName.addEventListener("blur", (e) => {
        inputName.setAttribute("readonly", true);
        // inputAmount.setAttribute("readonly", true);
        // income.amount = e.target.value;
        expense.content = e.target.value;
        expense.amount = inputAmount.value;
        localStorage.setItem("expenseSource", JSON.stringify(expenseSource));
        DisplayExpense();
        updateNumbers();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      expenseSource = expenseSource.filter((t) => t != expense);
      localStorage.setItem("expenseSource", JSON.stringify(expenseSource));
      DisplayExpense();
      updateNumbers();
    });
  });
}

function calcBalance() {
  const savingRate = document.querySelector("#savingRate");
  let sum = 0;
  incomeSource.forEach((income) => {
    sum = sum + Number(income.amount);
  });
  //   sum = sum - sum * (savingRate.value / 100);
  sum = sum - calcSavings() - calcExpenses();
  return sum;
}

function calcSavings() {
  let savings = 0;
  const savingRate = document.querySelector("#savingRate");

  incomeSource.forEach((income) => {
    savings = savings + income.amount * (savingRate.value / 100);
  });
  return savings;
}

function calcExpenses() {
  let expenses = 0;
  expenseSource.forEach((expense) => {
    expenses = expenses + Number(expense.amount);
  });
  return expenses;
}

function DisplayPieChart() {
  Chart.defaults.global.defaultFontColor = "#858796";

  (Chart.defaults.global.defaultFontFamily = "Nunito"),
    '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

  let balance = calcBalance();
  let Savings = calcSavings();
  let expenses = calcExpenses();

  if (balance < 0) {
    balance = 0;
  }
  if (Savings < 0) {
    Savings = 0;
  }
  if (expenses < 0) {
    expenses = 0;
  }

  const ctx = document.getElementById("myPieChart").getContext("2d");
  let pieChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [balance, Savings, expenses],
          backgroundColor: ["#4e73df", "#1cc88a", "#ffc107"],
        },
      ],
      labels: ["Balance", "Savings", "Expenses"],
    },
    options: {
      responsive: true,
    },
  });
}

function updateNumbers() {
  const balance = document.querySelector("#balance");
  balance.innerHTML = `${calcBalance()} <span>&#65020;</span>`;
  const savings = document.querySelector("#savings");
  savings.innerHTML = `${calcSavings()} <span>&#65020;</span>`;
  const expenses = document.querySelector("#expenses");
  expenses.innerHTML = `${calcExpenses()} <span>&#65020;</span>`;
}
