
import { FC } from "react";

export const StickyHeader: FC<{ title: string }> = ({ title }) => (
    <div className="bg-slate-100 sticky top-0 -mb-4 my-16 w-full p-4 text-center text-lg">
        <h1 className="">
            {title}
        </h1>
        <ul>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
        </ul>
        <div className="shadow-b sticky top-[52px] h-2 w-full" />
        <div className="bg-slate-100 z-10 -mt-4 h-2 w-full" />
    </div>
);