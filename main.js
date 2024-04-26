const readlineSync = reequire('readline-sync');

// 유저로부터 이름을 입력받아 출력합니다.
const name = readlineSyncModule.question('이름 입력: ');
console.log(`입력받은 이름: ${name}`);