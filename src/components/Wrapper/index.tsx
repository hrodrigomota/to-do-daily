import { HTMLAttributes } from 'react'

export function Wrapper(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-4/5 flex flex-col items-center">{props.children}</div>
  );
}
