import React from "react";

type ButtonProps =
  | ({
      as?: "button";
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({
      as: "a";
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>);

interface BaseProps {
  variant?: "primary" | "outline" | "secondary" | "text";
  children: React.ReactNode;
  className?: string;
}

type Props = ButtonProps & BaseProps;

export const Button: React.FC<Props> = ({
  variant = "primary",
  children,
  className = "",
  as = "button",
  ...props
}) => {
  // px-9 is quite wide, reduced to px-6 on mobile, px-9 on desktop
  const baseStyles =
    "px-6 md:px-9 py-3.5 uppercase tracking-[0.18em] text-[10px] md:text-[11px] font-sans font-bold transition-all duration-300 ease-out rounded-xl active:scale-95 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-gold-500 text-stone-950 border border-gold-500 hover:bg-gold-400 hover:border-gold-400 shadow-[0_2px_10px_rgba(197,169,111,0.1)] hover:shadow-[0_4px_15px_rgba(197,169,111,0.2)]",
    outline:
      "bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-stone-950 hover:border-gold-500 shadow-none",
    secondary:
      "bg-stone-900/50 border border-stone-700 text-stone-200 backdrop-blur-sm hover:border-gold-500/50 hover:bg-stone-800/50 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]",
    text: "text-gold-400 hover:text-gold-300 bg-transparent border-b border-transparent hover:border-gold-300 px-0 rounded-none !justify-start py-1 shadow-none",
  };

  const combinedClasses =
    `${baseStyles} ${variants[variant]} ${className}`.trim();

  if (as === "a") {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={combinedClasses} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
