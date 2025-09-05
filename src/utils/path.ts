export const RouterPath = {
  root: {
    path: "/",
  },
  home: {
    path: "/",
    getPath: () => RouterPath.home.path,
  },
  posterMaker: {
    path: "/poster-maker",
    getPath: () => RouterPath.posterMaker.path,
  },
  gallery: {
    path: "/gallery",
    getPath: () => RouterPath.gallery.path,
  },
  notFound: {
    path: "*",
  },
};
