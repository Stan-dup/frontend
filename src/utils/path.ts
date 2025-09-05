export const RouterPath = {
  root: {
    path: "/",
  },
  home: {
    path: "/",
    getPath: () => RouterPath.home.path,
  },
  somePage: {
    path: "/awesome/:id",
    getPath: (id: string) => RouterPath.somePage.path.replace(":id", id),
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
