'use strict';

const transactionBtn = document.querySelector('.btn');
const instruction = document.querySelector('.instruction');

const myCardInfo = {
  name: 'Amadi Chile',
  accountNumber: '0015223562',
  balance: 100000,
  pin: 7777,
  bank: 'Access',
};

const mediCardInfo = {
  name: 'Medi James Azuanuka',
  accountNumber: '1234567891',
  balance: 200000,
  pin: 2222,
  bank: 'Access',
};

let banks = '1. Access\n2. GTB\n3. FCMB\n4. Fidelity';

function checkInput(input) {
  // Numbers only
  if (/^[0-9]+$/.test(input)) {
    return true;
  }
  // Alphabets only
  else if (/^[a-zA-Z]+$/.test(input)) {
    return false;
  }
  // Alphanumeric characters
  else if (/^[a-zA-Z0-9]+$/.test(input)) {
    return false;
  }
  // Special characters
  else if (/^[^\w\s]+$/.test(input)) {
    return false;
  }
  // Input contains a mix of characters
  else {
    return false;
  }
}

function airtimePurchase() {
  let myCurrentAccBal;
  let successfulPurchase;
  let enteredAmount;
  let airTimeAmount = Number(
    prompt('Enter the amount of Airtime you want to purchase: ')
  );

  if (airTimeAmount >= 100 && airTimeAmount <= 499) {
    enteredAmount = airTimeAmount;
    airTimeAmount -= airTimeAmount * 0.02;
  } else if (airTimeAmount >= 500 && airTimeAmount <= 999) {
    enteredAmount = airTimeAmount;
    airTimeAmount -= airTimeAmount * 0.04;
  } else if (airTimeAmount >= 1000 && airTimeAmount <= 9999) {
    enteredAmount = airTimeAmount;
    airTimeAmount -= airTimeAmount * 0.05;
  } else {
    enteredAmount = airTimeAmount;
    airTimeAmount = airTimeAmount - airTimeAmount * (10 / 100);
  }

  if (airTimeAmount) {
    myCurrentAccBal = myCardInfo.balance - airTimeAmount;
    successfulPurchase = prompt(
      'Thank you for the purchase of N' +
        enteredAmount +
        '.\n\nN' +
        airTimeAmount +
        ' has been deducted from your account and your current account balance is  N' +
        myCurrentAccBal +
        '. \n\nPlease type 0 to exit'
    );
    if (successfulPurchase === '0') {
      alert('Thank you for banking with us. You be the main boss!');
    } else {
      alert('Where are you rushing to? .😠');
    }
  } else {
    alert('Thank you for banking with us. You be the main boss!');
  }
}

