const wordElement = document.getElementById('word');
// console.log(wordElement);

const popup = document.getElementById('popup-container');
// console.log(popup);

const messageElement = document.getElementById('success-message');
// console.log(messageElement);

const wrongLettersElement = document.getElementById('wrong-letters');
// console.log(wrongLettersElement);

const items = document.querySelectorAll('.item');
// console.log(items);

const message = document.getElementById('message');
// console.log(message);

const PlayAgainBtn = document.getElementById('play-again');
// console.log(PlayAgainBtn);

const correctLetters = [];
const wrongLetters = [];
let selectedWord = randomWord();

function randomWord() {
 const words = ["MERSİN", "BELGESEL", "NATIONAL", "BALIK", "COMPUTER", "SEYAHAT", "ASTRONOMİ", "TEKNOLOJİ"];
 return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
 wordElement.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join('')}    
    `;

 const w = wordElement.innerText.replace(/\n/g, '');
 if (w === selectedWord) {
  popup.style.display = 'flex';
  messageElement.innerText = 'Tebrikler kazandınız.';
 }
}

function updateWrongLetters() {
 wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı harfler ;</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `;

 items.forEach((item, index) => {
  const errorCount = wrongLetters.length;

  if (index < errorCount) {
   item.style.display = 'block';
  } else {
   item.style.display = 'none';
  }
 })

 if (wrongLetters.length === items.length) {
  popup.style.display = 'flex';
  messageElement.innerText = 'Maalesef Kaybettiniz.';
 }
}

function displayMessage() {
 message.classList.add('show');

 setTimeout(function () {
  message.classList.remove('show');
 }, 2000);
}

PlayAgainBtn.addEventListener('click', function () {
 correctLetters.splice(0);
 wrongLetters.splice(0);

 selectedWord = randomWord();
 displayWord();
 updateWrongLetters();

 popup.style.display = 'none';
});

window.addEventListener('keydown', function (e) {
 if (e.keyCode >= 65 && e.keyCode <= 90) {
  const letter = e.key;

  if (selectedWord.includes(letter)) {
   if (!correctLetters.includes(letter)) {
    correctLetters.push(letter);
    displayWord();
   } else {
    displayMessage();
   }
  } else {
   if (!wrongLetters.includes(letter)) {
    wrongLetters.push(letter);
    updateWrongLetters();
   }
   else {
    displayMessage();
   }
  }
 }
});

displayWord()