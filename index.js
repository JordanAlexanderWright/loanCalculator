calcButton = document.querySelector('#calculate');
calcButton.addEventListener('click', calculate);

function calculate(e) {
    e.preventDefault();

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
        
        results = document.querySelector('.results')
        results.classList.remove('hide');
        
    } else {
        console.log('please check your information inputs');
    };

    loader('on');
    displayResults(totalAcc, monthlyPay, totalInt);
};

function loader(toggle){
    if (toggle === 'on'){
        loading = document.querySelector('.loader');
        loading.classList.remove('hide');
    } else if (toggle === 'off'){
        loading.classList.add('hide');
    }
};
  
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

function displayResults(totalAcc, monthlyPay, totalInt){
    sleep(5000).then(() => {
        loader('off');
        monthlyPayment.form.focus();
        monthlyPayment.form.value= `$ ${monthlyPay}`
        totalPayment.form.focus();
        totalPayment.form.value=`$ ${totalAcc}`
        totalInterest.form.focus();
        totalInterest.form.value = `$ ${totalInt}`
    });
 

}

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

// making my formboxes, need to figure out a good way to automate this for scalability
// I could also use delegation to handle most of this, but would just be a different approach to creating this. 

//input boxes
let loanAmount = new formBox('amount');
let apr = new formBox('interest');
let loanLength = new formBox('time');

//result boxes
let monthlyPayment = new formBox('monthly-payment');
let totalPayment = new formBox('total-payment');
let totalInterest = new formBox('total-interest');