function transferMoney() {
  let receiverAccNo = prompt("Enter the receiver's account number");
  if (checkInput(receiverAccNo)) {
    if (receiverAccNo.length === 10) {
      let bank = Number(
        prompt(`Type 1, 2, 3, or 4, to choose the bank\n${banks}`)
      );
      if (bank === 1) {
        bank = 'Access';
        if (
          mediCardInfo.bank === 'Access' &&
          receiverAccNo === mediCardInfo.accountNumber
        ) {
          let receiverInfo = prompt(
            `Receiver's Information:\n\nReceiver's Account Name: ${mediCardInfo.name}.\nReceiver's Account Number: ${mediCardInfo.accountNumber}.\n\nPlease type 1 to confirm or cancel`
          );
          if (receiverInfo === '1') {
            let transferAmount = prompt(
              `Please enter the amount you wish to transfer`
            );
            while (transferAmount === '') {
              transferAmount = prompt(
                `Please enter the amount you wish to transfer or cancel.`
              );
            }
            if (transferAmount) {
              while (myCardInfo.balance <= transferAmount) {
                transferAmount = prompt(
                  `Insufficient Balance! Your Account balance is ${myCardInfo.balance}\nPlease enter a valid transfer amount or type 0 to exit`
                );
              }
              if (transferAmount === '0' || transferAmount === '') {
                alert(
                  `Oga ${myCardInfo.name}, thank you for banking with us. Your money no reach. Bye!`
                );
              }
              console.log(myCardInfo.balance > transferAmount);
              if (
                transferAmount !== '' &&
                transferAmount !== '0' &&
                myCardInfo.balance > transferAmount
              ) {
                let transferConfirm = prompt(
                  `You are sending the sum of N${transferAmount} to:\n\nAccount Name: ${mediCardInfo.name}.\nAccount Number: ${mediCardInfo.accountNumber}.\nBank: ${mediCardInfo.bank}.\n\nPlease type 1 to continue or cancel`
                );
                transferConfirm = '1';
                if (transferConfirm) {
                  let mediBalance =
                    Number(mediCardInfo.balance) + Number(transferAmount);
                  let myCurrentAccBal =
                    Number(myCardInfo.balance) - Number(transferAmount);
                  let successfulTransfer = prompt(
                    `Transfer successful! Your account balance is N${myCurrentAccBal}.\n\nType 1 to check Medi's Account Balance or Type 2 to exit`
                  );
                  if ((successfulTransfer = '1')) {
                    let confirm = prompt(
                      `Medi's Account Balance is: N${mediBalance}.\nPlease type 2 to exit`
                    );
                    if (confirm === '2') {
                      alert(`Thank you for banking with us. Bye!`);
                    }
                  } else if (successfulTransfer === '2') {
                    alert(`Thank you for banking with us. Bye!`);
                  }
                } else {
                  prompt(`Thank you for banking with us. Bye!`);
                }
              }
            } else {
              alert(
                "Please type an amount next time. If you are not ready, don't initiate transaction. Thank you!"
              );
            }
          } else {
            alert(
              'Be careful to check wetin you type make you no go lose your money ooo. Thank you for your attempt anyways. Please try again later with carefulness.'
            );
          }
        } else {
          alert(
            "Can't retrieve the acccount details. Please check the account number and try again."
          );
        }
      } else if (bank === 2) {
        bank = 'GTB';
        alert('Nothing concern GTB for here. Go and open Access Bank account!');
      } else if (bank === 3) {
        bank = 'FCMB';
        alert(
          'Nothing concern FCMB for here. Go and open Access Bank account!'
        );
      } else if (bank === 4) {
        bank = 'Fidelity';
        alert(
          'Nothing concern Fidelity for here. Go and open Access Bank account!'
        );
      } else {
        alert('The bank is not available');
      }
    } else {
      alert(
        'Account number suppose reach 10 digits. Look am well and try again. Thank you!'
      );
    }
  } else {
    alert(
      'You don type gibberish put inside. Look am well and try again. Thank you!'
    );
  }
}

const initTransaction = transactionBtn.addEventListener('click', () => {
  let insertCard = prompt('Please insert your card by typing "Yes"');
  if (insertCard.toLowerCase() === 'yes') {
    let confirmPin = Number(prompt('Please enter your pin'));
    if (confirmPin === myCardInfo.pin) {
      let chooseOption = prompt(
        'Type 1 to Withdraw \nType 2 to Transfer\nType 3 to buy airtime'
      );
      if (chooseOption === '1') {
        let transOrExit = prompt(
          'Service not available. Please type 2 to Transfer or 0 to exit'
        );
        if (transOrExit === '2') {
          transferMoney();
        } else if (transOrExit === '0') {
          alert('Thank you for banking with us. Bye!');
        } else {
          alert(
            'Where are you rushing to? 😲 Type something and you are rushing carelessly'
          );
        }
      } else if (chooseOption === '2') {
        transferMoney();
      } else if (chooseOption === '3') {
        airtimePurchase();
      } else {
        alert(
          "Thank you for an attempt. You don't have money to do transactions"
        );
      }
    } else {
      alert('You entered a wrong PIN');
    }
  } else {
    alert('Your input is incorrect. Please click Ok to exit and try again');
  }
});
