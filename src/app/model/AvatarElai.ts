export class AvatarElai {
  name!: string
  slides!: Slide[]
  tags!: string[]
  deleted!: boolean
  status!: string
  verified!: boolean
  public!: boolean
  parentFolderDeleted!: boolean
  version!: number
  userId!: string
  accountId!: string
  _id!: string
  createdAt!: string
  updatedAt!: string
  __v!: number
  url!: string
}

export class Slide {
  id?: number
  canvas!: Canvas
  avatar!: Avatar
  animation!: string
  language!: string
  speech!: string
  voice!: string
  voiceType!: string
  voiceProvider!: string
}

export class Canvas {
  objects!: Object[]
  background!: string
  version!: string
}

export class Object {
  type!: string
  version!: number
  left!: number
  top!: number
  fill!: string
  scaleX!: number
  scaleY!: number
  src!: string
  avatarType!: string
  animation!: Animation
}

export class Animation {
  type!: any
  exitType!: any
}

export class Avatar {
  id?: string
  version!: number
  name!: string
  gender!: string
  canvas!: string
}
