import Image from "next/image";

const FAVICON_CLASS = "size-3.5 shrink-0 rounded-[3px]";

export function Favicon({ src, srcDark }: { src: string; srcDark?: string }) {
  if (!srcDark) {
    return <Image src={src} width={14} height={14} alt="" className={FAVICON_CLASS} />;
  }

  return (
    <>
      <Image src={src} width={14} height={14} alt="" className={`${FAVICON_CLASS} dark:hidden`} />
      <Image
        src={srcDark}
        width={14}
        height={14}
        alt=""
        className={`${FAVICON_CLASS} hidden dark:block`}
      />
    </>
  );
}
