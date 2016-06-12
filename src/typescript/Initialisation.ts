window.addEventListener("load", () => {
    var user: string = location.hash.substring(2);

    NP.UI.RegisterHooks();

    if (user.length < 1) {
        NP.UI.Mode(NP.Mode.INDEX);
        NP.UI.Background(NP.Background.COLOURFADE);
    } else {
        NP.UI.Mode(NP.Mode.USER);
        NP.Watcher.Start(user);
    }
});
