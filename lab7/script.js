//q1
const entradaArray = (entry) => {
  return Array.isArray(entry);
};

//q2
const clonaArray = (entryArr) => {
  return entryArr;
};

//q3
const obterPrimeirosElementos = (arr, n) => {
  let funcResult = [];
  if (n) {
    for (let i = 0; i < n; i++) {
      funcResult.push(arr[i]);
    }
  } else {
    funcResult = arr[0];
  }
  return funcResult;
};

//q4
const obterUltimosElementos = (arr, n) => {
  let funcResult = [];
  if (n) {
    for (let i = arr.length; n > 0; i--, n--) {
      funcResult.push(arr[i - 1]);
    }
  } else {
    funcResult = arr[arr.length - 1];
  }
  return funcResult;
};

//q5
const unirElementos = (hostString, wordsArray) => {
  wordsArray.forEach((word) => {
    hostString += word;
  });
  return hostString;
};

//q6
const separarPares = (numberString) => {
  numberString = numberString.toString();
  let stringLength = numberString.length;

  for (let i = 0; i < stringLength; i++) {
    if (
      numberString.charAt(i - 1) % 2 === 0 &&
      numberString.charAt(i) % 2 === 0
    ) {
      numberString = `${numberString.slice(0, i)}-${numberString.slice(i)}`;
      stringLength++;
    }
  }
  return numberString;
};

//q7
const itemMaisFrequente = (arr) => {
  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
};

//q8
const removerDuplicados = (arr) => {
  noDuplic = [...new Set(arr)];
  return noDuplic;
};

//q9
const somaIndividualArrays = (firstArr, secondArr) => {
  for (let i = 0; i < Math.min(firstArr.length, secondArr.length); i++) {
    console.log(firstArr[i] + secondArr[i]);
  }
};

//q10
vetorPilha = [1, 2, 3, 4, 5];
vetorAdiciona = [6, 7, 8, 9, 10];

vetorAdiciona = vetorAdiciona.reverse();
while (vetorAdiciona.length) {
  vetorPilha.push(vetorAdiciona.pop());
}
