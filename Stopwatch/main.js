//　定義　イベント
const time = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// 開始時間（日付代入用）
let startTime = 0;
// カウント
let count = 0;
// タイマー (stopに必要)
let timer;

// 時間を表示する
function displayTime() {
    const currentTime = new Date(Date.now() - startTime + count); // 現在のカウント時間取得、日付オブジェクト作成のため、Date.nowを取得
    const h = String(currentTime.getHours()-9); //なぜか9時間からスタートしてしまうため-9
    const m = String(currentTime.getMinutes());
    const s = String(currentTime.getSeconds());
    const ms = String(currentTime.getMilliseconds());

    time.textContent = `${h}:${m}:${s}:${ms}`; // htmlのそれぞれの定義に適用し、書き換え
    timer = setTimeout(displayTime, 0); // displayTimeの更新スピードをtimerに代入
}

// スタートボタンがクリックされたら時間を進める
startButton.addEventListener('click', function() {
    startButton.disabled = true; //押せないように
    stopButton.disabled = false;
    resetButton.disabled = true;
    startTime = Date.now(); //displayTime代入用
    displayTime(); //　カウント時間を表示
});

// ストップボタンがクリックされたら時間を止める
stopButton.addEventListener('click', function() {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    clearTimeout(timer); // タイマー処理を終了（ストップ）
    count += (Date.now() - startTime); // 再スタート時にリセットされないように
});

// リセットボタンがクリックされたら時間を0に戻す
resetButton.addEventListener('click', function() {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    time.textContent = '0:0:0:0'; //カウント時間表示をリセット
    count = 0; // カウント時間を0に
});