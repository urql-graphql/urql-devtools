export const startAnalytics = async () => {
  window._gaq = window._gaq || [];
  window._gaq.push(["_setAccount", "UA-98443810-2"]);
  window._gaq.push(["_trackPageview", "/"]);

  // // @ts-ignore
  // window.ga=window.ga||function(...args){(ga.q=ga.q||[]).push(args)};ga.l=+new Date;
  // // @ts-ignore
  // ga('create', 'UA-XXXXX-Y', 'auto');
  // // @ts-ignore
  // ga('send', 'pageview');
  // // @ts-ignore
  // console.log(window.ga)
};
