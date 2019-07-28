interface Window {
  __urql__: {
    client: import("urql").Client;
    events: import("./types-old").UrqlEvent[];
  };
}
