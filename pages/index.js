import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  // ローディング処理
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Head>
        <title>100knock Translation</title>
      </Head>
      <div className={styles.container + ' my-3 fade-in'}>
        <div>翻訳したい文章を入力してください。</div>
      </div>
    </div>
  );
}
