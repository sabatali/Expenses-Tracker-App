const Transactions = JSON.parse(localStorage.getItem('Transactions')) || [];

// Call the functions to initialize the UI after loading data from local storage
updateTables();
updateTotals();

function addTransaction() {
  const type = document.getElementById("type").value;
  const details = document.getElementById("details").value;
  const date = document.getElementById("date").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (details && date && !isNaN(amount)) {
    const transaction = {
      type,
      details,
      date,
      amount,
    };

    Transactions.push(transaction);

    updateTables();
    updateTotals();
    saveToLocalStorage();
    clearForm();

  } else {
    alert("Please fill in all fields with valid data.");
  }
}

function updateTables() {
  const incomeBody = document.getElementById("IncomeBody");
  const expenseBody = document.getElementById("ExpenseBody");

  incomeBody.innerHTML = "";
  expenseBody.innerHTML = "";

  const reversedTransactions = [...Transactions].reverse();

  reversedTransactions.forEach((transaction, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.details}</td>
      <td>${transaction.type === 'income' ? '+' : '-'} $${transaction.amount.toFixed(2)}</td>
      <td><button onclick="deleteTransaction(${Transactions.length - 1 - index})"><i class="fa-solid fa-trash"></i></button></td>
    `;

    if (transaction.type === 'income') {
      incomeBody.appendChild(row);
    } else {
      expenseBody.appendChild(row);
    }
  });
}

function updateTotals() {
  const totalIncomeElement = document.getElementById('totalIncome');
  const totalExpensesElement = document.getElementById('totalExpenses');
  const remainingBalanceElement = document.getElementById('remainingBalance');

  const totalIncome = Transactions.reduce((total, transaction) => transaction.type === 'income' ? total + transaction.amount : total, 0);
  const totalExpenses = Transactions.reduce((total, transaction) => transaction.type === 'expense' ? total + transaction.amount : total, 0);
  const remainingBalance = totalIncome - totalExpenses;

  totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
  totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;
  remainingBalanceElement.textContent = `$${remainingBalance.toFixed(2)}`;
}

function saveToLocalStorage() {
  localStorage.setItem('Transactions', JSON.stringify(Transactions));
}

function clearForm() {
  document.getElementById('type').value = 'expense';
  document.getElementById('details').value = '';
  document.getElementById('date').value = '';
  document.getElementById('amount').value = '';
}

function deleteTransaction(index) {
  Transactions.splice(index, 1);
  updateTables();
  updateTotals();
  saveToLocalStorage();
}




function openPopupForm() {
  document.getElementById('popupForm').style.display = 'block';
}

function closePopupForm() {
  document.getElementById('popupForm').style.display = 'none';
}
