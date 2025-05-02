console.log("direct-access");

const distUrl = `https://scrapbox.io/meganii-private/${new Date().toISOString().split('T')[0]}`;

if (location.search === "?edit") {
    console.log('edit mode');
    history.pushState({}, "", location.pathname);
} else {
    setTimeout(function () {
        globalThis.location.href = distUrl
    }, 20);
}