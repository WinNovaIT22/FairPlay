export default function Home() {
  return (
    <div class="flex items-center justify-center h-screen mt-4">
      <div class="bg-white w-3/6 p-5 content-center shadow-md relative rounded-md">
        <button
          class="bg-green-200 text-green-700 rounded-xl px-3 py-1 absolute right-2 text-sm"
        >
          4.5
        </button>
        <div class="py-3 px-1">
          <svg
            class="w-10 h-9"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57 .393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8 .8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </div>
        <p class="text-lg font-bold font-sans">Ohjeet fairplay kilpailuun</p>
        <div class="text-sm py-2 font-mono">
          Ohjeita Fairplay
        </div>
      </div>
    </div>
  );
}
