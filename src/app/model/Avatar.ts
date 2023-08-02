export class Avatar {
  background!: string
  clips!: Clip[]
  ratio!: string
  test!: boolean
  version!: string
}

export class Clip {
  avatar_id!: string
  avatar_style!: string
  input_text!: string
  offset!: Offset
  scale!: number
  voice_id!: string
}

export class Offset {
  x!: number
  y!: number
}
