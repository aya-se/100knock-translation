import Head from 'next/head';
import styles from '../styles/Feature.module.scss';
import Image from 'next/image';

export default function Feature() {
  return (
    <div className={styles.container + ' my-3 fade-in'}>
      <Head>
        <title>Feature | Wordle Solver Blob</title>
      </Head>
      <section>
        <h2 className="section_title">アルゴリズム概要</h2>
        <p>Wordle Solverのアルゴリズムについて簡単に紹介します。</p>
        <h3 className="section_title">シンプルなアルゴリズム (simple)</h3>
        <p>
          非常に単純な方法で単語を推薦します。まずは、与えられた入力の条件に合致する単語のみを絞り込みます。そのうえで、
          <strong>「登場する文字種の出現頻度には大きな偏りがある」</strong>
          というアルファベットの一般的な性質を利用した単語のレコメンドを試みます。
        </p>
        <p>
          具体的には、高頻度で登場するアルファベットを多く含む単語は有益な情報を含んでいる可能性が高いと仮定することで、5文字のアルファベットの一般的な出現頻度の総和が高い順に単語を並び替えます。ただし、同じアルファベットが複数回登場する場合は評価をやや低くするよう調整します。以上の議論をもとに、ある単語の
          <strong>評価値(Score)</strong>は以下のように計算します。
        </p>
        <div className="my-5">
          <Image
            src="/simple_score.png"
            width={747}
            height={93}
            alt="simple_score"
          />
        </div>
        <p>
          最終的には上記の評価値(Score)が高い順に単語を並び替えます。なお、一般的なアルファベットの出現頻度の情報は
          <a
            className="link-underline"
            target="_blank"
            href="https://www.weblio.jp/wkpja/content/%E8%8B%B1%E8%AA%9E%E3%82%A2%E3%83%AB%E3%83%95%E3%82%A1%E3%83%99%E3%83%83%E3%83%88_%E6%96%87%E5%AD%97%E3%81%AE%E5%87%BA%E7%8F%BE%E9%A0%BB%E5%BA%A6"
            rel="noreferrer"
          >
            こちらのデータ
          </a>
          を参考にしています。
        </p>
        <h3 className="section_title">アルゴリズム その2 (algorithm 2)</h3>
        <p>アルゴリズムその2です。</p>
        <h3 className="section_title">アルゴリズム その3 (algorithm 3)</h3>
        <p>アルゴリズムその3です。</p>
      </section>
    </div>
  );
}
