let balance = 1000;
let history = [];

function updateDisplay() {
    document.getElementById('balance').textContent = balance;
}

function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (amount > 0) {
        balance += amount;
        addTransaction('Deposit', amount);
        updateDisplay();
        document.getElementById('amount').value = '';
    }
}

function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (amount > 0 && amount <= balance) {
        balance -= amount;
        addTransaction('Withdrawal', amount);
        updateDisplay();
        document.getElementById('amount').value = '';
    }
}

function addTransaction(type, amount) {
    const transaction = {
        type: type,
        amount: amount,
        date: new Date().toLocaleString(),
        balance: balance
    };
    
    history.push(transaction);
    
    const historyDiv = document.getElementById('history');
    const div = document.createElement('div');
    div.innerHTML = `
        <strong>${type}</strong>: $${amount.toFixed(2)} 
        (${transaction.date}) 
        Balance: $${balance.toFixed(2)}
    `;
    div.style.padding = '10px';
    div.style.margin = '5px 0';
    div.style.background = type === 'Deposit' ? '#d4edda' : '#f8d7da';
    div.style.border = '1px solid';
    div.style.borderColor = type === 'Deposit' ? '#c3e6cb' : '#f5c6cb';
    
    historyDiv.prepend(div);
}

// Initialize
updateDisplay();