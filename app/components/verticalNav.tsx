
import { FC } from "react";

export const VerticalNav: FC<{ title: string }> = ({ title }) => (
    <div className="z-10 bg-slate-300 h-3/4 top-0 left-0 sticky w-fit">
        <h1 className="">
            {title}
        </h1>
        <ul className="border-2 border-slate-400">
            <li className="border-2 border-slate-700">1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
        </ul>
    </div>
);