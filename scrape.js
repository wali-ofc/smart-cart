fetch('https://bellroy.com/')
  .then(r => r.text())
  .then(t => {
    const mainBanner = t.substring(t.indexOf('id="homepage-main-banner"'), t.indexOf('</section>', t.indexOf('id="homepage-main-banner"')));
    console.log(mainBanner);
  });
