import { type ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function SectionHeader({ eyebrow, title, subtitle, children }: Props) {
  return (
    <div className="text-center mb-14 px-4">
      {eyebrow && (
        <p className="font-poppins text-sm tracking-[0.3em] uppercase text-rose-200/70 mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-playfair text-4xl md:text-6xl font-bold gradient-text leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-poppins text-base md:text-lg text-white/70 mt-5 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
