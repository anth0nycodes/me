import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function GithubIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-3 shrink-0", className)}
      {...props}
    >
      <circle cx="512" cy="512" r="490" fill="#ffffff"></circle>
      <path
        fill="#1b1f23"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 417.92 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-.64-52.48-.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-.64-33.92 40.32-.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-232.96-56.96-232.96-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28s87.04 5.76 128 17.28c97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-.64 123.52-.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 929.92 1024 737.92 1024 512 1024 229.12 794.88 0 512 0"
      ></path>
    </svg>
  );
}

export function LinkedinIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-3 shrink-0", className)}
      {...props}
    >
      <rect x="16" y="16" width="224" height="224" fill="#ffffff"></rect>
      <path
        fill="#0A66C2"
        d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
      ></path>
    </svg>
  );
}

export function XIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1200 1227"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-3 shrink-0", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
      ></path>
    </svg>
  );
}

export function GmailIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 49.4 512 399.42"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-3 shrink-0", className)}
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <path
            fill="#4285f4"
            d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
          ></path>
          <path
            fill="#34a853"
            d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
          ></path>
          <path
            fill="#fbbc04"
            d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
          ></path>
        </g>
        <path
          fill="#ea4335"
          d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
        ></path>
        <path
          fill="#c5221f"
          fillRule="nonzero"
          d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
        ></path>
      </g>
    </svg>
  );
}

export function NpmIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-3 shrink-0", className)}
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" fill="#ffffff"></rect>
      <path
        fill="#CB3837"
        d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
      ></path>
    </svg>
  );
}

export function TracemarkIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-3 shrink-0", className)}
      {...props}
    >
      <g filter="url(#tracemark-icon-texture)">
        <rect x="2.5" y="2.5" width="114.888" height="114.888" rx="28.472" fill="white" stroke="black" />
      </g>
      <path
        d="M40.5729 93.5892L80.5886 53.5784L67.0143 39.9924L27 79.9954L40.5729 93.5892Z"
        fill="#ECD434"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 89.8582V79.9954L40.5729 93.5892H30.9196L27 89.8582Z"
        fill="#DCB78C"
      />
      <path d="M27 93.5892H30.9196L27 89.8582V93.5892Z" fill="black" />
      <path
        d="M27 89.8582V79.9954L67.0143 39.9924L80.5886 53.5784L40.5729 93.5892H30.9196M27 79.9954L40.5729 93.5892M30.9196 93.5892H27V89.8582M30.9196 93.5892L27 89.8582"
        stroke="black"
      />
      <path
        d="M84.3594 49.75C84.3594 49.75 93.4925 42.038 93.4925 40.5883C93.4925 39.1386 81.3572 26.7721 80.1353 26.9458C78.9134 27.1194 70.8024 36.2215 70.8024 36.2215L84.3594 49.75Z"
        fill="#E691D2"
        stroke="black"
        strokeWidth="0.929765"
      />
      <defs>
        <filter
          id="tracemark-icon-texture"
          x="0"
          y="0"
          width="119.888"
          height="119.888"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.1190476268529892 0.1190476268529892"
            numOctaves="3"
            seed="5213"
          />
          <feDisplacementMap
            in="shape"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            width="100%"
            height="100%"
          />
          <feMerge result="effect1_texture_130_15">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
