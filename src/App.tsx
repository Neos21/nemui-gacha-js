import React from 'react';

import * as kuromoji from 'kuromoji';

import nemuiGacha from './lib/index';

import './App.scss';

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
    this.setState({
      result: nemuiGacha.parseNegative(this.state.input, this.state.tokenizer)  // TODO : ガチャを実装する
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
