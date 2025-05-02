console.log("direct-access");

if (location.search === "?edit") {
    console.log('edit mode');
    history.pushState({}, "", location.pathname);
} else {
    setTimeout(function () {
        document.getElementById("direct-link")?.click();
    }, 100);
}