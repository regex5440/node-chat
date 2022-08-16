export default function debounceBy(delay_in_ms) {
  let delay_timer: null | number = null;
  return (debouce_func) => {
    if (delay_timer) {
      clearTimeout(delay_timer);
      delay_timer = null;
    }
    delay_timer = setTimeout(debouce_func, delay_in_ms) as unknown as number;
  };
}
