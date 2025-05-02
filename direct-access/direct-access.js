(() => {
  // <stdin>
  console.log("direct-access");
  setTimeout(function() {
    document.getElementById("direct-link")?.click();
  }, 100);
})();
