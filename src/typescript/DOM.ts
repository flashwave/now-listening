namespace NP
{
    export class DOM
    {
        // Block Element Modifier class name generator
        public static BEM(block: string, element: string = null, modifiers: string[] = [], firstModifierOnly: boolean = false): string
        {
            var className: string = "";

            if (firstModifierOnly && modifiers.length === 0) {
                return null;
            }

            className += block;

            if (element !== null) {
                className += "__" + element;
            }

            var baseName: string = className;

            for (var _i in modifiers) {
                if (firstModifierOnly) {
                    return baseName + "--" + modifiers[_i];
                }

                className += " " + baseName + "--" + modifiers[_i];
            }

            return className;
        }

        // Shorthand for creating an element with a class and string
        public static Element(name: string, className: string = null, id: string = null): HTMLElement {
            var element = document.createElement(name);

            if (className !== null) {
                element.className = className;
            }

            if (id !== null) {
                element.id = id;
            }

            return element;
        }

        // Shorthand for textnode
        public static Text(text: string): Text {
            return document.createTextNode(text);
        }

        // Shorthand for getElementById (i'm lazy)
        public static ID(id: string): HTMLElement {
            return document.getElementById(id);
        }

        // Shorthand for removing an element
        public static Remove(element: HTMLElement): void {
            element.parentNode.removeChild(element);
        }

        // Shorthand for the first element of getElementsByClassName
        public static Class(className: string): NodeListOf<HTMLElement> {
            return <NodeListOf<HTMLElement>>document.getElementsByClassName(className);
        }

        // Shorthand for prepending
        public static Prepend(target: HTMLElement, element: HTMLElement | Text): void {
            if (target.children.length) {
                target.insertBefore(element, target.firstChild);
            } else {
                this.Append(target, element);
            }
        }

        // Shorthand for appending
        public static Append(target: HTMLElement, element: HTMLElement | Text): void {
            target.appendChild(element);
        }

        // Getting all classes of an element
        public static ClassNames(target: HTMLElement): string[] {
            var className: string = target.className,
                classes: string[] = [];

            if (className.length > 1) {
                classes = className.split(' ');
            }

            return classes;
        }

        // Adding classes to an element
        public static AddClass(target: HTMLElement, classes: string[]): void {
            for (var _i in classes) {
                var current: string[] = this.ClassNames(target),
                    index: number = current.indexOf(classes[_i]);

                if (index >= 0) {
                    continue;
                }

                current.push(classes[_i]);

                target.className = current.join(' ');
            }
        }

        // Removing classes
        public static RemoveClass(target: HTMLElement, classes: string[]): void {
            for (var _i in classes) {
                var current: string[] = this.ClassNames(target),
                    index: number = current.indexOf(classes[_i]);

                if (index < 0) {
                    continue;
                }

                current.splice(index, 1);

                target.className = current.join(' ');
            }
        }

        public static Clone(subject: HTMLElement): HTMLElement {
            return (<HTMLElement>subject.cloneNode(true));
        }

        public static Query(query: string): NodeListOf<Element> {
            return document.querySelectorAll(query);
        }
    }
}
