
var params = process.argv.slice(2);

var numero1=parseInt(params[0]);
var numero2=parseInt(params[1]);
var plantilla = `
La suma de ${numero1} + ${numero2} es ${numero1+numero2}
La resta de ${numero1} - ${numero2} es ${numero1-numero2}
La multiplicacion de ${numero1} * ${numero2} es ${numero1*numero2}
La division de ${numero1} / ${numero2} es ${numero1/numero2}
`;

console.log(numero1);
console.log(numero2);
console.log(plantilla);

console.log("hola mundo");