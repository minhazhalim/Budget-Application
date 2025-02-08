const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const showTransactions = () => {
     const transactionTable = document.getElementById('transactionTable');
     transactionTable.innerHTML = "";
     for(let i = 0;i < transactions.length;i++){
          transactionTable.innerHTML += `
               <tr>
                    <td>${transactions[i].type}</td>
                    <td>${transactions[i].name}</td>
                    <td>$${transactions[i].amount}</td>
                    <td><a class="deleteButton" onclick="deleteTransaction(${transactions[i].id})">delete</a></td>
               </tr>
          `;
     }
};
const updateBalance = () => {
     let balance = 0;
     transactions.forEach((transaction) => {
          if(transaction.type === 'income'){
               balance += Number(transaction.amount);
          }else if(transaction.type === 'expense'){
               balance -= transaction.amount;
          }
     });
     document.querySelector('.balance').textContent = balance;
};
function addTransaction(event){
     event.preventDefault();
     const type = document.getElementById('type').value;
     const name = document.getElementById('name').value;
     const amount = document.getElementById('amount').value;
     if(type != 'chooseOne' && name.length > 0 && amount > 0){
          const transaction = {
               type,
               name,
               amount,
               id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
          };
          transactions.push(transaction);
          localStorage.setItem('transactions',JSON.stringify(transactions));
     }
     document.getElementById('expForm').reset();
     showTransactions();
     updateBalance();
}
document.getElementById('expForm').addEventListener('submit',addTransaction);
const deleteTransaction = (id) => {
     for(let i = 0;i < transactions.length;i++){
          if(transactions[i].id == id){
               transactions.splice(i,1);
          }
     }
     localStorage.setItem('transactions',JSON.stringify(transactions));
     showTransactions();
     updateBalance();
};