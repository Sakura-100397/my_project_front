import Link from 'next/link';

export default function Home() {  
  return(
    <div>
      <h1>社員情報管理システム</h1>
      <p>社員一覧を表示</p>
      <ol>
        <li>社員1</li>
        <li>社員2</li>
        <li>社員3</li>
      </ol>
      <Link href="/employees/register">
        <button>新規登録</button>
      </Link>
    </div>
  );
}