const deleteChars = (str: string, chars: string): string =>
  str.replace(new RegExp(`[${chars}]`, 'g'), '')

const selectChars = (str: string, chars: string): string =>
  str.replace(new RegExp(`[^${chars}]`, 'g'), '')

export { deleteChars, selectChars }
