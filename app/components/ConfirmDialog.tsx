import React, { useRef } from 'react'
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog'
import { DialogType } from '../types/appTypes'
import { Button } from '@/components/ui/button'
const ConfirmDialog = ({isOpen, onClose, onConfirm, title, content}: DialogType) => {
  const initialFocusRef = useRef<HTMLButtonElement>(null)

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
  }

  return (
    <DialogRoot open={isOpen}>
      <DialogContent margin={5}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} variant='ghost'>Cancel</Button>
          <Button ref={initialFocusRef} onClick={handleConfirm}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default ConfirmDialog