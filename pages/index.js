import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [maxLength, setMaxLength] = useState("140");

  // ローディング処理
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // APIテスト
  const url = 'https://translation-100knock.herokuapp.com/api/hoge';
  useEffect(() => {
    axios.get(url).then((res) => {
      setInputText(res.data);
    });
  },[]);

  // 入力テキスト削除
  const handleDeleteButton = (()=>{
    setInputText("");
  })

  return (
    <div className="fade-in">
      <Head>
        <title>100knock Translation</title>
      </Head>
      <div className={styles.subtitle}>
        <div>
          翻訳したい日本語の文を入力してください。文を入力すると自動的に翻訳が実行されます。
        </div>
      </div>
      <div className={styles.main_contents}>
        <div className={styles.card}>
          <div className={styles.card_header}>
            <div className={styles.card_title}>翻訳元の文 (日本語)</div>
          </div>
          <div className={styles.card_contents}>
            <textarea
              placeholder="翻訳するにはテキストを入力してください。"
              className={styles.card_form}
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            ></textarea>
          </div>
          <div className={styles.length_count}>
            {inputText.length} / {maxLength}
          </div>
          {inputText.length > 0 && (
            <button
              className={styles.delete_button}
              onClick={handleDeleteButton}
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
        <div className={styles.card}>
          <div className={styles.card_header}>
            <div className={styles.card_title}>翻訳後の文 (英語)</div>
          </div>
          <div className={styles.card_contents}>
            <textarea
              className={styles.card_form}
              onChange={(e) => setOutputText(e.target.value)}
              value={outputText}
              maxLength={maxLength}
            ></textarea>
          </div>
        </div>
        <div className={[styles.card, styles.card_explanation].join(' ')}>
          <div className={styles.card_header}>
            <div className={styles.card_title}>このWebサイトについて</div>
          </div>
          <div className={styles.card_contents}>
            <div className={styles.card_text}>
              <a
                href="https://nlp100.github.io/ja/"
                target="_blank"
                rel="noreferrer"
              >
                自然言語処理100本ノック
              </a>
              で作成した機械翻訳モデルを、ブラウザ上で気軽に体験することができます。モデルはTransformerベースで、fairseqを利用して実装しています。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
