import {useCallback, useState} from 'react'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>
type UseCopyToClipboardReturn = [CopiedValue, CopyFn]

/**
 * Custom hook for copying text to clipboard
 * @returns A tuple containing the copied text and a copy function
 * @example
 * ```tsx
 * const [copiedText, copy] = useCopyToClipboard();
 * 
 * const handleCopy = async () => {
 *   const success = await copy('Text to copy');
 *   if (success) console.log('Copied!');
 * };
 * ```
 */
export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = useCallback(async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }, [])

  return [copiedText, copy]
}