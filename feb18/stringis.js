function alphaOrderis(givenString) {
  let cleaned = givenString.replace(/[^a-z]/gi, '')
  // return cleaned;
  
  let sorted = cleaned.split('').sort((a,b)=>{
    a = a.toLowerCase();
    b = b.toLowerCase();
    if(a < b){
      return -1;
    } else if(a > b){
      return 1;
    } else{
      return 0;
    }
  })
  

givenString.split('').forEach((ogChar, idx) => {
  if (ogChar.match(/[^a-z]/gi)) {
    sorted.splice(idx, 0, ogChar)
  }
})
  return sorted.join('');
}
                      
// console.log(alphaOrderis('Hello, have a nice day!')) // aaacd, eeeH h illn ovy!                 


function caseSwitchis(string) {
  return string.split('').map(char => {
    if (char.match(/[a-z]/)) {
      return char.toUpperCase();
    } else if (char.match(/[A-Z]/)) {
      return char.toLowerCase();
    } else {
      return char;
    }
  }).join('')
  
}

// console.log(caseSwitchis('Abcd_xkLL?')); // aBCD_Xkll?

module.exports = {alphaOrderis, caseSwitchis}