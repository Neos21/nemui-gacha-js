/**
 * エントリポイント
 * 
 * @param input 入力文字列
 * @param tokenizer kuromoji の tokenizer
 * @return 入力文字列をランダムに否定形にした文字列
 * @throws 引数不正・否定形変換に失敗した場合
 */
function exec(input: string, tokenizer: { tokenize: Function }): string {
  if(input === undefined || input === null || input.trim() === '') {
    throw new Error('input is null');
  }
  if(tokenizer === undefined || tokenizer === null) {
    throw new Error('tokenizer is null');
  }
  
  // トリムする
  input = input.trim();
  // 末尾に「ガチャ」の文字列が遭ったら除去する
  const removedInput = removeGacha(input);
  // 「ガチャ」としか書かれていなかったら終わり
  if(removedInput === '') {
    return input + 'じゃない';
  }
  
  // 先に否定形に変換できるかどうか確認する
  const negative = parseNegative(removedInput, tokenizer);
  // 全く変換されていなかったらエラーを返す
  if(removedInput === negative) {
    throw new Error('Failed to parse negative');
  }
  
  // 否定形に変換するかどうかランダムに決める
  const isParseNegative = (Math.random() >= 0.5);
  
  // 否定形か「ガチャ」を除去した入力文字列を返す
  return isParseNegative ? negative : removedInput;
}

/**
 * 末尾に「ガチャ」の文字列があったら除去する
 * 
 * @param input 入力文字列
 * @return 末尾に「ガチャ」の文字列があったら除去した文字列・そうでなければ入力文字列そのまま
 */
function removeGacha(input: string): string {
  const removed = input.replace((/(ガチャ|ｶﾞﾁｬ|がちゃ)$/u), '');
  return removed;
}

/**
 * 否定形に変換する
 * 
 * @param input 入力文字列
 * @param tokenizer kuromoji の tokenizer
 * @return 入力文字列を否定形にした文字列
 */
function parseNegative(input: string, tokenizer: { tokenize: Function }): string {
  const parsed = tokenizer.tokenize(input);
  
  // 変換する節の位置と変換したい文字列を控える配列
  const replaces: Array<{ index: number, word: string }> = [];
  
  // 最後の節を検索する
  const lastIndex = parsed.length - 1;
  const last = parsed[lastIndex];
  if(last.pos === '形容詞') {
    if(last.surface_form.endsWith('い')) {
      replaces.push({ index: lastIndex, word: last.surface_form.replace((/い$/u), 'くない') });
    }
  }
  else if(last.pos === '動詞') {
    if(last.surface_form.match((/(す|ず)(る|れ)$/u))) {
      replaces.push({ index: lastIndex, word: last.surface_form.replace((/す(る|れ)$/u), 'すない').replace((/ず(る|れ)$/u), 'じない') });
    }
    else if(last.conjugated_type === '一段') {
      replaces.push({ index: lastIndex, word: last.surface_form.replace((/る$/u), 'ない') });
    }
    else if(last.conjugated_type.startsWith('五段')) {
      replaces.push({ index: lastIndex, word: last.surface_form
        .replace((/う$/u), 'わ').replace((/く$/u), 'か').replace((/す$/u), 'さ').replace((/つ$/u), 'た').replace((/ぬ$/u), 'な')
        .replace((/ふ$/u), 'は').replace((/む$/u), 'ま').replace((/ゆ$/u), 'や').replace((/る$/u), 'ら') + 'ない' });
    }
  }
  else if(last.pos === '助動詞') {
    if(last.surface_form === 'た' && parsed.length >= 2) {
      // 「た」の場合、手前の節を確認するので、手前に節がない場合は処理をしない
      const prevIndex = parsed.length - 2;
      const prev = parsed[prevIndex];
      if(prev.pos === '動詞' && ['て', 'い'].includes(prev.surface_form)) {
        replaces.push({ index: lastIndex, word: 'なかった' });
      }
      else if(prev.surface_form === '来') {
        replaces.push({ index: lastIndex, word: 'ない' });
      }
      else if(prev.surface_form.endsWith('い')) {
        replaces.push({ index: lastIndex, word: 'てない' });
      }
      else if(prev.pos === '形容詞') {
        // 直前の文字列の「基本形」を利用し、末尾が形容詞だった場合と同じ変換を行う
        if(prev.basic_form.endsWith('い')) {
          replaces.push({ index: prevIndex, word: prev.basic_form.replace((/い$/u), 'くなかっ') }); // 末尾の「た」をそのまま使う
        }
      }
      else if(prev.pos === '動詞') {
        // 直前の文字列の「基本形」を利用し、末尾が動詞だった場合と同じ変換を行う
        if(prev.conjugated_type === '一段') {
          replaces.push({ index: prevIndex, word: prev.basic_form.replace((/る$/u), 'なかっ') });
        }
        else if(prev.conjugated_type.startsWith('五段')) {
          replaces.push({ index: prevIndex, word: prev.basic_form
            .replace((/う$/u), 'わ').replace((/く$/u), 'か').replace((/す$/u), 'さ').replace((/つ$/u), 'た').replace((/ぬ$/u), 'な')
            .replace((/ふ$/u), 'は').replace((/む$/u), 'ま').replace((/ゆ$/u), 'や').replace((/る$/u), 'ら') + 'なかっ' });
        }
      }
    }
    else if(last.surface_form === 'たい') {
      replaces.push({ index: lastIndex, word: 'たくない' });
    }
    else if(last.surface_form === 'ない') {
      replaces.push({ index: lastIndex, word: 'なくない' });
    }
    else if(last.surface_form === 'ます') {
      replaces.push({ index: lastIndex, word: 'ません' });
    }
  }
  else if(last.pos === '助詞') {
    if(last.surface_form === 'て') {
      replaces.push({ index: lastIndex, word: 'ない' });
    }
  }
  else if(last.pos === '名詞') {
    if(['固有名詞', '一般', '代名詞'].includes(last.pos_detail_1)) {
      replaces.push({ index: lastIndex, word: last.surface_form + 'じゃない' });
    }
    else if(['サ変接続', '接尾'].includes(last.pos_detail_1)) {
      replaces.push({ index: lastIndex, word: last.surface_form + 'しない' });
    }
  }
  
  // 変換する
  const result = parsed.reduce((prev: string, current: any, index: number) => {
    const replaceFound = replaces.find(replace => replace.index === index);
    return prev + (replaceFound ? replaceFound.word : current.surface_form);
  }, '');
  return result;
}

/** nemuiGacha */
const nemuiGacha = {
  exec,
  removeGacha,
  parseNegative
};

export default nemuiGacha;
