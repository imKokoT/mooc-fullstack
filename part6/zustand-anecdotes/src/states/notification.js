import { create } from "zustand"


const useNotificationStore = create((set) => ({
  msg: null,
  type: 'info',
  timeout: 5,

  actions: {
    showInfo: (msg, type='info', timeout=5) => set({
      msg, type, timeout
    }),

    reset: () => set({
      msg: null, type: 'info', timeout: 5
    })
  }
}))


export const useNotificationMsg = () => useNotificationStore(state => state.msg)
export const useNotificationType = () => useNotificationStore(state => state.type)
export const useNotificationTimeout = () => useNotificationStore(state => state.timeout)

export const useNotificationActions = () => useNotificationStore(state => state.actions)
