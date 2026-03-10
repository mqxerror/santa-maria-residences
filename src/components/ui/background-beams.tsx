"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const paths = [
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
      "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
      "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
      "M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763",
    ];
    return (
      <div
        className={cn(
          "absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center",
          className
        )}
      >
        <svg
          className="z-0 h-full w-full pointer-events-none absolute"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875"
            stroke="url(#paint0_radial_242_278)"
            strokeOpacity="0.05"
            strokeWidth="0.5"
          ></path>
          {paths.map((path, index) => (
            <path
              key={`path-` + index}
              d={path}
              stroke="#d4af37"
              strokeOpacity="0.4"
              strokeWidth="0.5"
              className="beam-path"
              style={{
                strokeDasharray: '400 800',
                animationDelay: `${index * 3}s`,
                animationDuration: `${12 + index * 2}s`,
              }}
            ></path>
          ))}
          <defs>
            <radialGradient
              id="paint0_radial_242_278"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
            >
              <stop offset="0.0666667" stopColor="#d4af37"></stop>
              <stop offset="0.243243" stopColor="#d4af37"></stop>
              <stop offset="0.43594" stopColor="white" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }
);

BackgroundBeams.displayName = "BackgroundBeams";
