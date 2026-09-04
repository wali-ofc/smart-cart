import React from 'react'

export type ChildrenType = Readonly<{ children: React.ReactNode }>

export type FileType = File & {
  path?: string
  preview?: string
  formattedSize?: string
}
