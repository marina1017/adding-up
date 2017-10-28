'use strict';
//モジュール呼び出し fs= filesystem
const fs = require('fs');
//readlineはファイルを一行ずつ読み込むモジュール
const readline = require('readline');
//ファイルからファイルを読み込み
const rs = fs.ReadStream('./popu-pref.csv');
//readlineのオブジェクトのinputとして設定
const rl = readline.createInterface({'input':rs,'output':{}});
//key: 都道府県 value: 集計データのオブジェクト
const map = new Map();
//rlオブジェクトでlineイベントが発生したら無名関数を読んだほしいイベント関数
rl.on('line',(lineString) => {
//lineStringで与えられた文字列をカンマで分割
	const columns = lineString.split(',');
//parseIntは文字列を整数値に変換
	const year = parseInt(columns[0]);
	const prefecture = columns[2];
	const popu = parseInt(columns[7]);
	if( year === 2010 || year === 2015 ){

		//連想配列mapからデータを取得
		let value = map.get(prefecture);
		if (!value) {
			value = {
				popu10: 0,
				popu15: 0,
				change: null
			};
		}
		if (year === 2010) {
			value.popu10 += popu;
		}
		if (year === 2015) {
			value.popu15 += popu;
		}
		map.set(prefecture, value);
	}
});
//ストリームに情報を流し始める処理
rl.resume();
rl.on('close', () => {
	console.log(map)
});
