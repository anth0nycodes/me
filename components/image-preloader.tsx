// Preload every image up front so hover previews and blog images
// appear instantly instead of loading on demand.
export function ImagePreloader() {
  return (
    <>
      {/* avatar */}
      <link rel="preload" as="image" href="/pfp.png" />

      {/* work previews */}
      <link rel="preload" as="image" href="/d24.png" />
      <link rel="preload" as="image" href="/mh.png" />
      <link rel="preload" as="image" href="/rd.png" />
      <link rel="preload" as="image" href="/mtc.png" />

      {/* education logos */}
      <link rel="preload" as="image" href="/lc.png" />
      <link rel="preload" as="image" href="/dwc.png" />

      {/* creative work thumbnails */}
      <link rel="preload" as="image" href="/posters/deep24-01.jpg" />
      <link rel="preload" as="image" href="/posters/design-stuff-01.jpg" />
      <link rel="preload" as="image" href="/posters/magic-hour-02.jpg" />
      <link rel="preload" as="image" href="/posters/magic-hour-01.jpg" />
      <link rel="preload" as="image" href="/posters/mtc-01.jpg" />

      {/* project previews */}
      <link rel="preload" as="image" href="/posters/recall.png" />
      <link rel="preload" as="image" href="/posters/resume-analyzer.png" />
      <link rel="preload" as="image" href="/posters/tracemark.png" />
      <link rel="preload" as="image" href="/posters/mm2-item-info.png" />
      <link rel="preload" as="image" href="/posters/fabric-history.png" />
      <link rel="preload" as="image" href="/posters/license-demo.jpg" />

      {/* testimonials */}
      <link rel="preload" as="image" href="/runbo.png" />
      <link rel="preload" as="image" href="/simon.png" />
      <link rel="preload" as="image" href="/andrew.png" />

      {/* blog images */}
      <link rel="preload" as="image" href="/blog/context-engineering.png" />
      <link rel="preload" as="image" href="/blog/css.gif" />
      <link rel="preload" as="image" href="/blog/ts-oop.png" />
      <link rel="preload" as="image" href="/blog/programming-with-ai.png" />
    </>
  );
}
