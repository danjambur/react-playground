const intersectionObserverMock = (): IntersectionObserver => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
  takeRecords: () => [] as unknown as IntersectionObserverEntry[],
  root: null,
  rootMargin: "",
  thresholds: [] as unknown as number[],
});

(window as any).IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

export default intersectionObserverMock;
