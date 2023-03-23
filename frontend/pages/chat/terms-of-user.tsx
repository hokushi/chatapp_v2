import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TermsOfService = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [agree, setAgree] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClick = (e) => {
    if (!isChecked) {
      e.preventDefault();
    }}


  const termsAndConditionsRef = useRef(null);

  useEffect(() => {
    const termsAndConditions = termsAndConditionsRef.current;
    //一応確認できるようにログを出力
    console.log(termsAndConditions);
    console.log(termsAndConditions.scrollHeight);
    console.log(termsAndConditions.offsetHeight);
    console.log(termsAndConditions.scrollTop);

    const Scroll = () => {
      const scrollTop = termsAndConditions.scrollTop; // scrollTop プロパティを使ってスクロール位置を取得する
      setScrollPosition(scrollTop); // スクロール位置をステートに更新する
    };

    termsAndConditions.addEventListener("scroll", Scroll); // スクロールイベントにリスナーを追加する
    console.log(scrollPosition);
    if (
      termsAndConditions.scrollHeight <
      termsAndConditions.offsetHeight + scrollPosition
    ) {
      setAgree(true);
    }
  }, [scrollPosition]);

  return (
    <div className="h-screen">
      <h1 className="text-3xl flex justify-center pt-10 font-bold mb-10">
        サービス利用規約
      </h1>
      <div
        ref={termsAndConditionsRef}
        className="overflow-auto h-3/5 mx-3 border-2 border-black"
      >
        <h2>
          <b>プライバシーポリシー</b>
        </h2>
        <h3>
          <b>1. 個人情報の利用目的</b>
        </h3>
        <p>
          当ブログでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。
        </p>
        <p>
          取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
        </p>
        <h3>
          <b>2. アクセス解析ツールについて</b>
        </h3>
        <p>
          当ブログでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
        </p>
        <p>
          このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。
        </p>
        <p>
          トラフィックデータは匿名で収集されており、個人を特定するものではありません。
        </p>
        <h3>
          <b>3. 免責事項</b>
        </h3>
        <p>
          当ブログからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
        </p>
        <p>
          また当ブログのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
        </p>
        <p>
          当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        </p>
        <h3>
          <b>4. 著作権について</b>
        </h3>
        <p>
          当ブログで掲載している文章や画像などにつきましては、無断転載することを禁止します。
        </p>
        <p>当ブログは著作権や肖像権の侵害を目的としたものではありません。</p>
        <p>
          著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。
        </p>
        <h3>
          <b>5. リンクについて</b>
        </h3>
        <p>
          当ブログは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。
        </p>
        <p>
          ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。
        </p>
      </div>
      <div id="terms-and-conditions-checkbox" className="text-right mr-3 mt-1">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          disabled={!agree}
        />
        <label>同意する</label>
      </div>
      <div className="flex justify-center mt-5">
        <Link
          className="bg-gray-400 text-3xl flex justify-center w-3/5 font-bold p-2"
          id="myButton"
          onClick={handleClick}
          href="http://localhost:3000/chat/register"
        >
          送信する
        </Link>
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="bg-gray-400 text-3xl flex justify-center w-3/5 font-bold p-2"
          id="backButton"
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default TermsOfService;
