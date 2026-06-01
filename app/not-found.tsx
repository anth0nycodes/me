import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="space-y-6 text-center">
        <pre className="whitespace-pre font-mono text-glow/70">
          {`
 __    __   ______   __    __
/  |  /  | /      \\ /  |  /  |
$$ |  $$ |/$$$$$$  |$$ |  $$ |
$$ |__$$ |$$$  \\$$ |$$ |__$$ |
$$    $$ |$$$$  $$ |$$    $$ |
$$$$$$$$ |$$ $$ $$ |$$$$$$$$ |
      $$ |$$ \\$$$$ |      $$ |
      $$ |$$   $$$/       $$ |
      $$/  $$$$$$/        $$/
          `}
        </pre>
        <p className="text-muted-foreground font-mono">
          level not found...
        </p>
        <Link
          href="/"
          className="inline-block font-mono text-muted-foreground hover:text-glow transition-colors duration-200"
        >
          &gt; respawn home
        </Link>
      </div>
    </div>
  );
}
