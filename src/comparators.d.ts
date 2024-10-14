export function compareFromLess(lessFn: (a: any, b: any) => boolean): (a: any, b: any) => number;
export function lessFromCompare(compareFn: (a: any, b: any) => number): (a: any, b: any) => boolean;
export function equalFromLess(lessFn: (a: any, b: any) => boolean): (a: any, b: any) => boolean;
export function reverseLess(lessFn: (a: any, b: any) => boolean): (a: any, b: any) => boolean;
export function reverseCompare(compareFn: (a: any, b: any) => number): (a: any, b: any) => number;
