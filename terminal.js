const term = new Terminal({ cursorBlink:true, convertEol:true });
term.open(document.getElementById("terminal"));

loadState();
bootCount++;
saveState();

function prompt() {
  term.write(`\r\nuser@web-linux:${cwd}$ `);
}

bootAnimation(term, ()=>{
  term.writeln(`Web Linux v1.0 (boot #${bootCount})`);
  prompt();
});

let input = "";

term.onData(e=>{
  if(e==="\r"){
    term.write("\r\n");
    runCommand(input.trim());
    input="";
    prompt();
  } else if(e==="\u007F"){
    if(input.length>0){
      input=input.slice(0,-1);
      term.write("\b \b");
    }
  } else {
    input+=e;
    term.write(e);
  }
});

function runCommand(cmd){
  if(!cmd) return;

  if(cmd==="help"){
    term.writeln("ls pwd clear neofetch fps free help rm exit");
  }
  else if(cmd==="ls"){
    term.writeln("bin  home  usr");
  }
  else if(cmd==="pwd"){
    term.writeln(cwd);
  }
  else if(cmd==="clear"){
    term.clear();
  }
  else if(cmd==="neofetch"){
    term.writeln("OS: Web Linux");
    term.writeln("Kernel: JavaScript");
    term.writeln(`FPS: ${fps}`);
  }
  else if(cmd==="fps"){
    term.writeln(`FPS: ${fps}`);
  }
  else if(cmd==="free"){
    const r=getRAM();
    term.writeln(`Mem: ${r.used}MB / ${r.total}MB ${r.real?"":"(simulated)"}`);
  }
  else if(cmd==="rm -rf /"){
    term.writeln("\x1b[31mSegmentation fault\x1b[0m");
    while(true){}
  }
  else if(cmd==="exit"){
    term.writeln("logout");
  }
  else{
    term.writeln(`bash: ${cmd}: command not found`);
  }

  saveState();
}
