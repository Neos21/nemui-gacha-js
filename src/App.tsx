import React from 'react';

import * as kuromoji from 'kuromoji';

import './App.scss';

/**
 * 否定形に変換する
 * 
 * @param input 入力文字列
 * @param tokenizer kuromoji の tokenizer
 * @return 入力文字列を否定形にした文字列
 */
function parseNegative(input: string, tokenizer: { tokenize: Function }): string {
  if(!input || !tokenizer) {
    return '';
  }
  
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
        .replace((/ふ$/u), 'は').replace((/む$/u), 'ま').replace((/ゆ$/u), 'や').replace((/る$/u), 'ら') + 'ない' })
    }
  }
  
  const result = parsed.reduce((prev: string, current: any, index: number) => {
    const replaceFound = replaces.find(replace => replace.index === index);
    return prev + (replaceFound ? replaceFound.word : current.surface_form);
  }, '');
  
  console.log(result);
  return result;
}

export default class App extends React.Component {
  /** State : エラー回避のため型定義のみしておく */
  state: Readonly<any>;
  
  /**
   * コンストラクタ : State のダミー初期値を用意する
   * 
   * @param props Props
   */
  constructor(props: any) {
    super(props);
    this.state = {
      input    : 'ねむい',  // 入力文字列
      tokenizer: null,      // kuromoji が生成する tokenizer を控える
      result   : ''         // 結果文字列
      // TODO : 未入力時の処理
    };
  }
  
  /** 初期化処理 : kuromoji の tokenizer を生成する */
  componentWillMount() {
    kuromoji.builder({
      dicPath: '/dict'  // 予め kuromoji の dict/ ディレクトリを public/ 配下にコピーしておく
    }).build((error: Error, tokenizer: kuromoji.Tokenizer<any>) => {  // ジェネリクス http://js.studio-kingdom.com/typescript/handbook/generics
      // XMLHttpRequest でのエラーは try / catch でも補足できずココに到達しなかったため、特に対応しない
      if(error) {
        return console.error('Failed to build kuromoji', error);
      }
      
      this.setState({
        tokenizer: tokenizer
      });
      console.log('kuromoji is loaded');
    });
  }
  
  /** テキストボックスの値を State で明示的に管理するために必要 : https://qiita.com/koba04/items/40cc217ab925ef651113 */
  onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {  // 型定義 : https://qiita.com/natsuhiko/items/5d2a526a217e05162a0a
    this.setState({
      input: event.target.value
    });
  }
  
  /** ガチャ実行 : this.setState が undefined になるのを防ぐためアロー関数にする : https://qiita.com/kilo/items/714287a3ea41b4187545 */
  onExec = (event: React.FormEvent) => {
    event.preventDefault();  // https://react.keicode.com/basics/react-form-basics.php
    // TODO : ガチャを実装する
    this.setState({
      result: parseNegative(this.state.input, this.state.tokenizer)
    });
  }
  
  /** レンダリングする */
  render() {
    if(!this.state.tokenizer) {
      return (
        <div>Loading...</div>
      );
    }
    
    return (
      <div>
        <h1>Nemui Gacha JS</h1>
        <form onSubmit={this.onExec}>
          <p><input type="text" value={this.state.input} onChange={this.onChangeText} /></p>
          <p><button type="submit" onClick={this.onExec}>Button</button></p>
        </form>
        { this.state.result &&
          <p>結果 : {this.state.result}</p>
        }
      </div>
    );
  }
}
