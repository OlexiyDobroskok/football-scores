import React from "react";

export interface PreviewSectionProps {
  title: string;
  matchesListSlot:React.ReactNode;
}

export function PreviewSection({title, matchesListSlot}: PreviewSectionProps) {
  return (
    <section className="px-2 py-3">
    <h3 className="hidden">{title}</h3>
    <ul className="flex flex-col gap-3">{matchesListSlot}</ul>
  </section>
  )
}