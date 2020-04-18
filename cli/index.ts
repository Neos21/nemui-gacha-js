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
    const input = process.argv.slice(2, process.argv.length).join(' ').trim();
    const result = nemuiGacha.exec(input, tokenizer);
    console.log(result);
  }
  catch(error) {
    console.error('Failed to exec : ', error);
  }
});
