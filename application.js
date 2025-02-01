const totalAmount = document.getElementById('total-amount');
const userAmount = document.getElementById('user-amount');
const checkAmount = document.getElementById('check-amount');
const totalAmountButton = document.getElementById('total-amount-button');
const productTitle = document.getElementById('product-title');
const budgetError = document.getElementById('budget-error');
const productTitleError = document.getElementById('product-title-error');
const productCostError = document.getElementById('product-cost-error');
const amount = document.getElementById('amount');
const expenditureValue = document.getElementById('expenditure-value');
const balanceAmount = document.getElementById('balance-amount');
const list = document.getElementById('list');
let temporaryAmount = 0;
const disableButtons = (boolean) => {
     let edit = document.getElementsByClassName('edit');
     Array.from(edit).forEach((element) => {
          element.disabled = boolean;
     });
};
const modifyElement = (element,edit = false) => {
     let parentDiv = element.parentElement;
     let currentBalance = balanceAmount.innerText;
     let currentExpense = expenditureValue.innerText;
     let parentAmount = parentDiv.querySelector('.amount').innerText;
     if(edit){
          let parentText = parentDiv.querySelector('.product').innerText;
          productTitle.value = parentText;
          userAmount.value = parentAmount;
          disableButtons(true);
     }
     balanceAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount);
     expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
     parentDiv.remove();
};
const listCreator = (expenseName,expenseValue) => {
     let subListContent = document.createElement('div');
     subListContent.classList.add('subList-content','flex-space');
     list.appendChild(subListContent);
     subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
     let editButton = document.createElement('button');
     editButton.classList.add('fa-solid','fa-pen-to-square','edit');
     editButton.style.fontSize = '1.2em';
     editButton.addEventListener('click',() => {
          modifyElement(editButton,true);
     });
     let deleteButton = document.createElement('button');
     deleteButton.classList.add('fa-solid','fa-trash-can','delete');
     deleteButton.style.fontSize = '1.2em';
     deleteButton.addEventListener('click',() => {
          modifyElement(deleteButton);
     });
     subListContent.appendChild(editButton);
     subListContent.appendChild(deleteButton);
     document.getElementById('list').appendChild(subListContent);
};
checkAmount.addEventListener('click',() => {
     if(!userAmount.value || !productTitle.value){
          productTitleError.classList.remove('hide');
          return false;
     }
     disableButtons(false);
     let expenditure = parseInt(userAmount.value);
     let sum = parseInt(expenditureValue.innerText) + expenditure;
     expenditureValue.innerText = sum;
     const totalBalance = temporaryAmount - sum;
     balanceAmount.innerText = totalBalance;
     listCreator(productTitle.value,userAmount.value);
     productTitle.value = "";
     userAmount.value = "";
});
totalAmountButton.addEventListener('click',() => {
     temporaryAmount = totalAmount.value;
     if(temporaryAmount === "" || temporaryAmount < 0){
          budgetError.classList.remove('hide');
     }else {
          budgetError.classList.add('hide');
          amount.innerHTML = temporaryAmount;
          balanceAmount.innerText = temporaryAmount - expenditureValue.innerText;
          totalAmount.value = "";
     }
});