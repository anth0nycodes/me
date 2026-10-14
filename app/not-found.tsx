import Link from "next/link";

export default function NotFound() {
  return (
    <div data-not-found className="flex items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="sr-only">404, page not found</h1>
        <pre aria-hidden className="whitespace-pre">
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
        <Link href="/" className="hover:text-primary inline-block text-gray-400 transition-colors">
          return home
        </Link>
      </div>
    </div>
  );
}
