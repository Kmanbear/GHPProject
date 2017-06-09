function inRange(x,min,max){
  return x >= min && x <= max;
}

/*fixing the Javascript mod bug? % really means remainder :(*/
function mod(n, m) {
  return ((n % m) + m) % m;
}

function gcd(a, b) {
    if (b) {
        return gcd(b, a % b);
    } else {
        return Math.abs(a);
    }
}

function caesarEncrypt(){
  var message = document.caesar_encrypt.message.value;
  var key = document.caesar_encrypt.key.value;
  var messageArray = []; /*Every altered letter is added to the end of this empty set */
  for(i=0; i<message.length; i++){
    var messageCode = message.charCodeAt(i);/*gets ASCII value from letter*/
    if (inRange(messageCode, 65, 90))/*uppercase*/{
      messageArray.push(String.fromCharCode((messageCode - 65 + (key % 26)) % 26 + 65));/*This adds the key to ASCII value, going down alphabet*/
    }
    else if (inRange(messageCode, 97, 122))/*lower case*/{
      messageArray.push(String.fromCharCode((messageCode - 97 + (key % 26)) % 26 + 97));
    }
    else{/*any other character not a letter*/
      messageArray.push(String.fromCharCode(messageCode));
    }
  }
  var messageFinal = messageArray.join('');/*converts array to string*/
  document.getElementById('Encrypted').innerHTML = messageFinal;
}

function caesarDecrypt(){
  var message = document.caesar_decrypt.message.value;
  var key = document.caesar_decrypt.key.value;
  var messageArray = []; /*Every altered letter is added to the end of this empty set */
  for(i=0; i<message.length; i++){
    var messageCode = message.charCodeAt(i);/*gets ASCII value from letter*/
    if (inRange(messageCode, 65, 90))/*uppercase*/{
      messageArray.push(String.fromCharCode(mod ((messageCode - 65 - (key % 26)), 26) + 65));/*This adds the key to ASCII value, going down alphabet*/
    }
    else if (inRange(messageCode, 97, 122))/*lower case*/{
      messageArray.push(String.fromCharCode(mod ((messageCode - 97 - (key % 26)), 26) + 97));
    }
    else{/*any other character not a letter*/
      messageArray.push(String.fromCharCode(messageCode));
    }
  }
  var messageFinal = messageArray.join('');/*converts array to string*/
  document.getElementById('Decrypted').innerHTML = messageFinal;
}

function modifyKey(keyScript){
  var modifiedKey = [];
  for (i=0; i<keyScript.length; i++){
    if (inRange(keyScript.charCodeAt(i), 65, 90)){
      modifiedKey.push((keyScript.charCodeAt(i) - 65));
    }
    else if (inRange(keyScript.charCodeAt(i), 97, 122)){
      modifiedKey.push((keyScript.charCodeAt(i) - 97));
    }
  }
  return modifiedKey;
}

function vigenereEncrypt(){
  var message = document.vigenere_encrypt.message.value;
  var keyScript = document.vigenere_encrypt.key.value;
  var modifiedKey = modifyKey(keyScript);
  var messageArray = []; /*Every altered letter is added to the end of this empty set */
  var x = 0;
  for(i=0; i<message.length; i++){
    var messageCode = message.charCodeAt(i);/*gets ASCII value from letter*/
    if (messageCode < 65 || (messageCode > 90 && messageCode < 97)|| messageCode > 122){
      messageArray.push(String.fromCharCode(messageCode));
    }
    else{
      var key = modifiedKey[x % modifiedKey.length];
      if (inRange(messageCode, 65, 90))/*uppercase*/{
        messageArray.push(String.fromCharCode((messageCode - 65 + (key % 26)) % 26 + 65));/*This adds the key to ASCII value, going down alphabet*/
      }
      else /*lower case*/{
        messageArray.push(String.fromCharCode((messageCode - 97 + (key % 26)) % 26 + 97));
      }
      x++;
    }
  }
  var messageFinal = messageArray.join('');/*converts array to string*/
  document.getElementById('Vigenere_Encrypted').innerHTML = messageFinal;
}

function vigenereDecrypt(){
  var message = document.vigenere_decrypt.message.value;
  var keyScript = document.vigenere_decrypt.key.value;
  var modifiedKey = modifyKey(keyScript);
  var messageArray = []; /*Every altered letter is added to the end of this empty set */
  var x = 0;
  for(i=0; i<message.length; i++){
    var messageCode = message.charCodeAt(i);/*gets ASCII value from letter*/
    if (messageCode < 65 || (messageCode > 90 && messageCode < 97)|| messageCode > 122){
      messageArray.push(String.fromCharCode(messageCode));
    }
    else{
      var key = modifiedKey[x % modifiedKey.length];
      if (inRange(messageCode, 65, 90))/*uppercase*/{
        messageArray.push(String.fromCharCode(mod((messageCode - 65 - (key % 26)),26) + 65));/*This adds the key to ASCII value, going down alphabet*/
      }
      else /*lower case*/{
        messageArray.push(String.fromCharCode(mod((messageCode - 97 - (key % 26)), 26) + 97));
      }
      x++;
    }
  }
  var messageFinal = messageArray.join('');/*converts array to string*/
  document.getElementById('Vigenere_Decrypted').innerHTML = messageFinal;
}

