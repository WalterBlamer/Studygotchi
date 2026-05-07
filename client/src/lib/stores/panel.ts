// Why inside /stores? Stores refers to shared storage
// Similar to /state or /shared. Svelte docs use /stores
import { writable } from 'svelte/store';

export type PanelType =
  | 'notes'
  | 'todo'
  | 'activity'
  | 'achievements'
  | 'profile'
  | null;

export const activePanel = writable<PanelType>(null);

export function openPanel(panel: PanelType) {
  activePanel.set(panel);
}

export function closePanel() {
  activePanel.set(null);
}
