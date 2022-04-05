calcButton = document.querySelector('#calculate');
calcButton.addEventListener('click', calculate);
results = document.querySelector('.results');

function calculate(e) {
    e.preventDefault();

    // a check to see if  previous results need to be hidden (if a clalculation has already been made)

    if(results.classList.contains('hide')){
        console.log('hidden');
    } else {
        results.classList.add('hide');
    };
    
    // Getting all of the information from the form to be able to use in the formula for loan calculation

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

    // This is the function for creating the loading graphic

    loader('on');

    displayResults(totalAcc, monthlyPay, totalInt);
};

    // This function will show / hide a loading graphic while results are calculated

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

  // This function takes all of the information provided in the form and places it into a results box.
  // The sleep function makes it take a few seconds and also allows for the form to behave correctly with materialze animations

function displayResults(totalAcc, monthlyPay, totalInt){
    sleep(3000).then(() => {

        if (typeof(principal) === 'number' & typeof(interestRate)  === 'number' & typeof(timeYears)  === 'number'){
        
            results = document.querySelector('.results')
            results.classList.remove('hide');
            
        } else {
            console.log('please check your information inputs');
        };
    
        loader('off');
        monthlyPayment.form.focus();
        monthlyPayment.form.value= `$ ${monthlyPay}`
        totalPayment.form.focus();
        totalPayment.form.value=`$ ${totalAcc}`
        totalInterest.form.focus();
        totalInterest.form.value = `$ ${totalInt}`
    });
 

}

// This is a class constructor that will get all the elements I need. Should be cleaned up,
// Just another way of selecting elements. 

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



console.log(results.classList);