export function toggleFullScreen(isFullScreen: boolean): void {
    let elem = document.body;
    try {
        if (isFullScreen) {
            let methodToBeInvoked = elem.requestFullscreen ||
                elem.requestFullscreen;
            if (methodToBeInvoked) methodToBeInvoked.call(elem);
        } else {
            let methodToBeInvoked = document.exitFullscreen ||
                document.exitFullscreen;
            if (methodToBeInvoked) methodToBeInvoked.call(document);
        }

    } catch (e) {
        console.log(e);
    }
}