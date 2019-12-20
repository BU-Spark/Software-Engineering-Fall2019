import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression
} from "./common";
import { verifyPermissions, verifyIdentity} from './authentication'

export const basicMiddle =  [handleCors, handleBodyRequestParsing, handleCompression]
export const authMiddle = [verifyIdentity, verifyPermissions]

