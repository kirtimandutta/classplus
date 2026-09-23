type LenisController = {
  stop: () => void;
  start: () => void;
};

let current: LenisController | null = null;

export function setLenisController(controller: LenisController | null) {
  current = controller;
}

export function getLenis() {
  return current;
}
