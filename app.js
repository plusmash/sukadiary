const express = require('express');
const mysql = require('mysql');//sql読み込み
const app = express();

app.use(express.static('public')); //publicを読み込ませる これが必要だ


//mysqlの接続状況
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9011',//[]いらん
  database: 'list_app'
});

//接続エラー時の処理
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

//MySQLから情報を取得して表示するためのコード,つまり/のルーティング
//今回は、ローカルホストにアクセスしたときにDBの内容がconsole.logに表示されるようなコード
app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      console.log(results);
      res.render('top.ejs');
    }
  );
});

//URL 「/intro」にアクセスしたとき
app.get('/intro', (req, res) => {
  ///introを表示する処理を記述する
  res.render('intro.ejs');//指定したファイルを画面に表示

});



app.listen(3000);
