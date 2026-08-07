/**
 * Characterizes the inventory output over thirty days with a Jest snapshot.
 */

describe('Gilded Rose Approval', () => {

  let gameConsoleOutput: string;
  let originalConsoleLog: (message: any) => void;
  let originalProcessArgv: string[]

  function gameConsoleLog(msg: string) {
    if (msg) {
      gameConsoleOutput += msg;
    }
    gameConsoleOutput += "\n";
  }

  beforeEach(() => {
    // prepare capturing console.log to our own gameConsoleLog.
    gameConsoleOutput = "";
    originalConsoleLog = console.log;
    console.log = gameConsoleLog;
    originalProcessArgv = process.argv;
  });

  afterEach(() => {
    // reset original console.log
    console.log = originalConsoleLog;
    process.argv = originalProcessArgv;
  });

  it('matches the inventory simulation over thirty days', () => {
    process.argv = ["<node>", "<script", "30"];
    require('../golden-master-text-test.ts');
       
    expect(gameConsoleOutput).toMatchSnapshot();
  });

});
