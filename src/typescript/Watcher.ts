namespace NP
{
    export class Watcher
    {
        private static Fetcher: AJAX = null;
        private static CheckIntervalId: number = null;
        private static CheckTimeout: number = 15 * 1000;
        private static GetPath: string = "/get.php";
        private static User: string = null;

        public static Start(user: string): void {
            this.User = user;

            this.Fetcher = new AJAX;

            this.Fetcher.AddCallback(200, () => {
                var data: any = JSON.parse(Watcher.Fetcher.Response());
                console.log(data);

                if ((typeof data.error).toLowerCase() !== 'undefined') {
                    Watcher.Stop();
                    UI.Mode(Mode.INDEX);
                    NP.UI.Background(NP.Background.COLOURFADE);
                    alert(data.error);
                    return;
                }

                UI.Mode(Mode.USER);

                var image: string = data[0].images.large.length < 1 ? '/resources/no-cover.png' : data[0].images.large.replace('/174s/', '/300s/'),
                    now: boolean = (typeof data[0].nowplaying).toLowerCase() === 'undefined' ? false : data[0].nowplaying;

                UI.SetInfo(image, data[0].name, data[0].artist.name, this.User, now);
            });

            this.Check();

            this.CheckIntervalId = setInterval(this.Check, this.CheckTimeout);
        }

        public static Stop(): void {
            clearInterval(this.CheckIntervalId);
            this.CheckIntervalId = null;
            this.Fetcher = null;
            this.User = null;
        }

        public static Check(): void {
            Watcher.Fetcher.SetUrl(Watcher.GetPath + "?u=" + Watcher.User);
            Watcher.Fetcher.Start(HTTPMethod.GET);
        }
    }
}
