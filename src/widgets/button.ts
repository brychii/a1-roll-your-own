// importing from our ui system
import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import { Window, Widget, RoleType, EventArgs } from "../core/ui";

// svg-related
import { Rect, Text, Box } from "../core/ui";

class Button extends Widget {
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;

    private clickCallback: (() => void) | null = null;

    private defaultText: string = "Button";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 100;
    private defaultHeight: number = 40;

    constructor(parent: Window) {
        super(parent);

        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;

        // set role for accessibility
        this.role = RoleType.button;

        // draw the button
        this.render();

        // starting state
        this.setState(new IdleUpWidgetState());

        // set text highlighting when clicking to false
        this.selectable = false;
    }

    // allows changing of the text on the button
    set label(text: string) {
        this._input = text;
        this.update();
    }

    get label(): string {
        return this._input;
    }

    // change font size if needed
    set fontSize(size: number) {
        this._fontSize = size;
        this.update();
    }

    // allows resizing of the button
    set size({ width, height }: { width: number; height: number }) {
        this.width = width;
        this.height = height;
        this.update();
    }

    // allow outside code to hook into clicks
    onClick(callback: () => void): void {
        this.clickCallback = callback;
    }

    // centers text inside the button
    private positionText() {
        let box: Box = this._text.bbox();

        this._text_y =
            +this._rect.y() +
            +this._rect.height() / 2 -
            box.height / 2;

        // center horizontally
        this._text.x(
            +this._rect.x() +
            (+this._rect.width() / 2) -
            (box.width / 2)
        );

        if (this._text_y > 0) {
            this._text.y(this._text_y);
        }
    }

    render(): void {
        this._group = (this.parent as Window).window.group();

        // main button shape
        this._rect = this._group.rect(this.width, this.height);
        this._rect.stroke({ width: 2, color: "#333" });
        this._rect.fill("#4CAF50");
        this._rect.radius(8);

        // label text
        this._text = this._group.text(this._input);
        this._text.fill("#ffffff");

        this.outerSvg = this._group;

        // invisible layer for catching mouse events
        let eventrect = this._group
            .rect(this.width, this.height)
            .opacity(0)
            .attr("id", 0);

        // tell system this should receive events
        this.registerEvent(eventrect);
    }

    override update(): void {
        if (this._text != null) {
            this._text.font("size", this._fontSize);
            this._text.text(this._input);
            this.positionText();
        }

        if (this._rect != null) {
            this._rect.size(this.width, this.height);
        }

        super.update();
    }

    // fires when click completes
    pressReleaseState(): void {
        if (this.previousState instanceof PressedWidgetState) {
            this.raise(new EventArgs(this));

            if (this.clickCallback) {
                this.clickCallback();
            }
        }
    }

    // visual states

    // normal state
    idleupState(): void {
        this._rect.fill("#4CAF50");
    }

    // mouse down
    idledownState(): void {
        this._rect.fill("#388E3C");
    }

    // pressed
    pressedState(): void {
        this._rect.fill("#2E7D32");
    }

    // hover
    hoverState(): void {
        this._rect.fill("#66BB6A");
    }

    // hover + pressed
    hoverPressedState(): void {
        this._rect.fill("#2E7D32");
    }

    // dragged out while pressed
    pressedoutState(): void {
        this._rect.fill("#1B5E20");
    }

    // not really using this
    moveState(): void {
        // nothing for now
    }

    // not needed for this assignment
    keyupState(keyEvent?: KeyboardEvent): void {
        // left empty on purpose
    }
}

export { Button };