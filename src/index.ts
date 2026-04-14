import { Window } from "./core/ui"
import { Button } from "./widgets/button"
import { Heading } from "./widgets/heading"

let w = new Window(window.innerHeight - 10, '100%');

let lbl1 = new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10, 20);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 14;
btn.label = "Click Me";
btn.size = { width: 100, height: 40 };
btn.move(12, 50);

// when button is clicked, update the heading
btn.onClick(() => {
    lbl1.text = "Button Clicked!";
});