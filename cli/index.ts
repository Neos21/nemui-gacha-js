import * as path from'path';

import * as kuromoji from 'kuromoji';

import nemuiGacha from '../src/lib/index';

if(process.argv.length <= 2) {
  console.error('Please input text.');
  process.exit(1);
}

kuromoji.builder({
  dicPath: path.resolve(__dirname, '../public/dict')  // './node_modules/kuromoji/dict'
}).build((error, tokenizer) => {
  if(error) {
    throw error;
  }
  
  try {
    if(process.argv[2] === '--force') {
      // 第1引数で --force を指定していたら、第2引数以降を使って強制的に否定形に変換する
      const input = process.argv.slice(3, process.argv.length).join(' ').trim();
      const result = nemuiGacha.exec(input, tokenizer, true);
      console.log(result);
    }
    else {
      // そうでなければ全ての引数を使ってランダムに否定形に変換する
      const input = process.argv.slice(2, process.argv.length).join(' ').trim();
      const result = nemuiGacha.exec(input, tokenizer);
      console.log(result);
    }
  }
  catch(error) {
    if(error instanceof nemuiGacha.InvalidArgumentsError) {
      console.error('Invalid Arguments : ', error.message);
    }
    else if(error instanceof nemuiGacha.ParseNegativeRuntimeError) {
      console.error('Runtime error : ', error);
    }
    else if(error instanceof nemuiGacha.ParseNegativeFailedError) {
      console.error('Failed to parse negative : ', error.message);
    }
    else {
      console.error('Failed to exec : ', error);
    }
  }
});
