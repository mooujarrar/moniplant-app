import { create } from 'zustand';

interface MqttState {
  messages: Record<string, string>;
  setMessage: (topic: string, message: string) => void;
}

export const useMqttStore = create<MqttState>((set) => ({
  messages: {},
  setMessage: (topic, message) =>
    set((state) => ({
      messages: { ...state.messages, [topic]: message },
    })),
}));