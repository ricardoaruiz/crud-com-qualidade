import fs from 'fs';

const DB_FILE_PATH = './core/db';

function create(content: string) {
  fs.writeFileSync(DB_FILE_PATH, content);
  console.log('Arquivo criado com sucesso!');
}

// [SIMULATUION]
create('Testando a persistencia no arquivo!');