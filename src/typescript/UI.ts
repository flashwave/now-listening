namespace NP
{
    export class UI
    {
        private static IndexElem: HTMLDivElement = <HTMLDivElement>DOM.ID('index');
        private static UserElem: HTMLDivElement = <HTMLDivElement>DOM.ID('user');

        private static BGElem: HTMLDivElement = <HTMLDivElement>DOM.ID('background');

        private static FormUsername: HTMLInputElement = <HTMLInputElement>DOM.ID('username');
        private static FormSubmit: HTMLButtonElement = <HTMLButtonElement>DOM.ID('submit');

        private static InfoCover: HTMLDivElement = <HTMLDivElement>DOM.ID('np_cover');
        private static InfoTitle: HTMLDivElement = <HTMLDivElement>DOM.ID('np_title');
        private static InfoArtist: HTMLDivElement = <HTMLDivElement>DOM.ID('np_artist');
        private static InfoUser: HTMLDivElement = <HTMLDivElement>DOM.ID('np_user');
        private static InfoBack: HTMLDivElement = <HTMLDivElement>DOM.ID('np_back');
        private static InfoFlags: HTMLDivElement = <HTMLDivElement>DOM.ID('np_flags');

        private static ColourFadeInterval: number = null;

        public static Mode(mode: Mode): void {
            switch (mode) {
                case Mode.INDEX:
                    DOM.AddClass(this.UserElem, ['hidden']);
                    DOM.RemoveClass(this.IndexElem, ['hidden']);
                    break;

                case Mode.USER:
                    DOM.AddClass(this.IndexElem, ['hidden']);
                    DOM.RemoveClass(this.UserElem, ['hidden']);
                    break;
            }
        }

        public static Background(mode: Background, property: string = null): void {
            switch (mode) {
                case Background.COLOURFADE:
                    if (this.ColourFadeInterval !== null) {
                        break;
                    }

                    this.BGElem.style.backgroundImage = null;

                    var fader: Function = () => {
                        var colour: string = Math.floor(Math.random() * 16777215).toString(16);

                        if (colour.length !== 6 && colour.length !== 3) {
                            colour = "000000".substring(colour.length) + colour;
                        }

                        UI.BGElem.style.backgroundColor = "#" + colour;
                    };

                    this.ColourFadeInterval = setInterval(fader, 2000);
                    fader.call(this);
                    break;

                case Background.IMAGE:
                    if (property === null) {
                        break;
                    }

                    if (this.ColourFadeInterval !== null) {
                        clearInterval(this.ColourFadeInterval);
                        this.ColourFadeInterval = null;
                    }

                    this.BGElem.style.backgroundColor = null;
                    this.BGElem.style.backgroundImage = "url('{0}')".replace('{0}', property);
                    break;
            }
        }

        public static SetInfo(cover: string, title: string, artist: string, user: string, now: boolean = false): void {
            this.Background(Background.IMAGE, cover);
            this.InfoCover.style.backgroundImage = "url('{0}')".replace('{0}', cover);
            this.InfoTitle.innerText = title;
            this.InfoArtist.innerText = artist;
            this.InfoUser.innerText = user;
            this.InfoFlags.innerHTML = '';

            if (now) {
                var nowIcon: HTMLSpanElement = DOM.Element('span', 'fa fa-music');
                nowIcon.title = 'Now playing';
                this.InfoFlags.appendChild(nowIcon);
            }
        }

        public static Update(): void {
            var user: string = location.hash.substring(2);

            if (user.length > 0) {
                Watcher.Start(user);
                UI.Mode(Mode.USER);
            } else {
                Watcher.Stop();
                UI.Mode(Mode.INDEX);
                UI.Background(Background.COLOURFADE);
            }
        }

        public static RegisterHooks(): void {
            UI.InfoBack.addEventListener('click', () => {
                location.hash = '';
            });

            var enter: Function = () => {
                location.hash = '#/' + UI.FormUsername.value;
            };

            window.addEventListener('hashchange', () => {
                UI.Update();
            });

            UI.FormSubmit.addEventListener('click', () => {
                enter.call(this);
            });

            UI.FormUsername.addEventListener('keydown', (ev) => {
                if (ev.keyCode === 13) {
                    enter.call(this);
                }
            });
        }
    }
}
