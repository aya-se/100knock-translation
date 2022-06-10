import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Info.module.scss';

export default function Info() {
  return (
    <div className={styles.container + ' my-3 fade-in'}>
      <Head>
        <title>Info | Wordle Solver Blob</title>
      </Head>
      <section>
        <h2 className="section_title">このアプリケーションは何？</h2>
        <p>かわいいBlobが、あなたと一緒にWordleの答えを考えてくれます。</p>
        <div className="my-5 d-flex justify-content-center">
          <Image
            src="/blob_bongo.gif"
            width={200}
            height={200}
            alt="blob_sample"
          />
          <Image
            src="/blob_thinking.gif"
            width={200}
            height={200}
            alt="blob_sample"
          />
          <Image
            src="/blobwobwork.gif"
            width={200}
            height={200}
            alt="blob_sample"
          />
          <Image
            src="/blobtoiletflush.gif"
            width={200}
            height={200}
            alt="blob_sample"
          />
        </div>
        <h2 className="section_title">使用したデータについて</h2>
        <p>
          英単語のリストは
          <a
            className="link-underline"
            target="_blank"
            href="https://github.com/dwyl/english-words"
            rel="noreferrer"
          >
            こちらのデータ
          </a>
          を利用しています。Wordleの語彙とは必ずしも一致しない為、Wordleで出題されうる全ての単語を網羅できている保証がありません。また逆に、Wordleには存在しない単語が一部含まれている場合があります。
        </p>
      </section>
    </div>
  );
}
