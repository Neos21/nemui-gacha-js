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
      input          : 'ねむい',  // 入力文字列
      tokenizer      : null,      // kuromoji が生成する tokenizer を控える
      isForceNegative: false,     // 必ず否定形に変換するかどうか
      result         : '',        // 結果文字列
      error          : ''         // エラー発生時に値を入れる
    };
  }
  
  /** 初期化処理 : kuromoji の tokenizer を生成する */
  componentWillMount() {
    kuromoji.builder({
      dicPath: './dict'  // 予め kuromoji の dict/ ディレクトリを public/ 配下にコピーしておく
    }).build((error: Error, tokenizer: kuromoji.Tokenizer<any>) => {  // ジェネリクス http://js.studio-kingdom.com/typescript/handbook/generics
      // XMLHttpRequest でのエラーは try / catch でも補足できずココに到達しなかったため、特に対応しない
      if(error) {
        return console.error('Failed to build kuromoji', error);
      }
      
      this.setState({
        tokenizer: tokenizer
      });
      
      // クエリストリングが存在した場合は初期処理を行う
      if(window.location.search) {
        // 先頭の '?' を除去し連想配列を作る
        const params = window.location.search.slice(1).split('&').reduce((prev: any, current) => {
          const split = current.split('=');
          const key   = split[0];
          const value = window.decodeURIComponent(split[1]);
          prev[key] = value;
          return prev;
        }, {});
        
        // 'force' パラメータが存在すれば強制的に否定形にする (値はなんでも良い・値未指定でも 'undefined' が入る)
        if(params.force) {
          this.setState({
            isForceNegative: true
          });
        }
        
        // 'q' パラメータが存在すればその値でガチャを初期実行する
        if(params.q) {
          this.setState({
            input: params.q
          });
          this.exec();
        }
      }
    });
  }
  
  /**
   * テキストボックスの値を State で明示的に管理するために必要 : https://qiita.com/koba04/items/40cc217ab925ef651113
   * 
   * @param event イベント
   */
  onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {  // 型定義 : https://qiita.com/natsuhiko/items/5d2a526a217e05162a0a
    this.setState({
      input: event.target.value
    });
  }
  
  /**
   * チェックボックスの値を State で明示的に管理する
   * 
   * @param event イベント
   */
  onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isForceNegative: event.target.checked
    });
  }
  
  /**
   * ガチャ実行 : this.setState が undefined になるのを防ぐためアロー関数にする : https://qiita.com/kilo/items/714287a3ea41b4187545
   * 
   * @param event イベント
   */
  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();  // https://react.keicode.com/basics/react-form-basics.php
    this.setState({
      result: '',
      error: ''
    });
    this.exec();
  }
  
  /** ガチャを実行する */
  exec() {
    if(!this.state.input.trim()) {
      this.setState({
        error: 'Please input text'
      });
      return;
    }
    
    try {
      const result = nemuiGacha.exec(this.state.input, this.state.tokenizer, this.state.isForceNegative);
      this.setState({
        result: result
      });
    }
    catch(error) {
      if(error instanceof nemuiGacha.InvalidArgumentsError || error instanceof nemuiGacha.ParseNegativeFailedError) {
        this.setState({
          error: error.message
        });
      }
      else if(error instanceof nemuiGacha.ParseNegativeRuntimeError) {
        this.setState({
          error: '(Runtime Error) ' + error.message
        });
      }
      else {
        this.setState({
          error: 'Unexpected Error'
        });
      }
    }
  }
  
  /** レンダリングする */
  render() {
    const header = (
      <header>
        <h1>Nemui Gacha</h1>
      </header>
    );
    const footer = (
      <footer>
        <div className="links">
          <span>Author : <a href="http://neo.s21.xrea.com/"  target="_blank" rel="noopener noreferrer">Neo</a></span>
          <span><a href="https://github.com/Neos21/nemui-gacha-js/" target="_blank" rel="noopener noreferrer">GitHub</a></span>
        </div>
      </footer>
    );
    
    if(!this.state.tokenizer) {
      return (
        <div className="app">
          {header}
          <main className="loading">
            <div className="progress-wrapper">
              <div className="progress">Loading...</div>
            </div>
          </main>
          {footer}
        </div>
      );
    }
    
    return (
      <div className="app">
        {header}
        <main>
          <form onSubmit={this.onSubmit}>
            <div className="input-form">
              <input type="text" className="input" value={this.state.input} onChange={this.onChangeText} placeholder="ねむい" />
              <span className="gacha">ガチャ</span>
            </div>
            <div>
              <button type="submit" className="submit" onClick={this.onSubmit} disabled={!this.state.input.trim()}>ガチャ</button>
            </div>
            <div className="is-force-negative">
              <input type="checkbox" tabIndex={-1} checked={this.state.isForceNegative} onChange={this.onChangeCheckbox} />
            </div>
          </form>
          { this.state.result &&
            <div className="result">{this.state.result}</div>
          }
          { this.state.error &&
            <div className="error">Error : {this.state.error}</div>
          }
        </main>
        {footer}
      </div>
    );
  }
}
