"use client";

import { useSyncExternalStore } from "react";

// 2/22/2007, local time. Month is zero-based.
const BIRTH = { year: 2007, month: 1, day: 22 };

/** Whole years since my birth, counting this year only once the birthday has passed. */
function getAge(now: Date) {
  const age = now.getFullYear() - BIRTH.year;
  const birthdayThisYear = new Date(now.getFullYear(), BIRTH.month, BIRTH.day);
  return now < birthdayThisYear ? age - 1 : age;
}

// re-check every minute so a page left open rolls over on the birthday
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

/** My age in years, worked out in the browser so the static page never shows a stale build-day value. */
export function Age() {
  const age = useSyncExternalStore(
    subscribe,
    () => getAge(new Date()),
    () => null
  );

  // reserve two digits of space on the server so the sentence doesn't reflow when it fills in
  return (
    <span className={age === null ? "invisible tabular-nums" : "tabular-nums"}>
      {age ?? "00"}
    </span>
  );
}
