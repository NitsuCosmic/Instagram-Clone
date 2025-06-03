interface ImportMetaEnv {
  readonly accessKey: string
}

export const accessKey: ImportMetaEnv = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
