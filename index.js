calcButton = document.querySelector('#calculate');

function calculate() {

    principal = Number(loanAmount.form.value);
    interestRate = (Number(apr.form.value))/100;
    timeYears = Number(loanLength.form.value);

    timeMonths = timeYears * 12
    monthlyInterest = interestRate / 12


    totalAcc = principal*(1+(interestRate*(timeYears)));
    console.log(totalAcc);

    periodicInterest = (1 + monthlyInterest)**timeMonths

    monthlyPay = (principal*(monthlyInterest)*((1+monthlyInterest)**timeMonths)) / (((1+monthlyInterest)**timeMonths) - 1)
    monthlyPay = monthlyPay.toFixed(2)
    console.log(monthlyPay)

    totalInt = totalAcc - principal

    if (typeof(principal) === 'number' & typeof(interestRate)  === 'number' & typeof(timeYears)  === 'number'){
        displayResults(totalAcc, monthlyPay, totalInt);
    } else {
        console.log('please check your information inputs');
    };

};

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
function displayResults(totalAcc, monthlyPay, totalInt){
    results = document.querySelector('.results')
    results.classList.remove('hide');
    
    monthlyPayment.form.focus();
    monthlyPayment.form.value= `$ ${monthlyPay}`
    sleep(1000);
    totalPayment.form.focus();
    totalPayment.form.value=`$ ${totalAcc}`
    sleep(1000);
    totalInterest.form.focus();
    totalInterest.form.value = `$ ${totalInt}`
    sleep(1000);

}


calcButton.addEventListener('click', calculate);

class formBox {

    constructor(id){

        this.form = document.querySelector(`#${id}`);
        this.form.addEventListener('click', this.clearText);
        this.form.addEventListener('blur', this.textCheck);
    }

        textCheck(e){
            if (e.currentTarget.value === ''){
                e.currentTarget.value = e.currentTarget.defaultValue;
            }; 
        };

        clearText(e){

            if (this.value === this.defaultValue){
                this.value=''
            }; 
        };
};


let loanAmount = new formBox('amount');
let apr = new formBox('interest');
let loanLength = new formBox('time');

let monthlyPayment = new formBox('monthly-payment');
let totalPayment = new formBox('total-payment');
let totalInterest = new formBox('total-interest');

let something = .005;



console.log(typeof(something))

if (typeof(something) == 'number'){
    console.log('hello')
}
