let bootCount = 0;

function randomHex(n=8){
  return Math.floor(Math.random()*Math.pow(16,n)).toString(16).padStart(n,"0");
}

function generateBootCode() {
  const base = [
    "init kernel","allocating memory","loading module",
    "mapping pages","starting service","checking integrity"
  ];
  const arr = [];
  for (let i=0;i<800;i++) {
    const t = Math.floor(Math.random()*4);
    if (t===0) arr.push(`${base[Math.floor(Math.random()*base.length)]} [${randomHex(6)}]`);
    else if (t===1) arr.push(`0x${randomHex()} -> MOV R${Math.floor(Math.random()*8)}, R${Math.floor(Math.random()*8)}`);
    else if (t===2) arr.push(`if (ptr_${randomHex(4)} == NULL) panic("${randomHex(6)}");`);
    else arr.push(`syscall(${Math.floor(Math.random()*400)}) = ${Math.floor(Math.random()*2)}`);
  }
  return arr;
}

const bootCode = generateBootCode();

function bootAnimation(term, done) {
  let lines = 0;
  const max = 300;
  const interval = setInterval(()=>{
    for(let i=0;i<5;i++){
      const line = bootCode[Math.floor(Math.random()*bootCode.length)];
      term.writeln(`\x1b[32m${line}\x1b[0m`);
      lines++;
    }
    if(lines>=max){
      clearInterval(interval);
      setTimeout(()=>{
        term.clear();
        done();
      },300);
    }
  },16);
}
