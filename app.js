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
	for (let pair of map ){
		const value = pair[1];
		value.change = value.popu15 / value.popu10;
	}
	//連想配列を普通の配列に変換
	//sortに対して渡す関数を比例関数並び替えのルールを決めれる
	//前者の引数を後者の引数より前にしたい場合 負の整数を返す
	//前にしたい場合 正の整数を返す
	//並びをそのままにしたい場合0を返せばいい
	const rankingArray = Array.from(map).sort((pair1, pair2) => {
		return pair2[1].change - pair1[1].change;
	});
	//連想配列のMapとは違うmap 各要素に関数を適用し新しい配列を作る
	const rankingStrings = rankingArray.map((pair) => {
		return pair[0] + ':' + pair[1].popu10 + '=>' + pair[1].popu15 + '変化率:' + pair[1].change;
	});
	console.log(rankingStrings)
});

