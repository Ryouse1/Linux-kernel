const term = new Terminal({
  cursorBlink: true
});
term.open(document.getElementById("terminal"));

function prompt() {
  term.write(`\r\nuser@web-linux:${cwd}$ `);
}

term.writeln("Web Linux 0.1");
prompt();

let input = "";

term.onData(e => {
  if (e === "\r") {
    runCommand(input.trim());
    input = "";
    prompt();
  } else if (e === "\u007F") {
    if (input.length > 0) {
      input = input.slice(0, -1);
      term.write("\b \b");
    }
  } else {
    input += e;
    term.write(e);
  }
});

function runCommand(cmd) {
  if (cmd === "ls") {
    term.writeln(Object.keys(fs["/"]).join("  "));
  } else if (cmd === "pwd") {
    term.writeln(cwd);
  } else if (cmd === "clear") {
    term.clear();
  } else if (cmd === "neofetch") {
    term.writeln("OS: Web Linux");
    term.writeln("Kernel: JavaScript");
    term.writeln("Shell: fake-bash");
  } else {
    term.writeln(`bash: ${cmd}: command not found`);
  }
}
