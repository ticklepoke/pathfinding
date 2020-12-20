import { fromEvent } from "rxjs";
import { takeUntil } from "rxjs/operators";

const mouseClick$ = fromEvent<MouseEvent>(document, "click");
const keyDown$ = fromEvent<KeyboardEvent>(document, "keydown");
const keyUp$ = fromEvent<KeyboardEvent>(document, "keyup");

const whileKeyPress$ = keyDown$.pipe(takeUntil(keyUp$));

export { mouseClick$, whileKeyPress$, keyDown$, keyUp$ };
