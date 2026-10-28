// Estado de scroll compartilhado (sem causar re-render do React).
// É atualizado pelo smooth-scroll e lido dentro do loop do three.js.
export const scrollState = {
  progress: 0, // 0..1 ao longo de toda a página
  velocity: 0,
  pointerX: 0, // -1..1
  pointerY: 0, // -1..1
  pointerActive: false, // true após o primeiro movimento do mouse
  energy: 0, // 0 (parado/lendo) .. 1 (rolando) — controla o protagonismo da nuvem
  light: 0, // 0 (atmosfera escura) .. 1 (atmosfera creme) — inverte cor das partículas
  cloudX: 2.6, // alvo de posição horizontal da nuvem (definido por seção)
  cloudY: 0.2, // alvo de posição vertical da nuvem
};
