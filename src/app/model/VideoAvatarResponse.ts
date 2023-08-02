export class VideoAvatarResponse {
  videos!: Video[]
  total!: number
  page!: number
  pages!: number
}

export class Video {
  _id?: string
  name!: string
  slides!: Slide[]
  tags!: string[]
  deleted!: boolean
  status!: string
  public!: boolean
  parentFolderDeleted!: boolean
  version!: number
  userId!: string
  accountId!: string
  createdAt!: string
  updatedAt!: string
  data?: Data
  duration?: number
  thumbnail?: string
  url?: string
}

export class Slide {
  id?: number
  animation!: string
  language!: string
  voice!: string
  voiceType!: string
  voiceProvider!: string
  hasAvatar!: boolean
  duration?: number
  status?: string
  approxDuration?: number
}

export class Data {
  appError?: string
  errorEmailSent?: boolean
  internalError: any
}
