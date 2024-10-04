const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const dropdowns = document.querySelectorAll('.dropdown select');
const inputField = document.querySelector('.input_value');

let fromVal, toVal;
dropdowns.forEach(down => {
    for (const currency in countryList) {
        const option = document.createElement('option');
        option.value = currency;
        option.text = currency;
        down.appendChild(option);
    }
});

fromCurr.addEventListener('change', () => {
    fromVal = fromCurr.value;
});
toCurr.addEventListener('change', () => {
    toVal = toCurr.value;
});
btn.addEventListener('click', (event) => {
    event.preventDefault();
    const input_val = inputField.value;
    if (input_val && fromVal && toVal) {
        currencyCalculate(input_val, fromVal, toVal);
    } else {
        msg.innerHTML = 'Please enter a value and select both currencies.';
    }
});
function currencyCalculate(inputAmount, from, to) {
    if(from === to){
        msg.textContent = 'Please select different country';
    }else{
    const url = `https://api.frankfurter.app/latest?base=${from}&symbols=${to}`;
    const getFetch = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const convertedAmount = (inputAmount * data.rates[to]).toFixed(2);
            msg.textContent = `${inputAmount} ${from} = ${convertedAmount} ${to}`;
        } catch (error) {
            console.error('Error fetching data:', error);
            msg.textContent = 'Error fetching data.';
        }
    };
    getFetch();
}
}