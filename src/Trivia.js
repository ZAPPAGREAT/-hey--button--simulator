import './App.css';
import React, { useState } from 'react';
import './stylesheet.css'; // スタイルは別ファイルに分ける

function Trivia() {
  const [count, setCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [volume, setVolume] = useState(0.5); // 音量の状態を追加
  
  const handleClick = () => {
    if (count < 20) {
      setCount(count + 1);
      setIsPressed(true);
      
      // 音声を再生（音量調整付き）
      const audio = new Audio('/audio/hee.mp3');
      audio.volume = volume; // 音量を設定
      audio.play().catch(error => {
        console.log('音声再生エラー:', error);
      });
      
      // 少し遅れて画像を元に戻す
      setTimeout(() => {
        setIsPressed(false);
      }, 200);
    }
  };

  // リセット機能
  const handleReset = () => {
    setCount(0);
  };

  // 音量変更機能
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="hee-button-wrapper">
      {/* 音量調整スライダー */}
      <div className="volume-control">
        <label htmlFor="volume">音量: </label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <span>{Math.round(volume * 100)}%</span>
      </div>

      {/* ボタン全体をラップ */}
      <div
        className="hee-button"
        onClick={handleClick}
      >
        {/* 画像部分 */}
        <img
          src={isPressed ? "/images/trivia-ps.png" : "/images/trivia-st.png"}
          alt="へぇボタン"
          className="hee-button-img"
        />
        {/* 数字を画像の上に配置 */}
        <div className={`display ${count >= 20 ? 'max-count' : ''}`}>
          {count}
        </div>
      </div>

      {/* リセットボタン */}
      <button 
        className="reset-button" 
        onClick={handleReset}
        disabled={count === 0}
      >
        リセット
      </button>
    </div>
  );
}

export default Trivia;