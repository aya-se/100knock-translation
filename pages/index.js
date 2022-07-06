import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [prevInputText, setPrevInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [maxLength, setMaxLength] = useState("200");
  const [url, setUrl] = useState("http://127.0.0.1:8000");

  // APIテスト
  useEffect(() => {
    if (!location.href.includes("localhost")) {
      // ローカル動作でない場合はHeroku側のサーバーを使用
      setUrl("https://translation-100knock.herokuapp.com");
    };
  },[]);

  // 翻訳
  const handleTranslate = (() => {
    if (inputText === "") return;
    if (inputText.length > maxLength) return;
    setIsLoading(true);
    setOutputText("");
    axios.post(`${url}/api/translation/${inputText}`).then((res) => {
      setIsLoading(false);
      setOutputText(res.data.en);
    }).catch((err)=> {
      setIsLoading(false);
      setOutputText("Error: 翻訳はローカル上でのみ動作します。");
    })
  });

  // 翻訳APIのinterval設定
  const useInterval = (callback, delay) => {
    useEffect(() => {
        const interval = setInterval(() => 
            callback()
        , delay);
        return () => clearInterval(interval);
    }, [callback, delay]);
  }

  useInterval(() => {
    if (prevInputText !== inputText) {
      setPrevInputText(inputText);
      handleTranslate();
    }
  }, 2000);

  // 入力テキスト削除
  const handleDeleteButton = (() => {
    setInputText("");
    setOutputText("");
  })

  // 状態に応じたスタイル付与
  const customClasses = ((type) => {
    let classes = [styles.card]
    if (type === "input" && inputText.length > maxLength) {
      classes.push(styles.over_length);
    }
    if (type === "output" && isLoading) {
      classes.push(styles.loading);
    }
    return classes.join(" ");
  })

  return (
    <div>
      <Head>
        <title>100knock Translation</title>
      </Head>
      <div className={styles.subtitle}>
        <div>
          翻訳したい日本語の文を入力してください。文を入力すると自動的に翻訳が実行されます。
        </div>
      </div>
      <div className={styles.main_contents}>
        <div className={customClasses("input")}>
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
        <div className={customClasses("output")}>
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
          { isLoading &&
            <div className={styles.loading_screen}>
              <div className={[styles.loading_icon, "spinner-border"].join(" ")} role="status"/>
            </div>
          }
        </div>
        <div className={[styles.card, styles.card_explanation].join(' ')}>
          <div className={styles.card_header}>
            <div className={styles.card_title}>このWebサイトについて</div>
          </div>
          <div className={styles.card_contents}>
            <div className={styles.card_text}>
              <ul>
                <li>
                  <a
                    href="https://nlp100.github.io/ja/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    自然言語処理100本ノック
                  </a>
                  で作成した機械翻訳モデルを、ブラウザ上で気軽に体験することができます。モデルはTransformerベースで、fairseqを利用して実装しています。
                </li>
                <li>モデルのファイル容量が大きく(checkpoint)、Heroku等へのデプロイが困難であるため、<strong>実際に翻訳が動作するのはローカル環境上のみ</strong>となっています。</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={[styles.card, styles.card_explanation].join(' ')}>
          <div className={styles.card_header}>
            <div className={styles.card_title}>翻訳に関する注意事項</div>
          </div>
          <div className={styles.card_contents}>
            <div className={styles.card_text}>
              <ul>
                <li>未知の単語に対しては不適切な訳を返すことが多いです。</li>
                <li>特に固有名詞や英単語には、どうしても対応できないことが多くなっています。</li>
                <li>長すぎる文を入力すると、途中で翻訳が打ち切られてしまったり、不適切な訳になってしまうことがあります。</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={[styles.card, styles.card_explanation].join(' ')}>
          <div className={styles.card_header}>
            <div className={styles.card_title}>翻訳サーバーの動作デモ動画</div>
          </div>
          <div className={styles.card_contents}>
            <div className={styles.card_text}>
              ローカル環境下で、実際に翻訳モデルを動作させた様子を動画に収録しました。
            </div>
            <div className={styles.card_player}>
              <iframe
                className={styles.card_player_contents}
                src="https://www.youtube.com/embed/UQ94e8wRxiw"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
