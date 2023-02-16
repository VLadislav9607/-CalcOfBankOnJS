
const percentFormatter = new Intl.NumberFormat('ru-Ru', { style: 'percent', maximumFractionDigits: 3 });




//Відсоток програм

const programBase = 0.12;
const programIT = 0.047;
const programGov = 0.067;
const programZero = 0.108;



//Вказуємо % в радіокнопках

document.querySelector('#base-value').value = programBase;
document.querySelector('#it-value').value = programIT;
document.querySelector('#gov-value').value = programGov;
document.querySelector('#zero-value').value = programZero;

//Підставляємо % в кнопки


document.querySelector('#base-text').innerText = percentFormatter.format(programBase);
document.querySelector('#it-text').innerText = percentFormatter.format(programIT);
document.querySelector('#gov-text').innerText = percentFormatter.format(programGov);
document.querySelector('#zero-text').innerText = percentFormatter.format(programZero);



//Клік на інпути, щоб вибирало потрібний відсоток і виводим в правий блок

const programInputs = document.querySelectorAll('input[name="program"]');
const totalPercent = document.querySelector('#total-percent');


programInputs.forEach((input) => {

   input.addEventListener('click', function () {
      totalPercent.innerText = percentFormatter.format(this.value);


   })

   //Відображення ставки на старті

   if (input.checked) {
      totalPercent.innerText = percentFormatter.format(input.value);
   }


})