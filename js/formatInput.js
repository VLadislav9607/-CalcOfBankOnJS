
const currencyFormatter = new Intl.NumberFormat('ru-Ru', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const formatterDicimals = new Intl.NumberFormat('ru-Ru', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });



//Знаходим інпути

const inputCost = document.querySelector('#input-cost');
const inputDownpayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');
const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const totalMonthPayment = document.querySelector('#total-month-payment');

//запускаємо готовий форматер для ціни в інпутах

const cleavePriceSetting = {
   numeral: true,
   numeralThousandsGroupStyle: 'thousand',
   delimiter: ' '
}

const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownpayment = new Cleave(inputDownpayment, cleavePriceSetting);
const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting);




//Розрахунок ціни
calcCredit();


form.addEventListener('input', function () {
   calcCredit();
});

function calcCredit() {

   //Сумма кредиту

   const totalAmount = +cleaveCost.getRawValue() - cleaveDownpayment.getRawValue();
   totalCost.innerText = currencyFormatter.format(totalAmount);

   //Ставка по кредиту

   const rate = document.querySelector('.radio-hidden:checked').value;
   console.log(rate)

   //Щомісячна ставка по кредиту

   const creditRateMonth = (rate * 100) / 12;

   //Термін в роках

   const years = +cleaveTerm.getRawValue();

   //Термін в місяцях

   const months = years * 12;

   //Розрахунок щомісячного платежа

   const monthPayment = (totalAmount * creditRateMonth) / (1 - (1 + creditRateMonth) * (1 - months));

   totalMonthPayment.innerText = formatterDicimals.format(monthPayment);

};

//Повзунок 1

const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
   start: 12000000,
   connect: 'lower',
   step: 100000,
   range: {
      min: 0,
      '50%': [10000000, 1000000],
      max: 100000000,
   },
   format: wNumb({
      decimals: 0,
      thousand: ' ',
      suffix: ''
   })
});

// Прив'язуємо до інпута

sliderCost.noUiSlider.on('slide', function () {

   const sliderValue = parseInt(sliderCost.noUiSlider.get(true));

   inputCost.value = sliderValue;
   cleaveCost.setRawValue(sliderValue);
   calcCredit();
});

//Повзунок 2

const sliderDownpayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownpayment, {
   start: 6000000,
   connect: 'lower',
   tooltips: true,
   step: 100000,
   range: {
      min: 0,
      '50%': [10000000, 1000000],
      max: 90000000,
   },
   format: wNumb({
      decimals: 0,
      thousand: ' ',
      suffix: ''
   })
});

// Прив'язуємо до інпута

sliderDownpayment.noUiSlider.on('slide', function () {

   const sliderDownpaymentValue = parseInt(sliderDownpayment.noUiSlider.get(true));

   inputDownpayment.value = sliderDownpaymentValue;
   cleaveDownpayment.setRawValue(sliderDownpaymentValue);
   calcCredit();
});

//Повзунок 3

const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
   start: 5,
   connect: 'lower',
   tooltips: true,
   step: 1,
   range: {
      min: 1,
      max: 30,
   },
   format: wNumb({
      decimals: 0,
      thousand: ' ',
   })
});

// Прив'язуємо до інпута

sliderTerm.noUiSlider.on('slide', function () {

   const sliderTermValue = parseInt(sliderTerm.noUiSlider.get(true));

   sliderTerm.value = sliderTermValue;
   cleaveTerm.setRawValue(sliderTermValue);
   calcCredit();
});