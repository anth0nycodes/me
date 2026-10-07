import Image from "next/image";

const FAVICON_CLASS = "size-3.5 shrink-0 rounded-[3px]";

interface FaviconProps {
  src: string;
  srcDark?: string;
  alt: string;
}

export function Favicon({ src, srcDark, alt }: FaviconProps) {
  if (!srcDark) {
    return <Image src={src} width={14} height={14} alt={alt} className={FAVICON_CLASS} />;
  }

  return (
    <>
      <Image src={src} width={14} height={14} alt={alt} className={`${FAVICON_CLASS} dark:hidden`} />
      <Image
        src={srcDark}
        width={14}
        height={14}
        alt={alt}
        className={`${FAVICON_CLASS} hidden dark:block`}
      />
    </>
  );
}
