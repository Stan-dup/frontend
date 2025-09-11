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
  video: {
    path: "/video",
    getPath: () => RouterPath.video.path,
  },
  notFound: {
    path: "*",
  },
};
