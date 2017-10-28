'use strict';
//モジュール呼び出し fs= filesystem
const fs = require('fs');
//readlineはファイルを一行ずつ読み込むモジュール
const readline = require('readline');
//ファイルからファイルを読み込み
const rs = fs.ReadStream('./popu-pref.csv');
//readlineのオブジェクトのinputとして設定
const rl = readline.createInterface({'input':rs,'output':{}});
//rlオブジェクトでlineイベントが発生したら無名関数を読んだほしいイベント関数
rl.on('line',(lineString) => {
//lineStringで与えられた文字列をカンマで分割
	const columns = lineString.split(',');
//parseIntは文字列を整数値に変換
	const year = parseInt(columns[0]);
	const prefecture = columns[2];
	const popu = parseInt(columns[7]);
	if( year === 2010 || year === 2015 ){
	 console.log(year);
	 console.log(prefecture);
	 console.log(popu);
	}
});
//ストリームに情報を流し始める処理
rl.resume();