function phi(){
  var n = document.phiN.number.value;
  var factoredN = n;
  var a = 2;
  var fractionsArray = [];/**stores all fractions in order to be multiplied at the end in the form (1- 1/p)**/
  while (a <= n){
    if (factoredN % a === 0){
      var fraction = 1 - (1 / a);
      fractionsArray.push(fraction);
      while (factoredN % a === 0)
        factoredN = factoredN / a;
      a++;
    }
    else{
      a++;
    }
  }
  var phiN = n;
  for (i=0; i<fractionsArray.length; i++){
    phiN = phiN * fractionsArray[i];
  }
  document.getElementById('phiNCalculated').innerHTML = 'Phi(n): ' + Math.floor(phiN);
}

function generateE(){
  var phiN = document.e.number.value;
  for(e=3; e<100; e++){
    var originalE = e;
    if (gcd(e, phiN) === 1){
      document.getElementById('eCalculated').innerHTML = originalE;
      break;
    }
  }
}

function generateD(){
  console.log('Hello?');
  var coefficientList = [];
  var originalMod = document.inverseMod.n.value;
  var mod1 = originalMod; //duplicate in order save value of number when assigning values to variables
  var mod2 = originalMod;
  var mod3 = originalMod;
  var number = document.inverseMod.a.value;
  var number2 = number;
  if (number == 1){
    var x = originalMod - 1;
    document.getElementById('inverseModulo').innerHTML = "a = " + x;
    document.getElementById('mod').innerHTML = originalMod;
    document.getElementById('number').innerHTML = -1 * x;
  }
  else{
    //start of Euclidean algorithm  (storing coefficients)
    while (number !== 0){
      coefficientList.push(-1 * (Math.floor(mod1 / number)));
      mod1 = number;
      number = originalMod % number;
      originalMod = mod1;
    }
    if (mod1 === 1) {
      coefficientList.pop(); /*getting rid of unnecessary last coefficient, starting the Ext. Euclidean Algorithm*/
      var a = 1;
      var originalA = a;
      var b = coefficientList[coefficientList.length - 1];
      for (i = coefficientList.length - 2; i >= 0; i--){
        a = b;
        b = originalA + b * coefficientList[i];
        originalA = a;
      }
      document.getElementById('inverseModulo').innerHTML = "x = " + b;
      document.getElementById('mod').innerHTML = a * mod3;
      document.getElementById('number').innerHTML = b * number2;
    }
    else{
      document.getElementById('inverseModulo').innerHTML = "a and n are not coprime. Nice going, pal...";
      document.getElementById('mod').style.display = 'none';
      document.getElementById('number').style.display = 'none';
    }
  }
}

//this is the start of the grand finale! The RSA Key Generation!
function rsaKeyGenerator(){
  var p = document.rsaKeyGeneration.prime1.value;
  var q = document.rsaKeyGeneration.prime2.value;
  var n = p * q;
  var totientN = (p - 1) * (q - 1);
  var e = generateEModified(totientN);
  var d = generateDModified(totientN, e);
  document.getElementById('publicKey').innerHTML = 'Public key modulo: ' + n + ', ' + 'Public key: ' + e;
  document.getElementById('privateKey').innerHTML = 'Private key: ' + d;
}

function generateEModified(totientN){
  for(e=3; e<100; e++){
    var originalE = e;
    if (gcd(e, totientN) === 1){
      return originalE;
      break;
    }
  }
}

function generateDModified(totientN, e){
  var coefficientList = [];
  var originalMod = totientN;
  var mod1 = originalMod; //duplicate in order save value of number when assigning values to variables
  var mod2 = originalMod;
  var mod3 = originalMod;
  var number = e;
  var number2 = number;
  //start of Euclidean algorithm  (storing coefficients)
  while (number !== 0){
    coefficientList.push(-1 * (Math.floor(mod1 / number)));
    mod1 = number;
    number = originalMod % number;
    originalMod = mod1;
  }
    coefficientList.pop(); /*getting rid of unnecessary last coefficient, starting the Ext. Euclidean Algorithm*/
    var a = 1;
    var originalA = a;
    var b = coefficientList[coefficientList.length - 1];
    for (i = coefficientList.length - 2; i >= 0; i--){
      a = b;
      b = originalA + b * coefficientList[i];
      originalA = a;
    }
    return mod(b, mod3);
}

//modular exponentiation

function modularExponentiation1(){
  var number = document.moduloExponentiation.number.value;
  var exp = document.moduloExponentiation.exponent.value;
  var mod1 = document.moduloExponentiation.modulo.value;
  document.getElementById('moduloRemainder').innerHTML = modularExponentiation(number, exp, mod1);
}

function modularExponentiation2(){
  var number = document.moduloExponentiation2.number2.value;
  var exp = document.moduloExponentiation2.exponent2.value;
  var mod1 = document.moduloExponentiation2.modulo2.value;
  document.getElementById('moduloRemainder2').innerHTML = modularExponentiation(number, exp, mod1);
}

function modularExponentiation(number, exp, mod1){
  number = parseInt(number);
  exp = parseInt(exp);
  mod1 = parseInt(mod1);
  exp = exp.toString(2); //converts exponent to binary
  var remainder = mod(number, mod1);
  var finalRemainder = 1;
  for (i = exp.length - 1; i >= 0; i--){
    if (exp[i] == 1){ //if binary digit is one
      finalRemainder = finalRemainder * remainder;
      remainder = mod(Math.pow(remainder, 2), mod1);//squaring remainder and taking mod
    }
    else{//if binary digit is zero
      remainder = mod(Math.pow(remainder, 2), mod1);//squaring remainder and taking mod
    }
    finalRemainder = mod(finalRemainder, mod1);
  }
  return finalRemainder;
}