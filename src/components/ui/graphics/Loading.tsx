export const Loading = () => {
  return (
    <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <circle
        className="animate-spin origin-center"
        cx="400"
        cy="400"
        fill="none"
        r="280"
        stroke-width="101"
        stroke="hsl(346, 100%, 59%)"
        stroke-dasharray="964 1400"
        stroke-linecap="round"
      />
    </svg>
  );
};
