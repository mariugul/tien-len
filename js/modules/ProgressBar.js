export class ProgressBar {
    constructor() {
        this.progressBarElement = document.getElementById("progress-bar");
    }

    start() {
        this.show();
    }

    stop() {
        this.hide();
    }

    show() {
        this.progressBarElement.style.display = "block";
    }

    hide() {
        this.progressBarElement.style.display = "none";
    }
}
