import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="space-y-6 text-center">
        <pre className="font-mono text-red-500 whitespace-pre">
          {`
 __    __   ______   __    __ 
/  |  /  | /      \ /  |  /  |
$$ |  $$ |/$$$$$$  |$$ |  $$ |
$$ |__$$ |$$$  \$$ |$$ |__$$ |
$$    $$ |$$$$  $$ |$$    $$ |
$$$$$$$$ |$$ $$ $$ |$$$$$$$$ |
      $$ |$$ \$$$$ |      $$ |
      $$ |$$   $$$/       $$ |
      $$/  $$$$$$/        $$/ 
          `}
        </pre>
        <p className="text-gray-400">you&apos;re not supposed to be here...</p>
        <Link
          href="/"
          className="inline-block text-gray-400 hover:text-primary transition-colors"
        >
          return home
        </Link>
      </div>
    </div>
  );
}
