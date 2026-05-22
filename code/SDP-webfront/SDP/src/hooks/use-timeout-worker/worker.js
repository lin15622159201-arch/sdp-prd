let duration = 1000;
const createTimer = () => {
  const id = setTimeout(() => {
    postMessage({ event: 'callback', id });
  }, duration);
  postMessage({ event: 'set', id });
};
onmessage = async (e) => {
  const { event, timerId } = e.data;
  if (event === 'setTimeout') {
    duration = e.data.duration || 1000;
    createTimer();
    return;
  }
  if (event === 'clearTimeout') {
    clearTimeout(timerId);
  }
};
